// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// auth
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzXZSqYzhogcb-BL-AGXllBm4BxPujONs",
  authDomain: "todo2-app-8770f.firebaseapp.com",
  projectId: "todo2-app-8770f",
  storageBucket: "todo2-app-8770f.appspot.com",
  messagingSenderId: "149188483030",
  appId: "1:149188483030:web:011a78cf236915ca68f677",
  measurementId: "G-0LY7X4LHNB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);
