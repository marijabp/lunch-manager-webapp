import axiosInstance from '../api'

const ADDFOOD_PATH='addfood'

export const addFood = (categoryId, name, description) => axiosInstance.post(ADDFOOD_PATH, {categoryId, name, description});

const FOODS_PATH='foods/'

export const fetchFoodsByResraurantId = (restaurantId) => axiosInstance.get(FOODS_PATH+restaurantId, {restaurantId})
