import React from 'react';
import Hero from '../shared/Hero';
import Houses from '../shared/Houses';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import Login from './Login';

const Home = () => {
    const [user, refetchUser, isLoadingUser] = useLoadDataSecure('/users/me', 'User');
    console.log(user);


    return (
        <>
            {
                isLoadingUser ? <div>Loading...</div> : <div>{user?.fullName}</div>
            }
            {
                user ?
                    <Hero></Hero> :
                    <Login></Login>
            }
            {/* <Houses></Houses> */}
        </>
    );
};

export default Home;
