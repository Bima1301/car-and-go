import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function History() {
     return (
          <Guest>
               <Head title='Histrory' />
               <div className='pt-24'>
                    History
               </div>
          </Guest>
     )
}
