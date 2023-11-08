import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';


const useMyServices = () => {
    const { user } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['myServicesData'],
        queryFn: () =>
            axiosData.get(`/myservices?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, data, refetch }
};

export default useMyServices;