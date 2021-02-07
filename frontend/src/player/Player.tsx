import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import {
  FaHeart,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerActions } from '../state/playerState/PlayerActions';
import { PlayerSelectors } from '../state/playerState/PlayerSelectors';

interface Props {
  children: ReactNode;
}

export function Player({ children }: Props) {
  const isOpen = useSelector(PlayerSelectors.isOpen);
  const isPlaying = useSelector(PlayerSelectors.isPlaying);
  const dispatch = useDispatch();

  return (
    <Box className="Player" width="100%" height="100%">
      <Flex direction="column" height="100%" flexFlow="column">
        <Box flex="1" overflow="scroll">
          {children}
        </Box>
        <Collapse in={isOpen} animateOpacity unmountOnExit>
          <Divider />
          <Center height="48px" margin="24px">
            <HStack spacing="24px">
              <IconButton
                aria-label="Like Song"
                onClick={() => dispatch(PlayerActions.likeSongClicked())}
              >
                <Icon as={FaHeart} />
              </IconButton>
              <IconButton
                aria-label="Previous"
                onClick={() => dispatch(PlayerActions.previousSongClicked())}
              >
                <Icon as={FaStepBackward} />
              </IconButton>
              {isPlaying ? (
                <IconButton
                  aria-label="Pause"
                  onClick={() => dispatch(PlayerActions.pauseClicked())}
                >
                  <Icon as={FaPause} />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="Play"
                  onClick={() => dispatch(PlayerActions.playClicked())}
                >
                  <Icon as={FaPlay} />
                </IconButton>
              )}
              <IconButton
                aria-label="Next Song"
                onClick={() => dispatch(PlayerActions.nextSongClicked())}
              >
                <Icon as={FaStepForward} />
              </IconButton>
              <Button aria-label="Up Next">Up Next</Button>
            </HStack>
          </Center>
        </Collapse>
      </Flex>
    </Box>
  );
}
