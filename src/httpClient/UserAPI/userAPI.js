import axiosInstance from '../api';

const REGISTRATION_PATH = 'registration';
export const registration = (user, name, surname) => axiosInstance.post(REGISTRATION_PATH, { user, name, surname });

const LOGIN_PATH = 'login';
export const login = (email, password) => axiosInstance.post(LOGIN_PATH, { email, password });

const USER_PATH = 'user/'
export const fetchUser = (email) => axiosInstance.get(USER_PATH, { email });
export const fetchUserById = (id) => axiosInstance.get(USER_PATH + id, { id })

const CHANGEPASSWORD_PATH = 'changepassword/'
export const changePassword = (id, role, email, password, passwordConfirm) => axiosInstance.post(CHANGEPASSWORD_PATH + id, { id, role, email, password, passwordConfirm })