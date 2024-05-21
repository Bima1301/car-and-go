import Navbar from '@/Components/Navbar';
import { PropsWithChildren } from 'react';
import MuiThemeProvider from './MuiThemeProvicer';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <MuiThemeProvider>
            <div className="bg-white w-full text-black relative ">
                <Navbar />
                {children}
            </div>
        </MuiThemeProvider>
    );
}
