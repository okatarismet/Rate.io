import React,{Component} from 'react';
import image from '../../../assets/image.png'
import locationIcon from '../../../assets/locationIcon.png'
import StarRating from '../../StarRating/StarRating'
import classes from './Lower.css'
const axios = require('axios');


class Lower extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        rating: 5
      }
  
      // this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }
  changeRating = (newRating,name)=> {
    this.setState({
      rating: newRating
    });
  }
  getData = async (value) =>{
    let newRating = await axios.get("http://195.201.19.95:8080/get/"+"user"+"/"+this.state.rating+"/1");
    this.setState({rating:newRating.data[0].rate})
    console.log(this.state.rating);
    }
    rateHim = async (value) =>{
        let newRating = await axios({
            method: 'post',
            url: 'http://localhost:8080/operation/rate',
            headers: {
              "token": localStorage.getItem('token')
          },
            data: {
                rated_type:"1",
                rated_id: this.props.elem.id,
                rate: this.state.rating,
                rater_id: localStorage.getItem('ID'),
                title_id:'1'
            } 
        });
        console.log('rate ettim')
        console.log(newRating);
        }
    componentDidMount(){
        this.getData()
    }
  render(){
    const Rate = () =>{
        console.log("asdfsdf");
        console.log(this.props.elem);
        this.rateHim();
        alert("You have Rated "+this.props.elem.fname+" "+this.props.elem.lname+" succesfully!\nThanks for your Rating!")
    }
    
    

    return <div className={classes.Lower}>
               
               <div ><StarRating className={classes.inline} changeRating={this.changeRating} rating={this.state.rating} starDimension = '2.7em'/> <h1 className={classes.inline}>{this.state.rating+"/10"}</h1></div>
                <button className={classes.rateButton} onClick={Rate}>Rate!</button>
           </div>
}
}

export default Lower