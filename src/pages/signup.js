import React from "react";
import Header from '../components/header';
import { useState } from "react";
import { auth } from "../firebase.js";
import {generateUserDocument} from '../firebase';
import { useHistory } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user);
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  
  const history = useHistory();


  return (
    <div className="form-div mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="form-border">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-center mb-3">
            {error}
          </div>
        )}
        <form className="form">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-2 p-2 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-2 mb-3 p-2 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          
            <button className="button" tag={Link} to="/" 
                
                onClick={event => {
                createUserWithEmailAndPasswordHandler(event, email, password);
                history.push('/');
                }}>
                    Sign up
            </button>
  
           
        </form>
      
        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Log in here
          </Link>{" "}
        </p>
      </div>
    </div>
  );
  }