import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  VStack,
  Text,
  Container,
} from '@chakra-ui/react';
import * as config from '../config.json';
import React from 'react';
import { redirect } from '../utils/redirect';

import styles from './LandingPage.module.css';

export function LandingPage() {
  const onGetStartedClicked = () => {
    redirect(config.auth, {
      client_id: null, // TODO: use selector here
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
          <Box p="10" borderWidth="1px" borderRadius="10px" shadow="xl">
            <VStack spacing="48px">
              <Heading className={styles.heading} as="h1" size="4xl">
                vibe
              </Heading>
              <Text>A musical odyssey guided by your surroundings.</Text>
              <Button
                aria-label="Get Started"
                size="lg"
                onClick={onGetStartedClicked}
                isFullWidth
              >
                Get Started
              </Button>
            </VStack>
          </Box>
        </Center>
      </Flex>
    </Box>
  );
}
