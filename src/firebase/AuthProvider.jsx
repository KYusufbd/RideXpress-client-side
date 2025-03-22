import AuthContext from "../contexts/AuthContext";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import auth from "./firebaseAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Google Auth Provider
  const provider = new GoogleAuthProvider();

  // Post user function
  const postUser = (userObj, token) => {
    axios
      .post(
        "/users",
        {
          user: userObj,
        },
        {
          headers: {
            authorization: token,
          },
        },
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // Log in with google function
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        setUser(user);
        const userObj = {
          name: user.displayName,
          email: user.email,
          photoURL: user?.photoURL,
        };

        const token = user.accessToken;
        postUser(userObj, token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  // Create an account with email an password
  const register = (name, email, password, imageURL) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        // Add image URL
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageURL,
        })
          .then(() => {
            // Profile updated!
            // Registration is successfull!
          })
          .catch((error) => {
            // An error occurred
            console.log(error);
          });
        // Update curren user
        const newUser = userCredential.user;
        setUser(newUser);
        const userObj = { name, email };
        const response = await postUser(userObj);
        console.log(response);
        toast("Registration is successful!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  //   Get current user:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   setLoading(false);
      return unsubscribe();
    });
  }, []);

  // Sign out
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const authInfo = {
    user,
    loginWithGoogle,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
