import React from 'react';
import Application from './components/Application';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/header';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import UserProvider from './providers/UserProvider';
function App() {
  return (
    <div>
      <UserProvider>
      <Router>
        <Application />
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />

            
        </Switch>
      </Router>
      </UserProvider>
    </div>
    
  );
}

export default App;
