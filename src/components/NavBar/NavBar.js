import React from 'react';
import {Route, Link, withRouter }from 'react-router-dom';

// import classes from './NavBar.css'
// import Upper from './Upper/Upper'
// import Middle from './Middle/Middle'
// import Lower from './Lower/Lower'
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
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        <Form inline>
                        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
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


