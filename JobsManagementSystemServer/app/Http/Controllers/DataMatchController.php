<?php

namespace App\Http\Controllers;

use App\Models\DataMatch;
use Illuminate\Http\Request;

class DataMatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataMatches = DataMatch::all();
        return response()->json($dataMatches);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(DataMatch $dataMatch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataMatch $dataMatch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DataMatch $dataMatch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataMatch $dataMatch)
    {
        //
    }
}
