import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 'bolder',
      },
    },
  },
});
