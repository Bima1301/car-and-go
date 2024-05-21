import { useEffect, FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import Button from '@/Components/Button';
import MuiThemeProvider from '@/Layouts/MuiThemeProvicer';

export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <MuiThemeProvider>
            <div className="w-full h-screen relative bg-[url('/images/login.jpg')] bg-cover">
                <Head title="Log in" />
                <div className='fixed top-0 right-0 h-screen md:w-[50%] w-full md:bg-white flex justify-center items-center md:p-0 p-5 '>
                    <div className='flex flex-col md:bg-transparent md:w-[70%] md:h-auto bg-white w-full h-full md:p-0 p-8 md:rounded-none rounded-md'>
                        <div className='w-full flex justify-center mb-10'>
                            <Link href={'/'}>
                                <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    className="max-h-20 aspect-auto"
                                />
                            </Link>
                        </div>
                        <p className="text-gray-800 md:text-[40px] text-2xl font-bold ">Login</p>
                        <p className="text-lg mt-3">
                            <span className="text-neutral-400 font-normal ">Already have an account? </span>
                            <Link href={'/register'} className="text-blue-400 font-semibold hover:underline">Register</Link>
                        </p>
                        <form onSubmit={submit} className='py-14'>
                            <div className="mb-4">
                                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                                    error={errors?.email as any} helperText={errors?.email}
                                    value={data.email} onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
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
                                </FormControl>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <FormControlLabel control={<Checkbox checked={data.remember} />} label="Ingat saya"
                                    onChange={(e: any) => setData('remember', e.target?.checked)}
                                />
                            </div>
                            <div className="mt-6">
                                <Button className='w-full'
                                    disabled={processing}
                                    type='submit'
                                >
                                    Masuk
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    )
}
