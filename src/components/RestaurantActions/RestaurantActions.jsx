import React, { Component, Fragment } from 'react';
import AddingFood from '../AddingFood';
import AddNewCondiment from '../AddNewCondiment';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import { fetchCondimentsByRestaurantId } from '../../httpClient/CondimentAPI/condimentAPI';
import AddCondimentToFood from '../AddCondimentToFood';
import AddOptionToFood from '../AddOptionToFood/AddOptionToFood';
import Background from '../../images/restaurantactions1.jpg';

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
        condiments: [],
        chosenCategory: "",
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurant !== undefined) {
            var id = this.props.id;
            const response = fetchCondimentsByRestaurantId(id);
            this.setState({
                categories: nextProps.restaurant.categories,
                condiments: response.data
            })
        }
    }
    changeData = (chosenCategory) => {
        this.setState({ chosenCategory })
    }
    pushCategory = (category) => {
        this.setState({ categories: [...this.state.categories, ...category] });
    }



    render() {
        const { loginEmail, id } = this.props
        const { categories } = this.state
        console.log(this.state.categories)

        return (
                <div style={styles.main}>
                    <div style={styles.addFood}>
                        <AddingFood email={loginEmail} id={id} categories={this.props.restaurant.categories} condiments={this.state.condiments}></AddingFood>

                        <div style={styles.addFoodAccessories}>
                            <AddCondimentToFood id={this.props.id} categories={this.props.restaurant.categories} condiments={this.state.condiments}></AddCondimentToFood>
                            <AddOptionToFood id={this.props.id} categories={this.props.restaurant.categories} condiments={this.state.condiments}></AddOptionToFood>
                        </div>
                    </div>
                    <AddNewCategory id={this.props.id} pushCategory={this.pushCategory}></AddNewCategory>

                    <AddNewCondiment id={this.props.id} restaurant={this.props.restaurant}></AddNewCondiment>
                </div>
           
        );
    }
}

export default RestaurantActions;