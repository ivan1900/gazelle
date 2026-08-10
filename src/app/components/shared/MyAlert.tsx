'use client';
import { Alert, Snackbar, useTheme } from '@mui/material';

interface Props {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  handleClose: () => void;
  autoHideDuration?: number;
}

export default function MyAlert(props: Props) {
  const { open, message, severity, handleClose, autoHideDuration = 5000 } = props;
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          borderRadius: '8px',
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15)`,
          backgroundColor: 'transparent',
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: '100%',
          borderRadius: '8px',
          minWidth: '300px',
          fontSize: '0.95rem',
          fontWeight: 500,
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15)`,
          '& .MuiAlert-icon': {
            marginRight: '12px',
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
