

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, applyActionCode } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9tz9By1CX_FHYo_ERm6MxSKi6h4xJ6r0",
  authDomain: "whatsapp-clone-6b8d0.firebaseapp.com",
  projectId: "whatsapp-clone-6b8d0",
  storageBucket: "whatsapp-clone-6b8d0.appspot.com",
  messagingSenderId: "990950148818",
  appId: "1:990950148818:web:d4ada76f8fd744762b3b0b"
};


  
  const app = initializeApp(firebaseConfig);
  

  
  const auth = () => {

    return new Promise ((s, f) => {

      const provider = new GoogleAuthProvider();
      const _auth =  getAuth(app);
        signInWithPopup(_auth, provider).then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log('result', result);
          s({
            user, token
          });
  
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          f(error);
          // ...
        });

    });

  };

export default {app, auth};





/* import * as firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';

export default class FirebaseConfig {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyA9tz9By1CX_FHYo_ERm6MxSKi6h4xJ6r0",
      authDomain: "whatsapp-clone-6b8d0.firebaseapp.com",
      projectId: "whatsapp-clone-6b8d0",
      storageBucket: "whatsapp-clone-6b8d0.appspot.com",
      messagingSenderId: "990950148818",
      appId: "1:990950148818:web:d4ada76f8fd744762b3b0b"
    };
    this.init();
  }

  init(){
    if(!this._initialized){
      const app = initializeApp(this.config);
      this._initialized = true;
      const auth = 1;
    }
  }



}  */