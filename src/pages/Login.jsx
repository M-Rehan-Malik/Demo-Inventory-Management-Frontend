import React, { useEffect, useState } from 'react'
import "../styles/Login.css"
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyAdmin } from '../features/admin/adminSlice'
import Loader from '../components/Loader'

const Login = () => {

    useEffect(() => {
      if (localStorage.getItem("token")) navigate("/")
    }, [])
    

    const { isLoading, data, error } = useSelector((state) => state.admin)

    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Log In as Admin"
    }, [])

    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(verifyAdmin(credentials));

        if (response.payload.token) {
            localStorage.setItem("token", response.payload.token);
            navigate('/admin');
        }
    }

    const [passwordType, setpasswordType] = useState("password");
    const [eyeIconType, setEyeIconType] = useState("visibility")

    function togglePasswordVisibility(e) {
        // Setting password input type to show and hide password
        passwordType === "password" ? setpasswordType("text") : setpasswordType("password");

        // Setting eye icon type when showing and hiding password
        eyeIconType === "visibility" ? setEyeIconType("visibility_off") : setEyeIconType("visibility");

        e.target.previousSibling.focus();
    }

    return (
        isLoading ? <Loader /> :
            (<section id='loginSection'>
                <h2>Admin Log In Page</h2>
                <p>Enter your email address and password below to <span className='colorPink'>verify you as an Admin</span></p>
                <form action="" onSubmit={onSubmit}>
                    <div className="formGroup">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" autoComplete='on' placeholder='Enter your email address' onChange={handleChange} required max={30} />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <div className='passwordInputDiv'>
                            <input type={passwordType} name="password" autoComplete='off' placeholder='Enter your password' onChange={handleChange} required max={15} />
                            <span className="material-symbols-outlined eyeIcon" onClick={togglePasswordVisibility}>
                                {eyeIconType}
                            </span>
                        </div>
                    </div>
                    {error && <p className="errorMessage">{error}</p>}
                    <div className="btnsDiv">
                        <button id='loginBtn' disabled={credentials.email.length === 0 || credentials.password.length === 0}>
                            Submit
                        </button>
                    </div>
                    <Link to="/" className='backToHome'>Back to home</Link>
                </form>
            </section>)
    )
}

export default Login
