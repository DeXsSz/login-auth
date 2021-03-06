import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyCoH-QUocVcV53dpYxgIQ-5mp8zIzGIEWs',
    authDomain: 'login-auth-68535.firebaseapp.com',
    projectId: 'login-auth-68535',
    storageBucket: 'login-auth-68535.appspot.com',
    messagingSenderId: '750304242062',
    appId: '1:750304242062:web:d8cfb78923134cecf55cdf',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
