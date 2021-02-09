import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Player } from '../player/Player';
import { PlayerActions } from '../state/playerState/PlayerActions';
import { PlayerSelectors } from '../state/playerState/PlayerSelectors';

export function HomePage() {
  const isPlayerOpen = useSelector(PlayerSelectors.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPlayerOpen) {
      dispatch(PlayerActions.openPlayer());
    }
  });

  return (
    <Player>
      <Box className="Home" width="100%" height="100%">
        Pick a genre and then we show you stuff.
      </Box>
    </Player>
  );
}
