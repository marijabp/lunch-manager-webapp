import React, { Component } from 'react';
import Menu from '../Menu';
import OrderBasket from '../OrderBasket';
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
        totalPrice: 0,
        restaurant: [],
        restaurantMenu:[]
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

    async componentDidMount() {

      /*  const response = await fetchRestaurantByRouteName(toString(this.props.match.params.routeName).toLowerCase);
        console.log(response.data);
        this.setState({ restaurant: response.data })*/
        const response = await fetchRestaurants();
        const chosenRestaurant=response.data.filter(restaurant => restaurant.routeName===this.props.match.params.routeName)
        this.setState({restaurant : chosenRestaurant, restaurantMenu: chosenRestaurant[0].categories})

    }

    render() {

        const { chosenFood, totalPrice, restaurantMenu } = this.state
        console.log(restaurantMenu)

        return (
            <div style={styles.main}>
                
                <div><Menu restaurantMenu={restaurantMenu} total={this.total} changeBasketState={this.changeBasketState}></Menu></div>
                 <div>  <OrderBasket handleRemoveItem={this.handleRemoveItem} totalRemove={this.totalRemove} chosenFood={chosenFood} totalPrice={totalPrice}></OrderBasket></div>
            </div>
        );
        //const result = words.filter(word => word.length > 6);

    }
}

export default Restaurant;