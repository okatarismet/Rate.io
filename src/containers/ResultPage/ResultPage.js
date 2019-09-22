import React,{Component} from 'react';
import classes from './ResultPage.css'
import Element from './Element/Element'
import Modal from '../../components/UI/Modal/Modal';
import InfoCard from '../../components/InfoCard/InfoCard'
const axios = require('axios');


class ResultPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [{}],
            opeInfoCard: false,
            elem: {}
        }
    }
    componentDidUpdate(){
        
    }
    render() {
    const start = ()=>{ 
        axios({
            method: 'get',
            url: 'http://localhost:8080/search/'+this.props.search,
            headers: {},
            data: {search:this.props.search} 
        })
        .then(function (response) {
            this.setState({data: response.data})
            console.log(response.data);
        })
        .catch(function (error) {console.log(error);})
        .finally(function () {});

    }
      
    
   
    const closeInfoCard = () =>{
        this.setState({
            openInfoCard: false
        })
    }
    const openInfoCard = (data) =>{
        this.setState({
            opeInfoCard: true
        })
    }
    const infoCardHandler = (elem) =>{
        console.log("basyom ha")
        console.log(this.state.data);
        console.log(elem);
        const data = this.state.data;
        this.setState({
            elem: {type: "user", id: 1, name: "İsmet OkaTaR", place: "Golbasi", title: "Fitness Sporcusu"}
        })
        console.log(this.state.elem);
        openInfoCard(data);
        
      }
    return  <div>
         
         
           
        
            <div className={classes.mainBoxResult}>
                <h1 className={classes.mainHeaderResult} onClick={this.props.mainHeaderClickHandler}>Rate.io</h1>
                <input className={classes.mainInputResult} type="text" onChange={this.props.changed} placeholder="Search Something. Persons, Foundations, Brands ..."/>
                
            </div>
            { this.state.opeInfoCard ? <InfoCard elem={this.state.elem}/> :<div className={classes.resultBox}>
                <h1>Persons</h1>
                <Element click={infoCardHandler} data={this.props.data}/>
                {/* <h1>Foundations</h1>
                <Element data={this.state.data} foundation={foundation}/>
                <h1>Brands</h1>
                <Element data={this.state.data} brand={brand}/> */}
            </div>}
            </div>
}
    }
export default ResultPage