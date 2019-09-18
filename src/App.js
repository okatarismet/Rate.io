import React, { Component } from 'react';
import {Route, Link, withRouter }from 'react-router-dom';
import './App.css';

import MainPage from './containers/MainPage/MainPage'
import ResultPage from './containers/ResultPage/ResultPage'
import InfoCard from './components/InfoCard/InfoCard'
import Input from './components/UI/Input/Input'
import Modal from './components/UI/Modal/Modal';
import Login from './components/Login/Login';



class App extends Component {
  state = {
    page: 0,
    openLogin: false,
    query: "",
    elem: {}
  }
  
  inputChangedHandler = (event) =>{
    console.log("inputChangedHandler()");
    if(event.target.value.length >= 3){
      console.log("3");
      this.setState({
        page: 1,
        query: event.target.value
      })
      this.props.history.push({pathname:'/resultPage'});
    }
  }
  infoCardHandler = (elem) =>{
    // console.log(elem);
   
      this.setState({
        page: 2,
        elem:elem
      })
    
  }
  mainHeaderClickHandler = () =>{
    this.setState({
      page: 0,
    })
    this.props.history.push({pathname:'/'});
  }
  closeLoginHandler = () =>{
    this.setState({openLogin:false})
  }
  openLoginHandler = () =>{
    this.setState({openLogin:true})
  }
  render () {
    let currentPage = null;
    let infoCard = null;
    let MainBox = 'mainBox';
    let MainHeader = 'mainHeader'
    let MainInput = 'mainInput'
    let AppClass = ''
    if(this.state.page == 1 ){
      MainBox = 'mainBoxResult';
      MainHeader = 'mainHeaderResult'
      MainInput = 'mainInputResult'
      
    }
    if(this.state.page == 2){
      MainBox = 'mainBoxResult';
      MainHeader = 'mainHeaderResult'
      MainInput = 'mainInputResult'
      // AppClass = "modal"
      infoCard =  <InfoCard elem={this.state.elem}/>
    }
    return (
      
      <div className="App">
        <button onClick={this.openLoginHandler}>Click</button>
        <Link to="/">MainPage</Link>
        <Link to="/resultPage">ResultPage</Link>
          <Modal show={this.state.openLogin} modalClosed={this.closeLoginHandler}>
            <Login 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
          </Modal>
          <Route path="/" exact 
            render={ (props) => <MainPage 
            mainHeaderClickHandler = {this.mainHeaderClickHandler}
            mainBox={MainBox} 
            changed={this.inputChangedHandler}
            mainHeader={MainHeader}
            mainInput={MainInput}/>}/>
          <Route path="/resultPage" exact
            render={ (props) => <ResultPage 
            click = {this.infoCardHandler}
            mainHeaderClickHandler = {this.mainHeaderClickHandler}
            search={this.state.query}
            changed= {this.inputChangedHandler}
            query = {this.state.query}
          />}/>
         
       
      </div>
  
      
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withRouter(App); // Radium css eklentisini kullanmak icin boyle yapmamiz gerekiyor
