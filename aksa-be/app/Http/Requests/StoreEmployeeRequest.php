<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'division_id' => ['required', 'exists:divisions,id'],
            'image' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'position' => ['required', 'string', 'max:100'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            // Division ID Messages
            'division_id.required' => 'Please select a division for this entry.',
            'division_id.exists' => 'The selected division does not exist.',

            // Image Messages
            'image.file' => 'The uploaded file must be a valid image.',
            'image.mimes' => 'Only JPEG, PNG, JPG, and GIF image formats are allowed for the image.',
            'image.max' => 'The image file size cannot exceed 2MB.',

            // Name Messages
            'name.required' => 'A name is required.',
            'name.string' => 'The name must be a valid text.',
            'name.max' => 'The name cannot be longer than 255 characters.',

            // Phone Messages
            'phone.string' => 'The phone number must be a valid text.',
            'phone.max' => 'The phone number cannot be longer than 20 characters.',

            // Position Messages
            'position.required' => 'A position is required.',
            'position.string' => 'The position must be a valid text.',
            'position.max' => 'The position cannot be longer than 100 characters.',
        ];
    }
}
