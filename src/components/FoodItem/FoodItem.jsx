import React, { Component, Fragment } from 'react';
import { formatPrice } from '../../Utils/PriceUtil';

const styles = {
    foodItem: {
        backgroundColor: "rgb(161, 165, 170)",
        borderBottom: "1px solid gray",
        display: "flex",
        width: "200px",
        justifyContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "10px",
        cursor: "pointer",
        // fontFamily: "Comic Sans MS",
    },
    name: {
        display: "flex",
        justifyContent: "flex-start",
        fontSize: "18px",
        fontFamily: "Comic Sans MS",
        
    },
    price: {
        display: "flex",
        alignSelf: "flex-end",
        fontSize: "18px",

    },
    description: {
        fontSize: "16px",
        fontFamily: "Comic Sans MS",
        opacity: "0.5"
        
    }
}

class FoodItem extends Component {
    handleClick(food) {
        this.props.toggleOrderDialog(food)
    }

    getMinPrice() {
        const allPrices = this.props.options.map(option => option.price);
        const minPrice = Math.min(...allPrices)
        return Number(Math.round(minPrice+'e2')+'e-2').toFixed(2);
    }

    render() {
        const { foodName, options, description, condiments } = this.props
        const minPrice = this.getMinPrice()
        return (
            <Fragment>
                <div style={styles.foodItem} onClick={() => this.handleClick({ foodName, options, description, condiments, minPrice })}>
                    <div style={styles.name} > {foodName} </div>
                    <div style={styles.price}> {formatPrice(minPrice)} </div>
                    <div style={styles.description}> {description} </div>
                </div>
            </Fragment>
        );
    }
}

export default FoodItem;