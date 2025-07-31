<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSessionRequest extends FormRequest
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
            'username' => ['required', 'string', 'min:3', 'max:255'],
            'password' => ['required', 'string', 'min:8']
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
            // Username Messages
            'username.required' => 'The username or email is required.',
            'username.string' => 'The username or email must be text.',
            'username.min' => 'The username or email must be at least :min characters.',
            'username.max' => 'The username or email may not be greater than :max characters.',
            // 'username.email' => 'Please enter a valid email address for the username.', // If 'email' rule is added

            // Password Messages
            'password.required' => 'The password is required.',
            'password.string' => 'The password must be text.',
            'password.min' => 'The password must be at least :min characters.',
            // 'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.', // If regex rules are added
        ];
    }
}
