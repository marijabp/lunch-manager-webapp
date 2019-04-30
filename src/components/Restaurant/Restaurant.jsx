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

    onChangeFavorite = (event) => {
        console.log(event.target.checked, event.target.value);
        if (event.target.checked === true) {
            this.setState({ condiments: [...this.state.condiments, event.target.value] })
        }
    }

    render() {
        console.log(this.state.orderedItems)
        const { id, user } = this.props
        const { chosenFood, totalPrice, restaurantMenu, restaurant, orderedItems } = this.state

        return (
            <div style={styles.main}>
                <div><CategoryList restaurantMenu={restaurantMenu} /></div>
                <div><Menu
                    handleAddCondiments={this.onChangeFavorite}
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
                    handleRemoveFromOrderedItems={this.handleRemoveFromOrderedItems} />
                </div>
            </div>
        );

    }
}

export default Restaurant;