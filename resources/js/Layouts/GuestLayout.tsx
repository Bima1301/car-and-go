import Navbar from '@/Components/Navbar';
import { PropsWithChildren } from 'react';
import MuiThemeProvider from './MuiThemeProvicer';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <MuiThemeProvider>
            <div className="bg-gray-100 w-full text-black relative min-h-screen">
                <Navbar />
                {children}
            </div>
        </MuiThemeProvider>
    );
}
