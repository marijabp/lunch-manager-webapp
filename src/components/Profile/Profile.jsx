import React, { Component } from 'react';
import './Profile.css';
import Background from '../../images/profile.jpg';
import Address from '../Address';
import ChangePassword from '../ChangePassword';


const styles = {
    main: {
        backgroundImage: "url(" + Background + ")",
        backgroundSize: "100%",
        display: "flex",
        backgroundRepeat: "repeat",
        // flexDirection: "row",
        justifyContent: "start",
        flexWrap: "wrap",
        maxWidth: "1440px",
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
    render() {
        const { emailLogIn } = this.props
        return (
            <div style={styles.main}>
                <ChangePassword emailLogIn={emailLogIn} />
                <Address />
            </div>


        );
    }
}

export default Profile;
