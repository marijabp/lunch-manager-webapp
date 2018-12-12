import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

const styles = {
    paper: {
        marginTop: "20px" ,
        elevation: 4,
        width: "510px",
        padding: "5px", 
    }
}

class OrderBasket extends Component {
    render(){
        return(
            <Paper style={styles.paper}>
            <div className="orderBasket"> Kupovna korpa </div>
            </Paper>
        )
    }
}

export default OrderBasket