<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'division' => [
                'id' => $this->division->id ?? null,
                'name' => $this->division->name ?? null,
            ],
            'name' => $this->name,
            'phone' => $this->phone,
            'position' => $this->position,
            'image' => $this->image,
        ];
    }
}
