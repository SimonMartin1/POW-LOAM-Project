<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        // Roles
        $admin   = Role::firstOrCreate(['name' => 'admin']);
        $visitor = Role::firstOrCreate(['name' => 'visitor']);

        // Permisos 
        Permission::firstOrCreate(['name' => 'images.view']);
        Permission::firstOrCreate(['name' => 'images.create']);
        Permission::firstOrCreate(['name' => 'images.update']);
        Permission::firstOrCreate(['name' => 'images.delete']);
        Permission::firstOrCreate(['name' => 'images.comment']);

        // Asignar permisos a roles
        $admin->givePermissionTo(['images.view','images.create','images.update','images.delete']);
        $visitor->givePermissionTo(['images.view', 'images.comment']);

        // Usuario admin inicial
        $user = User::updateOrCreate(
            ['email' => 'admin@site.test'],
            ['name' => 'Administrador', 'password' => bcrypt('secret123')]
        );
        $user->assignRole('admin');
    }
}
