import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';

const styles = {
    button: {
        padding:20,
        fontSize:30,
    },
    foodNameText: {
        padding:20,
        fontSize:30,
    },
}

class LunchOrder extends Component {
  render() {

   /* const foodName=this.props.foodName
    const price=this.props.price
    const image=this.props.image */

    const { foodName, price, image }=this.props



    return (
        <Fragment>
        <div> {foodName} </div>
        <div style={{padding:5}}> {price} </div>
        <Button variant="contained" color="primary" style={styles.button} >
        Primary
        </Button>
        </Fragment>
    );
  }
}

export default LunchOrder;
