import React, { Component } from 'react';
import Menu from '../Menu';
import listOfRestaurants from '../../data/restaurants';
import OrderBasket from '../OrderBasket';

import CategoryList from '../CategoryList';
const styles = {
    all: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },

}
class Restaurant extends Component {
    state = {
        chosenFood: [],
        price: [],
        totalPrice: 0,
    };
    changeBasketState = (chosenFood, price) => {
        this.setState({ chosenFood: [...this.state.chosenFood, chosenFood], price: [...this.state.price, price] })
    };
    total = (a) => {
        let totalPrice = this.state.totalPrice;
        totalPrice += a;
        this.setState({ totalPrice })
    };
    totalRemove = (a) => {
        let totalPrice = this.state.totalPrice;
        totalPrice -= a;
        this.setState({ totalPrice })
    };
    handlechangeItem = (foods, prices) => {

        this.setState({ chosenFood: foods });
        this.setState({ price: prices });
    };
    handleRemoveItem = (food) => {
        this.setState({ chosenFood: food });
    };
    render() {

        const { chosenFood, totalPrice } = this.state
        const { restaurantName } = this.props.match.params;
        const restaurant = listOfRestaurants.filter(restaurant => restaurant.routeName === restaurantName)[0]
        const restaurantMenu = restaurant.menu
        return (
            <div style={styles.all}>
             <div className="categoryList"> <CategoryList restaurantMenu={restaurantMenu}></CategoryList></div>
                <div><Menu restaurantMenu={restaurantMenu} total={this.total} changeBasketState={this.changeBasketState}></Menu></div>
                <div>  <OrderBasket handleRemoveItem={this.handleRemoveItem} totalRemove={this.totalRemove} chosenFood={chosenFood} totalPrice={totalPrice}></OrderBasket></div>
            </div>
        );
        //const result = words.filter(word => word.length > 6);

    }
}

export default Restaurant;