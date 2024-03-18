import React from 'react';
import useLoadData from '../../hooks/useLoadData';
import UserTree from './UserTree';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const Hero = () => {
    const [users, refetchUsers, isLoadingUsers] = useLoadData('/users');
    const [user, refetchUser] = useLoadDataSecure('/users/me', 'User');
    const axiosSecure = useAxiosSecure();
    console.log(users);
    const handleEnterPool = () => {
        axiosSecure.put('/users/enterPool')
            .then(() => {
                toast.success('Pool Enter successful!');
                refetchUser();
            }).catch((error) => {
                console.error('Error Entering Pool:', error);
                toast.error('Error Entering Pool. Please try again.');
            });
    }

    return (
        <section className='w-full min-h-screen pt-8 flex justify-center items-center'>

            <div>
                {
                    user?.poolDetails ?
                        <UserTree></UserTree> :
                        <button onClick={handleEnterPool} className="btn btn-primary">Enter Pool</button>
                }

            </div>


        </section>
    );
};

export default Hero;