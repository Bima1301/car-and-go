import { motion } from 'framer-motion'
import { Icon } from '@iconify/react/dist/iconify.js';
import { links } from '@/libs/data';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Button from './Button';

type NavMobileProps = {
    navMobileOpen: boolean;
    setNavMobileOpen: (value: boolean) => void;
}

export default function NavMobile({ navMobileOpen, setNavMobileOpen }: NavMobileProps) {
    const user = usePage<PageProps>().props.auth.user;

    const menuMotion = {
        initial: {
            scaleY: 0,
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.3,
                ease: [0.12, 0, 0.39, 0],
            },
        },
        exit: {
            scaleY: 0,
            transition: {
                delay: 0.4,
                duration: 0.3,
                ease: [0.12, 0, 0.39, 1],
            },
        },
    }

    const menuItemsMotion = {
        initial: {
            y: "30vh",
            transition: {
                duration: 0.3,
                ease: [0.37, 0, 0.63, 1],
            }
        },
        open: {
            y: 0,
            transition: {
                ease: [0, 0.55, 0.45, 1],
                duration: 0.5,
            }
        }
    }

    const containerMotion = {
        initial: {
            transition: {
                staggerChildren: 0.09,
                staggerDirection: -1,
            }
        },
        open: {
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.09,
                staggerDirection: 1,
            }
        }
    }
    const pathname: any = 'a'
    return (
        <motion.div
            variants={menuMotion}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed origin-top top-0 left-0 right-0 bottom-0 bg-white z-50 w-full h-screen">
            <div className='flex h-full flex-col'>
                <div className='flex justify-between items-center bg-white px-5 border-b border-b-gray-200 shadow'>
                    <Link href="home" onClick={() => setNavMobileOpen(false)} className=' py-5 flex flex-row items-center gap-3'>
                        <img src='/images/logo.png' alt='Card And Go' className=' h-10' />
                    </Link>
                    <button onClick={() => setNavMobileOpen(!navMobileOpen)}>
                        <Icon icon="fa:times" className='text-black' />
                    </button>
                </div>
                <motion.ul
                    variants={containerMotion}
                    initial="initial"
                    animate="open"
                    exit="initial"
                    className="flex flex-col h-full justify-center items-center  gap-2 pb-10 px-10">
                    {links.map((link, index) => (
                        <div className='overflow-hidden py-2' key={index}>
                            <motion.li
                                variants={menuItemsMotion}
                                key={index}>
                                <Link href={link.hash}
                                    onClick={() => setNavMobileOpen(false)}
                                    className={`${pathname == link.href ? "text-orange-800" : "text-black hover:text-gray-300"} text-lg font-semibold`}                                >
                                    {link.name}
                                </Link>
                            </motion.li>
                        </div>
                    ))}
                    {!user && (
                        <div className='overflow-hidden'>
                            <motion.div
                                variants={menuItemsMotion}
                                className='flex flex-row items-center gap-4 '>
                                <Button
                                    isLink href={'/login'}
                                >
                                    Masuk
                                </Button>
                                <Button variant='secondary'
                                    isLink href={'/register'}
                                >
                                    Daftar
                                </Button>
                            </motion.div>
                        </div>
                    )}
                </motion.ul>
            </div>
        </motion.div>
    )
}
