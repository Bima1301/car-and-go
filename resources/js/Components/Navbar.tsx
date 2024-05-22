import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import NavMobile from './NavMobile'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react/dist/iconify.js'
import { IconButton } from '@mui/material'
import { Link, usePage } from '@inertiajs/react'
import { links } from '@/libs/data'
import Button from './Button'
import DropdownUser from './DropdownUser'
import { PageProps } from '@/types'
export default function Navbar() {
    const user = usePage<PageProps>().props.auth.user;
    const { url: pathname } = usePage()

    const [navMobileOpen, setNavMobileOpen] = useState(false)

    return (
        <motion.nav className={`xl:px-[100px] md:px-8 px-4 w-full fixed top-0 left-0 right-0 z-50 flex flex-row items-center justify-between  md:py-4 py-3 transition-colors duration-300 bg-white shadow`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <Link href='/' className='md:hidden flex flex-row items-center gap-3'>
                <img src='/images/logo.png' alt='Card And Go' className='h-6' />
            </Link>
            <div className='md:hidden flex gap-3 items-center'>
                {user && (
                    <div className="flex relative w-12 h-12 bg-orange-500 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">
                        <Link
                            href={'/notifikasi'}
                        >
                        </Link>
                        <DropdownUser />
                    </div>
                )}
                <button className=' md:text-3xl text-2xl'
                    onClick={() => setNavMobileOpen(!navMobileOpen)}
                >
                    <Icon icon="entypo:menu" />
                </button>
            </div>
            <Link href="/" className='md:flex hidden flex-row items-center gap-4'>
                <img src='/images/logo.png' alt='Card And Go' className='h-12 ' />
            </Link>
            <div className='md:flex hidden flex-row lg:gap-[16px] gap-12 items-center text-gray-800 text-lg font-medium'>
                {links.map((link, index) => (
                    <Link href={link.href} key={index}
                        className={`cursor-pointer flex flex-col ${pathname.includes(link.hash) ? "text-black font-bold" :
                            pathname == '/' && link.hash == 'home' ? 'text-black font-bold' : 'text-zinc-500 hover:text-black'}  `}

                    >
                        <span className='px-3'>
                            {link.name}
                        </span>
                        {pathname.includes(link.hash) ? <div className='h-[2px] w-full bg-orange-800 rounded-full' /> : pathname == '/' && link.hash == 'home' ? <div className='h-[2px] w-full bg-orange-800 rounded-full' /> : ''}
                    </Link>
                ))}
                {user ? (
                    <div className="flex relative  bg-orange-500 justify-center items-center m-1 mr-2 text-xl rounded-full text-white">
                        <Link
                            href={'/notifikasi'}
                        >
                        </Link>
                        <DropdownUser />

                    </div>
                ) : (
                    <div className='flex flex-row items-center gap-4 ms-4'>
                        <Button className='md:text-sm'
                            isLink href={'/login'}
                        >
                            Masuk
                        </Button>
                        <Button variant='secondary' className='md:text-sm'
                            isLink href={'/register'}
                        >
                            Daftar
                        </Button>
                    </div>
                )}
            </div>
            <AnimatePresence>
                {navMobileOpen && (
                    <NavMobile
                        setNavMobileOpen={setNavMobileOpen}
                        navMobileOpen={navMobileOpen}
                    />
                )}
            </AnimatePresence>
        </motion.nav >
    )
}
