import axiosInstance from '../api'

const RESTAURANTS_PATH='restaurants/'

export const fetchRestaurants = () => axiosInstance.get(RESTAURANTS_PATH);

export const fetchRestaurantByRouteName = (routeName) => axiosInstance.get(RESTAURANTS_PATH+routeName, { routeName });

