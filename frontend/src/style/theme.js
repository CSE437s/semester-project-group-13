import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    primary: {
      50: '#e6ebf6',
      100: '#bcc9e1',
      200: '#91a7cc',
      300: '#6785b7',
      400: '#3d63a2',
      500: '#2d6cb5', // Predominantly shades of blue
      600: '#225591',
      700: '#193d6e',
      800: '#0f254a',
      900: '#060c27',
    },
    customGreen: '#4cb748', // Some green
    customBlue: '#2d6cb5', // Predominantly shades of blue
    customGray: {
      50: '#f9f9f9',
      100: '#f0f0f0',
      200: '#e6e6e6',
      300: '#cccccc',
      400: '#b3b3b3',
      500: '#999999',
      600: '#808080',
      700: '#666666',
      800: '#4d4d4d',
      900: '#333333',
    },
    customRed: {
      50: '#fdf2f2',
      100: '#f8d8d8',
      200: '#f3bfbf',
      300: '#edb5b5',
      400: '#e89b9b',
      500: '#e38080',
      600: '#cc6666',
      700: '#b84d4d',
      800: '#a33333',
      900: '#8f1919',
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
  components: {
    Flex: {
      variants: {
        mainDisplay: {
          id: 'mainDisplay',
          maxWidth: '85vw',
          width: '85vw',
          flexDir: 'column',
          justifyContent: 'flex-start',
        },
      },
    },
    Table: {
      variants: {
        main: {
          table: {
            mt: '2px',
            mx: 2,
            width: '100%',
            overflow: 'hidden',
          },
          th: {
            backgroundColor: 'primary.500', // Updated to primary.500 (shades of blue)
            color: 'white',
            padding: '8px',
            borderBottom: '2px solid white',
            maxHeight: '4vh',
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
                color: 'gray',
              },
            },
          },
        },
      },
    },
    Button: {
      variants: {
        dark: {
          bg: 'primary.500', // Updated to primary.500 (shades of blue)
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        lessDark: {
          bg: 'primary.400', // Updated to primary.400 (shades of blue)
          color: 'white',
          _hover: {
            bg: 'primary.300',
          },
        },
        solid: {
          bg: 'primary.600', // Updated to primary.600 (shades of blue)
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
        },
        outline: {
          border: 'solid primary.500 2px', // Updated to primary.500 (shades of blue)
          bg: 'customGray.300',
          color: '#FAFAFA', // Updated to #FAFAFA (lighter text)
          _hover: {
            bg: 'customGray.200',
          },
        },
        danger: {
          bg: 'customRed.600',
          color: 'white',
          _hover: {
            bg: 'customRed.500',
          },
        },
      },
    },
  },
});

export default theme;
