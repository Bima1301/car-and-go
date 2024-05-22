import Button from '@/Components/Button'
import ImageUploader from '@/Components/ImagesUploader'
import { formatPrice } from '@/libs/utils'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useForm } from '@inertiajs/react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Fade, FadeProps, FormHelperText, Grid, IconButton, TextField, Typography } from '@mui/material'
import moment from 'moment'
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
     values: any
}

export default function DialogDetail({ open, onClose, values }: DialogAddProps) {

     const handleClose = () => {
          onClose(false)
     }


     return (
          <Dialog fullWidth open={open} maxWidth='md' scroll='body' TransitionComponent={Transition}>
               <DialogTitle sx={{ mb: 4, backgroundColor: "#C2410B", px: { sm: 4, xs: 2 } }}>
                    <div className='flex flex-row justify-between items-center text-white'>
                         <p className='font-bold text-xl'>
                              Rent History of {values?.brand} {values?.model}
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
                              <Box sx={{ height: '100%', width: '100%' }}>
                                   <div className='w-full overflow-auto'>
                                        <table className="min-w-full bg-white rounded overflow-hidden">
                                             <thead className="bg-[#EAB308] text-white">
                                                  <tr>
                                                       <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                            No
                                                       </th>
                                                       <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                            Borrower
                                                       </th>
                                                       <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                            Start Date
                                                       </th>
                                                       <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                            End Date
                                                       </th>
                                                       <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                            Total Price
                                                       </th>
                                                  </tr>
                                             </thead>
                                             <tbody className="text-gray-700">
                                                  {values?.rents?.map((item: any, index: any) => {
                                                       return (
                                                            <tr
                                                                 className="border-b-gray-400 border-b"
                                                                 key={index}
                                                            >
                                                                 <td className="text-left py-2 px-4">
                                                                      {index + 1}
                                                                 </td>
                                                                 <td className="text-left py-2 px-4">
                                                                      <p>{item?.user?.name}</p>
                                                                 </td>
                                                                 <td className="text-left py-2 px-4">
                                                                      <p>{
                                                                           moment(item.start_date).format('DD MMMM YYYY')
                                                                      }</p>
                                                                 </td>
                                                                 <td className="text-left py-2 px-4">
                                                                      <p >
                                                                           {moment(item.end_date).format('DD MMMM YYYY')}
                                                                      </p>
                                                                 </td>
                                                                 <td className="text-left py-2 px-4">
                                                                      <p>
                                                                           {formatPrice(item.total_price)}
                                                                      </p>
                                                                 </td>
                                                            </tr>
                                                       );
                                                  })}
                                             </tbody>
                                        </table>
                                   </div>
                              </Box>
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
                              variant='secondary'
                              onClick={() => {
                                   handleClose()
                              }}
                         >
                              Back
                         </Button>
                    </div>
               </DialogActions>
          </Dialog >
     )
}
