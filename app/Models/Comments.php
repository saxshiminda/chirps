<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Comments extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'chirp_id',
        'user_id'
        // add other fillable fields here if necessary
    ];


    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
