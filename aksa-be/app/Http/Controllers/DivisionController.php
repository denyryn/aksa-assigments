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

        return $this->paginatedResponse(
            resource: DivisionResource::collection($records),
            message: 'Success retrieving divisions.',
            code: 200,
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $this->model->create($validated);

        return $this->successResponse(
            message: 'Division created successfully.',
            code: 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $division = $this->model->findOrFail($id);
        return $this->successResponse(
            data: new DivisionResource($division),
            message: 'Division retrieved successfully.',
            code: 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $record = $this->model->findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $record->update($validated);

        return $this->successResponse(
            message: 'Division updated successfully.',
            code: 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $record = $this->model->findOrFail($id);
        $record->delete();

        return $this->successResponse(
            message: 'Division deleted successfully.',
            code: 200
        );
    }
}
