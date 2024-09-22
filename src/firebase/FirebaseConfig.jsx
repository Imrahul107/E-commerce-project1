// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH8XCgFQyIEynS2K8B0yQ3rRuZ0_AwfZQ",
  authDomain: "web-app-02-f5fb2.firebaseapp.com",
  projectId: "web-app-02-f5fb2",
  storageBucket: "web-app-02-f5fb2.appspot.com",
  messagingSenderId: "419209230987",
  appId: "1:419209230987:web:02dd1a78c4d414d859328e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB=getFirestore(app);
const auth=getAuth(app);
export{fireDB,auth};