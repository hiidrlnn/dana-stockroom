<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:Admin,Kasir,Owner'
        ]);

        // Kita mengisi 'name' dengan 'nama' untuk memenuhi kebutuhan sistem Laravel
        // Dan mengisi 'nama' untuk kebutuhan aplikasi custom kamu
        $user = User::create([
            'name'     => $request->nama, 
            'nama'     => $request->nama,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
            'status'   => 'Aktif',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Registrasi akun berhasil! Silakan login.',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'role' => 'required|string'
        ]);

        // Auth::attempt menggunakan email dan password untuk verifikasi
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Email atau password salah!'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        // Validasi Role
        if (strtolower($user->role) !== strtolower($request->role)) {
            return response()->json([
                'message' => 'Akses ditolak! Role akun tidak sesuai.'
            ], 403);
        }

        // Validasi Status Akun
        if ($user->status !== 'Aktif') {
            return response()->json([
                'message' => 'Akun Anda dinonaktifkan.'
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'nama' => $user->nama,
                'email' => $user->email,
                'role' => $user->role
            ]
        ]);
    }
}