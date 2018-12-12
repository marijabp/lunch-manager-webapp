import React, { Component, Fragment } from 'react';
import MenuCategory from '../MenuCategory';
import CategoryList from '../CategoryList';
import OrderBasket from '../OrderBasket';
import OrderDialog from '../OrderDialog';

const styles = {
  menuStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"

  }
}

const categories = [
  {
    categoryName: "Kuhano",
    foodList: [
      {
        foodName: "Gulas", description: "Paradajz sos, sunka, sir, gljive",
        options: [
          { price: 3 },
        ],
        condiments: [
          {}
        ]
      },
      {
        foodName: "Supa", description: "Paradajz sos, sunka, sir, gljive",
        options: [
          { price: 3 },
        ],
      },
      {
        foodName: "Corba", description: "Paradajz sos, sunka, sir, gljive",
        options: [
          { price: 3 },
        ],
      },
    ]
  },
  {
    categoryName: "Roštilj",
    foodList: [
      {
        foodName: "Cevapi", description: "Paradajz sos, sunka, sir, gljive",
        options: [
          { option: "mali", price: 9 },
          { option: "srednji", price: 3 },
          { option: "veliki", price: 4 },
        ],
      },
      {
        foodName: "Pljeskavica", description: " ",
        options: [
          { price: 3 },
        ],
      },
    ]
  },
  {
    categoryName: "Doručak",
    foodList: [
      {
        foodName: "Jaja", description: "Kuhana, pržena, ...",
        options: [
          { price: 3 },
        ],
      },
      {
        foodName: "Hrenovke", description: "Kuhane, pržene, ...",
        options: [
          { price: 3 },
        ],
      },
    ]
  },
]

class Menu extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
   // this.toggleOrderDialog = this.toggleOrderDialog.bind(this);
  }
  state = {
    orderDialogOpen: false,
  };
  toggleOrderDialog = (selectedFood) => {
    console.log(selectedFood)
    this.setState({ orderDialogOpen: !this.state.orderDialogOpen, selectedFood})
  }

  render() {

    console.log('sf', this.state.selectedFood)

    const categoryNames = categories.map(category => category.categoryName)

    const {orderDialogOpen}=this.state

    return (
      <Fragment>
        <div style={styles.menuStyle}>
          <div> <CategoryList categoryNames={categoryNames}></CategoryList></div>
          <div>
            {categories.map(category => {
              return <MenuCategory
                toggleOrderDialog={this.toggleOrderDialog}
                key={category.categoryName}
                category={category} />
            })
            }</div>
          <div> <OrderBasket /> </div>
        </div>
          { orderDialogOpen && <OrderDialog orderDialogOpen={orderDialogOpen} toggleOrderDialog={this.toggleOrderDialog} selectedFood={this.state.selectedFood}></OrderDialog> }
      </Fragment>
    );
  }
}

export default Menu;