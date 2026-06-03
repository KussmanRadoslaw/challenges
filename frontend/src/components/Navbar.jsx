import {  useState } from "react"; 
import {  logoutApi  } from '../apis/authentication.js'
import {  useNavigate  } from  'react-router-dom'
import { useCookies } from 'react-cookie'

const Navbar = () => {
        const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);
        const navigate = useNavigate('/')
        const [jwt, setJWT] = useState(cookies.jwtToken)

    const handleLogout = async (e) => {
        const [result,error] = await logoutApi( cookies.jwtToken )
        handleResponse(result,error)

    }

    const handleLogin = (e) => {
        navigate('/login')
    }
    
    const handleResponse = async (response, error) => {
            if (error) {
                removeCookie('jwtToken')
            } else {       
                removeCookie('jwtToken')
                navigate('/')
            }
            setJWT(null)
        }

    return (
        <div className="bg-white h-16 shadow">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                    <div className="flex flex-1 justify-between items-center">
                        <div>
                            <p className="font-bold text-3xl">Photo challenges</p>
                        </div>
                        <div className="flex items-center">
                            {   jwt?
                                <button onClick={handleLogout} className="bg-blue-500 rounded px-3  py-1.5 my-4">Logout</button>
                                :
                                <button onClick={handleLogin} className="bg-blue-500 rounded px-3  py-1.5 my-4">Login</button>
                            }
                        </div>
                    </div>
            </div>
        </div>

)
}

export default Navbar