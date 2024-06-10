// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAex4o6m5RCbxHcnNkIM8A0cflWt9KxJJ4",
  authDomain: "adrdeproject-f0dae.firebaseapp.com",
  projectId: "adrdeproject-f0dae",
  storageBucket: "adrdeproject-f0dae.appspot.com",
  messagingSenderId: "234899002343",
  appId: "1:234899002343:web:3cf2ca2da3faf9fb51e342",
  measurementId: "G-SM0FTVX57R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)

export {app,auth};