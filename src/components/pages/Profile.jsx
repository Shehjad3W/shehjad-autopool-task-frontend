import React from 'react';
import useLoadDataSecure from '../../hooks/useLoadDataSecure';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const [user, refetchUser, isLoadingUser] = useLoadDataSecure('/users/me', 'User');
    console.log(user);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);
        axiosSecure.put('/users/me', data)
            .then((res) => {
                console.log(res.data);
                toast.success('User Updated!');
                refetchUser();
                document.getElementById('my_modal_3').close();
            })
            .catch((err) => {
                console.error(err.response.data.message);
            });
        refetchUser(data);
    }

    return (
        <div className='mx-4 md:mx-5 lg:mx-auto max-w-7xl py-20'>

            <div className="card card-side bg-base-100 border-2">

                {/* <figure><img className='w-96' src={user?.image ? user?.image : 'https://source.unsplash.com/lw9LrnpUmWw'} alt={user?.fullName} /></figure> */}
                <div className="card-body">
                    <h2 className="card-title">Name: {user?.fullName}</h2>
                    <p>Email: {user?.email}</p>
                    <p>About: {user?.about}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-primary">Edit Information</button>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input name="fullName" defaultValue={user?.fullName} type="text" placeholder="Full Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" defaultValue={user?.email} type="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">About</span>
                            </label>
                            <textarea name="about" defaultValue={user?.about} className="textarea textarea-bordered h-24" placeholder="Write About You"></textarea>
                            {/* <input name="password" defaultValue={user?.password} type="password" placeholder="Password" className="input input-bordered" required /> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Confirm Update</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Profile;