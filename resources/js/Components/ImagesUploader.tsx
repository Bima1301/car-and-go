import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';

type ImageUploaderProps = {
    img: any,
    index: number,
    inputImageFields: any,
    setInputImageFields: any,
    limit?: number
}

const ImageUploader = ({ img, index, inputImageFields, setInputImageFields, limit }: ImageUploaderProps) => {

    const handleImagesChange = (index: number, e: any) => {
        const values: any = [...inputImageFields];

        if (limit && inputImageFields.length >= limit + 1) {
            toast.error(`Maximal ${limit} images`);
            return;
        }

        values[index].file = e.target.files[0];
        values[index].preview = URL.createObjectURL(e.target.files[0]);
        setInputImageFields([...values, { file: '', preview: '' }]);
    }


    return (
        <>
            {index === 0 && img.preview === '' ? (
                <React.Fragment key={index}>
                    <Box width={"100%"}>
                        <Button
                            fullWidth
                            sx={{
                                // mr: 4,
                                // mb: 4,
                                height: '200px',
                                border: '2px solid #4C4E6438',
                                borderRadius: 1,
                                borderStyle: "dashed",
                                outlineStyle: 'dashed'
                            }}
                            onClick={() => {
                                const inputElement = document.getElementById('imageUrl')
                                inputElement?.click()
                            }}
                        >
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Icon icon="material-symbols:image-outline" fontSize={32} color='rgba(76, 78, 100, 0.54)' />
                                <Typography variant='body2' color='rgba(76, 78, 100, 0.54)' sx={{ fontSize: '12px' }} textTransform={'capitalize'} >
                                    Upload a file .Jpg <br /> or png
                                </Typography>
                            </Box>
                        </Button>
                    </Box>
                    <input type="file" onChange={(e) => handleImagesChange(index, e)}
                        id='imageUrl'
                        style={{ display: 'none' }}
                        accept='image/*'
                    />

                </React.Fragment>
            ) : (
                <Box key={index}
                    display={'flex'}
                    alignItems={'center'}
                >
                    {img.preview ? (
                        <Box sx={{
                            position: 'relative', border: '1px solid #4C4E6438',
                            borderRadius: 1,
                        }}>
                            <div
                                style={{
                                    maxHeight: '200px',
                                    aspectRatio: "16/9",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 4
                                }}
                            >
                                <img
                                    src={img.preview}
                                    alt='Image Produk'
                                    width={400}
                                    height={300}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                            <IconButton
                                size='small'
                                onClick={() => {
                                    const values = [...inputImageFields]
                                    values.splice(index, 1)
                                    setInputImageFields([...values])
                                }}
                                sx={{
                                    position: 'absolute', top: -9, right: -3,
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                }}
                            >
                                <Icon icon="material-symbols:close" />
                            </IconButton>
                        </Box>
                    ) : (
                        <>
                            {limit && inputImageFields.length >= limit + 1 ? null : (
                                <>
                                    <Box
                                    >
                                        <Button
                                            fullWidth
                                            sx={{
                                                height: '200px',
                                                width: '300px',
                                                border: '2px solid #4C4E6438',
                                                borderRadius: 1,
                                                borderStyle: "dashed",
                                                outlineStyle: 'dashed'
                                            }}
                                            onClick={() => {
                                                const inputElement = document.getElementById('imageUrl')
                                                inputElement?.click()
                                            }}
                                        >
                                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                                <Icon icon="material-symbols:image-outline" fontSize={32} color='rgba(76, 78, 100, 0.54)' />
                                                <Typography variant='body2' color='rgba(76, 78, 100, 0.54)' sx={{ fontSize: '12px' }} textTransform={'capitalize'} >
                                                    Upload a file .Jpg <br /> or png
                                                </Typography>
                                            </Box>
                                        </Button>
                                    </Box>
                                    <input type="file" onChange={(e) => handleImagesChange(index, e)}
                                        id='imageUrl'
                                        style={{ display: 'none' }}
                                        accept='image/*'
                                    />
                                </>
                            )}
                        </>
                    )}
                </Box>
            )}
        </>
    );
}

export default ImageUploader;
