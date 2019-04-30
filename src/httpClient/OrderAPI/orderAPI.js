import axiosInstance from '../api'

const ADDORDER_PATH='addorder'

export const addOrder = (restaurantId, customerId, totalPrice, status, address) => axiosInstance.post(ADDORDER_PATH, {restaurantId, customerId, totalPrice, status, address});

const ORDERS_PATH='orders/'
export const fetchOrdersByRestaurantId = (restaurantId) => axiosInstance.get(ORDERS_PATH+restaurantId, {restaurantId})

const LASTORDER_PATH='lastorder/'
export const fetchLastAddedOrderByCustomer = (customerId) => axiosInstance.get(LASTORDER_PATH+customerId, {customerId})

const UPDATE_ORDER_PATH = 'updateorder/'
export const updateOrder = (orderId, restaurantId, customerId, totalPrice, status, address) => axiosInstance.post(UPDATE_ORDER_PATH+orderId,
                             {orderId, restaurantId, customerId, totalPrice, status, address})