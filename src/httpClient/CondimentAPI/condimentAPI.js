import axiosInstance from '../api'

const CONDIMENTS_PATH='addcondiment'

export const addCondiment = (foodId, name) => axiosInstance.post(CONDIMENTS_PATH, {foodId, name});

const C='condiments'
export const fetchCondiments = () => axiosInstance.get(C);