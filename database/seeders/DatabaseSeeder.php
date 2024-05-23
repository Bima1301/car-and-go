<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'User',
            'email' => 'user@test.com',
            'address' => 'User Address',
            'phone' => '1234567890',
            'driver_license' => '1234567890',
            'password' => bcrypt('user123'),
        ]);

        //seed car with image
        //store image from /images/car.jpg to storage/app/public/images/car.jpg
        $imgPath = public_path('images/seed/car1.jpg');
        $imgFileFromPath = 'cars/' . basename($imgPath);
        copy($imgPath, storage_path('app/public/' . $imgFileFromPath));
        Car::factory()->create([
            'user_id' => 1,
            'brand' => 'Tesla',
            'slug' => 'Tesla-Model-S' . now()->timestamp . mt_rand(1000, 9999),
            'model' => 'Model S',
            'plate_number' => 'AG ' . mt_rand(1000, 9999) . ' RR',
            'price' => mt_rand(100000, 200000),
            'image' => $imgFileFromPath,
        ]);

        $imgPath = public_path('images/seed/car2.jpg');
        $imgFileFromPath = 'cars/' . basename($imgPath);
        copy($imgPath, storage_path('app/public/' . $imgFileFromPath));
        Car::factory()->create([
            'user_id' => 1,
            'brand' => 'Tesla',
            'slug' => 'Tesla-Model-X' . now()->timestamp . mt_rand(1000, 9999),
            'model' => 'Model X',
            'plate_number' => 'AG ' . mt_rand(2000, 9999) . ' RR',
            'price' => mt_rand(100000, 200000),
            'image' => $imgFileFromPath,
        ]);

        $imgPath = public_path('images/seed/car3.jpg');
        $imgFileFromPath = 'cars/' . basename($imgPath);
        copy($imgPath, storage_path('app/public/' . $imgFileFromPath));
        Car::factory()->create([
            'user_id' => 1,
            'brand' => 'Tesla',
            'slug' => 'Tesla-Model-Y' . now()->timestamp . mt_rand(1000, 9999),
            'model' => 'Model Y',
            'plate_number' => 'AG ' . mt_rand(3000, 9999) . ' RR',
            'price' => mt_rand(100000, 200000),
            'image' => $imgFileFromPath,
        ]);

        $imgPath = public_path('images/seed/car4.jpg');
        $imgFileFromPath = 'cars/' . basename($imgPath);
        copy($imgPath, storage_path('app/public/' . $imgFileFromPath));
        Car::factory()->create([
            'user_id' => 1,
            'brand' => 'Lamborghini',
            'slug' => 'Lamborghini-Hurachan-Strato' . now()->timestamp . mt_rand(1000, 9999),
            'model' => 'Hurachan Strato',
            'plate_number' => 'AG ' . mt_rand(4000, 9999) . ' RR',
            'price' => mt_rand(100000, 200000),
            'image' => $imgFileFromPath,
        ]);

        $imgPath = public_path('images/seed/car5.jpg');
        $imgFileFromPath = 'cars/' . basename($imgPath);
        copy($imgPath, storage_path('app/public/' . $imgFileFromPath));
        Car::factory()->create([
            'user_id' => 1,
            'brand' => 'Lamborghini',
            'slug' => 'Lamborghini-Revuelto' . now()->timestamp . mt_rand(1000, 9999),
            'model' => 'Revuelto',
            'plate_number' => 'AG ' . mt_rand(5000, 9999) . ' RR',
            'price' => mt_rand(100000, 200000),
            'image' => $imgFileFromPath,
        ]);

        $imgPath = public_path('images/seed/car6.jpg');
        $imgFileFromPath = 'cars/' . basename($imgPath);
        copy($imgPath, storage_path('app/public/' . $imgFileFromPath));
        Car::factory()->create([
            'user_id' => 1,
            'brand' => 'Lamborghini',
            'slug' => 'Lamborghini-Aventador' . now()->timestamp . mt_rand(1000, 9999),
            'model' => 'Aventador',
            'plate_number' => 'AG ' . mt_rand(6000, 9999) . ' RR',
            'price' => mt_rand(100000, 200000),
            'image' => $imgFileFromPath,
        ]);
        $imgPath = public_path('images/seed/car7.jpg');
        $imgFileFromPath = 'cars/' . basename($imgPath);
        copy($imgPath, storage_path('app/public/' . $imgFileFromPath));
        Car::factory()->create([
            'user_id' => 1,
            'brand' => 'Honda',
            'slug' => 'Honda-Civic-Type-R' . now()->timestamp . mt_rand(1000, 9999),
            'model' => 'Civic Type R',
            'plate_number' => 'AG ' . mt_rand(6000, 9999) . ' RR',
            'price' => mt_rand(100000, 200000),
            'image' => $imgFileFromPath,
        ]);
    }
}
