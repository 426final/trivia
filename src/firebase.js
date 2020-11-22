// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import {UserContext} from './providers/UserProvider';
import {useContext} from 'react';
import { functions } from 'firebase';
import { useRouteMatch } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyCYifVeHTnhB0NWe-wT4yKm8CAjNju5B50",
    authDomain: "trivia426.firebaseapp.com",
    databaseURL: "https://trivia426.firebaseio.com",
    projectId: "trivia426",
    storageBucket: "trivia426.appspot.com",
    messagingSenderId: "441367858975",
    appId: "1:441367858975:web:d1d3f9a233d98aaea72a2a",
    measurementId: "G-FX4KWX76EK"
  };

  firebase.initializeApp(firebaseConfig)
  export const firestore = firebase.firestore();
  export const auth = firebase.auth();

  export default firebase;

  export const generateUserDocument = async (user) => {
    if (!user) return;
    
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email } = user;
      try {
        await userRef.set({
          email
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  
  export const getUserDocument = async uid => {
    if (!uid) return null;

    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  export const logUserOut = async () => {
    
    firebase.auth().signOut().then(function() {
      console.log("Log out Successful");
    }).catch(function(error) {
      console.log("Log out unsuccessful");
    });

  }

  export const deleteUser = async () => {
    let user = firebase.auth().currentUser;
    user.delete().then(function() {
      console.log("user deleted!");
    }).catch(function(error) {
      console.log(error);
    });

  }

  export const saveQuestion = async (question) => {
      const user = auth.currentUser.uid;
      firestore.collection('users').doc(user).collection('saved').add(question);
  }

  export const getSaved = async () => {
    if (auth.currentUser == null) {
        console.log('null');
        return;
    }
    const user = auth.currentUser.uid;
    return firestore.collection('users').doc(user).collection('saved').get()
    // .then((value) => {
    //     return value;
    // })
  }

  