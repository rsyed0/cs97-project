import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPs0dwEJFPM94ROK7MMTWeu_YpyU4cLlY",
  authDomain: "cs97-project.firebaseapp.com",
  databaseURL: "https://cs97-project.firebaseio.com",
  projectId: "cs97-project",
  storageBucket: "cs97-project.appspot.com",
  messagingSenderId: "915856769512",
  appId: "1:915856769512:web:897efddb0288c2e393a45d",
  measurementId: "G-814RQFH7NH"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
