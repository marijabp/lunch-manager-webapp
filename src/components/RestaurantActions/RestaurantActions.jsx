import React, { Component, Fragment } from 'react';
import AddingFood from '../AddingFood';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import { fetchCondimentsByRestaurantId } from '../../httpClient/CondimentAPI/condimentAPI';
import AddCondimentToFood from '../AddCondimentToFood';
import AddOptionToFood from '../AddOptionToFood/AddOptionToFood';
import DeleteFoodItem from '../DeleteFoodItem/DeleteFoodItem';
import Background from '../../images/restaurantactions1.jpg';
import { fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';

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
            foods: data.foods.filter(el => el.foodId != id )
        }));
    }



    render() {
        const { loginEmail, id } = this.props
        const { categories, foods } = this.state

        return (
            <div style={styles.main}>
                <div style={styles.addFood}>
                    <AddingFood email={loginEmail} id={id} categories={categories} pushFood={this.pushFood}></AddingFood>

                    <div style={styles.addFoodAccessories}>
                        <AddCondimentToFood id={this.props.id} foods={foods} categories={this.props.restaurant.categories} condiments={this.state.condiments}></AddCondimentToFood>
                        <AddOptionToFood id={this.props.id} foods={foods} categories={this.props.restaurant.categories} condiments={this.state.condiments}></AddOptionToFood>
                    </div>
                </div>
                <div>
                    <div><AddNewCategory id={this.props.id} pushCategory={this.pushCategory}></AddNewCategory></div>
                    <div><DeleteFoodItem id={this.props.id} foods={foods} handleDelete={this.handleDelete} categories={this.props.restaurant.categories}></DeleteFoodItem></div>
                </div>
            </div>

        );
    }
}

export default RestaurantActions;