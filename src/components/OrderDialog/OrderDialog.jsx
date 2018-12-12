import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './OrderDialog.css';



export default class OrderDialog extends React.Component {

  handleClose = () => {
    console.log(this.props)
    this.props.toggleOrderDialog()
  }

  render() {

    const { foodName, description, options } = this.props.selectedFood
    return (
      <div>
        <Dialog
          open={this.props.orderDialogOpen}
          onClose={this.props.toggleOrderDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{foodName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {options.length>1 ? 'vise':'manje' }
            </DialogContentText>
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