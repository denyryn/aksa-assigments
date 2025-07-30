<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Http\Resources\EmployeeResource;

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

        return $this->paginatedResponse(EmployeeResource::collection($records));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'division_id' => ['required', 'exists:divisions,id'],
            'image' => ['nullable', 'string'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'position' => ['required', 'string', 'max:100'],
        ]);

        $employee = Employee::create($validated);

        return $this->successResponse(message: 'Employee created successfully.', code: 201);
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
        $employee = $this->model->findOrFail($id);

        $validated = $request->validate([
            'division_id' => ['sometimes', 'exists:divisions,id'],
            'image' => ['nullable', 'string'],
            'name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'position' => ['sometimes', 'string', 'max:100'],
        ]);

        $employee->update($validated);

        return $this->successResponse(
            message: 'Employee updated successfully.'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = $this->model->findOrFail($id);
        $employee->delete();

        return $this->successResponse(message: 'Employee deleted successfully.');
    }
}
