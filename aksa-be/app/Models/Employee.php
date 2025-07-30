<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\UsesUuid;

class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\EmployeeFactory> */
    use HasFactory, UsesUuid;

    protected $fillable = [
        'division_id',
        'image',
        'name',
        'phone',
        'position',
    ];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}
