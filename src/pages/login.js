import React from "react";
import Header from '../components/header';
import { useState } from "react";
import { auth } from "../firebase";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';


export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
          .then(() => {
            history.push('/account');
          })
          .catch(error => {
          setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };
      
    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;
        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
    };

   
      
   

  return (
    <div className="form-div mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Log In</h1>
      <div className="form-border">
        {error !== null && <div className = "py-4 bg-red-600 w-full  text-center mb-3">{error}</div>}
        <form className="form">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-2 p-2 w-full"
            name="userEmail"
            value = {email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-2 mb-3 p-2 w-full"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="button" type="submit" onClick = {(event) => {
              event.preventDefault();
              signInWithEmailAndPasswordHandler(event, email, password);
              }}>
            Log in
          </button>
        </form>
        
        
        <p className="text-center my-3">
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to="password-reset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
  }