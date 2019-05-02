import axiosInstance from '../api'

const CONDIMENTS_PATH='addcondiment'

export const addCondiment = (foodId, restaurantId, name) => axiosInstance.post(CONDIMENTS_PATH, {foodId, restaurantId, name});

const C='condiments/'
export const fetchCondiments = () => axiosInstance.get(C);
export const fetchCondimentsByFoodId = (foodId) => axiosInstance.get(C+foodId, {foodId})

const CONDIMENT_PATH='condiment/'

export const updateCondimentInfo = (condimentId, foodId, restaurantId, name) => axiosInstance.put(CONDIMENT_PATH+condimentId, {condimentId, foodId, restaurantId, name})