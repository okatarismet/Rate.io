import React, {Component} from 'react';
import classes from'./Element.css'
import StarRating from '../../../components/StarRating/StarRating'


const Element = (props)=>{

    if(props.data == null){
        return <h1>Error</h1>
    }
    if(props.type == "forPreviousRatings"){
        return  <div className={classes.elementBox}>
                    {props.data.map((elem,index)=>{
                        return  <div className={classes.itemBox} key={index}>
                            <p className={classes.p2}>{"* "+elem.fname+ " "+ elem.lname}</p><p className={classes.p2}>{elem.rate+"/10"}</p><StarRating className={classes.p2} rating={elem.rate} starDimension="1.5em"/> 
                        </div>
                    })}  
                </div>
    } else {
        return  <div className={classes.elementBox}>
                    {props.data.map((elem,index)=>{
                        return  <div onClick={()=>props.click(elem)} className={classes.itemBox} key={index}>
                        <p id="p1">{"* "+elem.name}</p>   {/*<p id="star1">6.2/10</p>  <StarRating starDimension="1.5em"/>  */}
                        </div>
                    })}  
                </div>
    }      
}

export default Element;