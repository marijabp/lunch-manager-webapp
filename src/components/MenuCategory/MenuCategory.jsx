import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import FoodItem from '../FoodItem';

const styles = {
    foodNameText: {
        padding: "10px",
        fontSize:"30px", 
        maxWidth:"500px",
        fontFamily: "Comic Sans MS",
    },
    menuCategory: {
        backgroundColor: "rgb(161, 165, 170)", 
        flexFlow: "row wrap" ,
        maxWidth: "480px" ,
        justifyContent: "space-between" ,
        display: "flex" ,
        marginBottom:"20px",
        marginLeft: "5px",
        padding: "10px",
    },
    paper: {
        marginTop: "20px" ,
        maxWidth: "510px",
        padding: "5px",
        backgroundColor:"rgb(245, 245, 245)",
    }
}
  

class MenuCategory extends Component{
    render(){
        const {categoryName, foodList } = this.props.category;
        const {toggleOrderDialog } = this.props;
        
        return(
            
            <Fragment>
            <Paper style={styles.paper}>
            <div style={styles.foodNameText}> {categoryName} </div>
            <div style={styles.menuCategory}>
            

            {foodList.map((foods, i) => {
                return <FoodItem 
                foodName={foods.foodName}
                description={foods.description}
                options={foods.options}
                condiments={foods.condiments}
                toggleOrderDialog={toggleOrderDialog}
                key={'foodName'+i}/>
                
             })
            }
            
            </div> </Paper>
            </Fragment>
           
        );
    }
}


export default MenuCategory;