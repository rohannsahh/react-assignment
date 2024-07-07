import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Switch, FormControlLabel } from '@mui/material';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';
import 'react-phone-number-input/style.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label="Dark Mode"
        />
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/second-page" element={<PrivateRoute component={SecondPage} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const PrivateRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? <Component /> : <Navigate to="/" />;
};

export default App;