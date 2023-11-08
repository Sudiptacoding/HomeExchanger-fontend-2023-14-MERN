import React, { useContext, useEffect } from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-eovuj1l7a-sudiptacoding.vercel.app',
    withCredentials: true
});

const useAxios = () => {

    useEffect(() => {
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                console.log('no add')
            }
        });
    }, [])
    return instance;
};

export default useAxios;