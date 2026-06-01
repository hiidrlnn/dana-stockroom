<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:Admin,Kasir,Owner',
        ]);

        $user = User::create([
            'name' => $request->nama,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => 'Aktif',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Registrasi akun berhasil! Silakan login.',
            'user' => [
                'id' => $user->id,
                'nama' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'role' => 'required|in:Admin,Kasir,Owner',
        ]);

        // cek email + password
        if (!Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau password salah!'
            ], 401);
        }

        $user = User::where(
            'email',
            $request->email
        )->first();

        // cek role
        if (
            strtolower($user->role) !==
            strtolower($request->role)
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'Akses ditolak! Role akun tidak sesuai.'
            ], 403);
        }

        // cek status akun
        if ($user->status !== 'Aktif') {
            return response()->json([
                'status' => 'error',
                'message' => 'Akun Anda dinonaktifkan.'
            ], 403);
        }

        // buat token sanctum
        $token = $user
            ->createToken('auth_token')
            ->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',

            'user' => [
                'id' => $user->id,
                'nama' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ]
        ]);
    }
}