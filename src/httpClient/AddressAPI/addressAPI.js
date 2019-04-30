import axiosInstance from '../api'

const ADDRESSES_PATH = 'addresses'
export const fetchAddresses = () => axiosInstance.get(ADDRESSES_PATH)

const ADD_ADDRESS_PATH = 'addaddress'
export const addAddress = (userId, name, number, city) => axiosInstance.post(ADD_ADDRESS_PATH, { userId, name, number, city })

const UPDATE_ADDRESS_PATH ='updateaddress/'
export const updateAddress = (id, userId, name, number, city) => axiosInstance.post (UPDATE_ADDRESS_PATH+id,  { id, userId, name, number, city } )