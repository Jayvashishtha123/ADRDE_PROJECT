

import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectTo, setRedirectTo] = useState(null); // State to handle redirection

    useEffect(() => {
        if (userLoggedIn) {
            const adminEmail = 'admin@gmail.com'; // Replace with actual admin email or get dynamically
            if (userLoggedIn.email === adminEmail) {
                setRedirectTo('/admin'); // Redirect to admin page if admin
            } else {
                setRedirectTo('/home'); // Redirect to home page otherwise
            }
        }
    }, [userLoggedIn]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                // Redirect on successful login
                
                setRedirectTo('/home');
            } catch (error) {
                setIsSigningIn(false);
                setErrorMessage(error.message);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
                // Handle successful Google sign-in, then redirect
                setRedirectTo('/home');
            } catch (error) {
                setIsSigningIn(false);
                setErrorMessage(error.message);
            }
        }
    };

    // Redirect if redirectTo is set
    if (redirectTo) {
        return <Navigate to={redirectTo} replace={true} />;
    }

    return (
        <div>
            <main className="login-container">
                <div className="login-content">
                    <div className="login-header">
                        <h3 className="heading">Welcome Back</h3>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="login-label">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                            />
                        </div>

                        <div>
                            <label className="login-label">Password</label>
                            <input
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                            />
                        </div>

                        {errorMessage && (
                            <span className="error-message">{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`submit-btn ${isSigningIn ? 'disabled' : ''}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="link-container">
                        Don't have an account? <Link to={'/register'} className="link">Sign up</Link>
                    </p>
                    <div className="or-divider">
                        <div className="line"></div>
                        <div className="text">OR</div>
                        <div className="line"></div>
                    </div>
                    <button
                        disabled={isSigningIn}
                        onClick={onGoogleSignIn}
                        className={`google-btn ${isSigningIn ? 'disabled' : ''}`}
                    >
                        <svg className="google-icon" viewBox="0 0 48 48" fill="#4285F4" xmlns="http://www.w3.org/2000/svg">
                            {/* Google SVG icon */}
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
