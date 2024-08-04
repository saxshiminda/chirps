import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Chirp from '@/Components/Chirp';
import Userslist from '@/Components/Userslist';
import NavLink from '@/Components/NavLink';
import DynamicModuleLoader, {setHelper} from '@/helper/DynamicModuleLoader';

export default function Profile({ auth, user, data }) {
    const { post } = useForm();
    const friendsIds = data.friends.map(friend => friend.id);

    const handleFollowToggle = (userId) => {
        post(route('follow', { userId: userId }));
    }

    const [dashboardData, setDashboardData] = useState({
        param: data.chirps,
        user: user,
        auth: auth,
        follow: handleFollowToggle,
        friendsIds
    });

    /**
     *
     */
    const [userDashboard, setUserDashboard] = useState({
        helper:'lists',
        module: 'Chirplist',
        data: dashboardData,
    });

    return (
        <AuthenticatedLayout
            user={user}
            auth={auth}
            header={
                <>
                {auth.user.id !== user.id
                ?
                    <h2>
                        <NavLink href={route('profile.index', auth.user.id)}>
                            My profile
                        </NavLink>
                    </h2>
                :
                    <h2 className="font-normal text-xl text-gray-800 leading-tight">Profile</h2>
                }
                </>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                {/* Crete container in the left side that containes the users data, avatar, name and email
                    and in the center dispaly the users chirps
                */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center">
                                <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={'storage/' + user.avatar}
                                    alt={user.name}
                                />
                                <div className="ml-4">
                                    <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                { auth.user.id !== user.id
                                ?
                                    <button
                                        onClick={ () => handleFollowToggle(user.id)}
                                        className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            {/* Send post request */}
                                        <NavLink style={{ color: 'white'}}>
                                            {data.following == null ? 'Follow' : 'Unfollow'}
                                        </NavLink>
                                    </button>
                                :
                                    <button
                                        className="ml-10 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                            {/* Send post request */}
                                        <NavLink style={{ color: 'white'}} href={route('setting.edit')}>
                                            Edit Profile
                                        </NavLink>
                                    </button>
                                }

                                <div className="ml-4">
                                    <p className="text-sm text-gray-600">Followers: {data.followers}</p>
                                </div>

                                {/* menu to see friends or chirps */}
                                <div
                                    onClick={() => {
                                        setUserDashboard({
                                            helper:'lists',
                                            module: 'Chirplist',
                                            data: {
                                                ...dashboardData,
                                                param: data.chirps,
                                            }
                                        });
                                    }}
                                    className="ml-4">
                                    <p>Chirps</p>
                                </div>

                                <div
                                    onClick={() => {
                                        setUserDashboard({
                                            helper:'lists',
                                            module: 'Userlist',
                                            data: {
                                                ...dashboardData,
                                                param: data.friends,
                                            }
                                        });

                                    }}
                                    className="ml-4">
                                    <p>Friends</p>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                        <DynamicModuleLoader key={user.id}
                            params={userDashboard}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
