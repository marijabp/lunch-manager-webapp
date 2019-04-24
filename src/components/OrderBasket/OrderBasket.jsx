import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RemoveItemButton from '../RemoveItemButton';
import './OrderBasket.css'
import { addOrder } from '../../httpClient/OrderAPI/orderAPI';

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
    handleRemove(index) {
        const chosenFood = this.props.chosenFood
        var removed = chosenFood.splice(index, 1);
        let i1 = removed[0].indexOf('-') //index of -
        let i2 = removed[0].indexOf(' ', i1); // index of 1. space
        let i3 = removed[0].indexOf(' ', i2 + 1); // index of 2. space
        var number = parseInt(removed[0].slice(i2, i3)).toFixed(2) // izdvaja broj
        this.props.totalRemove(number)
        this.props.handleRemoveItem(chosenFood);

    };
    handleClick =async () => {
        try {
            var customerId=this.props.id;
            var restaurantId=this.props.restaurantId;
            var totalPrice=this.props.totalPrice;
            const status="PENDING";
            const response = await addOrder(restaurantId, customerId, totalPrice, status)
            console.log(response)

           
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { chosenFood, totalPrice } = this.props
        console.log(this.props.id)
        console.log(this.props.restaurantId)
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
                        <div>Ukupno: {totalPrice} KM</div>
                        <Button variant="outlined" onClick={this.handleClick} color="default">Naruči</Button>
                    </div>
                </Paper>
            </Fragment>
        );
    }
}

export default OrderBasket