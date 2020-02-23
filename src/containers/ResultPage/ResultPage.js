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
            data: [{ }],
            opeInfoCard: false,
            elem: { }
        }
    }
    closeInfoCard = ( ) => {
        this.setState({openInfoCard:false})
    }
    render( ) {
        const start = ( ) => { 
            axios({
                method: 'get',
                url: 'http://195.201.19.95:8080/search/'+this.props.search,
                headers: {},
                data: {search:this.props.search} 
            })
            .then((response) => {
                this.setState({data: response.data})
                console.log(response.data);
            })
            .catch((error) => {console.log(error);})
        }
        const openInfoCard = () =>{
            this.setState({
                opeInfoCard: true
            });
        }
        const infoCardHandler = (elem) =>{
            console.log("basildi");
            console.log(elem);
            const data = this.state.data;
            this.setState({
                elem: elem
            })
            console.log(this.state.elem);
            openInfoCard();
            
        }
        return  <div>
                    { this.state.opeInfoCard ? <InfoCard elem={this.state.elem}/> :<div className={classes.resultBox}>
                    <h1>Persons</h1>
                    <Element click={infoCardHandler} data={this.props.data}/>
                    
                    </div>}
                </div>
        }
    }
export default ResultPage;