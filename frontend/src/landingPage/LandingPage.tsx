import {
  Box,
  Button,
  Center,
  Flex,
  VStack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClientActions } from '../state/clientState/ClientActions';
import { ClientSelectors } from '../state/clientState/ClientSelectors';

import styles from './LandingPage.module.css';

export function LandingPage() {
  const dispatch = useDispatch();
  const isFetchingClientId = useSelector(ClientSelectors.isFetchingClientId);

  return (
    <Box className="Landing" width="100%" height="100%" p="2">
      <Flex direction="column" height="100%" flexFlow="column">
        <Center height="100%">
          <VStack spacing="10" p="2">
            <Heading
              size="xl"
              sx={{
                '@media (max-width: 800px)': {
                  fontSize: '1.5rem',
                },
              }}
              textAlign="left"
              className={styles.tagLine}
            >
              <VStack spacing="4" alignItems="start">
                <Text
                  pr="6"
                  sx={{
                    '@media (max-width: 800px)': {
                      padding: 0,
                    },
                  }}
                >
                  A musical odyssey.
                </Text>
                <Text
                  pl="6"
                  sx={{
                    '@media (max-width: 800px)': {
                      padding: 0,
                    },
                  }}
                >
                  Guided by your surroundings.
                </Text>
              </VStack>
            </Heading>
            <Button
              aria-label="Get Started"
              onClick={() => dispatch(ClientActions.getStartedClicked())}
              rightIcon={<ArrowForwardIcon />}
              isLoading={isFetchingClientId}
            >
              Get Started
            </Button>
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
}
