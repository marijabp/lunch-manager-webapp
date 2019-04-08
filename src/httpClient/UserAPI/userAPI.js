import axiosInstance from '../api';

const REGISTRATION_PATH = 'registration';

export const registration = (user) => axiosInstance.post(REGISTRATION_PATH, {user});

const LOGIN_PATH = 'login';

export const login = (email, password) => axiosInstance.post(LOGIN_PATH, {email, password});

const RESTAURANT='user'
export const fetchRestaurantByEmail = (email) => axiosInstance.get(RESTAURANT, { email });