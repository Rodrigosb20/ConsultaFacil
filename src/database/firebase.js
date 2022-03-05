import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDgH9Rwc-tXPuqhk8bZRF_-0hnKeoJqHNQ",
  authDomain: "consulta-facil-27846.firebaseapp.com",
  projectId: "consulta-facil-27846",
  storageBucket: "consulta-facil-27846.appspot.com",
  messagingSenderId: "399901972405",
  appId: "1:399901972405:web:2f20606fda8e3470ce2bfc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
