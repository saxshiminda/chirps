import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chirp from '@/Components/Chirp';
import NavLink from '@/Components/NavLink';

export default function Profile({ auth, user, chirps }) {
    console.log(auth);
    return (
        <AuthenticatedLayout
            user={user}
            header={
                <>
                {auth.user.id !== user.id
                ?
                    <button
                        className="ml-2 text-red py-3 px-4 rounded">

                            <NavLink href={route('profile.index', auth.user.id)}>
                                My profile
                            </NavLink>
                    </button>
                :
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
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
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                        {chirps.map(chirp =>
                            <Chirp key={chirp.id} chirp={chirp} />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
