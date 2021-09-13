import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDe9yym0sxHeGXEFmp946CYIt-_LwNzdiM",
  authDomain: "meta-doc.firebaseapp.com",
  projectId: "meta-doc",
  storageBucket: "meta-doc.appspot.com",
  messagingSenderId: "117618408677",
  appId: "1:117618408677:web:8886e4084c524b1f33e80c",
};

var app;
try {
  app = firebase.apps[0] ?? firebase.initializeApp(firebaseConfig);
} catch (error) {
  app = firebase.initializeApp(firebaseConfig);
}
const db = app.firestore();
export { db };
