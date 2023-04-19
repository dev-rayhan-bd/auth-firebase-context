import React, { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, applyActionCode, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleAuthProvider = new  GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] =useState(true)

  const createUser = (email,password)=>{
   return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn =(email,password)=>{
   return signInWithEmailAndPassword(auth,email,password)
  }
  const logOut =()=>{
   return signOut(auth)
  }
  const signInWithGoogle=()=>{
   return signInWithPopup(auth,googleAuthProvider)
  }
// observe auth state change
  useEffect(()=>{
  const unsubscibe = onAuthStateChanged(auth,currentUser =>{
      console.log('auth state change',currentUser);
      setUser(currentUser)
      setLoading(false)
   });
   return () =>{
      unsubscibe();
   }


  },[])
  const authInfo = { user,createUser,signIn,logOut,loading ,signInWithGoogle };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
