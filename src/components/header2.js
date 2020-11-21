import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {logUserOut} from '../firebase'
import { Navbar, NavItem, Nav, Form, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header2() {

const logOutHandler = () => {
    logUserOut();
}

  return (
        <div>
            <div>
            <Navbar className="navigation" bg="transparent" expand="lg">
                <Navbar.Brand as={Link} to="/"><img className="navbar-brand" src={require('../assets/navbar-brand.svg')}></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavItem eventkey={1} href="/practice">
                    <Nav.Link as={Link} to="/practice" >Practice</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={1} href="/account">
                    <Nav.Link as={Link} to="/account" >Account</Nav.Link>
                    </NavItem>
                    <NavItem eventkey={1} href="/">
                    <Nav.Link as={Link} to="/" onClick={logOutHandler} >Log Out</Nav.Link>
                    </NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
           
        </div>  
  );
}
