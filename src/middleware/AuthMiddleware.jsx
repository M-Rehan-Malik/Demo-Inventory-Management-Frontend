import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in on page
        let token = localStorage.getItem('token');
        if (token) setIsLoggedIn(true);
         else navigate("/admin/login")
    }, [])
    return (
        <>
            {props.children}
        </>
    )
}

export default AuthMiddleware
