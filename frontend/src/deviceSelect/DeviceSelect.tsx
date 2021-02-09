import {
  Box,
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

export function DeviceSelect() {
  const devices = useSelector(ClientSelectors.getDevices);
  const hasSelectedDevice = useSelector(ClientSelectors.hasSelectedDevice);
  const dispatch = useDispatch();

  return (
    <Modal isOpen={!hasSelectedDevice} isCentered size="lg" onClose={() => {}}>
      <ModalOverlay />
      <ModalContent m="2">
        <ModalHeader textAlign="center">Select a device</ModalHeader>
        <ModalBody>
          <List spacing="3">
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
