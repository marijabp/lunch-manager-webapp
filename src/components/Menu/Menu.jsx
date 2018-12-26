import React, { Component, Fragment } from 'react';
import MenuCategory from '../MenuCategory';
import OrderDialog from '../OrderDialog';

const styles = {
  menuStyle: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
     flexWrap: "wrap",

  }
}


class Menu extends Component {
  state = {
    orderDialogOpen: false,
  };
  toggleOrderDialog = (selectedFood) => {
    this.setState({ orderDialogOpen: !this.state.orderDialogOpen, selectedFood })
  }

  render() {
    const { restaurantMenu, changeBasketState, total } = this.props
    const { orderDialogOpen, selectedFood } = this.state

    return (
      <Fragment>
        <div style={styles.menuStyle}>
         
          <div>
            {restaurantMenu.map(category => {
              return <MenuCategory
                toggleOrderDialog={this.toggleOrderDialog}
                key={category.categoryName}
                category={category} />
            })
            }</div>
        </div>
        {orderDialogOpen && <OrderDialog toggleOrderDialog={this.toggleOrderDialog} selectedFood={selectedFood} changeBasketState={changeBasketState} total={total}></OrderDialog>}
      </Fragment>
    );
  }
}

export default Menu;
