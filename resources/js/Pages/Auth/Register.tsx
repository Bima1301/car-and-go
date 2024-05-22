import { useEffect, FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import Button from '@/Components/Button';
import MuiThemeProvider from '@/Layouts/MuiThemeProvicer';
import toast from 'react-hot-toast';

export default function Register() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        address: '',
        phone: '',
        driver_license: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onError: (errors) => {
                toast.error('Failed to register, please check your data');
            },
            onFinish: () => {
                toast.success('Register success, Welcome to Card And Go');
            }
        });
    };
    console.log('errors', errors);

    return (
        <MuiThemeProvider>
            <div className="w-full h-screen relative bg-[url('/images/login.jpg')] bg-cover">
                <Head title="Log in" />
                <div className='fixed top-0 right-0 h-screen md:w-[50%] w-full md:bg-white flex justify-center items-center md:p-0 p-5 '>
                    <div className='flex flex-col md:bg-transparent md:w-[70%] md:h-auto bg-white w-full h-full md:p-0 p-8 md:rounded-none rounded-md'>
                        <div className='w-full flex justify-center mb-5'>
                            <Link href={'/'}>
                                <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    className="max-h-20 aspect-auto"
                                />
                            </Link>
                        </div>
                        <p className="text-gray-800 md:text-[40px] text-2xl font-bold ">Register</p>
                        <p className="text-lg mt-3">
                            <span className="text-neutral-400 font-normal">Have an account? </span>
                            <Link href={'/login'} className="text-blue-400 font-semibold hover:underline">Login</Link>
                        </p>
                        <form onSubmit={submit} className='py-8'>
                            <div className="mb-2">
                                <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
                                    error={errors?.name as any} helperText={errors?.name}
                                    value={data.name} onChange={(e) => setData('name', e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                                    error={errors?.email as any} helperText={errors?.email}
                                    value={data.email} onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
                                    error={errors?.address as any} helperText={errors?.address}
                                    value={data.address} onChange={(e) => setData('address', e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth
                                    error={errors?.phone as any} helperText={errors?.phone}
                                    value={data.phone} onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setData('phone', value);
                                    }}
                                />
                            </div>
                            <div className="mb-2">
                                <TextField id="outlined-basic" label="Driver License" variant="outlined" fullWidth
                                    error={errors?.driver_license as any} helperText={errors?.driver_license}
                                    value={data.driver_license} onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setData('driver_license', value);
                                    }}
                                />
                            </div>
                            <div className="mb-2">
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error={errors?.password as any}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Icon icon="humbleicons:eye" /> : <Icon icon="humbleicons:eye-close" />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    <FormHelperText error={errors?.password as any}>{errors?.password}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="mb-2">
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="password_confirmation"
                                        type={showPasswordConfirmation ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        error={errors?.password_confirmation as any}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showPasswordConfirmation ? <Icon icon="humbleicons:eye" /> : <Icon icon="humbleicons:eye-close" />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                    />
                                </FormControl>
                            </div>
                            <div className="mt-6">
                                <Button className='w-full'
                                    disabled={processing}
                                    type='submit'
                                >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    )
}
