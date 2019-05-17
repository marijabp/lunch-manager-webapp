import React, { Component } from 'react';
import { fetchOrdersByRestaurantId } from '../../httpClient/orderAPI';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { updateOrder } from '../../httpClient/orderAPI';
import { Divider } from '@material-ui/core';

const styles = {
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        fontFamily: "Comic Sans MS",
    },
    paper: {
        marginTop: "20px",
        maxWidth: "510px",
        padding: "20px",
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: "10px",
        align: "center",
        opacity: "0.8",
    },
    highlihtText: {
        fontWeight: "bold"
    }
}
class PendingOrders extends Component {
    state = {
        orders: [],
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.id !== undefined) {
            var id = this.props.id;
            const response = await fetchOrdersByRestaurantId(id)
            this.setState({ orders: response.data })
        }
    }
    async handleAccept(orderId) {
        try {
            var order = this.state.orders.filter(order => order.orderId === orderId)
            var status = "ACCEPTED";
            const response = await updateOrder(order[0].orderId, order[0].restaurantId, order[0].customerId, order[0].totalPrice,
                status, order[0].address)
            console.log(response)
            this.setState(data => ({
                orders: data.orders.filter(el => el.orderId !== orderId)
            }));
        }
        catch (e) {
            console.log(e)
        }
    }
    async handleDecline(orderId) {
        try {
            var order = this.state.orders.filter(order => order.orderId === orderId)
            var status = "DECLINED";
            const response = await updateOrder(order[0].orderId, order[0].restaurantId, order[0].customerId, order[0].totalPrice,
                status, order[0].address)
            console.log(response)
            this.setState(data => ({
                orders: data.orders.filter(el => el.orderId !== orderId)
            }));
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        const { orders } = this.state
        return (
            <div style={styles.main}>
                {orders.length > 0 ?
                    <div>
                        <p style={styles.highlihtText}>NARUDŽBE</p>
                        {orders.map(order => {
                            return (
                                <div key={order.orderId} >{order.status === "PENDING" ?
                                    <div>
                                        <Paper style={styles.paper}>
                                            <div>
                                                <div> orderId:  {order.orderId} </div>
                                                <Divider></Divider>
                                                
                                                {order.orderedItems.map(item => {
                                                    return (

                                                        <div key={item.orderItemId}>
                                                            <div style = {styles.highlihtText}> Naziv: {item.food.name}  </div>
                                                            <div> Opis: {item.food.description} </div>
                                                            <div> Količina: {item.quantity} </div>
                                                            <div> Opcija: {item.option.name !== null ? item.option.name : "Standard"}</div>
                                                            <div> Cijena jedne porcije: {item.option.price} </div>
                                                            <div> Izabrani prilog: {item.condiment !== null ? item.condiment.name : ""} </div>

                                                        </div>
                                                    );
                                                }
                                                )}
                                                <Divider></Divider>
                                                
                                                <div style = {styles.highlihtText}> Adresa dostave: {order.address} </div>
                                                <div style = {styles.highlihtText}> Ukupno: {order.totalPrice} KM </div>
                                                <Divider></Divider>
                                                <Button variant="outlined" onClick={() => this.handleAccept(order.orderId)} color="primary">Prihvati</Button>
                                                <Button variant="outlined" onClick={() => this.handleDecline(order.orderId)} color="secondary">Odbij</Button>
                                            </div>
                                        </Paper>
                                    </div>


                                    : ""}</div>
                            );
                        }
                        )}</div>
                    : ""}
            </div>
        );
    }
}

export default PendingOrders;