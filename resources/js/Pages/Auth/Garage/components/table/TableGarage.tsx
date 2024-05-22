import { Icon } from '@iconify/react/dist/iconify.js';
import { Card, CardContent, CardHeader, CircularProgress, IconButton, Pagination, TextField, debounce } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';
import DialogDelete from '../dialog/DialogDelete';
import DialogAdd from '../dialog/DialogAdd';
import Button from '@/Components/Button';
import DialogEdit from '../dialog/DialogEdit';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { formatPrice } from '@/libs/utils';

export default function TableGarage() {
     const props = usePage<PageProps>().props
     const { cars } = usePage<any>().props

     const [query, setQuery] = useState({
          page: 1,
          search: props.searchParams ? props.searchParams : "",
     });

     const startIndex = (cars.meta.current_page - 1) * cars.meta.per_page + 1;

     const [search, setSearch] = useState('')


     const [isDialogAddOpen, setIsDialogAddOpen] = useState<boolean>(false)
     const [isDialogEditOpen, setIsDialogEditOpen] = useState<boolean>(false)
     const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState<boolean>(false)
     const [itemSelected, setItemSelected] = useState<any>(null)


     const handleSearch = useCallback(
          debounce((e: any) => {
               setQuery({ ...query, search: e.target.value });
               router.get(
                    route('garage'),
                    {
                         search: e.target.value,
                         page: 1,
                    },
                    {
                         replace: true,
                         preserveScroll: true,
                         preserveState: true,
                    }
               );
          }, 300),
          []
     )


     return (
          <>
               <Card style={{
                    border: "1px solid #f0f0f0",
                    boxShadow: "none",
               }}
                    sx={{
                         marginTop: { xs: "10px", md: "0px" }
                    }}
               >
                    <CardHeader
                         title={
                              <p className="text-black md:ms-0 ms-9">
                                   List Your Car
                              </p>
                         }
                         sx={{
                              borderBottom: "1px solid #f0f0f0",
                         }}
                    />

                    <CardContent>
                         <div className="flex sm:flex-row flex-col gap-4 justify-between items-center mb-8">
                              <TextField variant='outlined' type="text" sx={{ marginTop: '8px', maxWidth: "200px" }}
                                   defaultValue={search}
                                   onChange={(e) => handleSearch(e)}
                                   fullWidth
                                   size="small"
                                   placeholder="Search..."
                                   InputProps={{
                                        startAdornment: (
                                             <Icon icon="mdi:magnify" fontSize={30} color="#7F7F7F" />
                                        )
                                   }}
                              />
                              <Button size="small"
                                   onClick={() => {
                                        setIsDialogAddOpen(true)
                                   }}
                              >
                                   Add Car
                              </Button>
                         </div>
                         <Box sx={{ height: '100%', width: '100%' }}>
                              <div className='w-full overflow-auto'>
                                   <table className="min-w-full bg-white rounded overflow-hidden">
                                        <thead className="bg-[#EAB308] text-white">
                                             <tr>
                                                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                       No
                                                  </th>
                                                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                       Image
                                                  </th>
                                                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                       Brand
                                                  </th>
                                                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                       Model
                                                  </th>
                                                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                       Plate Number
                                                  </th>
                                                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                       Price per day
                                                  </th>
                                                  <th className="text-left py-4 px-4 uppercase font-semibold text-sm">
                                                       Aksi
                                                  </th>
                                             </tr>
                                        </thead>
                                        <tbody className="text-gray-700">
                                             {cars.data.map((item: any, index: any) => {
                                                  return (
                                                       <tr
                                                            className="border-b-gray-400 border-b"
                                                            key={index}
                                                       >
                                                            <td className="text-left py-1 px-4">
                                                                 {startIndex + index}
                                                            </td>
                                                            <td className="text-left py-1 px-4">
                                                                 <img
                                                                      className="w-20 h-20 object-cover"
                                                                      src={`/storage/${item.image}`}
                                                                      alt=""
                                                                 />
                                                            </td>
                                                            <td className="text-left py-1 px-4">
                                                                 <p>{item.brand}</p>
                                                            </td>
                                                            <td className="text-left py-1 px-4">
                                                                 <p >
                                                                      {item.model}
                                                                 </p>
                                                            </td>
                                                            <td className="text-left py-1 px-4">
                                                                 <p>{item.plate_number}</p>
                                                            </td>
                                                            <td className="text-left py-1 px-4">
                                                                 <p>{formatPrice(item.price)}</p>
                                                            </td>
                                                            <td className="text-left py-1 px-4">
                                                                 <div className="flex items-center gap-2">
                                                                      <IconButton onClick={() => {
                                                                           setIsDialogEditOpen(true)
                                                                           setItemSelected(item)
                                                                      }
                                                                      }>
                                                                           <Icon icon="mdi:pencil-outline" />
                                                                      </IconButton>
                                                                      <IconButton onClick={() => {
                                                                           setIsDialogDeleteOpen(true)
                                                                           setItemSelected(item)
                                                                      }
                                                                      }>
                                                                           <Icon icon="ph:trash" />
                                                                      </IconButton>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  );
                                             })}
                                        </tbody>
                                   </table>
                              </div>
                              <div className="flex justify-end w-full mt-10">
                                   <Pagination
                                        count={cars.meta.last_page}
                                        page={cars.meta.current_page}
                                        onChange={(_, value) => {
                                             setQuery({ ...query, page: value });
                                             router.get(
                                                  route('garage'),
                                                  {
                                                       search: search,
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
                         </Box>
                    </CardContent>
               </Card>

               <DialogAdd open={isDialogAddOpen} onClose={setIsDialogAddOpen} />

               <DialogEdit open={isDialogEditOpen} onClose={setIsDialogEditOpen} values={itemSelected} />

               <DialogDelete open={isDialogDeleteOpen} onClose={setIsDialogDeleteOpen} values={itemSelected}
               />
          </>

     );
}