import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import google_logo from "../../Assets/google.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName || user.email); // Get user's name or email
                setRedirectTo('/home');
            }
        });
    }, []);

    // useEffect(() => {
    //     if (redirectTo) {
    //         toast.success(`Successfully logged in as ${userName}!`);
    //     }
    // }, [redirectTo, userName]);

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
