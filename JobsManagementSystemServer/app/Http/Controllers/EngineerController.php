<?php

namespace App\Http\Controllers;
use App\Models\Engineer;

use Illuminate\Http\Request;

class EngineerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $engineers = Engineer::all();
        return response()->json($engineers, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'dob' => 'required|date',
        ]);

        $engineer = Engineer::create($validatedData);

        return response()->json($engineer, 201);
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
            $engineer = Engineer::findOrFail($id);
            $engineer->update($request->all());
            return response()->json(['message' => 'Engineer updated successfully', 'engineer' => $engineer], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update engineer', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $engineer = Engineer::findOrFail($id);
            $engineer->delete();
            return response()->json(['message' => 'Engineer deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting engineer'], 500);
        }
    }
}
