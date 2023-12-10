import Header from './components/Header'
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className="App">
          <Header />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
