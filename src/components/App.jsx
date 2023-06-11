import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../FirebaseSettings";
import ".././index.css";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";
import { DataForm } from "./DataForm";

export const App = () => {
  const [currentFrom, setCurrentFrom] = useState("Login");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setProfile(user);
        }
      });
    }
  }, [profile]);

  const handleSignOut = () => {
    if (profile !== "") {
      signOut(auth)
        .then(() => {
          setProfile("");
          console.log("Sign out successful!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const hadleChangeStateRegisterForm = () => {
    setCurrentFrom("Register");
  };

  const hadleChangeStateLoginForm = () => {
    setCurrentFrom("Login");
  };

  return (
    <>
      <section className="section">
        {profile === "" ? (
          <h2 className="unAuthTitle">Please, authorize!</h2>
        ) : (
          <div className="authBox">
            <h2>Hello, {profile.email}!</h2>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}

        {currentFrom === "Register" ? <RegistrationForm /> : <LoginForm />}

        <div className="currentFormWrap">
          <button type="button" onClick={hadleChangeStateRegisterForm}>
            Register form
          </button>
          <button type="button" onClick={hadleChangeStateLoginForm}>
            Login form
          </button>
        </div>
      </section>

      {profile !== "" && <DataForm />}
    </>
  );
};
