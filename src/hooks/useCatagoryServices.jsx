import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useCatagoryServices = () => {
    const axiosData = useAxios();
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['allServicesData'],
        queryFn: () =>
            axiosData.get('/services')
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, data, refetch }
};

export default useCatagoryServices;