<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentRequest;
use App\Http\Requests\UpdateRentRequest;
use App\Models\Car;
use App\Models\Rent;

class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreRentRequest $request)
    {
        $car = Car::with('rents')->findOrFail($request->car_id);

        foreach ($car->rents as $rent) {
            if (
                $rent->status === 'rented' &&
                (
                    ($rent->start_date <= $request->start_date && $rent->end_date >= $request->start_date) ||
                    ($rent->start_date <= $request->end_date && $rent->end_date >= $request->end_date) ||
                    ($rent->start_date >= $request->start_date && $rent->end_date <= $request->end_date)
                )
            ) {
                return redirect()->back()->with('error', 'Car is already rented on this date.');
            }
        }

        Rent::create([
            'user_id' => auth()->id(),
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => 'rented',
            'total_price' => $request->total_price,
        ]);

        return redirect()->back()->with('success', 'Car rented successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Rent $rent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rent $rent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRentRequest $request, Rent $rent)
    {
        $rent->update([
            'status' => 'available',
            'total_price' => $request->total_price,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->back()->with('success', 'Rent updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rent $rent)
    {
        //
    }
}
