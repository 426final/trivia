import React, { useContext } from "react";
//import { Router } from "@reach/router";
//import SignIn from "./SignIn";
//import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
//import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
//import PasswordReset from "./PasswordReset";
import Home from '../pages/home';
import Header from '../components/header';
import Header2 from '../components/header2';

export default function Application() {
let user;
const UserGetter = async function(UserContext) {
  user = await useContext(UserContext);
}

user = UserGetter(UserContext);
//const user = useContext(UserContext);

  return (
        user ?
        <Header2 />
      :
        <Header />
      
  );
}

