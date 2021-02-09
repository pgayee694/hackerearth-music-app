import './App.css';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './landingPage/LandingPage';
import { HomePage } from './homePage/HomePage';
import { RedirectPage } from './redirectPage/RedirectPage';
import { useDispatch } from 'react-redux';
import { ClientActions } from './state/clientState/ClientActions';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClientActions.clientIdRequested());
  }, []);

  return (
    <Box className="App" width="100%" height="100%">
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/redirect" component={RedirectPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </Box>
  );
}
