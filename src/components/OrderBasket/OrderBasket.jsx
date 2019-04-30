import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RemoveItemButton from '../RemoveItemButton';
import TextField from '@material-ui/core/TextField';
import './OrderBasket.css'
import { addOrder, fetchLastAddedOrderByCustomer } from '../../httpClient/OrderAPI/orderAPI';
import { addOrderItem } from '../../httpClient/OrderItemAPI/OrderItemAPI';
import { fetchFoodsByResraurantId } from '../../httpClient/FoodAPI/foodAPI';
import Divider from '@material-ui/core/Divider';
import { fetchOptionsByFoodId } from '../../httpClient/OptionAPI/optionAPI';

const styles = {
    paper: {
        marginTop: "20px",
        elevation: 4,
        width: "300px",
        padding: "5px",
        backgroundColor: "rgb(245, 245, 245)",
    },
    foods: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',

    },
    header: {
        fontWeight: "bold",
    }

}


class OrderBasket extends Component {
    state = {
        address: "",
        statusMessage: "",
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.user !== undefined) {
            if (nextProps.user.address.length > 0) {
                this.setState({ address: nextProps.user.address[0].name + " " + nextProps.user.address[0].number + ",  " + nextProps.user.address[0].city })
            }

        }
    }
    handleRemove(index) {
        const chosenFood = this.props.chosenFood;
        var removed = chosenFood.splice(index, 1);
        const orderedItems = this.props.orderedItems;
        var removedFromOrderedItems = orderedItems.splice(index, 1)
        let i1 = removed[0].indexOf('-') //index of -
        let i2 = removed[0].indexOf(' ', i1); // index of 1. space
        let i3 = removed[0].indexOf(' ', i2 + 1); // index of 2. space
        var number = parseInt(removed[0].slice(i2, i3)).toFixed(2) // izdvaja broj
        var formatNumber = Number(Math.round(number+'e2')+'e-2').toFixed(2)
        this.props.totalRemove(formatNumber)
        this.props.handleRemoveItem(chosenFood);
        this.props.handleRemoveFromOrderedItems(removedFromOrderedItems);

    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleClick = async () => {
        try {
            var customerId = this.props.id;
            var restaurantId = this.props.restaurantId;
            var totalPrice = this.props.totalPrice;
            const status = "PENDING";
            const response = await addOrder(restaurantId, customerId, totalPrice, status, this.state.address)
            const response1 = await fetchLastAddedOrderByCustomer(customerId)
            console.log(response1.data)
            const orderId = response1.data.orderId
            this.props.orderedItems.map(async orderItem => {
                var foodName = orderItem.name
                var optionName = orderItem.chosenOption
                var foods = await fetchFoodsByResraurantId(restaurantId);
                const food = foods.data.filter(food => foodName === food.name);
                var optionsByFoodId = await fetchOptionsByFoodId(food[0].foodId)
                const option = optionsByFoodId.data.filter (option => option.name === optionName)
                const response2 = await addOrderItem(orderId, food[0].foodId, option[0].optionId, null, orderItem.quantity)
                console.log(response2.status)
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { chosenFood, totalPrice } = this.props
        const { address } = this.state
        return (
            <Fragment>
                <Paper style={styles.paper}>
                    <div className="orderBasket">
                        <div style={styles.header}> Kupovna korpa </div>

                        <div>
                            {chosenFood.map((food, index) => (
                                <div style={styles.foods} key={index}>
                                    <div>{food} </div>
                                    <div><RemoveItemButton handleRemove={index => this.handleRemove(index)}> </RemoveItemButton></div>
                                </div>
                            ))}
                        </div>
                        <Divider></Divider>
                        <div>Ukupno: {totalPrice} KM</div>
                        <Divider></Divider>
                        <div>
                            <TextField
                                id="standard-name"
                                label="Adresa"
                                value={address}
                                onChange={this.handleChange('address')}
                                margin="normal"
                            />
                        </div>
                        <Button variant="outlined" onClick={this.handleClick} color="default">Naruči</Button>
                    </div>
                </Paper>
            </Fragment>
        );
    }
}

export default OrderBasket