import React from 'react';
import classes from './InfoCard.css'
import Upper from './Upper/Upper'
import Middle from './Middle/Middle'
import Lower from './Lower/Lower'

const InfoCard = (props) =>{
    return <div className={classes.infoCard}>
                <Upper elem={props.elem}/>
                <Middle/>
                <Lower elem={props.elem}/>
            </div>

}
export default InfoCard


