import { Icon } from '@iconify/react/dist/iconify.js'
import { Dialog, DialogActions, DialogContent, DialogTitle, Fade, FadeProps, IconButton, Typography } from '@mui/material'
import { ReactElement, Ref, forwardRef, useState } from 'react'
import toast from 'react-hot-toast'
import { router } from "@inertiajs/react";
import Button from '@/Components/Button';

const Transition = forwardRef(function Transition(
     props: FadeProps & { children?: ReactElement<any, any> },
     ref: Ref<unknown>
) {
     return <Fade ref={ref} {...props} />
})

type DialogDeleteProps = {
     open: boolean
     onClose: (e: any) => void
     values: any
}

export default function DialogDelete({ open, onClose, values }: DialogDeleteProps) {

     const [isLoading, setIsLoading] = useState<boolean>(false)

     const handleClose = () => {
          setIsLoading(false)

          onClose(false)
     }

     const handleDelete = () => {
          setIsLoading(true)
          router.delete(route('cars.destroy', values.id), {
               preserveScroll: true,
               onError: (errors) => {
                    console.log('errors', errors);
                    setIsLoading(false)
                    toast.error('Gagal menghapus data')
               },
               onSuccess: () => {
                    toast.success('Berhasil menghapus data')
                    onClose(false)
                    handleClose()
               }
          })
          setIsLoading(false)
     }


     return (
          <Dialog fullWidth open={open} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
               <DialogTitle sx={{ mb: 4, backgroundColor: "#991b1b", px: { sm: 4, xs: 2 } }}>
                    <div className='flex flex-row justify-between items-center text-white'>
                         <p className='font-bold text-xl'>
                              Delete Confirmation
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
                    <div className='flex flex-col gap-3'>
                         <Typography variant='body1' color={'black'}>
                              Are you sure you want to delete this car {' '}
                              <strong>
                                   {values?.brand}
                              </strong> ?
                         </Typography>
                    </div>
               </DialogContent>
               <DialogActions sx={{
                    pb: { xs: 2 }, pt: 2, justifyContent: 'end', px: { sm: 4, xs: 2 },
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
                         <Button type='button' className='w-full'
                              variant='error'
                              size='small'
                              onClick={handleDelete}
                              disabled={isLoading}
                         >
                              Delete
                         </Button>
                    </div>
               </DialogActions>
          </Dialog >
     )
}
