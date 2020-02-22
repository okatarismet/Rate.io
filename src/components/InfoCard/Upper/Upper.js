import React from 'react';
import image from '../../../assets/image.png'
import locationIcon from '../../../assets/locationIcon.png'
import classes from './Upper.css'

const Upper = (props)=>{
    let info = null;
    if(props.elem){
        info = <div> <p className={classes.Name}>{props.elem.name}</p>
                <p className={classes.Name}>{props.elem.lname}</p>
                <p className={classes.title}>{props.elem.title}</p>
                
                <p className={classes.location}><img className={classes.icon} src={locationIcon}/>{props.elem.place}</p>
            </div>
    }
    return <div className={classes.Upper}>
            <img src={image} className={classes.image}/>
            <div>
            {info}    
            </div>
            
            
           </div>
}

export default Upper