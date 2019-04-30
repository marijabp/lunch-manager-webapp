import React, { Component } from 'react';

const styles = {
    fontStyle: "italic",
    color: "rgb(0, 0, 255)",
    backgroundColor: "inherit",
}
class StatusMessage extends Component {
    render(){
        return(
            <div style={styles}>{this.props.children}</div>
        );
    }
}

export default StatusMessage;