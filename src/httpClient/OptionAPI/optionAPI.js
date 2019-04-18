import axiosInstance from '../api'

const ADDOPTION_PATH='addoption'

export const addOption = (foodId, name, price) => axiosInstance.post(ADDOPTION_PATH, {foodId, name, price});

