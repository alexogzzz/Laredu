<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Eliminar primero la tabla pivote para evitar conflictos de claves foráneas
        DB::table('course_user')->delete();
        DB::table('courses')->delete();

        // Opcional: Reiniciar el ID autoincremental
        DB::statement("ALTER TABLE courses AUTO_INCREMENT = 1;");

        // Insertar cursos
        Course::create([
            'name' => 'Curso de Laravel',
            'description' => 'Aprendiendo Laravel 11',
        ]);

        Course::create([
            'name' => 'Curso de React',
            'description' => 'Introducción a React 19',
        ]);

        Course::create([
            'name' => 'Curso de PHP Básico',
            'description' => 'Fundamentos de PHP',
        ]);
    }
}
