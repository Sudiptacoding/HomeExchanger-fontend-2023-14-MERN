import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';
import useAxios from './useAxios';

const useMyBookings = () => {
    const { user } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['mybookings'],
        queryFn: () =>
            axiosData.get(`/mybookings?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, data, refetch }
};

export default useMyBookings;