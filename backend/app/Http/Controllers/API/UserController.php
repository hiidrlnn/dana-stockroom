<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::select(
                'id',
                'nama',
                'email',
                'role',
                'status',
                'created_at',
                'updated_at'
            )
            ->latest()
            ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required',
            'status' => 'required'
        ]);

        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status
        ]);

        return response()->json($user, 201);
    }

    public function show($id)
    {
        return response()->json(
            User::findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'nama' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required',
            'status' => 'required',
        ]);

        $data = [
            'nama' => $request->nama,
            'email' => $request->email,
            'role' => $request->role,
            'status' => $request->status,
        ];

        if ($request->filled('password')) {
            $data['password'] =
                Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'message' => 'User berhasil diupdate'
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'Owner') {

            $ownerCount = User::where(
                'role',
                'Owner'
            )->count();

            if ($ownerCount <= 1) {
                return response()->json([
                    'message' =>
                    'Owner terakhir tidak boleh dihapus'
                ], 422);
            }
        }

        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }
}