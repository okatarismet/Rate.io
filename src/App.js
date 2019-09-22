import React, { Component } from 'react';
import {Route, Link, withRouter }from 'react-router-dom';
import './App.css';

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
      this.getData(event.target.value);
    }
    console.log("resp1"+resp1);
    this.setState({data: resp1})
  }

  getData = async (value) =>{
    let res = await axios.get("http://localhost:8080/search/"+value);
    // let { data } = res.data;
    console.log(res.data[0]);
    this.setState({ data: res.data });
    console.log("this.state.data "+this.state.data);
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
    let mainPageStatus = 'Main'
    let AppClass = ''

    
    switch ( this.state.page ) {
      case ('mainPage'):
        
        break;
      case ( 'resultPage' ):   
      mainPageStatus = 'Result'
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
      
      <div className="App">
        <Modal show={this.state.openLogin} modalClosed={this.closeLoginHandler}>
            <Login 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
          </Modal>
        <button onClick={this.openLoginHandler}>Login</button>
        <button onClick={this.logoutHandler}>Logout</button>
        <MainPage 
        mainHeaderClickHandler = {this.mainHeaderClickHandler}
        status={mainPageStatus} 
        changed={this.inputChangedHandler}
        
        />
        {currentPage}
          
       
      </div>
  
      
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withRouter(App); // Radium css eklentisini kullanmak icin boyle yapmamiz gerekiyor
