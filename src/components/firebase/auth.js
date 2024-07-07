import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app'; 
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};


export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};


export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doSignInWithPhoneNumber = async (phoneNumber) => {
    try {
        // Set up reCAPTCHA verifier
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible', // 'invisible' makes the reCAPTCHA invisible and automatically triggers it
            'callback': (response) => {
                // reCAPTCHA solved - allow user to continue
                console.log('reCAPTCHA resolved');
            },
            'expired-callback': () => {
                // Response expired - reset reCAPTCHA
                console.log('reCAPTCHA expired');
            }
        });

        // Request sign-in with phone number
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

        // Prompt the user to enter the verification code sent to their phone
        const verificationCode = prompt('Please enter the verification code sent to your phone:');

        if (verificationCode) {
            // Confirm the code and complete sign-in
            const userCredential = await confirmationResult.confirm(verificationCode);
            return userCredential.user;
        } else {
            throw new Error('Verification code is required.');
        }
    } catch (error) {
        console.error('Error during phone sign-in:', error);
        throw error;
    }
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
