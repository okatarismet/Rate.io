import React from 'react';
import classes from './ResultPage.css'
import Element from './Element/Element'
const axios = require('axios');


const ResultPage = (props) =>{
    let person = null;
    let foundation = null;
    let brand = null;

    const [thisState,thisSetState] = React.useState({
        data: [{}]
    })
    let response1 = 0;
    const start = (resp)=>{ 
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/users/list/search',
            headers: {},
            data: {
                search:props.search
            } 
        })
        .then(function (response) {
            thisSetState({
                data: response.data
            })
            console.log(response.data);
            resp = 1;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    }
      
   React.useEffect(()=>start(response1),[props.search])
    if(thisState.data.length == 0){
        console.log("no match found");
    }
    let Elements = null;
    if(response1 == 1){
        console.log("response 1");
      
    }
    return  <div>
            <div className={classes.mainBoxResult}>
                <h1 className={classes.mainHeaderResult} onClick={props.mainHeaderClickHandler}>Rate.io</h1>
                <input className={classes.mainInputResult} type="text" onChange={props.changed} placeholder="Search Something. Persons, Foundations, Brands ..."/>
                
            </div>
            <div className={classes.resultBox}>
                <h1>Persons</h1>
                <div><Element click={props.click} data={thisState.data} person={person}/></div>
                {/* <h1>Foundations</h1>
                <Element data={thisState.data} foundation={foundation}/>
                <h1>Brands</h1>
                <Element data={thisState.data} brand={brand}/> */}
            </div>
            </div>
}

export default ResultPage