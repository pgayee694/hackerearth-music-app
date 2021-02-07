import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { ClientActions } from '../state/clientState/ClientActions';
import { extractHashValues } from '../utils/extractHashValues';
import { isValidAuthResponse } from '../utils/isValidAuthResponse';

export function Redirect({ location }: RouteProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.hash) {
      return;
    }

    const hashValues = extractHashValues(location.hash);

    if (isValidAuthResponse(hashValues)) {
      dispatch(
        ClientActions.clientAuthorized({
          expiresIn: Number(hashValues.expires_in),
          accessToken: hashValues.access_token,
          tokenType: hashValues.token_type,
        })
      );
    }
  }, []);

  return null;
}
