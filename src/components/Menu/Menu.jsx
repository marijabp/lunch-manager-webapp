import React, { Component, Fragment } from 'react';
import MenuCategory from '../MenuCategory';
import OrderDialog from '../OrderDialog';

const styles = {
  main: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    flexWrap: "wrap",

  }
}


class Menu extends Component {
  state = {
    orderDialogOpen: false,
    restaurantMenu: [],
  };
  toggleOrderDialog = (selectedFood) => {
    this.setState({ orderDialogOpen: !this.state.orderDialogOpen, selectedFood })
  }



  render() {
    const { changeBasketState, total, restaurantMenu } = this.props
    const { orderDialogOpen, selectedFood } = this.state
    return (
      <Fragment>
        <div style={styles.main}>

          <div>
            {restaurantMenu.map(category => {
              return <MenuCategory
                toggleOrderDialog={this.toggleOrderDialog}
                key={category.categoryId}
                category={category}
              />
            })
            }</div>
        </div>
        {orderDialogOpen &&
          <OrderDialog
            toggleOrderDialog={this.toggleOrderDialog}
            selectedFood={selectedFood}
            changeBasketState={changeBasketState}
            handleAddItem={this.props.handleAddItem}
            total={total} />
        }
      </Fragment>
    );
  }
}

export default Menu;
