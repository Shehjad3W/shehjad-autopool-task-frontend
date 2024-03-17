import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="hero min-h-screen bg-top" style={{ backgroundImage: 'url("https://source.unsplash.com/L5nd7rPrEic")' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="flex flex-col items-center">
                    <h1 className="mb-5 text-5xl font-bold max-w-lg">Discover Your Dream Home with Ease</h1>
                    <p className="mb-5 max-w-2xl">Streamlining the Rental Experience for Homeowners and Renters Alike. List, Search, and Book Your Perfect Home Hassle-Free!</p>
                    <Link to='/signup' className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;