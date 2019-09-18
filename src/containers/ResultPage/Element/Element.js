import React, {Component} from 'react';
import './Element.css'
import { runInContext } from 'vm';
import StarRating from '../../../components/StarRating/StarRating'
const axios = require('axios');


const Element = (props)=>{
    

    
    return  <div className="elementBox">
        {props.data.map((elem,index)=>{
            elem.place = 'Golbasi'
            return  <div onClick={()=>props.click(elem)} className="itemBox" key={index}>
                <p id="p1">{"* "+elem.fname +"  "+elem.lname}</p> <p id="star1">6.2/10</p>  <StarRating starDimension="1.5em"/> 
             </div>
        })}
            
        </div>
}

export default Element