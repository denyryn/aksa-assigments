<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateEmployeeRequest;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Http\Resources\EmployeeResource;
use App\Http\Requests\StoreEmployeeRequest;

class EmployeeController extends Controller
{
    private Employee $model;
    public function __construct(Employee $model)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $this->model->query()->with('division');

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
                $q->orWhereHas('division', function ($subquery) use ($search) {
                    $subquery->where('name', 'like', "%{$search}%");
                });
            });
        }

        $records = $query->paginate(10);

        return $this->paginatedResponse(
            resource: EmployeeResource::collection($records),
            message: 'Success retrieving employees.',
            code: 200
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('public/employees');
        }

        $this->model->create($validated);

        return $this->successResponse(
            message: 'Employee created successfully.',
            code: 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = $this->model->with('division')->findOrFail($id);
        return $this->successResponse(
            data: new EmployeeResource($employee),
            message: 'Employee retrieved successfully.',
            code: 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, string $id)
    {
        $employee = $this->model->findOrFail($id);

        $validated = $request->validated();

        $employee->update($validated);

        return $this->successResponse(
            message: 'Employee updated successfully.',
            code: 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = $this->model->findOrFail($id);
        $employee->delete();

        return $this->successResponse(
            message: 'Employee deleted successfully.',
            code: 200
        );
    }
}
