import React, { useContext, useEffect } from 'react';
import { UserProvider } from '../context/AuthContext';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-eovuj1l7a-sudiptacoding.vercel.app',
    withCredentials: true
});

const useAxios = () => {
    const { logOut } = useContext(UserProvider)
    useEffect(() => {
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
            }
        });
    }, [])
    return instance;
};

export default useAxios;