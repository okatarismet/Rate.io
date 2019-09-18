import React from 'react';
import classes from  './MainPage.css'


const MainPage = (props) =>{
    return  <div className={classes.mainBox}>
                <h1 className={classes.mainHeader} onClick={props.mainHeaderClickHandler}>Rate.io</h1>
                <input className={classes.mainInput} type="text" onChange={props.changed} placeholder="Search Something. Persons, Foundations, Brands ..."/>
                
            </div>
}

export default MainPage