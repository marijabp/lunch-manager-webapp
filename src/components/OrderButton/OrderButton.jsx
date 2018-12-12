import React from 'react';
import Button from '@material-ui/core/Button';

class OrderButton extends React.Component {
    render() {
        return (
            <Button variant="contained" color="primary" >
                {this.props.children}
            </Button>

        );
    }
}
export default OrderButton;