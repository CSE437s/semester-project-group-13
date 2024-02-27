import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    primary: {
      50: '#f2ebf8',
      100: '#d9c8ef',
      200: '#c0a4e5',
      300: '#a77fdf',
      400: '#8e5bd5',
      500: '#7431cb',
      600: '#5c26a8',
      700: '#471d86',
      800: '#311563',
      900: '#1c0b41',
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        outline: {
            border: 'solid primary.500 2px',
            bg: 'primary.100',
            color: 'white',
            _hover: {
                bg: 'primary.2000',
            },
        },
      },
    },
  },
});

export default theme;