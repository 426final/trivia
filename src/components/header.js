import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '../pages/home.js';
import Login from '../pages/login.js';
import Signup from '../pages/signup.js';
import { Navbar, NavItem, Nav, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    
  return (
        <div>
            <div>
            <Navbar className="navigation" bg="transparent" expand="lg">
                <Navbar.Brand as={Link} to="/"><img className="navbar-brand" src={require('../assets/navbar-brand.svg')}></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavItem eventkey={1} href="/login">
                    <Nav.Link as={Link} to="/login" >Login</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={1} href="/signup">
                    <Nav.Link as={Link} to="/signup" >Sign Up</Nav.Link>
                    </NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
            {/* <div>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />

                
            </Switch>
            </div> */}
        </div>  
  );
}


