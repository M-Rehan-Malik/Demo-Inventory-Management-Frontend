import React from 'react';
import { useRouteError, Link } from "react-router-dom";
import '../styles/ErrorPage.css';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="container">
            <h1 className="heading">404 Not Found</h1>
            <p className="text">Oops! The page you're looking for does not exist.</p>
            <Link to="/" className="link">Go back to home</Link>
        </div>
    );
};

export default ErrorPage;
