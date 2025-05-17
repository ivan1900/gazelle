'use client';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface Props {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  handleClose: () => void;
}

export default function MyAlert(props: Props) {
  const { open, message, severity, handleClose } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
