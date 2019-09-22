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
    validate = () =>{
        const value = this.state.email;
        if(value !== "undefined"){
            console.log(123123);
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
            method: 'post',
            url: 'http://localhost:8080/operation/loginWeb',
            headers: {},
            data: {
                email:this.state.email,
                password:this.state.password
            } 
        })
        .then(function (response) {
            localStorage.setItem('token',response.data.token)
            console.log("token is " +localStorage.getItem('token'))
            alert('Login Succesfull !')
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
     
    render () {
     
        return (
            <div className={classes.Login}>
                <div className={classes.Form}>
              
                    <div>
                        
                        <label>E-Mail</label>
                        <input className={classes.loginInput} 
                            onChange={this.emailChangedHandler} 
                            type="email" name="email" 
                            placeholder="your mail" />
                        { !this.state.emailIsValid ? <p className={classes.notValid}>not valid email</p> : null }
                    </div>
                    <div>
                        <label>Password</label>
                        <input className={classes.loginInput} 
                            onChange={this.passwordChangedHandler} 
                            type="password" name="password" 
                            placeholder="password" />
                        { !this.state.passwordIsValid ? <p className={classes.notValid}>password should be at least 6 digits</p> : null }
                    </div>
                    <div>
                        <button className={classes.loginButton} onClick={this.validate}>LOGIN</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;