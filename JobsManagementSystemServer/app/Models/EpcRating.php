<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpcRating extends Model
{
    protected $table = 'epc_ratings';

    protected $fillable = [
        'name',
    ];
}
