import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doSignInWithPhoneNumber } from '../firebase/auth'; // Adjust import based on your Firebase authentication setup
import { useAuth } from '../contexts/authContext';
import google_logo from "../../Assets/google.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        if (userLoggedIn) {
            setRedirectTo('/home'); // Redirect all users to the home page
        }
    }, [userLoggedIn]);

    const onSubmitEmailPassword = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
                setRedirectTo('/home');
            } catch (error) {
                setIsSigningIn(false);
                toast.error(error.message);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
                setRedirectTo('/home');
            } catch (error) {
                setIsSigningIn(false);
                toast.error(error.message);
            }
        }
    };

    const onSubmitPhoneNumber = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                // Implement the function for signing in with phone number
                await doSignInWithPhoneNumber(phoneNumber);
                setRedirectTo('/home');
            } catch (error) {
                setIsSigningIn(false);
                toast.error(error.message);
            }
        }
    };

    if (redirectTo) {
        return <Navigate to={redirectTo} replace={true} />;
    }

    return (
        <div>
            <ToastContainer />
            <main className="login-container">
                <div className="login-content">
                    <div className="login-header">
                        <h3 className="heading">Welcome Back</h3>
                    </div>
                    <form onSubmit={onSubmitEmailPassword} className="space-y-5">
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

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`submit-btn ${isSigningIn ? 'disabled' : ''}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In with Email'}
                        </button>
                    </form>

                    {/* Add the phone number login section */}
                    <form onSubmit={onSubmitPhoneNumber} className="space-y-5">
                        <div>
                            <label className="login-label">Phone Number</label>
                            <input
                                type="tel"
                                autoComplete="tel"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="login-input"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`submit-btn ${isSigningIn ? 'disabled' : ''}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In with Phone Number'}
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
                        <img src={google_logo} className="google-icon" alt="Google Logo" />
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
