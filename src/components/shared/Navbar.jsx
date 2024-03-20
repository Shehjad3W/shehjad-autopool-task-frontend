import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import { useAuth } from '../../provider/AuthProvider';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [user, refetchUser] = useLoadDataSecure('/users/me', 'User');

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully');
        // refetchUser();
        navigate('/');
        window.location.reload(true);
    }

    const navLinks = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "Login",
            path: "/login"
        },
        {
            title: "Sign Up",
            path: "/signup"
        },
        // {
        //     title: "Profile",
        //     path: "/profile"
        // }
    ];

    const navLinksMarkup = navLinks.map((link) => (
        <li key={link.title}>
            <NavLink to={link.path} className="">{link.title}</NavLink>
        </li>
    ));

    return (
        <header className="navbar bg-base-100 fixed z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinksMarkup}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-black">Auto Pool</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinksMarkup}
                </ul>
            </div>


            <div className="navbar-end">
                {
                    user ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1 font-semibold text-lg">{user?.username}: <span className='font-normal text-sm'>{user?.email}</span></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to='/profile'>Profile</Link>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                        :
                        <NavLink to='/login' className="btn btn-primary">Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Navbar;