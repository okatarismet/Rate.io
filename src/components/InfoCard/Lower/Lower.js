import React from 'react';
import image from '../../../assets/image.png'
import locationIcon from '../../../assets/locationIcon.png'
import StarRating from '../../StarRating/StarRating'
import classes from './Lower.css'

const Lower = (props)=>{
    const Rate = () =>{
        alert("You have Rated "+props.elem.fname+" "+props.elem.lname+" succesfully!\nThanks for your Rating!")
    }
    return <div className={classes.Lower}>
                <StarRating starDimension = '2.7em'/> 
                <button className={classes.rateButton} onClick={Rate}>Rate!</button>
           </div>
}

export default Lower