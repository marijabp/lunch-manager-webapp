import axiosInstance from '../api'

const ADDORDER_PATH='addorder'

export const addOrder = (restaurantId, customerId, totalPrice, status) => axiosInstance.post(ADDORDER_PATH, {restaurantId, customerId, totalPrice, status});

