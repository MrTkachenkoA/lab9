import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtCv2YJ232Nr_uBEwfjyuQnf1Z-htJV34",
  authDomain: "laboratory-work-9-d1fba.firebaseapp.com",
  projectId: "laboratory-work-9-d1fba",
  storageBucket: "laboratory-work-9-d1fba.appspot.com",
  messagingSenderId: "164359715873",
  appId: "1:164359715873:web:c7b0f78af6ebfbc97d3760",
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);

export { firebase, auth };
