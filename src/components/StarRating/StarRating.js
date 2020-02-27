import StarRatings from 'react-star-ratings';
import React, {Component} from 'react';
 
class StarRating extends Component {
  constructor(props){
    super(props)
  }
    render() {
      console.log("from star"+ this.props.rating)
      return (
        <StarRatings
          rating={parseFloat(this.props.rating)}
          starRatedColor="rgb(234,186,41)"
          starSpacing = '1px'
          startHoverColor ='rgb(234, 187, 41)'
          starEmptyColor = '#DFDADA'
          starDimension = {this.props.starDimension} 
          changeRating={this.props.changeRating}
          numberOfStars={10}
          name='rating'
        />
      );
    }
}
 
 
export default StarRating;