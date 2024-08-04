
import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

import { FaCommentAlt } from "react-icons/fa";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';
dayjs.extend(relativeTime);

export default function Chirp({ data }) {
    // DATA INCLUDES
    // {
    //     param: data.chirps,
    //     user: user,
    //     auth: auth,
    //     follow: handleFollowToggle,
    //     friendsIds
    // }

    var chirp = data.param;

    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);
    const [commenting, setCommenting] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const { formData, setData, put, post, clearErrors, reset, errors } = useForm({
        message: chirp.message,
    });

    const { data: commentData, setData: setCommentData, post: postComment, reset: resetComment, errors: commentErrors } = useForm({
        chirp_id: chirp.id,
        message: '',
        user_id: auth.user.id
    });

    const update = (e) => {
        e.preventDefault();
        put(route('chirps.update', chirp.id), { onSuccess: () => setEditing(false) });
    };

    const comment = (e) => {
        e.preventDefault();
        postComment(route('comments.store'), { onSuccess: () => {
            setCommenting(false);
            resetComment();
        }});

    };

    return (
        // flex direction column
        <>
            {chirp.user
                &&
                <div className="p-6 flex flex-col space-y-2">
                    <div className="p-6 flex space-x-2">
                        <img src={'storage/' + chirp.user.avatar} className="w-8 h-8 rounded-full" alt="avatar" />

                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-gray-800">{chirp.user.name}</span>
                                    <small className="ml-2 text-sm text-gray-600">{dayjs(chirp.created_at).fromNow()}</small>
                                    { chirp.created_at !== chirp.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                                </div>
                                {chirp.user.id === auth.user.id &&
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                                Edit
                                            </button>
                                            <Dropdown.Link as="button" href={route('chirps.destroy', chirp.id)} method="delete">
                                                Delete
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                }
                            </div>
                            {editing
                                ? <form onSubmit={update}>
                                    <textarea value={formData.message} onChange={e => setData('message', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                                    <InputError message={errors.message} className="mt-2" />
                                    <div className="space-x-2">
                                        <PrimaryButton className="mt-4">Save</PrimaryButton>
                                        <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                                    </div>
                                </form>
                                : <p className="mt-4 text-lg text-gray-900">{chirp.message}</p>
                            }

                            {/* Comment icon */}
                            <div className="flex items-center mt-2">
                                <button className=" text-gray-600 hover:text-gray-800" onClick={() => {setShowComments(!showComments)}}>Comments</button>
                                <span className="ml-2 text-gray-600">{chirp.comments.length}</span>
                            </div>


                        </div>

                    </div>
                    {showComments &&
                        <>
                            <form onSubmit={comment}>
                                <textarea value={commentData.message} onChange={e => setCommentData('message', e.target.value)} className="h-15 float-left w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                                <InputError message={commentErrors.message} className="mt-2" />
                                <div className="space-x-2">
                                    <PrimaryButton className="mt-2 mb-2">Save</PrimaryButton>
                                </div>
                            </form>
                            { chirp.comments.map( (comment,index) =>
                                <div key={index}>
                                    { comment.user &&
                                        <div key={comment.id} className="p-6 bg-gray-100 rounded-lg">
                                            <div className="flex space-x-2">
                                                <img src={'storage/' + comment.user.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <span className="text-gray-800">{comment.user.name}</span>
                                                            <small className="ml-2 text-sm text-gray-600">{dayjs(comment.created_at).fromNow()}</small>
                                                            { comment.created_at !== comment.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                                                        </div>
                                                        {comment.user.id === auth.user.id &&
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <button>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                        </svg>
                                                                    </button>
                                                                </Dropdown.Trigger>
                                                                <Dropdown.Content>
                                                                    <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out">
                                                                        Edit
                                                                    </button>
                                                                    <Dropdown.Link as="button" href={route('comments.destroy', comment.id)} method="delete">
                                                                        Delete
                                                                    </Dropdown.Link>
                                                                </Dropdown.Content>
                                                            </Dropdown>
                                                        }
                                                    </div>
                                                    <p className="mt-4 text-lg text-gray-900">{comment.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )}
                        </>
                    }
                </div>
            }
        </>
    );
}
