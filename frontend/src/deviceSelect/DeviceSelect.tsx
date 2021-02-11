import {
  Text,
  Button,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClientActions } from '../state/clientState/ClientActions';
import { ClientSelectors } from '../state/clientState/ClientSelectors';
import { noop } from '../utils/noop';

import styles from './DeviceSelect.module.css';

export interface DeviceSelectProps {
  isOpen: boolean;
}

export function DeviceSelect({ isOpen }: DeviceSelectProps) {
  const devices = useSelector(ClientSelectors.getDevices);
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} isCentered size="lg" onClose={noop}>
      <ModalOverlay className={styles.overlay} />
      <ModalContent m="2">
        <ModalHeader textAlign="center">Select a device</ModalHeader>
        <ModalBody>
          <List spacing="3">
            {!devices.length && <Text align="center">No devices found</Text>}
            {devices.map((device) => (
              <ListItem key={device.id}>
                <Button
                  isFullWidth
                  onClick={() =>
                    dispatch(ClientActions.deviceSelected(device.id))
                  }
                >
                  {device.name}
                </Button>
              </ListItem>
            ))}
          </List>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
