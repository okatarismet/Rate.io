import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Login.css';

import Input from '../UI/Input/Input';
import { thisExpression } from '@babel/types';
const axios = require('axios');

class Login extends Component {
    state = {
        loginForm:{
            email:{
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Senin E-mailin'
                },
                value:''
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder: 'Sifren'
                },
                value:''
            }
        },
        
        loading: false

    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {

                email: 'test@test.com',
                password: 'iso55'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    render () {
        let form = (
            <form>
               
                <Input type="email" name="email" placeholder="Your Mail" />
                <Input type="password" name="street" placeholder="Street" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.Login}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default Login;