import AuthContext from "../contexts/AuthContext";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import auth from "./firebaseAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Google Auth Provider
  const provider = new GoogleAuthProvider();

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
        console.log(errorCode, errorMessage, email, credential)
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

  const authInfo = {
    user,
    loginWithGoogle,
    register
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
