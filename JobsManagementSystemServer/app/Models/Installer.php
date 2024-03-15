<?php

namespace App\Models;

namespace App;

use Illuminate\Database\Eloquent\Model;

class Installer extends Model
{
    protected $table = 'installer';
    
    protected $fillable = [
        'name',
        'dob',
    ];
}