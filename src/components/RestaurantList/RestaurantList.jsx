import React, { Component, Fragment } from "react";
import listOfRestaurants from '../../data/restaurants';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Background from '../../images/restaurantlist.jpg';

const styles = {
    main: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
        maxWidth: "1500px",
    },
    paper: {
        padding: "15px",
        maxWidth: "500px",
        maxHeight: "500px",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        backgroundColor: "rgb(245, 245, 245)",
    },
    link: {
        fontSize: "25px",
        fontFamily: "San Francisco",
        color: "black",
        fontWight: "bold",
    },
    text: {
        fontFamily: "San Francisco",
        color: "black",
        fontSize: "18px",
    },

}

class RestaurantList extends Component {
    render() {
        return (
            <div style={styles.main}>
                {listOfRestaurants.map((restaurant) => {
                    return (
                        <Fragment key={restaurant.routeName}>
                            <Paper style={styles.paper} >
                                <div >
                                    <Link style={styles.link} to={"Restaurants/" + restaurant.routeName} >
                                        <div>{restaurant.name}</div>
                                    </Link>
                                    <div style={styles.text}>
                                        <div> {restaurant.description} </div>
                                        <div>{restaurant.workTime}</div>
                                        <div>{restaurant.address}</div>
                                    </div>
                                </div>
                            </Paper>
                        </Fragment>);
                })}
            </div>

        );

    }
}

export default RestaurantList;
