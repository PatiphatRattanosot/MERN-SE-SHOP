import { useState, useEffect, createContext } from "react";
export const AuthContext = createContext();
import app from "../configs/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import UserService from "../services/user.service";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);

  const getUser = () => {
    const userInfo = cookies.get("user") || null;
    return userInfo;
  };
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  //   check if user is logged in?
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
        const { email } = currentUser;
        const response = await UserService.sign(email);

        if (response.data) {
          cookies.set("user", response.data);
        }
      } else {
        cookies.remove("user");
      }
      setIsLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, [auth, user]);

  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const authInfo = {
    user,
    isLoading,
    createUser,
    login,
    logout,
    getUser,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
