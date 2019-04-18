import axiosInstance from '../api'

const CONDIMENTS_PATH='addcondiment'

export const addCondiment = (foodId, restaurantId, name) => axiosInstance.post(CONDIMENTS_PATH, {foodId, restaurantId, name});

const C='condiments/'
export const fetchCondiments = () => axiosInstance.get(C);
export const fetchCondimentsByRestaurantId = (restaurantId) => axiosInstance.get(C+restaurantId, {restaurantId})

const CONDIMENT_PATH='condiment/'

export const updateCondimentInfo = (condimentId, foodId, restaurantId, name) => axiosInstance.put(CONDIMENT_PATH+condimentId, {condimentId, foodId, restaurantId, name})