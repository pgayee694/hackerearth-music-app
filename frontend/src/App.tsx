import './App.css';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Landing } from './landing/Landing';
import { Home } from './home/Home';
import { Redirect } from './redirect/Redirect';

export function App() {
  return (
    <Box className="App" width="100%" height="100%">
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/redirect" component={Redirect} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </Box>
  );
}
