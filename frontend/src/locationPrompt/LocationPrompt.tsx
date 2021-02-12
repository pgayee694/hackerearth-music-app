import {
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { noop } from '../utils/noop';

import styles from './LocationPrompt.module.css';

export interface LocationPromptProps {
  isOpen: boolean;
}

export function LocationPrompt({ isOpen }: LocationPromptProps) {
  return (
    <Modal isOpen={isOpen} isCentered size="md" onClose={noop}>
      <ModalOverlay className={styles.overlay} />
      <ModalContent m="2">
        <ModalHeader textAlign="center">Waiting for a GPS signal</ModalHeader>
        <ModalBody textAlign="center">
          <Spinner thickness="4px" speed="0.65s" size="xl" />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
