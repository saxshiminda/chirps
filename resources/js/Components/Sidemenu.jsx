
import { useEffect, useState } from 'react';

export default function Sidemenu({ authUser }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/friends').then(response => {
            setUsers(response.data);
        });
    } , []);

    return (
        <>
            <div className="flex-1 p-4 overflow-y-auto">
                {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2 my-2 bg-white rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img src={'storage/' + user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div className="ml-2">
                                <p className="text-sm font-semibold">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <button className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md">Unfollow</button>
                    </div>
                ))
                }
            </div>
        </>
    );
}
