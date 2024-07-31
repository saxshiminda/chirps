import React from 'react';
import NavLink from '@/Components/NavLink';

export default function Userslist({ user, follow, friends }) {

    return (
        <div className="p-4">
            <div className="flex items-center">
                <img src={'storage/' + user.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
                <div className="ml-4">
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>

                    <div className="mt-4">
                        <button
                            onClick={() => {follow(user.id)} }
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <NavLink style={{ color: 'white'}}>
                                {friends.includes(user.id) ? 'Unfollow' : 'Follow'}
                            </NavLink>
                        </button>

                        {/* Not in use yet */}
                        <button
                            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">

                            <NavLink href={route('profile.index', {userId: user.id})} active={route().current('profile.index')} style={{ color: 'white'}}>
                                Profile
                            </NavLink>
                        </button>

                        <button className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled cursor-not-allowed">
                            Block
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}
