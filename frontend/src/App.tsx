import './App.css';
import { Box, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Home } from './home/Home';

function App() {
  return (
    <ChakraProvider>
      <Box className="App" width="100%" height="100%">
        <Home />
      </Box>
    </ChakraProvider>
  );
}

export default App;
