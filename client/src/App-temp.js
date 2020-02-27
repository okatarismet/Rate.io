import React, { Component } from 'react';
import {Route, Link, withRouter }from 'react-router-dom';
import classes from './App.css';

import MainPage from './containers/MainPage/MainPage'
import ResultPage from './containers/ResultPage/ResultPage'
import InfoCard from './components/InfoCard/InfoCard'
import Input from './components/UI/Input/Input'
import Modal from './components/UI/Modal/Modal';
import Login from './components/Login/Login';
const axios = require('axios');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openLogin: false,
      isLogin:false,
      query: "",
      data:[{}],
      elem: {},
      page:"mainPage"
    }

    // this.inputChangedHandler = this.inputChangedHandler.bind(this);
}

  
  
  inputChangedHandler = (event) =>{
    let resp1 = null;
    if(event.target.value.length >= 3){
      this.setState({
        query: event.target.value,
        page:'resultPage'
      })
  //     axios({
  //       method: 'get',
  //       url: 'http://localhost:8080/search/'+event.target.value,
  //       headers: {},
  //       data: {search:event.target.value} 
  //   })
  //   .then(function (response) {
  //       resp1 = response.data
  //       console.log(response.data);
  //   })
  //   .catch(function (error) {console.log(error);})
  //   .finally(function () {});
  //     this.props.history.push({pathname:'/resultPage'});
    }
  //   console.log("resp1"+resp1);
  //   this.setState({data: resp1})
  }
  infoCardHandler = (elem) =>{
    console.log("elem" + elem);
      this.setState({
        elem:elem
      })
    
  }
  mainHeaderClickHandler = () =>{
    
   this.setState({page:"mainPage"})
  }
  closeLoginHandler = () =>{
    this.setState({openLogin:false})
  }
  openLoginHandler = () =>{
    this.setState({openLogin:true})
  }
  isLogin = () => {
    return localStorage.getItem('token') != 'undefined';
  }
  logoutHandler = () =>{
    if(localStorage.getItem('token') == undefined){
      alert('You are already logouted')
      return;
    }
    localStorage.clear();
    this.setState({isLogin:false})
    if(localStorage.getItem('token') == undefined){
      alert('Logout Succesfull!')
    }
  }
  render () {
    let currentPage = null;
    let infoCard = null;
    let mainBox = classes.MainBox;
    let mainHeader = classes.MainHeader;
    let mainInput = classes.MainInput
    let AppClass = ''

    
    switch ( this.state.page ) {
      case ('mainPage'):
        
        break;
      case ( 'resultPage' ): 
        mainBox = classes.MainBox;
        mainHeader = classes.MainHeader;
        mainInput = classes.MainInput     
       currentPage = <ResultPage 
          click = {this.infoCardHandler}
          mainHeaderClickHandler = {this.mainHeaderClickHandler}
          search={this.state.query}
          data={this.state.data}
          changed= {this.inputChangedHandler}/>
       
        break;
      case ( 'password' ):
          break;
      case ( 'select' ):
          break;
      default:
         
  }

    return (
      
      <div className={classes.App}>
        
        <button onClick={this.openLoginHandler}>Login</button>
        <button onClick={this.logoutHandler}>Logout</button>
        <MainPage 
        mainHeaderClickHandler = {this.mainHeaderClickHandler}
        mainBox={mainBox} 
        changed={this.inputChangedHandler}
        mainHeader={mainHeader}
        mainInput={mainInput}
        />
        {currentPage}
          
       
      </div>
  
      
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withRouter(App); // Radium css eklentisini kullanmak icin boyle yapmamiz gerekiyor
