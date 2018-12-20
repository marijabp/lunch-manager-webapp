import React, { Component, Fragment } from 'react';
import { formatPrice } from '../../Utils/PriceUtil';

const styles = {
    foodPriceText: {
        fontSize: 20,
        fontFamily: "Comic Sans MS",
    },
    foodItem: {
        backgroundColor: "rgb(245, 245, 245)",
        borderBottom: "1px solid gray",
        display: "flex",
        width: "200px",
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "10px",
        // fontFamily: "Comic Sans MS",
    },
    name: {
        display: "flex",
        justifyContent: "flex-start",
        fontSize: 17,
        fontFamily: "Comic Sans MS",
        cursor: "pointer",
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
    handleClick(food) {
        this.props.toggleOrderDialog(food)
    }

    getMinPrice() {
        const allPrices = this.props.options.map(option => option.price);
        const minPrice = Math.min(...allPrices)
        return minPrice
    }

    render() {
        const { foodName, options, description, condiments } = this.props
        const minPrice = this.getMinPrice()
        return (
            <Fragment>
                <div style={styles.foodItem}>
                    <div style={styles.name} onClick={() => this.handleClick({ foodName, options, description, condiments, minPrice })}> {foodName} </div>
                    <div style={styles.price}> {formatPrice(minPrice)} </div>
                    <div style={styles.description}> {description} </div>
                </div>
            </Fragment>
        );
    }
}

export default FoodItem;