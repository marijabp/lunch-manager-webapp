import axiosInstance from '../api'

const RESTAURANTS_PATH='restaurants/'

export const fetchRestaurants = () => axiosInstance.get(RESTAURANTS_PATH);

export const fetchRestaurantByRouteName = (routeName) => axiosInstance.get(RESTAURANTS_PATH+routeName, { routeName });

 const RESTAURANT_PATH ='restaurant/'

export const fetchRestaurantById = (id) => axiosInstance.get(RESTAURANT_PATH+id, { id });

