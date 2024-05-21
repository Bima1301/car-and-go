import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
    return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}

export const formatDate = (date: string) => {
    //format from 2024-02-25T16:09:01.000Z to 25 Feb 2024
    const newDate = new Date(date)
    return `${newDate.getDate()} ${newDate.toLocaleString('default', { month: 'short' })} ${newDate.getFullYear()}`
}
