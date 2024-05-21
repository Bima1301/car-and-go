import { cn } from "@/libs/utils";
import { Link } from "@inertiajs/react";


type ButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary" | "error";
    isLink?: boolean;
    href?: any;
    size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit';
}

export default function Button({ children, onClick, disabled, className, variant = "primary", isLink, href, size, type = "button" }: ButtonProps) {
    if (isLink && !disabled) {
        return (
            <Link href={href} className={cn("md:px-5 md:py-3 px-4 py-2 rounded-lg justify-center items-center gap-2.5 inline-flex text-center md:text-lg text-sm font-semibold  transition duration-100", className,
                variant === 'primary' ? "bg-orange-800 hover:bg-orange-700 text-white" : "bg-white  text-orange-800 border border-orange-800 hover:bg-orange-100",
                size == 'small' && 'md:text-sm',
                disabled && 'text-[#C3C7CE] bg-[#F1F1F1] hover:bg-[#F1F1F1] cursor-not-allowed'
            )}
                onClick={onClick}
            >
                {children}
            </Link>
        )
    }
    return (
        <button className={cn("md:px-5 md:py-3 px-4 py-2 rounded-lg justify-center items-center gap-2.5 inline-flex text-center md:text-lg text-sm font-semibold  transition duration-100",
            className,
            variant === 'primary' ? "bg-orange-800 hover:bg-orange-700 text-white" :
                variant === 'error' ? "bg-red-800 hover:bg-red-700 text-white" :
                    "bg-white  text-orange-800 border border-orange-800 hover:bg-orange-100",
            disabled && 'text-[#C3C7CE] bg-[#F1F1F1] hover:bg-[#F1F1F1] cursor-not-allowed border-[#F1F1F1]',
            size == 'small' && 'md:text-sm'
        )}
            onClick={onClick}
            disabled={disabled}
            type={type}

        >
            {children}
        </button>
    )
}
