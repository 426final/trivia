import React, { useContext } from "react";
//import { Router } from "@reach/router";
//import SignIn from "./SignIn";
//import SignUp from "./SignUp";
//import UserProvider from "../providers/UserProvider";
//import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
//import PasswordReset from "./PasswordReset";
import Home from '../pages/home';
import Header from '../components/header';
export default function Application() {
  //const user = useContext(UserContext);
  return (
    //     user ?
    //     //<ProfilePage />
    //     <div></div>
    //   :
        <Header />
      
  );
}

//export default Application;