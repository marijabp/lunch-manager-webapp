import React, { Component, Fragment } from 'react';
import OrderDialog from '../OrderDialog'

const styles = {
    foodPriceText:{
        fontSize: 20,
        fontFamily: "Comic Sans MS",
    },
    foodItem: {
        backgroundColor: "rgb(245, 245, 245)" ,
        borderBottom: "1px solid gray",
        display: "flex" ,
        width: "200px" ,
        justifyContent: "space-around" ,
        flexDirection: "row" ,
        flexWrap: "wrap",
        padding: "10px", 
       // fontFamily: "Comic Sans MS",
    },
    name: {
        display: "flex",
        justifyContent: "flex-start",
        fontSize: 17,
        fontFamily: "Comic Sans MS",
    },
    price: {
        display: "flex",
        alignSelf: "flex-end",
        fontSize: 17,
    },
    description: {
        fontSize: 13,
        fontFamily: "Comic Sans MS",
        fontStyle: "normal",
    }
}

class FoodItem extends Component {
    handleClick (foodName) {
        this.props.toggleOrderDialog(foodName)
    }

    getMinPrice(){
        const allPrices = this.props.options.map(option => option.price);
        const minPrice = Math.min(...allPrices)
        return minPrice
    }
    render(){
        const { foodName, options, description, toggleOrderDialog }=this.props
        return(
            <Fragment>
            <div style={styles.foodItem}>
            <div style={styles.name} onClick={() => this.handleClick({foodName, options, description})}> {foodName} </div>
            <div style={styles.price}> {this.getMinPrice()} KM </div>
            <div style={styles.description}> {description} </div>
            </div>
            </Fragment>
        );
    }
}

export default FoodItem;