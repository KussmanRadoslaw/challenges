import React, { useState } from "react"; 
import {validateEmail, validatePassword} from '../utilities/validations.js'
import { Link } from "react-router-dom";

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
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState(initialErrorState)
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (p: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(p.target.value)
    }
    const handleSubmit = (e: React.SubmitEvent) => { 
        e.preventDefault()
        if(!validateEmail(email)) {
            setErrors ({
                ...errors,
                email: 'Invalid email'
            })
        }
        if(!validatePassword(password)) {
            setErrors({
                ...errors,
                password: 'Password should be at least 6 characters long'
            })
        }
        //add api call
        
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