import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs,query,where,onSnapshot, getDoc,addDoc,deleteDoc,doc,updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
const firebaseConfig = {
  apiKey: "AIzaSyBCsL0nEvyQxScMlw5FDsfs7UuTKopdOAo",
  authDomain: "tokengenerator-85ccb.firebaseapp.com",
  projectId: "tokengenerator-85ccb",
  storageBucket: "tokengenerator-85ccb.appspot.com",
  messagingSenderId: "545985494948",
  appId: "1:545985494948:web:5717d36cb71d26292bcb31",
  measurementId: "G-WV01Q7TD2W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage ,collection,getDoc,onSnapshot, where,query,getDocs, addDoc,deleteDoc,doc,updateDoc,arrayUnion};
