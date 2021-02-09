import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteProps, useHistory } from 'react-router-dom';
import { ClientActions } from '../state/clientState/ClientActions';
import { extractHashValues } from '../utils/extractHashValues';
import { isValidAuthResponse } from '../utils/isValidAuthResponse';

export function RedirectPage({ location }: RouteProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!location?.hash) {
      return;
    }

    const hashValues = extractHashValues(location.hash);

    if (isValidAuthResponse(hashValues)) {
      history.push('/');

      dispatch(
        ClientActions.clientAuthorized({
          expiresIn: Number(hashValues.expires_in),
          accessToken: hashValues.access_token,
          tokenType: hashValues.token_type,
        })
      );
    }
  }, []);

  return <Box className="Landing" width="100%" height="100%" p="2" />;
}
