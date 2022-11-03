import Login from './components/Login'
import Homepage from './components/Homepage'
import Register from './components/Register'
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { lightBlue, deepPurple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(
  {
    palette: {
      primary: lightBlue,
      secondary: lightBlue,
      text: deepPurple,
    },
  }
  )
  
function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Homepage/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
