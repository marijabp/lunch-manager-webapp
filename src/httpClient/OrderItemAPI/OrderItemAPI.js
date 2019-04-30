import axiosInstance from '../api'

const ADDORDERITEM_PATH='addorderitem'
export const addOrderItem = (orderId, foodId, orderItemOptionId, orderItemCondimentId, quantity) => axiosInstance.post(ADDORDERITEM_PATH, {orderId, foodId, orderItemOptionId, orderItemCondimentId, quantity});
