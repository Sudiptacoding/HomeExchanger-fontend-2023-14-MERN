import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';



const usePaindingWork = () => {
    const { user } = useContext(UserProvider)
    const axiosData = useAxios();
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['paindingwork'],
        queryFn: () =>
            axiosData.get(`/paindingwork?email=${user?.email}`)
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, data, refetch }
};

export default usePaindingWork;