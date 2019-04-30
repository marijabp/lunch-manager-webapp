import axiosInstance from '../api'

 const CUSTOMER_PATH ='customer/'
export const fetchCustomerById = (id) => axiosInstance.get(CUSTOMER_PATH+id, { id });

const UPDATE_CUSTOMER_PATH = 'updatecustomer/'
export const updateCustomer = (id, name, surname) => axiosInstance.post(UPDATE_CUSTOMER_PATH+id, {id, name, surname})

