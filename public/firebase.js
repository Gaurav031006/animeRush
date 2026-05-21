import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.googleLogin = async function(){
  try{
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("ar_current_user", user.email);

    localStorage.setItem("ar_google_user", JSON.stringify({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    }));

    location.href = "profile.html";

  }catch(error){
    console.error("Google login error:", error);
    alert("Google login failed. Check Firebase config and authorized domain.");
  }
};

window.logoutGoogle = async function(){
  try{
    await signOut(auth);

    localStorage.removeItem("ar_google_user");
    localStorage.removeItem("ar_current_user");

    location.href = "login.html";

  }catch(error){
    console.error("Logout error:", error);
  }
};