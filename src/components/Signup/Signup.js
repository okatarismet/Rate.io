import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Signup.css';

import Input from '../UI/Input/Input';
import { thisExpression } from '@babel/types';
const axios = require('axios');

class Signup extends Component {
    state = {
        email:'',
        password:'',
        fullName: '',
        gender: '',
        loading: false,
        formIsValid: true,
        emailIsValid:true,
        fullNameIsValid:true,
        passwordIsValid:true
    }
    validate = () =>{
        const value = this.state.email;
        if(value !== "undefined"){
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
    
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
               this.setState({emailIsValid:false})
               return;
            } else {
                this.setState({emailIsValid:true})
            }
        }
        if(this.state.password !== "undefined"){
            if (this.state.password.length < 6) { 
               this.setState({passwordIsValid:false})
               return;
            } else {
                this.setState({passwordIsValid:true})
            }
        }
        axios({
            method: 'put',
            url: 'http://localhost:8080/add/signup',
            headers: {},
            data: {
                email:this.state.email,
                password:this.state.password,
                fname: this.state.fullName.split(' ')[0],
                lname: this.state.fullName.split(' ')[1],
                sex: 'm'
            } 
        })
        .then(function (response) {
            console.log(response);
            localStorage.setItem('token',response.data.token)
            console.log("token is " +localStorage.getItem('token'))
            alert('Signup Succesfull !')
        })
        .catch(function (error) {
            console.log(error);
        })
       
    }

    emailChangedHandler = (event) =>{
        this.setState({
        email: event.target.value
        })    
    }
    passwordChangedHandler = (event) =>{
        this.setState({
          password: event.target.value
        })
    }
    fullNameChangedHandler = (event) =>{
        this.setState({
          fullName: event.target.value
        })
    }
    genderChangedHandler = (event) =>{
        this.setState({
          gender: event.target.value
        })
    }
     
    render () {
        return (
            <div className={classes.Signup}>
                <div className={classes.Form}>
                    <div>
                        <label>Full Name</label>
                        <input className={classes.SignupInput} 
                            onChange={this.fullNameChangedHandler} 
                            type="ipnut" name="input" 
                            placeholder="John Doe" />
                        { !this.state.fullNameIsValid ? <p className={classes.notValid}>please enter your name and surname separated by a space</p> : null }
                    </div>
                    <div>
                        
                        <label>E-Mail</label>
                        <input className={classes.SignupInput} 
                            onChange={this.emailChangedHandler} 
                            type="email" name="email" 
                            placeholder="John@Doe.com" />
                        { !this.state.emailIsValid ? <p className={classes.notValid}>not valid email</p> : null }
                    </div>
                    <div>
                        <label>Password</label>
                        <input className={classes.SignupInput} 
                            onChange={this.passwordChangedHandler} 
                            type="password" name="password" 
                            placeholder="password" />
                        { !this.state.passwordIsValid ? <p className={classes.notValid}>password should be at least 6 digits</p> : null }
                    </div>
                    <div>
                        <button className={classes.SignupButton} onClick={this.validate}>Signup</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;