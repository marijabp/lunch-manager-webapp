import React, { Component } from 'react';
import AddingFood from '../AddingFood';
import AddNewCategory from '../AddNewCategory/AddNewCategory';
import AddCondimentToFood from '../AddCondimentToFood';
import AddOptionToFood from '../AddOptionToFood/AddOptionToFood';
import DeleteFoodItem from '../DeleteFoodItem/DeleteFoodItem';
import Background from '../../images/restaurantactions1.jpg';
import { fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';
import PendingOrders from '../PendingOrders/PendingOrders';
import { Button, Paper } from '@material-ui/core';

const styles = {
    main: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover", //ili 100%
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
        fontFamily: "Comic Sans MS",
    },
    addFood: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",

    },
    otherOptions: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "20px",
        padding: "20px"
    },
    addFoodAccessories: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    paper: {
        padding: "15px",
        maxWidth: "500px",
        maxHeight: "500px",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "10px",
        opacity: "0.85",
    },
    highlihtText: {
        fontFamily: "Comic Sans MS",
        fontWeight: "bold"
    }

}

class RestaurantActions extends Component {
    state = {
        categories: [],
        foods: [],
        chosenCategory: "",
        showMenu: false,
        buttonLabel: "Prikaži menu restorana!",
    };
    async componentWillReceiveProps(nextProps) {
        if (nextProps.restaurant !== undefined) {
            var id = this.props.id;
            const foodByRestaurantId = await fetchFoodsByResraurantId(id)
            this.setState({
                categories: nextProps.restaurant.categories,
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
    handleClick = () => {
        this.forceUpdate();

        if (this.state.showMenu === false) {
            this.setState({ buttonLabel: "Sakrij menu restorana!" })
        }
        this.setState({ showMenu: !this.state.showMenu })
    }

    render() {
        const { id } = this.props
        const { categories, foods, showMenu, buttonLabel } = this.state

        return (
            <div style={styles.main}>
                <div style={styles.addFood}>
                    <div><AddNewCategory
                        id={id}
                        pushCategory={this.pushCategory} />
                    </div>
                    <AddingFood
                        id={id}
                        categories={categories}
                        pushFood={this.pushFood} />

                    <div style={styles.addFoodAccessories}>
                        <AddCondimentToFood
                            id={id}
                            foods={foods}
                            categories={this.props.restaurant.categories} />

                        <AddOptionToFood
                            id={id}
                            foods={foods}
                            categories={this.props.restaurant.categories} />
                    </div>
                    </div>
                    <div style={styles.otherOptions}>

                        <div><DeleteFoodItem
                            id={id}
                            foods={foods}
                            handleDelete={this.handleDelete}
                            categories={this.props.restaurant.categories} />
                        </div>

                        {categories!==undefined && categories.length > 0 ? <Button onClick={this.handleClick} variant="outlined" color="primary">{buttonLabel}</Button> : ""}
                        {showMenu === true && categories!==undefined && categories!==null ?

                            categories.map(category => {
                                return (
                                    <Paper key={category.categoryId} style={styles.paper}>
                                        <div >
                                            <div style={styles.highlihtText}>{category.name}</div>
                                            {category.foods.map(food => {
                                                return (
                                                    <Paper key={food.foodId} style={styles.paper}>
                                                        <div>
                                                            <div style={styles.highlihtText}>{food.name}</div>
                                                            <div>Opcije:
                                                            {food.options.map(option => {
                                                                return (
                                                                    <div key={option.optionId}>{option.name},cijena: {option.price} KM </div>
                                                                );
                                                            })}
                                                            </div>
                                                            <div>Prilozi:
                                                            {food.condiments.map(condiment => {
                                                                return (

                                                                    <div key={condiment.condimentId}>{condiment.name}</div>
                                                                );
                                                            })}
                                                            </div>
                                                        </div>
                                                    </Paper>);
                                            })} </div>

                                    </Paper>
                                );
                            })
                            : ""
                        }
                    </div>


                <div>
                    <PendingOrders id={id}></PendingOrders>
                </div>
            </div>

        );
    }
}

export default RestaurantActions;