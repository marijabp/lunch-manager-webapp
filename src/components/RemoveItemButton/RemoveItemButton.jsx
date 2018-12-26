import React from 'react';
import Button from '@material-ui/core/Button';

class RemoveItemButton extends React.Component {
    handleClick = () =>{
        this.props.handleRemove();
    }
    render() {
        return (
            <Button variant="outlined" color="secondary" onClick={this.handleClick} > x </Button>

        );
    }
}
export default RemoveItemButton;