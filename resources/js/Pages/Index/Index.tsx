import Guest from '@/Layouts/GuestLayout'
import Hero from './Components/Hero'
import { Head, Link, router } from '@inertiajs/react'
import { formatPrice } from '@/libs/utils';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';
import DialogRent from './Components/DialogRent';

export default function Welcome({ cars, params, auth }: { cars: any, params: any, auth: any }) {
    const [isDialogRentOpen, setIsDialogRentOpen] = useState<boolean>(false)
    const [selectedCar, setSelectedCar] = useState<any>(null)
    const [query, setQuery] = useState<any>({
        search: params.search || '',
        page: 1,
        start_date: params.start_date || null,
        end_date: params.end_date || null,
    });
    useEffect(() => {
        if (!query.start_date && !query.end_date) {
            setQuery({
                ...query,
                start_date: moment().format('YYYY-MM-DD'),
                end_date: moment().add(1, 'days').format('YYYY-MM-DD')
            })
        }
    }, [query])

    const handleSearchBooking = () => {
        if (moment(query.start_date).isAfter(query.end_date)) {
            toast.error('End date must be greater than start date')
            return;
        }
        setQuery({ ...query, page: 1 });
        router.get(
            route('home'),
            {
                search: query.search,
                start_date: query.start_date,
                end_date: query.end_date,
                page: 1,
            },
            {
                replace: true,
                preserveScroll: true,
                preserveState: true,
            }
        );
    }

    return (
        <Guest>
            <Head title="Home" />
            <Hero
                query={query}
                setQuery={setQuery}
                handleSearchBooking={handleSearchBooking}
            />
            <div className='flex justify-center'>
                <div className='lg:px-[100px] md:px-8 px-4 max-w-[100rem]'>
                    {cars?.data.length === 0 && (
                        <h3 className="text-2xl font-bold pl-2 text-center text-gray-300 italic">No Car Found</h3>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {cars?.data.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="rounded overflow-hidden shadow-lg flex flex-col"
                            >
                                <div className="relative">
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => {
                                            if (!auth.user) {
                                                router.get(route('login'))
                                                return;
                                            }
                                            if (item?.user_id === auth.user.id) {
                                                toast.error('You cannot rent your own car')
                                                return;
                                            }
                                            setSelectedCar(item)
                                            setIsDialogRentOpen(true)
                                        }}
                                    >
                                        <img
                                            className="w-full aspect-video object-cover"
                                            src={`/storage/${item.image}`}
                                            alt={item.title}
                                        />
                                        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                                    </div>
                                    <p>
                                        <div className="text-xs absolute top-0 right-0 bg-orange-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-orange-600 transition duration-500 ease-in-out font-semibold">
                                            {item.plate_number}
                                        </div>
                                    </p>
                                </div>
                                <div className="px-6 py-4 mb-auto">
                                    <div
                                        onClick={() => {
                                            if (item?.user_id === auth.user.id) {
                                                toast.error('You cannot rent your own car')
                                                return;
                                            }
                                            setSelectedCar(item)
                                            setIsDialogRentOpen(true)
                                        }}
                                        className="font-medium md:text-xl hover:text-orange-600 transition duration-500 ease-in-out inline-block cursor-pointer"
                                    >
                                        {item.brand}
                                    </div>
                                    <p className="text-gray-500 md:text-sm text-xs">
                                        Model : {item.model}
                                    </p>
                                    <p className="text-orange-800 md:text-3xl text-xl font-extrabold mt-4">
                                        {formatPrice(item.price)}
                                        <span className='text-base text-gray-600'>/day</span>
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="flex justify-end w-full mt-10">
                        <Pagination
                            count={cars.meta.last_page}
                            page={cars.meta.current_page}
                            onChange={(_, value) => {
                                setQuery({ ...query, page: value });
                                router.get(
                                    route('home'),
                                    {
                                        search: query.search,
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
            <DialogRent
                open={isDialogRentOpen}
                onClose={setIsDialogRentOpen}
                values={selectedCar}
                query={query}
            />
        </Guest>
    )
}
