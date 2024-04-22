<?php

namespace App\Http\Controllers;
use App\Models\PrivateJob;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class PrivateJobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $PrivateJob = PrivateJob::with(['assignedEngineer', 'insulationInstaller'])->get();
        return response()->json($PrivateJob, 200);
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
            'job_type' => 'nullable|string|max:255',
            'labour_cost' => 'required|numeric',
            'material_cost' => 'required|numeric',
            'other_expense' => 'required|numeric',
        ]);
        $netProfit = ($request->labour_cost + $request->material_cost + $request->other_expense) - $request->cost_of_job;
    
        $validatedData['net_profit'] = $netProfit;
    
        $PrivateJob = PrivateJob::create($validatedData);
    
        return response()->json($PrivateJob, 201);
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
        try {
            $validatedData = $request->validate([
                'jobname' => 'nullable|string|max:255',
                'joblead' => 'nullable|string|max:255',
                'jobaddress' => 'nullable|string|max:255',
                'measure' => 'nullable|string|max:255',
                'job_starting_date' => 'nullable|date',
                'epc_rating' => 'nullable|string|max:255',
                'expected_ending_date' => 'nullable|date',
                'assigned_engineer_id' => 'nullable|string|max:255',
                'insulation_installer_id' => 'nullable|string|max:255',
                'cost_of_job' => 'nullable|numeric',
                'data_match' => 'nullable|string|max:255',
                'other_related_note' => 'nullable|string|max:255',
                'abs_field' => 'nullable|string|max:255',
                'job_type' => 'nullable|string|max:255',
            ]);
    
            $job = PrivateJob::findOrFail($id);
           
            $job->update($validatedData);
    
            return response()->json($job, 200);
        } catch (ValidationException $e) {
            // Validation failed
            return response()->json(['error' => $e->validator->errors()], 422);
        } catch (ModelNotFoundException $e) {
            // Model with given ID not found
            return response()->json(['error' => 'Resource not found'], 404);
        } catch (\Exception $e) {
            // Other unexpected errors
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $job = PrivateJob::findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job deleted successfully'], 200);
    }
}
