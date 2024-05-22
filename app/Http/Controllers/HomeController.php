<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataCollection;
use App\Models\Car;
use App\Models\Rent;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $startDateParam = $request->query('start_date') ?? now()->format('Y-m-d');
        $endDateParam = $request->query('end_date') ?? now()->addDay()->format('Y-m-d');
        $searchParam = $request->query('search');

        $query = Car::query();

        if ($searchParam) {
            $query->where(function ($query) use ($searchParam) {
                $query->where('brand', 'like', "%$searchParam%")
                    ->orWhere('model', 'like', "%$searchParam%")
                    ->orWhere('plate_number', 'like', "%$searchParam%");
            });
        }

        $query->whereDoesntHave('rents', function ($query) use ($startDateParam, $endDateParam) {
            $query->where('status', 'rented')
                ->where(function ($query) use ($startDateParam, $endDateParam) {
                    $query->where(function ($query) use ($startDateParam, $endDateParam) {
                        $query->where('start_date', '<=', $startDateParam)
                            ->where('end_date', '>=', $startDateParam);
                    })->orWhere(function ($query) use ($startDateParam, $endDateParam) {
                        $query->where('start_date', '<=', $endDateParam)
                            ->where('end_date', '>=', $endDateParam);
                    })->orWhere(function ($query) use ($startDateParam, $endDateParam) {
                        $query->where('start_date', '>=', $startDateParam)
                            ->where('end_date', '<=', $endDateParam);
                    });
                });
        });

        $cars = $query->latest()->paginate(6);

        return Inertia::render('Index/Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'cars' => new DataCollection($cars),
            'params' => [
                'search' => $searchParam,
                'start_date' => $startDateParam,
                'end_date' => $endDateParam,
            ],
        ]);
    }



    public function history()
    {
        $rents = Rent::where('user_id', auth()->id())
            ->with('car')
            ->latest()
            ->paginate(10);
        return Inertia::render('History/Index', [
            'rents' => new DataCollection($rents),
        ]);
    }
}
