import React from 'react';
import classes from  './MainPage.css'


const MainPage = (props) =>{
    if(props.status == "Result"){
        return  <div className={classes.mainBoxResult}>
                <h1 className={classes.mainHeaderResult} onClick={props.mainHeaderClickHandler}>Rate.io</h1>
                <input className={classes.mainInputResult} type="text" onChange={props.changed} placeholder="Search Something. Persons, Foundations, Brands ..."/>
                
            </div>
    } else {
        return  <div className={classes.mainBox}>
                <h1 className={classes.mainHeader} onClick={props.mainHeaderClickHandler}>Rate.io</h1>
                <input className={classes.mainInput} type="text" onChange={props.changed} placeholder="Search Something. Persons, Foundations, Brands ..."/>
                
            </div>
    }
    
}

export default MainPage