import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import { DropdownProvider } from './components/Dropdown/DropdownContext';
import AppRouter from './router/router';
import { BrowserRouter } from 'react-router-dom';
import { getEmployees } from './services/api/EmployeesAPI/Employees';
import { getTasks } from './services/api/test';

function App() {

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/scalar/#tag/statuses/GET/statuses", {
      method: "GET",
      headers: {
        "Authorization": "Bearer 9e6e183c-aced-455d-902c-fb6eba59124b"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error("Fetch error: ", error));
  })
  
  return (
    <ThemeProvider theme={theme}>
        <DropdownProvider>
          <AppRouter />
        </DropdownProvider>
    </ThemeProvider>
  );
}

export default App;
