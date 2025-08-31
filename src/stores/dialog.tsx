import { Button } from '@/components/button';
import { Error as ErrorIcon } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { createContext, forwardRef, useContext, useState, type ReactElement, type Ref } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type DialogConfig = {
  type: 'error';
  title?: string;
  content: string;
  cancel?: {
    text?: string;
    onClick?: () => void;
  };
  confirm?: {
    text?: string;
    onClick?: () => void;
  };
};

export const DialogContext = createContext<{ onOpenDialog: (props: DialogConfig) => void }>({
  onOpenDialog: () => {},
});

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<Omit<DialogConfig, 'open' | 'setOpen'>>({
    type: 'error',
    content: '',
    cancel: undefined,
    confirm: undefined,
    title: '',
  });

  function onOpenDialog(props: Omit<DialogConfig, 'open' | 'setOpen'>) {
    setDialogProps((prev) => ({ ...prev, ...props, open: true }));
    setOpen(true);
  }

  const value: { onOpenDialog: (props: Omit<DialogConfig, 'open' | 'setOpen'>) => void } = {
    onOpenDialog,
  };

  function handleClose() {
    setOpen(false);
    dialogProps.cancel?.onClick?.();
  }

  function handleConfirm() {
    setOpen(false);
    dialogProps.confirm?.onClick?.();
  }

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {dialogProps.type === 'error' && <ErrorIcon color="error" />}
          <Typography color={dialogProps.type === 'error' ? 'error' : 'inherit'}>{dialogProps.title}</Typography>
        </DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <DialogContentText id="alert-dialog-slide-description">{dialogProps.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {dialogProps.cancel && (
            <Button color="secondary" onClick={handleClose}>
              {dialogProps.cancel.text || '取消'}
            </Button>
          )}
          {dialogProps.confirm && (
            <Button color="secondary" onClick={handleConfirm}>
              {dialogProps.confirm.text || '確認'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
