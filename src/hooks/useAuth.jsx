import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';

const useAuth = async () => {
    const axiosSecure = useAxiosSecure();
    // return await axiosSecure.get('/users/me');
    // return res.data;

    const { isPending: isUserLoading, data: user, refetch: refetchUser } = useQuery({
        queryKey: ['User'],

        queryFn: async () => {
            const res = await axiosSecure('/users/me')
            // console.log(res.data);
            return res.data;
        }
    })
    // console.log(user);
    return [user, isUserLoading, refetchUser];


    // axiosSecure.get('/users/me')
    //     .then((res) => {
    //         console.log(res.data);
    //         localStorage.setItem('user', JSON.stringify(res.data));
    //     })
    //     .catch((err) => {
    //         console.log(err.response);
    //     });

    // async () => {
    //     const res = await axiosSecure.get('/users/me');
    //     console.log(res.data);
    //     localStorage.setItem('user', JSON.stringify(res.data));
    // }

    // return res;



    // console.log(user);
    // return res;
};

// export default useAuth;