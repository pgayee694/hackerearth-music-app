import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

import styles from './Header.module.css';

export function Header() {
  return (
    <Box p="3" width="100%" bg="gray.900">
      <Heading className={styles.header} as="h1" size="4xl">
        vibe
      </Heading>
    </Box>
  );
}
