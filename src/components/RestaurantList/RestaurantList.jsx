import React, { Component } from "react";
import listOfRestaurants from '../../data/restaurants';
import { Link } from 'react-router-dom';

class RestaurantList extends Component {
    render() {
        return (
            <div>
                <Link to={'/profile'}><div>Profil </div> </Link>
                {listOfRestaurants.map((restaurant) => {
                    return <Link to={"Restaurants/" + restaurant.routeName} key={restaurant.routeName}><div>{restaurant.name}</div></Link>
                }
                )}
            </div>
        );

    }
}

export default RestaurantList;
