<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Crear un usuario admin
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
        ]);
        // Obtener el rol admin de la base de datos
        $roleAdmin = Role::where('name', 'admin')->first();
        // Asignar el rol admin al usuario
        $admin->roles()->sync($roleAdmin->id);
        // Crear un usuario profesor
        $teacher = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('teacher123'),
        ]);
        // Obtener el rol teacher
        $roleTeacher = Role::where('name', 'teacher')->first();
        // Asignar el rol al usuario
        $teacher->roles()->sync($roleTeacher->id);
        // Crear un usuario estudiante
        $student = User::create([
            'name' => 'Jane Student',
            'email' => 'jane@example.com',
            'password' => Hash::make('student123'),
        ]);
        // Obtener el rol student
        $roleStudent = Role::where('name', 'student')->first();
        // Asignar el rol al usuario
        $student->roles()->sync($roleStudent->id);
    }
}
