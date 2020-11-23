import React, {useState} from "react";
import Header from '../components/header';
import {getUserDocument} from '../firebase';


export default function Home() {
   
  return (
      <div className="home">
        <div className="trivia-home-div">
            <img className="trivia-home" src={require('../assets/trivia-home1.svg')}></img>
        </div>
      </div>
      
    );
  }