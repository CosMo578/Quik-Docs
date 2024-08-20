// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcSgspnQIGrsdFu89UK_tW6NAjbFrQq98",
  authDomain: "quik-docs.firebaseapp.com",
  projectId: "quik-docs",
  storageBucket: "quik-docs.appspot.com",
  messagingSenderId: "306832165543",
  appId: "1:306832165543:web:351c3468c8c3c62ca72982",
  measurementId: "G-VF0FF1503L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
