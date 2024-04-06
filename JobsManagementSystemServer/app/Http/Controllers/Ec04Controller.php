<?php

namespace App\Http\Controllers;
use App\Models\EC04;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class Ec04Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $EC04 = EC04::with(['assignedEngineer', 'insulationInstaller'])->get();
        return response()->json($EC04, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'jobname' => 'required|string|max:255',
            'joblead' => 'required|string|max:255',
            'jobaddress' => 'required|string|max:255',
            'measure' => 'required|string|max:255',
            'job_starting_date' => 'required|date',
            'epc_rating' => 'required|string|max:255',
            'expected_ending_date' => 'required|date',
            'assigned_engineer_id' => 'required|string|max:255',
            'insulation_installer_id' => 'required|string|max:255',
            'cost_of_job' => 'required|numeric',
            'data_match' => 'required|string|max:255',
            'other_related_note' => 'nullable|string|max:255',
            'abs_field' => 'nullable|string|max:255',
        ]);
        $EC04 = EC04::create($validatedData);
    
        return response()->json($EC04, 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $job = EC04::findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job deleted successfully'], 200);
    }
}
