import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Userslist from '@/Components/Userslist';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ Users, Following, auth }) {
    var friends = Following.map( (f) => f.friend_id );

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('people.search'), { preserveScroll: true });
    }


    function sendFollowRequest(userId) {
        post(route('people.follow', {userId: userId} ));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">People</h2>}
        >
            <Head title="People" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form style={{ userSelect: 'none' }}  onSubmit={submit}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    ></input>
                    {/* Checkbox for followers */}
                    <PrimaryButton className="mt-4">Search</PrimaryButton>

                    {/* Checkbox for following */}
                    <label style={{ cursor: 'pointer' }} htmlFor="following" className="ml-2">Following</label>
                    <input
                        type="checkbox"
                        id="following"
                        name="following"
                        className="ml-2"
                        onChange={(e) => setData('following', e.target.checked)}
                    ></input>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {Users.map( (user, index) =>
                        <Userslist key={user.id} user={user} follow={sendFollowRequest} friends={friends}/>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
