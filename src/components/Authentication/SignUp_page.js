import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const getUserName = (email) => {
        return email.split('@')[0]; // Assuming username is the part before @ in the email
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        setErrorMessage('');
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                const userName = getUserName(email);
                toast.success(`Welcome to the Online Requirement Portal (DRDO), ${userName}! Redirecting...`);
                setTimeout(() => navigate('/home'), 2000);
            } catch (error) {
                setIsRegistering(false);
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email already in use. Please try another one.');
                } else {
                    toast.error(error.message);
                }
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <ToastContainer />
            <main className="register-container">
                <div className="register-form-container">
                    <div className="register-heading">
                        <div className="register-title">
                            <h3>Create a New Account</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="register-form">
                        <div className="register-input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="register-input-group">
                            <label>Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="register-input-group">
                            <label>Confirm Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {errorMessage && (
                            <span className='error-message'>{errorMessage}</span>
                        )}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`register-submit-button ${isRegistering ? 'disabled' : 'enabled'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="register-login-link">
                            Already have an account?{' '}
                            <Link to={'/login'} className="login-link">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Register;
