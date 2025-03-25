import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://home-exchanger-backend-2023-14-mern.vercel.app',
    withCredentials: true
});

const useAxios = () => {
    return instance;
};

export default useAxios;