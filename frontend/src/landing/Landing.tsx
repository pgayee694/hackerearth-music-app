import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
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
        <Center height="100%">
          <VStack spacing="48px">
            <Heading className={styles.heading} as="h1" size="4xl">
              vibe
            </Heading>
            <Text>A musical odyssey guided by your surroundings.</Text>
            <Button
              aria-label="Get Started"
              onClick={onGetStartedClicked}
              isFullWidth
            >
              Get Started
            </Button>
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
}
