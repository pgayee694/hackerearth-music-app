import { Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceSelect } from '../deviceSelect/DeviceSelect';
import { Player } from '../player/Player';
import { ClientSelectors } from '../state/clientState/ClientSelectors';
import { PlayerActions } from '../state/playerState/PlayerActions';
import { PlayerSelectors } from '../state/playerState/PlayerSelectors';
import { getCurrentHour } from '../utils/getCurrentHour';
import { Method, request } from '../utils/request';

export function HomePage() {
  const isPlayerOpen = useSelector(PlayerSelectors.isOpen);
  const location = useSelector(ClientSelectors.getLocation);
  const auth = useSelector(ClientSelectors.getAuth);
  const deviceId = useSelector(ClientSelectors.getSelectedDeviceId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPlayerOpen) {
      dispatch(PlayerActions.openPlayer());
    }
  });

  return (
    <Player>
      <DeviceSelect />
      <Box className="Home" width="100%" height="100%" p="4">
        Pick a genre and then we show you stuff.
        <Button
          onClick={() =>
            request('/vibe', {
              method: Method.Post,
              body: {
                location,
                deviceId,
                hour: getCurrentHour(),
                token: auth?.accessToken,
              },
            })
          }
        >
          Test api thing
        </Button>
      </Box>
    </Player>
  );
}
