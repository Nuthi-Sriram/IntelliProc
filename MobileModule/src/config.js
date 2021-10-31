import firebase from 'firebase';
import 'firebase/auth';

const config = firebase.default.initializeApp({
    apiKey: "AIzaSyCyiJgKu6I43dcX00HRCCuKgaNcQPIqvSg",
    authDomain: "intelliproc-6c838.firebaseapp.com",
    databaseURL: "https://intelliproc-6c838-default-rtdb.firebaseio.com",
    projectId: "intelliproc-6c838",
    storageBucket: "intelliproc-6c838.appspot.com",
    messagingSenderId: "1055373727921",
    appId: "1:1055373727921:web:c4e8c3b8eed586f71c6a90",
    measurementId: "G-1M45V193PY"
});

export const auth = firebase.auth();
export default config;
