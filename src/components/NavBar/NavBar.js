import React from 'react';
import {Route, Link, withRouter }from 'react-router-dom';
import { Navbar , Form , FormControl , Button , Nav , NavDropdown, DropdownButton,Dropdown } from 'react-bootstrap';

const NavBar = (props) =>{
    return <div >
               <Navbar bg="blue" expand="lg">
                    <Navbar.Brand href="#home">Rate.io</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link onClick={()=>{props.signup()}} href="#home">Signup</Nav.Link>
                        <Nav.Link onClick={()=>{props.login()}}  href="#link">Login</Nav.Link>
                        <Nav.Link onClick={()=>{props.logout()}} href="#link">Logout</Nav.Link>
                        </Nav>
                        <Form inline>
                        <DropdownButton alignRight variant="outline-success" id="dropdown-item-button" title="Profile">
                        <Dropdown.Item as="button">Action</Dropdown.Item>
                        <Dropdown.Item as="button">Another action</Dropdown.Item>
                        <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <hr/>
            </div>
}
export default NavBar


