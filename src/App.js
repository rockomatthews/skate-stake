import { AuthProvider } from './AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { ActiveTabProvider } from './ActiveTabContext';
import Header from './components/Header'
import theme from './Theme';
import MainContent from './components/MainContent';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ActiveTabProvider>
          <div className="App" style={{ backgroundColor: theme.palette.primary.main }}>
            <Header />
            <MainContent />
          </div>
        </ActiveTabProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
