<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | REGISTER
    |--------------------------------------------------------------------------
    | Digunakan untuk membuat akun baru.
    */
    public function register(Request $request)
    {
        $request->validate([
            'nama'     => 'required|string|max:255',
            'email'    => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'role'     => 'required|in:Admin,Kasir,Owner',
        ]);

        $user = User::create([
            'nama'     => $request->nama,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
            'status'   => 'Aktif',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Registrasi akun berhasil! Silakan login.',
            'user'    => [
                'id'     => $user->id,
                'nama'   => $user->nama,
                'email'  => $user->email,
                'role'   => $user->role,
                'status' => $user->status,
            ]
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    | Login user berdasarkan email, password dan role.
    */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
            'role'     => 'required|in:Admin,Kasir,Owner',
        ]);

        // Cek email dan password
        if (!Auth::attempt([
            'email'    => $request->email,
            'password' => $request->password,
        ])) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Email atau password salah!',
            ], 401);
        }

        $user = User::where('email', $request->email)->first();

        // Cek role
        if (strtolower($user->role) !== strtolower($request->role)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Akses ditolak! Role akun tidak sesuai.',
            ], 403);
        }

        // Cek status akun
        if ($user->status !== 'Aktif') {
            return response()->json([
                'status'  => 'error',
                'message' => 'Akun Anda dinonaktifkan.',
            ], 403);
        }

        // Hapus token lama agar tidak menumpuk
        $user->tokens()->delete();

        // Generate token baru
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status'       => 'success',
            'message'      => 'Login berhasil',
            'access_token' => $token,
            'token_type'   => 'Bearer',

            'user' => [
                'id'     => $user->id,
                'nama'   => $user->nama,
                'email'  => $user->email,
                'role'   => $user->role,
                'status' => $user->status,
            ]
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | PROFILE
    |--------------------------------------------------------------------------
    | Mengambil data user yang sedang login.
    */
    public function profile(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'user'   => $request->user(),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE PROFILE
    |--------------------------------------------------------------------------
    | Update nama dan email user.
    */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'nama'  => $request->nama,
            'email' => $request->email,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Profil berhasil diperbarui',
            'user'    => [
                'id'     => $user->id,
                'nama'   => $user->nama,
                'email'  => $user->email,
                'role'   => $user->role,
                'status' => $user->status,
            ]
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CHANGE PASSWORD
    |--------------------------------------------------------------------------
    | Mengubah password akun.
    */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password'      => 'required',
            'password'              => 'required|min:6|confirmed',
        ]);

        $user = $request->user();

        // Cek password lama
        if (!Hash::check(
            $request->current_password,
            $user->password
        )) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Password lama tidak sesuai',
            ], 422);
        }

        // Update password
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Password berhasil diubah',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    | Menghapus token yang sedang digunakan.
    */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Logout berhasil',
        ]);
    }
}