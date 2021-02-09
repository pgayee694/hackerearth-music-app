import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: '"Baloo Chettan 2", sans-serif',
        fontWeight: 'bolder',
      },
    },
  },
});
