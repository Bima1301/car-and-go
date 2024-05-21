import Guest from '@/Layouts/GuestLayout'
import Hero from './Components/Hero'
import { Head } from '@inertiajs/react'

export default function Welcome() {
    return (
        <Guest>
            <Head title="Home" />
            <Hero />
        </Guest>
    )
}
