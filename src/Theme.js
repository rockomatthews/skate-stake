import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for main content
      light: '#0e0e0e', // Slightly lighter color for sidebar and header
      yellow: '#fed700', // accent color
      yellowHover: '#fdd835'
    },
    text: {
      light: '#ffffff', // White text
      dark: '#000000'
    },
    // ... other palette options
  },
  // ... other theme options
});

export default theme;
