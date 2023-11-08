import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-lac-nine.vercel.app',
    withCredentials: true
});

const useAxios = () => {
    return instance;
};

export default useAxios;