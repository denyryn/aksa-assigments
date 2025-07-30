<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSessionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\UserResource;

class AuthenticatedSessionController extends Controller
{
    public function store(StoreSessionRequest $request)
    {
        $validated = $request->validated();

        if (!Auth::attempt($validated)) {
            throw ValidationException::withMessages([
                'username' => trans('auth.failed'),
            ]);
        }

        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->successResponse(
            data: [
                $user->role => new UserResource($user),
                'token' => $token,
            ],
            message: 'Login successfully.',
            code: 200
        );
    }

    public function destroy(Request $request)
    {
        if (!Auth::check()) {
            return $this->errorResponse(message: 'No active session to logout from.', code: 401);
        }

        $request->user()->currentAccessToken()->delete();
        return $this->successResponse(
            message: 'Logout successfully.',
            code: 204
        );
    }
}
