/**
 * App.js --45--
 */

import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => { // fonksiyonu direkt olarak tanimlar var yazma basina bu sayede 
                                     // class in fonksiyonu oluyor ve this ile erisiliyor
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( { //Bu set state sadece persons u gunceller. otherState e bakmana gerek yok
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }

  nameChangedHandler = (event) => {
    this.setState( {
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        // Eventin gonderdigi value bu sekilde handle edilir.
        { name: 'Stephanie', age: 26 }
      ]
    } )
  }

  render () {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={() => this.switchNameHandler('Maximilian!!')}>Switch Name</button>
                        {/* iki sekilde fonksiyona parameter gonderilebilir. 
                        normalde direkt olarak;
                        this.switchNameHandler('Maximillian!') yazsa idik hemen calisirdi.
                        onun yerine () =>{} seklinde fonksiyonu cagirinca tamamini bir fonksiyon olarak ele 
                        aliyor. Bu sayede sorun cikmiyor.
                        Ama this.switchNameHandler.bind(this, 'Maximillian!') kullanmak performans acisindan
                        daha iyidir.
                        */}
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Max!')}
        // Burada bunu 'Max!' ile bind ediyoruz. yani 'Max!' i parameter olarak gondermis oluyoruz.
          changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
