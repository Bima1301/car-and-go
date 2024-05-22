import { Autocomplete, Box, Grid, TextField } from "@mui/material"
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
import DatePickerWrapper from "@/Components/DatePickerWrapper";
import Button from "@/Components/Button";

const CustomInput = forwardRef(({ ...props }: any, ref: ForwardedRef<HTMLElement>) => {
    return (
        <TextField inputRef={ref} {...props} size="small"
            InputProps={{
                endAdornment: (
                    <Box sx={{ display: 'flex', paddingInlineEnd: "5px", color: "rgba(76, 78, 100, 0.54)" }}>
                        <Icon icon="solar:calendar-outline" />
                    </Box>
                )
            }}
        />

    )
})

export default function Hero({ query, setQuery, handleSearchBooking }: { query: any, setQuery: any, handleSearchBooking: any }) {


    return (
        <section className=' min-h-full pt-20 relative text-white lg:mb-36 md:mb-52 sm:mb-36 mb-56'>
            <div className='absolute top-0 left-0 w-full h-full bg-[url(/images/hero.jpg)] bg-cover  bg-center brightness-50' />
            <div className='relative z-10 lg:py-28 md:py-20 flex justify-center w-full'>
                <div
                    className='lg:px-[100px] md:px-8 px-4 w-full md:py-6 py-12 max-w-[100rem]'>
                    <div className='lg:text-5xl md:text-4xl text-3xl font-bold flex flex-col md:gap-4 gap-1 md:mb-5 mb-8'>
                        <p>
                            Welcome to <span className="italic">Car And Go</span>
                        </p>
                        <p>
                            Rent a car with us now !
                        </p>
                        <p>
                            Enjoy your trip
                        </p>
                    </div>

                    <form className=" flex flex-col justify-center items-start absolute lg:-bottom-24 md:-bottom-44 left-0 right-0 bg-white z-30 lg:mx-[100px] md:pb-10 md:mx-8 mx-4 py-4 md:px-8 px-6 rounded-2xl gap-6 border border-neutral-200 shadow"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearchBooking()
                        }}
                    >
                        <p className="text-black lg:text-[32px] md:text-2xl font-bold">
                            Find Your Car Now
                        </p>
                        <Grid container spacing={2} className="w-full">
                            <Grid item xs={6} sm={4} lg={4}>
                                <TextField variant='outlined' label='Search' type="text" size="small" sx={{ marginTop: '8px' }}
                                    value={query.search}
                                    onChange={(e) => {
                                        setQuery({ ...query, search: e.target.value })
                                    }}
                                    placeholder="Search everything here..."
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <Icon icon="gravity-ui:magnifier" fontSize={20} color="#7F7F7F" />
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3} lg={3}>
                                <DatePickerWrapper
                                    sx={{

                                        '& .react-datepicker .react-datepicker__day.react-datepicker__day--in-range, &.react-datepicker .react-datepicker__day.react-datepicker__day--in-selecting-range':
                                        {
                                            color: 'white',
                                            backgroundColor: '#50D491'
                                        },
                                    }}
                                >
                                    <DatePicker
                                        autoComplete='off'
                                        value={query.start_date ? moment(query.start_date).format('DD-MM-YYYY') : ''}
                                        minDate={new Date()}
                                        selectsStart
                                        startDate={query.start_date ? new Date(query.start_date) : null}
                                        endDate={query.end_date ? new Date(query.end_date) : null}
                                        selected={query.start_date ? new Date(query.start_date) : null}
                                        onChange={(e: any) => {
                                            setQuery({ ...query, start_date: moment(e.toISOString()).format('YYYY-MM-DD') })
                                        }}
                                        customInput={<CustomInput fullWidth label='Start date' sx={{ marginTop: '8px' }} />}
                                    />
                                </DatePickerWrapper>
                            </Grid>
                            <Grid item xs={6} sm={3} lg={3}>
                                <DatePickerWrapper
                                    sx={{
                                        '& .react-datepicker .react-datepicker__day.react-datepicker__day--selected, & .react-datepicker .react-datepicker__day.react-datepicker__day--keyboard-selected':
                                        {
                                            color: 'white !important',
                                        },
                                        '& .react-datepicker .react-datepicker__day.react-datepicker__day--in-range, &.react-datepicker .react-datepicker__day.react-datepicker__day--in-selecting-range':
                                        {
                                            color: 'white',
                                            backgroundColor: '#50D491'
                                        },
                                    }}>
                                    <DatePicker
                                        autoComplete='off'
                                        value={query.end_date ? moment(query.end_date).format('DD-MM-YYYY') : ''}
                                        minDate={query.start_date ? new Date(query.start_date) : new Date()}
                                        selectsEnd
                                        startDate={query.start_date ? new Date(query.start_date) : null}
                                        endDate={query.end_date ? new Date(query.end_date) : null}
                                        selected={query.end_date ? new Date(query.end_date) : null}
                                        onChange={(e: any) => {
                                            setQuery({ ...query, end_date: moment(e.toISOString()).format('YYYY-MM-DD') })
                                        }}
                                        customInput={<CustomInput fullWidth label='End date' sx={{ marginTop: '8px' }} />}
                                    />
                                </DatePickerWrapper>
                            </Grid>

                            <Grid item xs={12} sm={2} lg={2} >
                                <Button className="w-full h-full " type="submit"
                                // disabled={!query.type || !query.start_date || !query.end_date || !query.guest}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </section>
    )
}
