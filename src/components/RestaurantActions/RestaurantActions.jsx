import React, { Component } from 'react';
import AddingFood from '../AddingFood';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import { fetchCondimentsByRestaurantId } from '../../httpClient/CondimentAPI/condimentAPI';
import AddCondimentToFood from '../AddCondimentToFood';
import AddOptionToFood from '../AddOptionToFood/AddOptionToFood';
import DeleteFoodItem from '../DeleteFoodItem/DeleteFoodItem';
import Background from '../../images/restaurantactions1.jpg';
import { fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';
import PendingOrders from '../PendingOrders/PendingOrders';

const styles = {
    main: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover", //ili 100%
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    addFood: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",

    },
    addFoodAccessories: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },


}

class RestaurantActions extends Component {
    state = {
        categories: [],
        foods: [],
        condiments: [],
        chosenCategory: "",
    };
    async componentWillReceiveProps(nextProps) {
        if (nextProps.restaurant !== undefined) {
            var id = this.props.id;
            const condimentsByRestaurantId = await fetchCondimentsByRestaurantId(id);
            const foodByRestaurantId = await fetchFoodsByResraurantId(id)
            this.setState({
                categories: nextProps.restaurant.categories,
                condiments: condimentsByRestaurantId.data,
                foods: foodByRestaurantId.data
            })
        }
    }
    changeData = (chosenCategory) => {
        this.setState({ chosenCategory })
    }
    pushCategory = (category) => {
        this.setState({ categories: [...this.state.categories, category] });
    }
    pushFood = (food) => {
        this.setState({ foods: [...this.state.foods, food] })
    }
    handleDelete = (id) => {
        this.setState(data => ({
            foods: data.foods.filter(el => el.foodId !== id)
        }));
    }

    render() {
        const { id } = this.props
        const { categories, foods, condiments } = this.state

        return (
            <div style={styles.main}>
                <div style={styles.addFood}>
                    <AddingFood
                        id={id}
                        categories={categories}
                        pushFood={this.pushFood} />

                    <div style={styles.addFoodAccessories}>
                        <AddCondimentToFood
                            id={id}
                            foods={foods}
                            categories={this.props.restaurant.categories}
                            condiments={condiments} />

                        <AddOptionToFood
                            id={id}
                            foods={foods}
                            categories={this.props.restaurant.categories}
                            condiments={condiments} />
                    </div>
                </div>
                <div style={styles.addFood}>
                    <div><AddNewCategory
                        id={id}
                        pushCategory={this.pushCategory} />
                    </div>
                    <div><DeleteFoodItem
                        id={id}
                        foods={foods}
                        handleDelete={this.handleDelete}
                        categories={this.props.restaurant.categories} />
                    </div>
                </div>
                <div>
                    <PendingOrders id={id}></PendingOrders>
                </div>
            </div>

        );
    }
}

export default RestaurantActions;