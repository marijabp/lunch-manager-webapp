import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CondimentOrder from '../CondimentOrder';
import PortionSize from '../PortionSIze';
import PortionQuantity from '../PortionQuantity';
import { formatPrice } from '../../Utils/PriceUtil';
import './OrderDialog.css';

const styles = {
  dialogTitle: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: "Comic Sans MS",
  }
}


export default class OrderDialog extends React.Component {
  state = {

  }

  handleClose = () => {
    this.props.toggleOrderDialog();
  }

  handleChangeOption = event => {
    this.setState({ chosenOption: event.target.value });
  };

  compareOptionsByPrice = (a, b) => {
    if (a.price > b.price) return 1;
    return -1;
  };

  getChosenPrice() {
    const chosenOption = this.state.chosenOption
    for (let i = 0; i < this.props.selectedFood.options.length; i++) {
      if (chosenOption === this.props.selectedFood.options[i].option) return this.props.selectedFood.options[i].price;
    }
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };



  render() {

    const { foodName, options, condiments, minPrice } = this.props.selectedFood
    const { chosenOption, anchorEl, selectedIndex = 0 } = this.state
    options.sort(this.compareOptionsByPrice)
    return (
      <div>
        <Dialog
          open
          onClose={this.props.toggleOrderDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"><div style={styles.dialogTitle}>{foodName} {formatPrice(this.getChosenPrice() * (selectedIndex + 1) || (minPrice * (selectedIndex + 1)))} </div></DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <div>{condiments.length > 0 && <CondimentOrder condiments={condiments}> </CondimentOrder>}</div>
            <div>{options.length > 1 && <PortionSize handleChangeOption={this.handleChangeOption} chosenOption={chosenOption} options={options}></PortionSize>}</div>
            <div><PortionQuantity anchorEl={anchorEl} selectedIndex={selectedIndex} handleClickListItem={this.handleClickListItem} handleMenuItemClick={this.handleMenuItemClick} /></div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
