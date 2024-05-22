import Navbar from '@/Components/Navbar';
import { PropsWithChildren } from 'react';
import MuiThemeProvider from './MuiThemeProvicer';
import Footer from '@/Components/Footer';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <MuiThemeProvider>
            <div className="bg-gray-100 w-full text-black relative min-h-screen flex flex-col">
                <Navbar />
                {children}
                <div className='mt-auto'>
                    <Footer />
                </div>
            </div>
        </MuiThemeProvider>
    );
}
