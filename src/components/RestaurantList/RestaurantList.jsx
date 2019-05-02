import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Background from '../../images/restaurantlist.jpg';
import { fetchRestaurants } from '../../httpClient/RestaurantAPI/restaurantAPI';

const styles = {
    main: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
        maxWidth: "1800px",
        minHeight: "900px",
        justifyContent: "flex-start",
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
    state = {
        restaurants: [],
    }

    async componentDidMount() {
        const response = await fetchRestaurants();
        this.setState({ restaurants: response.data })
    }


    render() {
        const { restaurants } = this.state
        return (
            <div style={styles.main}>
                {restaurants.map((restaurant) => {
                    return (
                        restaurant.categories.length > 0 ?
                            <Fragment key={restaurant.id}>
                                <Paper style={styles.paper} >
                                    <div >
                                        <Link style={styles.link} to={"Restaurants/" + restaurant.routeName} >
                                            <div>{restaurant.name}</div>
                                        </Link>
                                        <div style={styles.text}>
                                            <div> {restaurant.description} </div>
                                            <div>{restaurant.workTime!==null ? "Radno vrijeme: "+restaurant.workTime : ""}</div>
                                            <div>{restaurant.address !== undefined && restaurant.address.length > 0 ? "Adresa:" + restaurant.address[0].name + ", " + restaurant.address[0].number + ", " + restaurant.address[0].city : ""}</div>
                                            <div>Kategorije: {restaurant.categories.map((category) => {
                                                return (
                                                    <div key={category.categoryId}> {category.name+ " "}  </div>
                                                )
                                            })} </div>

                                        </div>
                                    </div>
                                </Paper>
                            </Fragment>
                            : ""
                    );
                })}

            </div>

        );

    }
}

export default RestaurantList;
