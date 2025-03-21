import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { DropdownProvider } from './components/Dropdown/DropdownContext';
import AppRouter from './router/router';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
        <DropdownProvider>
          <AppRouter />
        </DropdownProvider>
    </ThemeProvider>
  );
}

export default App;
