import { Link } from '@inertiajs/react'
import React from 'react'

export default function Footer() {
     return (
          <footer className="bg-orange-50 mt-20 shadow-2xl">
               <div className="container px-6 py-4 pt-6 mx-auto">
                    <div className="flex flex-col items-center text-center">
                         <Link href='/'>
                              <img className="w-auto h-7" src="/images/logo.png" alt="" />
                         </Link>

                         <p className="max-w-md mx-auto mt-4 text-gray-500 ">
                              Car And Go is a car rental service that provides a variety of cars for rent. We provide the best service for you to rent a car.
                         </p>


                    </div>

                    <hr className="my-4 border-gray-200" />

                    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                         <p className="text-sm text-gray-500">© Copyright 2024. All Rights Reserved.</p>

                         <div className="flex mt-3 -mx-2 sm:mt-0">
                              <p className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500" aria-label="Reddit"> Teams </p>

                              <p className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500" aria-label="Reddit"> Privacy </p>

                              <p className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500" aria-label="Reddit"> Cookies </p>
                         </div>
                    </div>
               </div>
          </footer>
     )
}
