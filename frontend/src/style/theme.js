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
    Flex : {
      variants: {
        mainDisplay : {
          id: "mainDisplay",
          maxWidth: '85vw',
          width: '85vw',
          flexDir: 'column',
          justifyContent: 'flex-start'
        }
      }
    },
    Table: {
      variants: {
        main: {
          table: {
            mt: '2px',
            width: '100%',
            overflow: 'hidden'
          },
          th: {
            backgroundColor: 'primary.600',
            color: 'white',
            padding: '8px',
            borderBottom: '2px solid white',
            maxHeight: '4vh'
          },
          td: {
            padding: '8px',
            borderBottom: '1px solid #ddd',
          },
          table: {
            borderRadius: 'md', // Rounded edges
          },
          tbody: {
            tr: {
              _hover: {
                bg: 'primary.50', // Background color on hover
                color: 'gray'
              },
            },
          },
        },
      },
    },
    Button: {
      variants: {
        dark: {
          bg: 'primary.800',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        solid: {
          bg: 'primary.600',
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
        },
        outline: {
          border: 'solid primary.800 2px',
          bg: 'primary.300',
          color: 'white',
          _hover: {
            bg: 'primary.200',
          },
        },
      },
    },
  },
});

export default theme;
