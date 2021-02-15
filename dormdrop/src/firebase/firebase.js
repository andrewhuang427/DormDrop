import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

var config = {
  apiKey: "AIzaSyAFocmubzICv_lj5Jrm380Fjl4MDA_7nH4",
  authDomain: "washudormdrop.firebaseapp.com",
  projectId: "washudormdrop",
  storageBucket: "washudormdrop.appspot.com",
  messagingSenderId: "691751111760",
  appId: "1:691751111760:web:c32e8293e15e952e4f9555",
  measurementId: "G-ZMYXKQ84L5",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const firestore = app.firestore();

// * ----- Authentication with Google ----- *

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

// * ----- Email / Password Authentication ----- *

export const generateUserDocument = async (user) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
      });
    } catch (error) {
      console.log("Error creating user document", error);
    }
  }
};

export const handleCreatingUserWithEmailAndPassword = async (
  event,
  email,
  password
) => {
  event.preventDefault();
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    generateUserDocument(user);
  } catch (error) {
    console.log("Error signing up with email and password", error);
  }
};

export const handleSignInWithEmailAndPassword = (event, email, password) => {
  event.preventDefault();
  auth.signInWithEmailAndPassword(email, password).catch((error) => {
    console.log("Error occured signing in with username and password", error);
  });
};

export const signOut = () => {
  auth.signOut();
};

export default app;
