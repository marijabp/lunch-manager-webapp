import axiosInstance from '../api'

const ADD_ADDRESS_PATH = 'addaddress'

export const addAddress = (userId, name, number, city) => axiosInstance.post(ADD_ADDRESS_PATH, { userId, name, number, city })