import React, { Component } from 'react';
import './Profile.css';
import Background from '../../images/profile.jpg';
import Address from '../Address';
import ChangePassword from '../ChangePassword';
import BasicUserData from '../BasicUserData';


const styles = {
    main: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "cover",
        display: "flex",
        backgroundRepeat: "repeat",
        // flexDirection: "row",
        justifyContent: "center",
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
    changeData = (newData) => {
        this.setState({ user: newData })
    }

    render() {
        const { id, role, user, loginEmail, changeAddress } = this.props
        return (
            <div style={styles.main}>
                <ChangePassword
                    id={id}
                    loginEmail={loginEmail}
                    role={role} />
                <Address
                    id={id}
                    user={user}
                    changeAddress={changeAddress} />
                <BasicUserData
                    id={id}
                    role={role}
                    user={user} />
            </div>


        );
    }
}

export default Profile;
