<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Get all roles (Obtener todos los roles).
     */
    public function index()
    {
        return response()->json(Role::all(), 200);
    }
    /**
     * Create a new role (Crear un nuevo rol).
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name'
        ]);
        $role = Role::create($request->only(['name']));
        return response()->json([
            'message' => 'Role created successfully',
            'role' => $role
        ], 201);
    }
    /**
     * Assign a role to a user (Asignar rol a un usuario).
     */
    public function assignRole(Request $request, $userId)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);
        $user = User::findOrFail($userId);
        $user->roles()->attach($request->role_id);
        return response()->json(['message' => 'Role assigned successfully'], 200);
    }
    /**
     * Remove a role from a user (Eliminar rol de un usuario).
     */
    public function removeRole(Request $request, $userId)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);
        $user = User::findOrFail($userId);
        $user->roles()->detach($request->role_id);
        return response()->json(['message' => 'Role removed successfully'], 200);
    }
}
