import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: '"Baloo Chettan 2", sans-serif',
        fontWeight: 'bolder',
      },
    },
  },
});
