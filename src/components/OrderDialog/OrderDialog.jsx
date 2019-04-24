import React from 'react';
import Button from '@material-ui/core/Button';
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
    orderOptions: {
      portionSize: "",
      portionQuantity: 1,
      condiments: [],
      chosenOption: "",
    }
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
      if (chosenOption === this.props.selectedFood.options[i].option)
        return Number(Math.round(this.props.selectedFood.options[i].price+'e'+2)+'e-'+2);
    }
    return Number(Math.round(this.props.selectedFood.minPrice+'e'+2)+'e-'+2);
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAdd = () => {
    const chosenFood = this.props.selectedFood.foodName
    var price = this.getChosenPrice() * (this.state.selectedIndex)
    var condiments=this.state.condiments
    var chosenOption=this.state.chosenOption
    var portionQuantity=this.state.portionQuantity
    var food={
      "name":chosenFood,
      "price":price,
      "condiments":condiments,
      "chosenOption":chosenOption,
      "quantity":portionQuantity,
    }
    this.props.handleAddItem(food)
    this.props.changeBasketState(chosenFood + ' - ' + price + '  KM', price)
    this.props.total(price);
    this.props.toggleOrderDialog();
  }
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
          <DialogTitle id="form-dialog-title"><div style={styles.dialogTitle}>{foodName}   {formatPrice((this.getChosenPrice() * (selectedIndex)) || (minPrice))} </div></DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <div>{condiments.length > 0 && <CondimentOrder condiments={condiments}> </CondimentOrder>}</div>
            <div>{options.length > 1 && <PortionSize handleChangeOption={this.handleChangeOption} chosenOption={chosenOption} options={options}></PortionSize>}</div>
            <div><PortionQuantity anchorEl={anchorEl} selectedIndex={selectedIndex} handleClickListItem={this.handleClickListItem} handleMenuItemClick={this.handleMenuItemClick} /></div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Izađi
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Dodaj u korpu
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
