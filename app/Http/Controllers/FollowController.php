<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Follow;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Follow/Index', [
            'Users' => User::where('id', '!=', auth()->id())->get(),
        ]);
    }

    /**
     * Search for people.
     */
    public function search(Request $request)
    {
        return Inertia::render('Follow/Index', [
            'Users' =>  User::where('id', '!=', auth()->id())
                ->where(function (Builder $query) use ($request) {
                    $query->where('name', 'LIKE', "%$request->name%")
                        ->orWhere('email', 'LIKE', "%$request->name%");
                })->get(),
        ]);
    }

    /**
     * Follow a user.
     */
    public function follow(Request $request){
        // check if the user is already following the person
        $people = Follow::where('user_id', auth()->id())
            ->where('friend_id', $request->userId)
            ->first();

        // if not, create a new record
        if (!$people) {
            Follow::create([
                'user_id' => auth()->id(),
                'friend_id' => $request->userId,
            ]);
        } else {
            // send a message if the user is already following the person
            return redirect()->back()->with('message', 'You are already following this person');
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Follow $people)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follow $people)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Follow $people)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Follow $people)
    {
        //
    }
}
