import { createTheme, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function MuiThemeProvider({ children }: PropsWithChildren) {
     const theme = createTheme({
          components: {
               MuiTextField: {
                    styleOverrides: {
                         root: {
                              '& .MuiOutlinedInput-root.Mui-disabled': {
                                   backgroundColor: 'rgba(144, 144, 144, 0.1)',
                              },
                              '& .MuiOutlinedInput-root': {
                                   borderRadius: "8px",
                              },
                              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                   borderColor: '#C2410B',
                              },
                              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                   borderColor: '#C2410B',
                              },
                              //bold mui label
                              '& .MuiFormLabel-root': {
                                   color: '#909090',
                              },
                              '& .MuiFormLabel-root.Mui-focused': {
                                   fontWeight: '500',
                                   color: '#C2410B',
                                   fontSize: '1rem',
                              },
                              //asterisk color to red
                              '& .MuiFormLabel-asterisk': {
                                   color: 'red',
                              },
                         }
                    }
               },
               MuiTypography: {
                    styleOverrides: {
                         root: {
                              color: 'rgba(144, 144, 144, 1)',
                         }
                    }
               },
               MuiOutlinedInput: {
                    styleOverrides: {
                         root: {
                              //when disabled
                              '&.Mui-disabled': {
                                   backgroundColor: 'rgba(144, 144, 144, 0.1)',
                              },
                              '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                   borderColor: '#C2410B',
                              },
                              borderRadius: "8px",
                         }
                    }
               },
               MuiInputLabel: {
                    styleOverrides: {
                         root: {
                              //change label color when focused
                              '&.Mui-focused': {
                                   color: '#C2410B',
                              },
                         }
                    }
               }
          }
     })
     return (
          <ThemeProvider theme={theme}>
               {children}
          </ThemeProvider>
     );
}
