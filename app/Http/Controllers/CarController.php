<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Http\Resources\DataCollection;
use App\Models\Car;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function garage()
    {
        $searchParams = request()->query('search');

        $query = Car::query();

        $query->where('user_id', auth()->id());

        if ($searchParams) {
            $query->where('brand', 'LIKE', '%' . $searchParams . '%')
                ->orWhere('model', 'LIKE', '%' . $searchParams . '%')
                ->orWhere('plate_number', 'LIKE', '%' . $searchParams . '%');
        }

        $cars = $query->latest()->paginate(10);


        return Inertia::render('Auth/Garage/Index', [
            'cars' => new DataCollection($cars),
            'searchParams' => $searchParams,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCarRequest $request)
    {

        $request->user()->cars()->create([
            'brand' => $request->brand,
            'model' => $request->model,
            'plate_number' => $request->plate_number,
            'image' => $request->file('image')->store('cars', 'public'),
            'price' => $request->price,
        ]);


        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarRequest $request, Car $car)
    {
        $car->update([
            'brand' => $request->brand,
            'model' => $request->model,
            'plate_number' => $request->plate_number,
            'price' => $request->price,
            'image' => $request->file('image') ? $request->file('image')->store('cars', 'public') : $car->image,
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        if (Storage::disk('public')->exists($car->image)) {
            Storage::disk('public')->delete($car->image);
        }
        $car->delete();

        return redirect()->back();
    }
}
