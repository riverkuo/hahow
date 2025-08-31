import { ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './index.css';
import { QueryProvider } from './stores/qurey-client.tsx';
import { theme } from './utils/theme.ts';
import { SnackBarProvider } from './stores/snack-bar.tsx';
import { DialogProvider } from './stores/dialog.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <DialogProvider>
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <App />
          </SnackBarProvider>
        </ThemeProvider>
      </DialogProvider>
    </QueryProvider>
  </StrictMode>
);
