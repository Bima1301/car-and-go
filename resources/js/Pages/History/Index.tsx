import Guest from '@/Layouts/GuestLayout'
import { formatPrice } from '@/libs/utils';
import { Head, router } from '@inertiajs/react'
import { Pagination, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react'
import DialogReturn from './Components/DialogReturn';

export default function History({ rents }: { rents: any }) {
     const [isDialogReturnOpen, setIsDialogReturnOpen] = useState<boolean>(false)
     const [selectedRent, setSelectedRent] = useState<any>(null)
     return (
          <Guest>
               <Head title='Histrory' />
               <div className='flex justify-center pt-28'>
                    <div className='lg:px-[100px] md:px-8 px-4 max-w-[100rem] w-full'>
                         <p className='text-4xl text-start w-full font-semibold text-gray-800'>Your Rent History</p>
                         <div className='mt-10 flex flex-col gap-5'>
                              {rents?.data?.map((item: any, index: number) => (
                                   <Tooltip title={item?.status === 'rented' ? 'Click to return the car' : ''}
                                        key={index}>
                                        <div className={`${item?.status == 'rented' && 'cursor-pointer hover:bg-orange-50'} flex sm:flex-row flex-col gap-3 p-3 border border-orange-500 rounded-lg shadow-lg bg-white`}
                                             onClick={() => {
                                                  if (item?.status === 'rented') {
                                                       setSelectedRent(item)
                                                       setIsDialogReturnOpen(true)
                                                  }
                                             }}
                                        >
                                             <img src={`storage/${item?.car?.image}`} alt={item?.car?.brand} className='sm:h-28 object-cover rounded-lg' />
                                             <div className='flex flex-col justify-between'>
                                                  <div>
                                                       <Typography variant='h6' sx={{ fontWeight: 600, color: 'rgba(76, 78, 100, 0.87)' }}>{item?.car?.brand} </Typography>
                                                       <Typography variant='body2' sx={{ color: 'rgba(76, 78, 100, 0.87)' }}>{item?.car?.model}</Typography>
                                                  </div>
                                                  <Typography variant='body2' fontWeight={'bold'} sx={{ color: 'rgba(76, 78, 100, 0.87)' }}>{item?.car?.plate_number}</Typography>
                                             </div>
                                             <div className='ms-auto flex flex-col justify-between items-center gap-3'>
                                                  <div className='flex md:flex-row flex-col items-center gap-3'>
                                                       <p className='text-gray-500'>
                                                            {moment(item?.start_date).format('DD MMMM YYYY')} {' '} - {' '}
                                                            {moment(item?.end_date).format('DD MMMM YYYY')}
                                                       </p>
                                                       <p className={`text-sm font-semibold text-white bg-orange-500 px-2 py-1 rounded-lg ${item?.status === 'rented' ? 'bg-green-500' : 'bg-gray-500'} w-fit`}
                                                       >
                                                            {item?.status === 'rented' ? 'On Going' : 'Returned'}
                                                       </p>
                                                  </div>
                                                  <p className='text-3xl font-bold text-orange-500 '>{formatPrice(item?.total_price || 0)} {' '}
                                                       <span className='text-sm text-gray-400'>
                                                            ({
                                                                 //get total days from start_date and end_date
                                                                 moment(item?.end_date).diff(item?.start_date, 'days') < 0 ? 0 : moment(item?.end_date).diff(item?.start_date, 'days')
                                                            } {' '}days)
                                                       </span>
                                                  </p>
                                             </div>
                                        </div>
                                   </Tooltip>
                              ))}
                         </div>
                         <div className="flex justify-end w-full mt-10">
                              <Pagination
                                   count={rents.meta.last_page}
                                   page={rents.meta.current_page}
                                   onChange={(_, value) => {
                                        router.get(
                                             route('garage'),
                                             {
                                                  page: value,
                                             },
                                             {
                                                  replace: true,
                                                  preserveScroll: true,
                                                  preserveState: true,
                                             }
                                        );
                                   }}
                                   shape="rounded"
                                   //change color to #006316
                                   sx={{ '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#9a3412', color: 'white' } }}
                              />
                         </div>
                    </div>
               </div>
               <DialogReturn
                    open={isDialogReturnOpen}
                    onClose={setIsDialogReturnOpen}
                    values={selectedRent}
               />
          </Guest>
     )
}
