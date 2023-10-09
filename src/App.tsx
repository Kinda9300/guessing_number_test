import { CssBaseline } from '@mui/material';
import { WagmiConfig } from 'wagmi'
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom'
import theme from './theme';
import { config } from './wagmi'
import { Game } from './pages/Game';

export function App() {
  return (
    <WagmiConfig config={config}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Game />
          <CssBaseline />
        </BrowserRouter>
      </ThemeProvider>
    </WagmiConfig>
  )
}
