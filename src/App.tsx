import React from 'react';
import logo from './logo.svg';
import MainPage from './pages/MainPage/MainPage';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <MainPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
