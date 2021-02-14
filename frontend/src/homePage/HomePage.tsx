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
    if (!isQueuingSongs && !hasStartedPlayback && hasSelectedDevice) {
      dispatch(ClientActions.startPlayback());
    }
  }, [isQueuingSongs, hasStartedPlayback, hasSelectedDevice, dispatch]);

  useEffect(() => {
    if (songLengths.length <= 3 && hasStartedPlayback && !isQueuingSongs) {
      dispatch(ClientActions.queueSongs());
    }
  }, [songLengths, hasStartedPlayback, isQueuingSongs, dispatch]);

  useEffect(() => {
    if (hasStartedPlayback) {
      setTimeout(() => {
        dispatch(ClientActions.songFinished());
      }, currSongLength);
    }
  }, [hasStartedPlayback, currSongLength, dispatch]);

  useEffect(() => {
    if (hasStartedPlayback) {
      dispatch(PlayerActions.playbackStarted());
    }
  }, [hasStartedPlayback, dispatch]);

  return (
    <Player>
      <DeviceSelect isOpen={!hasSelectedDevice} />
      <LocationPrompt isOpen={hasSelectedDevice && !hasLocation} />
      <Box className="Home" width="100%" height="100%" p="4"></Box>
    </Player>
  );
}
