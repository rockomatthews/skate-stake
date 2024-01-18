import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for main content
      light: '#0e0e0e', //lighter black
      white: '#ffffff',
      yellow: '#fed700', // accent color
      yellowHover: '#fdd835'
    },
    text: {
      light: '#ffffff', // White text
      dark: '#000000'
    },
    // ... other palette options
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    // Override styles for MUI Box component
    MuiBox: {
      styleOverrides: {
        root: {
          // Apply your custom styles here
          marginTop: '0px', // example to override default top margin
          // other styles you want to override can be added here
        },
      },
    },
    // You can add overrides for other MUI components in a similar way
  },
});

export default theme;
