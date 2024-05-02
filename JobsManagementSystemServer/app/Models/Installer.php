<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Installer extends Model
{
    protected $table = 'installer';
    
    protected $fillable = [
        'name',
        'dob',
    ];
}