<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\DivisionResource;
use App\Models\Division;

class DivisionController extends Controller
{
    private Division $model;
    public function __construct(Division $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $this->model->query();

        if ($name = $request->get('name')) {
            $query->where('name', 'like', "%{$name}%");
        }

        $records = $query->paginate(10);

        return $this->paginatedResponse(DivisionResource::collection($records), 200);
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
