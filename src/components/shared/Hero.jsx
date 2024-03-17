import React from 'react';
import { Link } from 'react-router-dom';
import useLoadData from '../../hooks/useLoadData';
import UserTree from './UserTree';

const Hero = () => {
    const [users, refetchUsers, isLoadingUsers] = useLoadData('/users');
    console.log(users);
    return (
        <section className='w-full min-h-screen pt-8 flex justify-center items-center'>

            <div>
                {/* <div className="avatar placeholder ">
                    <div className="bg-base-200 text-gray-700 rounded-full w-12">
                        <span className='font-bold'>SY</span>
                    </div>
                </div> */}
                <UserTree></UserTree>

            </div>


        </section>
    );
};

export default Hero;