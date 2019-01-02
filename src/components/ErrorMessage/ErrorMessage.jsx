import React, { Component } from 'react';

const styles = {
    fontStyle: "italic",
    color: "rgb(255, 0, 0)",
    backgroundColor: "inherit",
}
class ErrorMessage extends Component {
    render(){
        return(
            <div style={styles}>{this.props.children}</div>
        );
    }
}

export default ErrorMessage