import React from 'react';
import Hero from '../shared/Hero';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import Login from './Login';

const Home = () => {
    const [user, refetchUser, isLoadingUser] = useLoadDataSecure('/users/me', 'User');
    console.log(user);

    if (isLoadingUser) {
        return
    }

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
        </>
    );
};

export default Home;
