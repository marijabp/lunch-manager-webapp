import React, { Component } from 'react';
import './Profile.css';
import Background from '../../images/profile.jpg';
import Address from '../Address';
import ChangePassword from '../ChangePassword';
import BasicUserData from '../BasicUserData';
import { fetchRestaurantById } from '../../httpClient/RestaurantAPI/restaurantAPI';


const styles = {
    main: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
        display: "flex",
        backgroundRepeat: "repeat",
        // flexDirection: "row",
        justifyContent: "start",
        flexWrap: "wrap",
        maxWidth: "1600px",
        height: "900px",
        fontFamily: "Courier New Courier monospace",
    },
    paper: {
        padding: "15px",
        maxWidth: "300px",
        maxHeight: "300px",
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        backgroundColor: "rgb(245, 245, 245)",
    }
}

class Profile extends Component {
    state = {
        user: [],
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.user !== undefined) {
            var userId=this.props.id
            if (this.props.role === 'Restaurant') {
                const response =await fetchRestaurantById(userId)
                this.setState({ user: response.data })
            }
            else {
                var user = {
                    "name": nextProps.user.name,
                    "surrname": nextProps.user.surrname,
                }
                this.setState({ user: user })
            }
        }
    }
    changeData = (newData) => {
        this.setState({ user: newData })
    }


    render() {
        const { loginEmail, id, role } = this.props
        const { user } = this.state
        console.log(this.props.user)
        return (
            <div style={styles.main}>
                <ChangePassword loginEmail={loginEmail} />
                <Address id={id} user={this.props.user}/>
                <BasicUserData id={id} role={role} changeData={this.changeData} user={this.props.user}></BasicUserData>
            </div>


        );
    }
}

export default Profile;
