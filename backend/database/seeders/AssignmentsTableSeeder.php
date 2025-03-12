<?php

namespace Database\Seeders;

use App\Models\Assignment;
use Illuminate\Database\Seeder;

class AssignmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Assignment::create([
            'title' => 'Proyecto Final',
            'description' => 'Crear un sistema con Laravel 11',
            'due_date' => '2025-02-28 23:59:59',
            'subject_id' => 1,
        ]);
    }
}
