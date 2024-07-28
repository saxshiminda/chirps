<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\FollowController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/setting', [SettingController::class, 'edit'])->name('setting.edit');
    Route::post('/setting', [SettingController::class, 'update'])->name('setting.update');
    Route::delete('/setting', [SettingController::class, 'destroy'])->name('setting.destroy');

    Route::get('/chirps', [ChirpController::class, 'index'])->name('chirps.index');
    Route::post('/chirps', [ChirpController::class, 'store'])->name('chirps.store');
    Route::put('/chirps/{chirp}', [ChirpController::class, 'update'])->name('chirps.update');
    Route::delete('/chirps/{chirp}', [ChirpController::class, 'destroy'])->name('chirps.destroy');

    Route::post('/comments', [CommentsController::class, 'store'])->name('comments.store');
    Route::put('/comments/{comment}', [CommentsController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{comment}', [CommentsController::class, 'destroy'])->name('comments.destroy');

    Route::get('/people', [FollowController::class, 'index'])->name('people.index');
    Route::post('/people', [FollowController::class, 'search'])->name('people.search');
    Route::post('/follow', [FollowController::class, 'follow'])->name('follow');

    Route::get('/profile{userId}', [ProfileController::class, 'index'])->name('profile.index');
});

Route::get('/notifications', function () {
    $activeNotifications = auth()->user()->unreadNotifications;

    // auth()->user()->unreadNotifications->markAsRead();

    return $activeNotifications;
})->middleware(['auth']);



// Route::group(['middleware' => 'auth'], function () {
//     Route::get('/{page}', [PageController::class, 'index'])->('route');
// });


require __DIR__.'/auth.php';
