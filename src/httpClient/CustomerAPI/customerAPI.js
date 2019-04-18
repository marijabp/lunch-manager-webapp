import axiosInstance from '../api'

 const CUSTOMER_PATH ='customer/'

export const fetchCustomerById = (id) => axiosInstance.get(CUSTOMER_PATH+id, { id });

