import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Login.css';

import Input from '../UI/Input/Input';
import { thisExpression } from '@babel/types';
const axios = require('axios');

class Login extends Component {
    state = {
        email:'',
        password:'',
        loading: false,
        formIsValid: true,
        emailIsValid:true,
        passwordIsValid:true
    }
    

    emailChangedHandler = (event) =>{
       
        const value = event.target.value;
        if(value !== "undefined"){
            console.log(123123);
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
    
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
               this.setState({
                   emailIsValid:false
               })
            } else {
                this.setState({
                    emailIsValid:true
                })
            }
        } 
       
          this.setState({
            email: value
          })
        
      }
      passwordChangedHandler = (event) =>{
       
        const value = event.target.value;
        if(value !== "undefined"){
            
            if (value.length < 6) { 
               this.setState({
                   passwordIsValid:false
               })
            } else {
                this.setState({
                    passwordIsValid:true
                })
            }
        } 
        this.setState({
          password: value
        })
      }
     
    render () {
     
        return (
            <div className={classes.Login}>
                <div>
                    <label>E-Mail</label>
                    <input onChange={this.emailChangedHandler} type="email" name="email" placeholder="your mail" />
                    { !this.state.emailIsValid ? <p className={classes.notValid}>not valid email</p> : null }
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={this.passwordChangedHandler} type="password" name="password" placeholder="password" />
                    { !this.state.passwordIsValid ? <p className={classes.notValid}>password should be at least 6 digits</p> : null }
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
        );
    }
}

export default Login;