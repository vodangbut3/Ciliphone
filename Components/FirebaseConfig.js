
import  { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoNjnsCilRWkDT3pY0a7NnubMgE8wYyFs",
  authDomain: "fa22datn.firebaseapp.com",
  projectId: "fa22datn",
  storageBucket: "fa22datn.appspot.com",
  messagingSenderId: "876813984328",
  appId: "1:876813984328:web:bed6e9203bd62f3f666e7d",
  measurementId: "G-2VEZ7L86E0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const storage=getStorage(app)