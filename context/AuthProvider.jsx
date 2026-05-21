"use client";

import { createContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // ================= CREATE USER =================
  const createUser = async (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // ================= LOGIN USER =================
  const loginUser = async (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // ================= GOOGLE LOGIN =================
  const googleLogin = async () => {
    setLoading(true);

    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // ================= LOGOUT =================
  const logoutUser = async () => {
    setLoading(true);

    try {

      await signOut(auth);

      localStorage.removeItem("access-token");

      setUser(null);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE PROFILE =================
  const updateUserProfile = async (name, photo) => {

    try {

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      // Reload Firebase User
      await auth.currentUser.reload();

      // Update Local State
      setUser({ ...auth.currentUser });

    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  // ================= AUTH OBSERVER =================
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {

        try {

          if (currentUser) {

            // Refresh user
            await currentUser.reload();

            setUser({ ...auth.currentUser });

            // JWT Request
            const userInfo = {
              email: currentUser.email,
            };

            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt`,
              userInfo
            );

            if (res.data.token) {
              localStorage.setItem(
                "access-token",
                res.data.token
              );
            }

          } else {

            setUser(null);

            localStorage.removeItem(
              "access-token"
            );
          }

        } catch (error) {

          console.error(
            "Auth State Error:",
            error
          );

        } finally {

          setLoading(false);
        }
      }
    );

    return () => unsubscribe();

  }, []);

  // ================= CONTEXT VALUE =================
  const authInfo = {
    user,
    loading,

    createUser,
    loginUser,
    googleLogin,
    logoutUser,

    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}