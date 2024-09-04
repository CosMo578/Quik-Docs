import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcSgspnQIGrsdFu89UK_tW6NAjbFrQq98",
  authDomain: "quik-docs.firebaseapp.com",
  projectId: "quik-docs",
  storageBucket: "quik-docs.appspot.com",
  messagingSenderId: "306832165543",
  appId: "1:306832165543:web:351c3468c8c3c62ca72982",
  measurementId: "G-VF0FF1503L",
};

export const app = initializeApp(firebaseConfig);