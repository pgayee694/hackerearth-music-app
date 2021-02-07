import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';
import * as config from '../config.json';
import React from 'react';
import { redirect } from '../utils/redirect';

import styles from './Landing.module.css';

export function Landing() {
  const onGetStartedClicked = () => {
    redirect(config.auth, {
      client_id: config.clientId,
      redirect_uri: `${window.location.origin}/redirect`,
      response_type: 'token',
      show_dialog: true,
      scope: ['app-remote-control', 'user-read-playback-state'],
    });
  };

  return (
    <Box className="Landing" width="100%" height="100%">
      <Flex direction="column" height="100%" flexFlow="column">
        <Heading className={styles.heading}>Vibe</Heading>
        <Center height="100%">Vibe</Center>
        <Center height="96px" margin="24px">
          <Button aria-label="Get Started" onClick={onGetStartedClicked}>
            Get Started
          </Button>
        </Center>
      </Flex>
    </Box>
  );
}
