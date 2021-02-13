import { Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceSelect } from '../deviceSelect/DeviceSelect';
import { LocationPrompt } from '../locationPrompt/LocationPrompt';
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
  const hasSelectedDevice = useSelector(ClientSelectors.hasSelectedDevice);
  const hasLocation = useSelector(ClientSelectors.hasLocation);
  const deviceId = useSelector(ClientSelectors.getSelectedDeviceId);
  const hasStartedPlayback = useSelector(ClientSelectors.hasStartedPlayback);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPlayerOpen) {
      dispatch(PlayerActions.openPlayer());
    }
  });

  useEffect(() => {
    if (!hasStartedPlayback && location && deviceId && auth) {
      dispatch(
        PlayerActions.startPlayback({
          location,
          deviceId,
          hour: getCurrentHour(),
          token: auth.accessToken,
        }),
      );
    }
  });

  return (
    <Player>
      <DeviceSelect isOpen={!hasSelectedDevice} />
      <LocationPrompt isOpen={hasSelectedDevice && !hasLocation} />
      <Box className="Home" width="100%" height="100%" p="4">
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
