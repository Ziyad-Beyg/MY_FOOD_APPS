import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import { getFirestore, doc,onSnapshot, setDoc, getDoc, addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBS0pGbYDWr4Bkd2sX9RX8BvCIELVQ6fE0",
  authDomain: "foodapp-f321d.firebaseapp.com",
  projectId: "foodapp-f321d",
  storageBucket: "foodapp-f321d.appspot.com",
  messagingSenderId: "774806092444",
  appId: "1:774806092444:web:27039a38e0c4708790cb59",
  measurementId: "G-0SX64BFH90"
});

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();


export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,

  db,
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,

  storage,
  ref,
  getDownloadURL,
  uploadBytes 
};