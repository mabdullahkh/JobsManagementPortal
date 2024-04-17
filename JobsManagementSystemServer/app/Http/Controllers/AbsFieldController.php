<?php

namespace App\Http\Controllers;
use App\Models\AbsField;

use Illuminate\Http\Request;

class AbsFieldController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $absFields = AbsField::all();

        return response()->json($absFields);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }
}
