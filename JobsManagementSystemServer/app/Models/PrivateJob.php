<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Model;

class PrivateJob extends Model
{
    protected $table = 'private_jobs';

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
        'labour_cost',
        'material_cost',
        'other_expense',
        'net_profit',
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
