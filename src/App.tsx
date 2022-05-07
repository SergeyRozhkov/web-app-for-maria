import React from 'react';
import './App.css';
import {ThemeProvider, useTheme} from "@mui/styles";
import MainRouter from "./screens/MainRouter";

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <MainRouter/>
    </ThemeProvider>
  );
}

export default App;
