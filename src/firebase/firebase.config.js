import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     databaseURL: import.meta.env.VITE_databaseURL,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
// };
const firebaseConfig = {
    apiKey: "AIzaSyBqe8D3zs2l5O4A8vqmTbzIwJQvyo8jU8A",
    authDomain: "volentear-8e15a.firebaseapp.com",
    projectId: "volentear-8e15a",
    storageBucket: "volentear-8e15a.appspot.com",
    messagingSenderId: "484994612394",
    appId: "1:484994612394:web:0f68374270a38b51b564d3"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth