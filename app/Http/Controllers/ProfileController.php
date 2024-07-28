<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Chirp;
use App\Models\User;
use App\Models\Follow;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function index(Request $request): Response
    {
        $authUser = auth()->user();
        $userId  = $request->route('userId') ?? $request->user()->id;

        if($userId != $authUser->id) {
            $following = Follow::where('user_id', $authUser->id)
                ->where('friend_id', $userId)
                ->first();
        } else {
            $following = false;
        }

        return Inertia::render('Profile/Index', [
            'user' => User::where('id', $userId)->firstOrFail(),
            'chirps' => Chirp::with('user:id,name,avatar')
                ->with('comments.user:id,name,avatar')
                ->where('user_id', $userId)
                ->latest()->get(),
            'following' => $following,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $request->user()->avatar = asset('storage/' . $request->user()->avatar);

        return Inertia::render('Setting/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // var_dump($request);

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            $request->user()->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
