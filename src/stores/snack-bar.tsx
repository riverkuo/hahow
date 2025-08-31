import { SnackbarProvider as NotistackProvider } from 'notistack';

export function SnackBarProvider({ children }: { children: React.ReactNode }) {
  return (
    <NotistackProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={1000}>
      {children}
    </NotistackProvider>
  );
}
