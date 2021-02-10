import { Heading, VStack, Text } from '@chakra-ui/react';
import React from 'react';

export class ErrorBoundary extends React.Component {
  public state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <VStack>
          <Heading>
            <Text align="center">Something went wrong</Text>
          </Heading>
          <Text align="center">
            An error occurred, please refresh the page.
          </Text>
        </VStack>
      );
    }

    return this.props.children;
  }
}
