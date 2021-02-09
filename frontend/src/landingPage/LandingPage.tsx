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
import * as config from '../config.json';
import React from 'react';
import { redirect } from '../utils/redirect';

import styles from './LandingPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ClientActions } from '../state/clientState/ClientActions';
import { ClientSelectors } from '../state/clientState/ClientSelectors';

export function LandingPage() {
  const dispatch = useDispatch();
  const isFetchingClientId = useSelector(ClientSelectors.isFetchingClientId);

  return (
    <Box className="Landing" width="100%" height="100%">
      <Flex direction="column" height="100%" flexFlow="column">
        <Center height="100%">
          <VStack spacing="10">
            <Heading size="xl" textAlign="left" className={styles.tagLine}>
              <VStack spacing="4" alignItems="start">
                <Text pr="6">A musical odyssey.</Text>
                <Text pl="6">Guided by your surroundings.</Text>
              </VStack>
            </Heading>
            <Button
              aria-label="Get Started"
              size="lg"
              onClick={() => dispatch(ClientActions.getStartedClicked())}
              minW="sm"
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
