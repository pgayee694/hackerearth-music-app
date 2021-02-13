import { Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeviceSelect } from '../deviceSelect/DeviceSelect';
import { LocationPrompt } from '../locationPrompt/LocationPrompt';
import { Player } from '../player/Player';
import { ClientActions } from '../state/clientState/ClientActions';
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
  const songLengths = useSelector(ClientSelectors.songLengths);
  const currSongLength = useSelector(ClientSelectors.currSongLength);
  const isQueuingSongs = useSelector(ClientSelectors.isQueuingSongs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPlayerOpen) {
      dispatch(PlayerActions.openPlayer());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (
      !isQueuingSongs &&
      !hasStartedPlayback &&
      location &&
      deviceId &&
      auth
    ) {
      dispatch(
        ClientActions.startPlayback({
          location,
          deviceId,
          hour: getCurrentHour(),
          token: auth.accessToken,
        }),
      );
    }
  });

  useEffect(() => {
    if (
      songLengths.length <= 3 &&
      hasStartedPlayback &&
      !isQueuingSongs &&
      location &&
      deviceId &&
      auth
    ) {
      dispatch(
        ClientActions.queueSongs({
          location,
          deviceId,
          hour: getCurrentHour(),
          token: auth?.accessToken,
        }),
      );
    }
  });

  useEffect(() => {
    if (hasStartedPlayback) {
      setTimeout(() => {
        console.log('in the set timeout');
        dispatch(ClientActions.songFinished());
      }, currSongLength);
    }
  });

  useEffect(() => {
    if (hasStartedPlayback) {
      dispatch(PlayerActions.playbackStarted());
    }
  }, [dispatch, hasStartedPlayback]);

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
            }).catch(() => {
              console.log('Vibe request failed');
            })
          }
        >
          Test api thing
        </Button>
      </Box>
    </Player>
  );
}
