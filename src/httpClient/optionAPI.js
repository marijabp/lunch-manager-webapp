import axiosInstance from './api'

const ADDOPTION_PATH='addoption'
export const addOption = (foodId, name, price) => axiosInstance.post(ADDOPTION_PATH, {foodId, name, price});

const OPTIONS_PATH = 'options/'
export const fetchOptionsByFoodId = (foodId) => axiosInstance.get(OPTIONS_PATH+foodId, {foodId})