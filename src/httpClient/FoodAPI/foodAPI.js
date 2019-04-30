import axiosInstance from '../api'

const ADDFOOD_PATH='addfood'

export const addFood = (categoryId, name, description) => axiosInstance.post(ADDFOOD_PATH, {categoryId, name, description});

const FOODS_PATH='foods/'

export const fetchFoodsByResraurantId = (restaurantId) => axiosInstance.get(FOODS_PATH+restaurantId, {restaurantId})

const DELETEFOOD_PATH='deletefood/'
export const deleteFood = (id) => axiosInstance.post(DELETEFOOD_PATH+id, {id})

const FOOD_PATH= '/'
export const fethcFoodByFoodId = (foodId) => axiosInstance.get(FOOD_PATH+foodId, {foodId})
