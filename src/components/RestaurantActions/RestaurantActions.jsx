import React, { Component, Fragment } from 'react';
import AddingFood from '../AddingFood';
import AddingCondiment from '../AddingCondiment';

class RestaurantActions extends Component {

    render() {
        const { loginEmail } = this.props
        console.log(loginEmail)
        return (
            <Fragment>
                <div><AddingFood email={loginEmail}></AddingFood></div>
                <div><AddingCondiment></AddingCondiment></div>
            </Fragment>
        );
    }
}

export default RestaurantActions;