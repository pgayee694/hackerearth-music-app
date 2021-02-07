import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa'

export function Home() {
  const [isPlaying, setIsPlaying] = useState(false)

  const onPlayClicked = () => {}
  const onPauseClicked = () => {}

  return (
    <Box className="Home" width="100%" height="100%">
      <Flex direction="column" height="100%" flexFlow="column">
        <Box flex="1" overflow="scroll">
          Your information.
        </Box>
        <Divider />
        <Center height="48px" margin="24px">
          <HStack spacing="24px">
            <IconButton aria-label="Previous">
              <Icon as={FaStepBackward} />
            </IconButton>
            {isPlaying ? (
              <IconButton aria-label="Pause" onClick={() => onPauseClicked()}>
                <Icon as={FaPause} />
              </IconButton>
            ) : (
              <IconButton aria-label="Play" onClick={() => onPlayClicked()}>
                <Icon as={FaPlay} />
              </IconButton>
            )}
            <IconButton aria-label="Next Song">
              <Icon as={FaStepForward} />
            </IconButton>
          </HStack>
        </Center>
      </Flex>
    </Box>
  )
}
