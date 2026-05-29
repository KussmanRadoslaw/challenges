import React, { useState } from "react"; 
import {validateEmail, validatePassword} from '../utilities/validations.js'
import { Link } from "react-router-dom";
import {  registerApi, loginApi  } from '../apis/authentication.js'
import {  useNavigate  } from  'react-router-dom'

const initialErrorState = {
    email: '',
    password: '',
    api: '',
}

export enum PageType {
    LOGIN = 'login',
    REGISTER = 'register',
}

interface AuthenticationProps {
    pageType: PageType;
}

const Authentication = ({pageType}: AuthenticationProps) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState(initialErrorState)
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    
    const handlePasswordChange = (p: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(p.target.value)
    }
    
    const handleResponse = (result: unknown, error: string, currentErrors: typeof initialErrorState) => {
            if (error) {
                // FIX 2: currentErrors zamiast errors ze stanu
                setErrors({
                    ...currentErrors,
                    api: error
                })
            } else {
                navigate('/')
            }
        }


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => { 
        e.preventDefault();

        let newErrors = {...initialErrorState}
        
        if(!validateEmail(email)) {
            newErrors = {
                ...newErrors,
                email: 'Invalid email'
            }
        }
        if(!validatePassword(password)) {
            newErrors = {
                ...newErrors,
                password: 'Password should be at least 6 characters long'
            }
        }

        setErrors(newErrors)

        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if(hasErrors) {
            return
        }

        if(pageType === PageType.LOGIN) {
            const [result,error] = await loginApi({
                user: {
                    email: email,
                    password: password
                }
            })
            handleResponse(result,error,newErrors)
        }else {
            const [result,error] = await registerApi({
                user: {
                    email: email,
                    password: password
                }
            })
            handleResponse(result,error,newErrors)
        }
    }   
    

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                <h3 className="text-xl font-bold">
                    {pageType === PageType.LOGIN ? 'Login' : 'Register'  }
                </h3>
                {
                    (pageType === PageType.LOGIN) ?
                    <p>
                    Not a user?
                    <Link
                        to='/register'
                        className='ms-1 underline'
                        >
                            Register
                       
                    </Link>
                    </p>
                    :
                    <p>
                    Not logged in?
                    <Link
                        to='/login'
                        className='ms-1 underline'
                        >
                            Login
                       
                    </Link>
                     </p>
                }
                
                <form className='mt-10 flex gap-4' onSubmit={handleSubmit}>
                    <div>
                        <input
                            name="email"
                            type="email"
                            className='py-2 border border-gray-600 rounded px-3'
                            placeholder="Enter email"
                            value={email}
                            onChange={handleEmailChange}
                        ></input>
                        {errors.email && 
                        <p className='text-sm text-medium text-red-400 mt-1'>{errors.email}</p>}
                    </div>
                    <div>
                        <input
                            name="password"
                            type="password"
                            className='py-2 border border-gray-600 rounded px-3'
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                        ></input>
                        {errors.password && <p className='text-sm text-medium text-red-400 mt-1'>{errors.password}</p>}
                    </div>  
                    <div>  
                        <button type="submit" className='bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded text-white'>
                            {pageType === PageType.LOGIN ? 'Login' : 'Register'  }
                        </button>
                    </div>
                </form>
                    
            </div>
        </div>
    )
}


export default Authentication