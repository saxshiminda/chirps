<?php

namespace App\Http\Controllers;

use App\Models\People;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('People/Index', [
            'Users' => User::where('id', '!=', auth()->id())->get(),
        ]);
    }

    /**
     * Search for people.
     */
    public function search(Request $request)
    {
        return Inertia::render('People/Index', [
            'Users' => User::where('name', 'LIKE', "%$request->name%")
                ->orWhere('email', 'LIKE', "%$request->name%")
                ->where('id', '!=', auth()->id())
                ->get(),
        ]);
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
    public function show(People $people)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(People $people)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, People $people)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(People $people)
    {
        //
    }
}
