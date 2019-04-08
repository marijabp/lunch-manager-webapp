import axiosInstance from '../api'

const CATEGORIES_PATH='categories'

export const fetchCategoriesByRestaurantId = (restaurantId) => axiosInstance.get(CATEGORIES_PATH, {restaurantId});

const ADD_CATEGORY_PATH='addcategory'

export const addCategory = (restaurantId, name) => axiosInstance.post(ADD_CATEGORY_PATH, {restaurantId, name})