import React, { Component } from 'react';
import Menu from '../Menu';
import OrderBasket from '../OrderBasket';
import CategoryList from '../CategoryList';
import Background from '../../images/restaurantmenu.jpg';
import { fetchRestaurants } from '../../httpClient/restaurantAPI';

const styles = {
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "100%",
        minHeight: "700px",
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
    changeBasketState = (chosenFood, price, orderItem) => {
        this.setState({
            chosenFood: [...this.state.chosenFood, chosenFood],
            price: [...this.state.price, price],
            orderedItems: [...this.state.orderedItems, orderItem]
        })
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
    handleRemoveFromOrderedItems = (food) => {
        this.setState({ orderedItems: food })
    }

    async componentDidMount() {
        const response = await fetchRestaurants();
        const chosenRestaurant = response.data.filter(restaurant => restaurant.routeName === this.props.match.params.routeName)
        this.setState({ restaurant: chosenRestaurant[0], restaurantMenu: chosenRestaurant[0].categories })
    }

    render() {
        const { id, user, address } = this.props
        const { chosenFood, totalPrice, restaurantMenu, restaurant, orderedItems } = this.state
    

        return (
            <div style={styles.main}>
                <div><CategoryList restaurantMenu={restaurantMenu} /></div>
                <div><Menu
                    handleAddItem={this.handleAddItem}
                    restaurantMenu={restaurantMenu}
                    total={this.total}
                    changeBasketState={this.changeBasketState} />
                </div>
                <div> <OrderBasket
                    user={user}
                    id={id}
                    restaurantId={restaurant.id}
                    handleRemoveItem={this.handleRemoveItem}
                    totalRemove={this.totalRemove}
                    chosenFood={chosenFood}
                    orderedItems={orderedItems}
                    totalPrice={totalPrice}
                    handleRemoveFromOrderedItems={this.handleRemoveFromOrderedItems}
                    address={address} />
                </div>
            </div>
        );

    }
}

export default Restaurant;