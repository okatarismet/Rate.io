import React from 'react';

const person = (props) => {
    // Gonderilen tum parametre ler tek bir props objectinin icerisinde bulunur.
    return  (
    <div>
        <p onClick={props.click}>I`m a {props.name} and i am {props.age}!</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
        {/* 
        props.changed parentdeki nameChangedHandler i cagirir. Bu sayede child dan
        parent a deger gonderebilmeyi saglar. value = {props.name} ise value yu
        yukardan gelen name ile gunceller. bu sayede onchange ile giden sey value
        ile geri gelmis olur. Buna two-way binding denir.
        */}
    </div>
    )
}
export default person
 