import React, { useState } from 'react';
import useLoadData from '../../hooks/useLoadData';

const Houses = () => {
    const [houses, isHousesLoading] = useLoadData('/houses', 'houses');

    return (
        <div className='mx-4 md:mx-5 lg:mx-auto max-w-7xl pb-8'>
            <div className='text-center py-8 flex justify-between items-center'>
                <h1 className='text-4xl font-bold'>Houses</h1>

                <div className="join">
                    <div>
                        <div>
                            <input className="input input-bordered join-item" placeholder="Search" />
                        </div>
                    </div>
                    <div className="indicator">
                        <button className="btn btn-primary join-item">Search</button>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    isHousesLoading ?
                        [1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="flex flex-col gap-4 ">
                                <div className="skeleton h-40 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                            </div>
                        ))
                        :
                        houses?.map(house => (
                            <div key={house._id} className="card card-compact bg-base-100 shadow-xl">
                                <figure><img className='h-72 w-full object-cover' src={house?.thumbnail} alt={house?.owner} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{house?.owner}</h2>
                                    <p>{house?.rent}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default Houses;