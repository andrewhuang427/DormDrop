import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyAFocmubzICv_lj5Jrm380Fjl4MDA_7nH4",
  authDomain: "washudormdrop.firebaseapp.com",
  projectId: "washudormdrop",
  storageBucket: "washudormdrop.appspot.com",
  messagingSenderId: "691751111760",
  appId: "1:691751111760:web:c32e8293e15e952e4f9555",
  measurementId: "G-ZMYXKQ84L5",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
export const auth = firebase.auth();
export const db = firebase.firestore();

// * ----- Authentication with Google ----- *

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

// * ----- Email / Password Authentication ----- *

export const handleCreatingUserWithEmailAndPassword = async (
  email,
  password
) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    console.log("user successfully created...");
  } catch (error) {
    console.log("Error signing up with email and password", error);
  }
};

export const handleSignInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("user signed in successfully");
  } catch (error) {
    console.log("Error authenticating user");
  }
};

// * ----- Campus Region ----- *

const regionRef = db.collection("campusRegions");

export const createCampusRegion = async (name) => {
  try {
    await regionRef.add({ name });
  } catch (error) {
    console.log(error);
    console.log("Error occurred creating campus region", error);
  }
};

export const deleteCampusRegion = async (id) => {
  try {
    await regionRef.doc(id).delete();
  } catch (error) {
    console.log("Error occurred deleting campus regions", error);
  }
};

export const updateCampusRegion = async (id, data) => {
  try {
    await regionRef.doc(id).update(data);
  } catch (error) {
    console.log("Error occurred updating campus region", error);
  }
};

export const signOut = () => {
  auth.signOut();
};

export default app;
