<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Model;

class EC04 extends Model
{
    protected $table = 'EC04';

    protected $fillable = [
        'jobname',
        'joblead',
        'jobaddress',
        'measure',
        'job_starting_date',
        'epc_rating',
        'expected_ending_date',
        'assigned_engineer_id',
        'insulation_installer_id',
        'cost_of_job',
        'other_related_note',
        'job_evidence_url',
        'status',
        'data_match',
        'abs_field',
        'job_type',
    ];

    public function assignedEngineer()
    {
        return $this->belongsTo(Engineer::class, 'assigned_engineer_id');
    }

    public function insulationInstaller()
    {
        return $this->belongsTo(Installer::class, 'insulation_installer_id');
    }
}