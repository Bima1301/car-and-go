import Button from '@/Components/Button'
import ImageUploader from '@/Components/ImagesUploader'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useForm } from '@inertiajs/react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Fade, FadeProps, FormHelperText, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ReactElement, Ref, forwardRef, useState } from 'react'

import toast from 'react-hot-toast'


const Transition = forwardRef(function Transition(
     props: FadeProps & { children?: ReactElement<any, any> },
     ref: Ref<unknown>
) {
     return <Fade ref={ref} {...props} />
})

type DialogAddProps = {
     open: boolean
     onClose: (e: any) => void
}

export default function DialogAdd({ open, onClose }: DialogAddProps) {

     const { data, setData, post, progress, wasSuccessful, errors, reset } = useForm({
          brand: '',
          model: '',
          plate_number: '',
          image: '',
          price: ''
     });

     const [isLoading, setIsLoading] = useState<boolean>(false)
     const [imagePreview, setImagePreview] = useState<string>('')

     const handleClose = () => {
          reset()
          setIsLoading(false)
          onClose(false)
     }
     const handleImageChange = (e: any) => {
          const file = e.target.files[0];
          if (file) {
               const reader = new FileReader() as any;
               reader.onloadend = () => {
                    setImagePreview(reader.result);
               };
               reader.readAsDataURL(file);
          }
          setData("image", file);
     };
     const handleSubmit = (e: any) => {
          e.preventDefault()
          setIsLoading(true)

          post(route('cars.store'), {
               onError: (errors) => {
                    console.log('errors', errors);
                    setIsLoading(false)
                    toast.error('Failed to add car, please check your data')
               },
               onFinish: () => {
                    setIsLoading(false)
                    toast.success('Success add car')
                    handleClose()
               }
          })
          setIsLoading(false)
     }

     return (
          <Dialog fullWidth open={open} maxWidth='md' scroll='body' TransitionComponent={Transition}>
               <form
                    onSubmit={handleSubmit}
               >
                    <DialogTitle sx={{ mb: 4, backgroundColor: "#C2410B", px: { sm: 4, xs: 2 } }}>
                         <div className='flex flex-row justify-between items-center text-white'>
                              <p className='font-bold text-xl'>
                                   Add New Car
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
                              <Grid item xs={12}>
                                   <Typography sx={{ fontWeight: 600, color: 'rgba(76, 78, 100, 0.87)' }}>Photo</Typography>
                                   {imagePreview && (
                                        <img
                                             src={imagePreview}
                                             alt="Image"
                                             className="max-w-[300px] h-auto object-cover mb-3"
                                        />
                                   )}
                                   <TextField variant='outlined' label='' type="file"
                                        fullWidth
                                        placeholder='Input image'
                                        onChange={handleImageChange}
                                   />
                                   <FormHelperText error>{errors?.image}</FormHelperText>
                              </Grid>
                              <Grid item xs={12} >
                                   <TextField variant='outlined' label='Brand' type="text" sx={{ marginTop: '8px' }}
                                        value={data.brand}
                                        onChange={(e) => setData('brand', e.target.value)}
                                        fullWidth
                                        placeholder='Input brand'
                                   />
                                   <FormHelperText error>{errors?.brand}</FormHelperText>
                              </Grid>
                              <Grid item xs={12} >
                                   <TextField variant='outlined' label='Model' type="text" sx={{ marginTop: '8px' }}
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        fullWidth
                                        placeholder='Input model'
                                   />
                                   <FormHelperText error>{errors?.model}</FormHelperText>
                              </Grid>
                              <Grid item xs={12} >
                                   <TextField variant='outlined' label='Plate Number' type="text" sx={{ marginTop: '8px' }}
                                        value={data.plate_number}
                                        onChange={(e) => setData('plate_number', e.target.value)}
                                        fullWidth
                                        placeholder='Input plate number'
                                   />
                                   <FormHelperText error>{errors?.plate_number}</FormHelperText>
                              </Grid>
                              <Grid item xs={12} >
                                   <TextField variant='outlined' label='Price' type="text" sx={{ marginTop: '8px' }}
                                        value={data.price}
                                        onChange={(e) => {
                                             const value = e.target.value.replace(/\D/g, '');
                                             setData('price', value);
                                        }}
                                        fullWidth
                                        placeholder='Input price'
                                   />
                                   <FormHelperText error>{errors?.price}</FormHelperText>
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
                              <Button type='submit' className='w-full'
                                   size='small'
                                   disabled={isLoading}
                              >
                                   Add
                              </Button>
                         </div>
                    </DialogActions>
               </form>
          </Dialog >
     )
}
