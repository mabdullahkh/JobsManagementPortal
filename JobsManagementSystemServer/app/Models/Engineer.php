<?php

// app/Engineer.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Engineer extends Model
{
    protected $table = 'engineer';
    
    protected $fillable = [
        'name',
        'dob',
    ];
}