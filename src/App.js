import React from 'react';
import Application from './components/Application';
import './css/App.css';
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
import Account from './pages/account';
import Practice from './pages/practice';
import Play from './pages/play';
import PasswordReset from './pages/passwordReset'
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
            <Route exact path='/account' component={Account} />
            <Route exact path='/practice' component={Practice} />
            <Route exact path='/play' component={Play} />
            <Route exact path='/password-reset' component={PasswordReset} />

            
        </Switch>
      </Router>
      </UserProvider>
    </div>
    
  );
}

export default App;
