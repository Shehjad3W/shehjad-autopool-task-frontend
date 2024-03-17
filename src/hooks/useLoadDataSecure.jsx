import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLoadDataSecure = (url, key) => {
    const axiosSecure = useAxiosSecure();

    const { data, refetch, isPending, error } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const res = await axiosSecure(url)
            return res.data
        }
    })
    return [data, refetch, isPending, error];
};

export default useLoadDataSecure;
