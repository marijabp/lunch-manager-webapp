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
        foodName: "Gulaš", 
        description: "Paradajz sos, šunka, sir, gljive",
        options: [
          { price: 3 },
        ],
        condiments: []
      },
      {
        foodName: "Supa", 
        description: "Paradajz sos, šunka, sir, gljive",
        options: [
          { price: 3 },
        ],
        condiments: []
      },
      {
        foodName: "Čorba", 
        description: "Paradajz sos, šunka, sir, gljive",
        options: [
          { price: 3 },
        ],
        condiments: []
      },
    ]
  },
  {
    categoryName: "Roštilj",
    foodList: [
      {
        foodName: "Ćevapi", 
        description: "Paradajz sos, šunka, sir, gljive",
        options: [
          { option: "mali", price: 9 },
          { option: "srednji", price: 3 },
          { option: "veliki", price: 4 },
        ],
        condiments: [
          { condimentName: "Kečap " },
          { condimentName: "Senf " },
          { condimentName: "Mjonez " },
        ]
      },
      {
        foodName: "Pljeskavica", 
        description: "Paradajz sos, šunka, sir, gljive... Prilog po želji. ",
        options: [
          { price: 3 },
        ],
        condiments: [
          { condimentName: "Kečap " },
          { condimentName: "Senf " },
          { condimentName: "Majonez " },
          { condimentName: "Pomfrit" },
        ]
      },
    ]
  },
  {
    categoryName: "Doručak",
    foodList: [
      {
        foodName: "Jaja", 
        description: "Kuhana, pržena, ...",
        options: [
          { price: 3 },
        ],
        condiments: [
          { condimentName: "kečap" },
          { condimentName: "senf" },
          { condimentName: "majonez" },
          { condimentName: "tartar sos" },
        ],
      },
      {
        foodName: "Hrenovke", 
        description: "Kuhane, pržene, porcija od 300g + pogačice ...",
        options: [
          { price: 3 },
        ],
        condiments: [
          { condimentName: "senf" },
          { condimentName: "kečap" },
          { condimentName: "majonez" },
        ]
      },
    ]
  },
]

class Menu extends Component {
 /* constructor(props) {
    super(props);
    // Don't call this.setState() here!
   // this.toggleOrderDialog = this.toggleOrderDialog.bind(this);
  }*/
  state = {
    orderDialogOpen: false,
  };
  toggleOrderDialog = (selectedFood) => {
    this.setState({ orderDialogOpen: !this.state.orderDialogOpen, selectedFood})
  }

  render() {

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
          { orderDialogOpen && <OrderDialog toggleOrderDialog={this.toggleOrderDialog} selectedFood={this.state.selectedFood}></OrderDialog> }
      </Fragment>
    );
  }
}

export default Menu;