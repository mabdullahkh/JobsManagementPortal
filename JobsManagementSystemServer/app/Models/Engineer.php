<?php

// app/Engineer.php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Engineer extends Model
{
    protected $table = 'engineer';
    
    protected $fillable = [
        'name',
        'dob',
    ];
}