import { theme } from '@/utils/theme';
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { Error as ErrorIcon } from '@mui/icons-material';
import type { Dispatch, SetStateAction } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type DialogProps = {
  type: 'error';
  title?: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function Dialog(props: DialogProps) {
  const { type, title, content, onClose, onConfirm, confirmText, cancelText, open, setOpen } = props;

  function handleClose() {
    setOpen(false);
    onClose();
  }

  function handleConfirm() {
    setOpen(false);
    onConfirm();
  }

  return (
    <MuiDialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {type === 'error' && <ErrorIcon />}
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{cancelText || '取消'}</Button>
        <Button onClick={handleConfirm}>{confirmText || '確認'}</Button>
      </DialogActions>
    </MuiDialog>
  );
}
