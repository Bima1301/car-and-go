import Button from '@/Components/Button'
import DatePickerWrapper from '@/Components/DatePickerWrapper'
import { formatPrice } from '@/libs/utils'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useForm } from '@inertiajs/react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Fade, FadeProps, FormHelperText, Grid, IconButton, TextField, Typography } from '@mui/material'
import moment from 'moment'
import { ForwardedRef, ReactElement, Ref, forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'


const Transition = forwardRef(function Transition(
     props: FadeProps & { children?: ReactElement<any, any> },
     ref: Ref<unknown>
) {
     return <Fade ref={ref} {...props} />
})

const CustomInput = forwardRef(({ ...props }: any, ref: ForwardedRef<HTMLElement>) => {
     return (
          <TextField inputRef={ref} {...props} fullWidth
               InputProps={{
                    endAdornment: (
                         <Box sx={{ display: 'flex', paddingInlineEnd: "5px", color: "rgba(76, 78, 100, 0.54)" }}>
                              <Icon icon="solar:calendar-outline" fontSize={24} />
                         </Box>
                    )
               }}
          />

     )
})

type DialogAddProps = {
     open: boolean
     onClose: (e: any) => void
     values: any
     query: any
}

export default function DialogRent({ open, onClose, values, query }: DialogAddProps) {

     const { data, setData, post, errors, reset } = useForm({
          start_date: '',
          end_date: '',
          car_id: '',
          total_price: 0,
     });

     const [isLoading, setIsLoading] = useState<boolean>(false)

     const handleClose = () => {
          reset()
          setIsLoading(false)
          onClose(false)
     }

     const handleSubmit = (e: any) => {
          e.preventDefault()
          setIsLoading(true)

          post(route('rents.store'), {
               onError: (errors) => {
                    console.log('errors', errors);
                    setIsLoading(false)
                    toast.error(errors.message || 'Failed rent car')
               },
               onSuccess: (msg) => {
                    console.log(msg);
                    setIsLoading(false)
                    toast.success('Success rent car')
                    handleClose()
               }
          })
          setIsLoading(false)
     }

     useEffect(() => {
          if (values && open) {
               setData({
                    ...data,
                    start_date: query.start_date ? query.start_date : '',
                    end_date: query.end_date ? query.end_date : '',
                    car_id: values.id
               })
          }
     }, [values, query, open])

     useEffect(() => {
          if (data.start_date && data.end_date && values) {
               setData({
                    ...data,
                    total_price: values.price * (moment(data.end_date).diff(moment(data.start_date), 'days'))
               })
          }
     }, [data, values])

     return (
          <Dialog fullWidth open={open} maxWidth='md' scroll='body' TransitionComponent={Transition}>
               <form
                    onSubmit={handleSubmit}
               >
                    <DialogTitle sx={{ mb: 4, backgroundColor: "#C2410B", px: { sm: 4, xs: 2 } }}>
                         <div className='flex flex-row justify-between items-center text-white'>
                              <p className='font-bold text-xl'>
                                   Rent Car Now !
                              </p>
                              <IconButton
                                   onClick={() => {
                                        handleClose()
                                   }}
                              >
                                   <Icon icon="material-symbols:close" color='white' />
                              </IconButton>
                         </div>
                    </DialogTitle>
                    <DialogContent sx={{ pb: 4, px: { sm: 4, xs: 2 }, pt: { sm: 4, xs: 2 } }} >
                         <Grid container spacing={1} className="w-full ">
                              <Grid item xs={12} >
                                   <div className='flex sm:flex-row flex-col gap-3 p-3 border border-orange-500 rounded-lg shadow mb-20'>
                                        <img src={`storage/${values?.image}`} alt={values?.brand} className='sm:h-28 object-cover rounded-lg' />
                                        <div className='flex flex-col justify-between'>
                                             <div>
                                                  <Typography variant='h6' sx={{ fontWeight: 600, color: 'rgba(76, 78, 100, 0.87)' }}>{values?.brand} </Typography>
                                                  <Typography variant='body2' sx={{ color: 'rgba(76, 78, 100, 0.87)' }}>{values?.model}</Typography>
                                             </div>
                                             <Typography variant='body2' fontWeight={'bold'} sx={{ color: 'rgba(76, 78, 100, 0.87)' }}>{values?.plate_number}</Typography>
                                        </div>
                                        <p className='text-3xl font-bold text-orange-500 ms-auto'>{formatPrice(values?.price || 0)}
                                             <span
                                                  className='text-base font-normal text-gray-600'
                                             >
                                                  /day
                                             </span>
                                        </p>
                                   </div>
                              </Grid>
                              <Grid item container xs={12} sx={{ borderBottom: "1px solid gray", marginBottom: "20px" }}>
                                   <Grid item xs={6} md={6} >
                                        <Typography variant='h6' sx={{ fontWeight: 600, color: '#C2410B' }}>Total Price</Typography>
                                   </Grid>
                                   <Grid item xs={6} md={6} >
                                        <Typography variant='h5' sx={{ fontWeight: 600, color: '#C2410B' }}>{formatPrice(data.total_price)}</Typography>
                                   </Grid>
                              </Grid>
                              <Grid item xs={12} md={6} >
                                   <DatePickerWrapper sx={{

                                        '& .react-datepicker .react-datepicker__day.react-datepicker__day--in-range, &.react-datepicker .react-datepicker__day.react-datepicker__day--in-selecting-range':
                                        {
                                             color: 'white',
                                             backgroundColor: '#50D491'
                                        },
                                   }}>
                                        <DatePicker
                                             autoComplete='off'
                                             value={data.start_date ? moment(data.start_date).format('DD-MM-YYYY') : ''}
                                             selectsStart
                                             minDate={new Date()}
                                             startDate={data.start_date ? new Date(data.start_date) : null}
                                             endDate={data.end_date ? new Date(data.end_date) : null}
                                             selected={data.start_date ? new Date(data.start_date) : null}
                                             onChange={(e: any) => {
                                                  setData({ ...data, start_date: moment(e.toISOString()).format('YYYY-MM-DD') })
                                             }}
                                             customInput={<CustomInput fullWidth label='Start Date' sx={{ marginTop: '8px' }} />}
                                             withPortal
                                        />
                                   </DatePickerWrapper>
                                   <FormHelperText error={errors.start_date ? true : false}> {errors.start_date} </FormHelperText>
                              </Grid>
                              <Grid item xs={12} md={6} >
                                   <DatePickerWrapper sx={{

                                        '& .react-datepicker .react-datepicker__day.react-datepicker__day--in-range, &.react-datepicker .react-datepicker__day.react-datepicker__day--in-selecting-range':
                                        {
                                             color: 'white',
                                             backgroundColor: '#50D491'
                                        },
                                   }}>
                                        <DatePicker
                                             autoComplete='off'
                                             value={data.end_date ? moment(data.end_date).format('DD-MM-YYYY') : ''}
                                             selectsEnd
                                             startDate={data.start_date ? new Date(data.start_date) : null}
                                             endDate={data.end_date ? new Date(data.end_date) : null}
                                             selected={data.end_date ? new Date(data.end_date) : null}
                                             onChange={(e: any) => {
                                                  setData({ ...data, end_date: moment(e.toISOString()).format('YYYY-MM-DD') })
                                             }}
                                             customInput={<CustomInput fullWidth label='End Date' sx={{ marginTop: '8px' }} />}
                                             withPortal
                                        />
                                   </DatePickerWrapper>
                                   <FormHelperText error={errors.end_date ? true : false}> {errors.end_date} </FormHelperText>
                              </Grid>
                         </Grid>

                    </DialogContent>
                    <DialogActions sx={{
                         pb: { sm: 4, xs: 2 }, pt: 2, justifyContent: 'end', px: { sm: 4, xs: 2 },
                         borderTop: "1px solid #f0f0f0"
                    }}>
                         <div className='flex flex-row gap-3 justify-end'>
                              <Button type='button' className='w-full'
                                   size='small'
                                   disabled={isLoading}
                                   variant='secondary'
                                   onClick={() => {
                                        handleClose()
                                   }}
                              >
                                   Cancel
                              </Button>
                              <Button type='submit' className='w-full text-nowrap'
                                   size='small'
                                   disabled={isLoading}
                              >
                                   Rent Now
                              </Button>
                         </div>
                    </DialogActions>
               </form>
          </Dialog >
     )
}
