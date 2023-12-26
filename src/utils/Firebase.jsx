// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArGkOv0QuwVfq9FBSijol_GLoGNMfkf8I",
  authDomain: "stream-gpt.firebaseapp.com",
  projectId: "stream-gpt",
  storageBucket: "stream-gpt.appspot.com",
  messagingSenderId: "1082549324111",
  appId: "1:1082549324111:web:7689d6749de5d3a7fc1d3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
