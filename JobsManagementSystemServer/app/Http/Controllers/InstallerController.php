<?php

namespace App\Http\Controllers;
use App\Models\Installer;

use Illuminate\Http\Request;

class InstallerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $installers = Installer::all();
        return response()->json($installers, 200);
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

        $installer = Installer::create($validatedData);

        return response()->json($installer, 201);
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
            $installer = Installer::findOrFail($id);
            $installer->update($request->all());
            return response()->json(['message' => 'Installer updated successfully', 'installer' => $installer], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update installer', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $installer = Installer::findOrFail($id);
            $installer->delete();
            return response()->json(['message' => 'Installer deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting Installer'], 500);
        }
    }
}
