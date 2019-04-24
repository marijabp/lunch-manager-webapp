import React, { Component } from 'react';
import Menu from '../Menu';
import OrderBasket from '../OrderBasket';
import CategoryList from '../CategoryList';
import Background from '../../images/restaurantmenu.jpg';
import { fetchRestaurants } from '../../httpClient/RestaurantAPI/restaurantAPI';

const styles = {
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "100%",
    },

}
class Restaurant extends Component {
    state = {
        chosenFood: [],
        price: [],
        chosenCondiments: [],
        totalPrice: 0,
        restaurant: [],
        restaurantMenu: [],
        orderedItems: [],
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
        this.setState({ chosenFood: foods, price: prices });
    };

    handleRemoveItem = (food) => {
        this.setState({ chosenFood: food });
    };
    handleAddItem = (item) => {
        this.setState({ orderedItems: [...this.state.orderedItems, item] })
    }
    handleDelete = (id) => {
        this.setState(data => ({
            orderedItems: data.orderedItems.filter(el => el.foodId != id )
        }));
    }

    async componentDidMount() {

        const response = await fetchRestaurants();
        const chosenRestaurant = response.data.filter(restaurant => restaurant.routeName === this.props.match.params.routeName)
        this.setState({ restaurant: chosenRestaurant[0], restaurantMenu: chosenRestaurant[0].categories })

    }

    render() {
        console.log(this.state.orderedItems)
        const { id } = this.props
        const { chosenFood, totalPrice, restaurantMenu, restaurant } = this.state

        return (
            <div style={styles.main}>
                <div><CategoryList restaurantMenu={restaurantMenu}> </CategoryList></div>
                <div><Menu handleAddItem={this.handleAddItem} restaurantMenu={restaurantMenu} total={this.total} changeBasketState={this.changeBasketState}></Menu></div>
                <div> <OrderBasket id={id} restaurantId={restaurant.id} handleRemoveItem={this.handleRemoveItem} totalRemove={this.totalRemove} chosenFood={chosenFood} totalPrice={totalPrice}></OrderBasket></div>
            </div>
        );

    }
}

export default Restaurant;