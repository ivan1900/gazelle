import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { spacing, borderRadius } from '@/app/designTokens';

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  response: (response: boolean) => void;
  confirmText?: string;
  cancelText?: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
}

export default function MyDialog(props: Props) {
  const {
    isOpen,
    title,
    description,
    response,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    severity = 'info',
  } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth={isSmallScreen}
      slotProps={{
        paper: {
          sx: {
            borderRadius: borderRadius.lg,
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15)`,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
          paddingBottom: spacing.md,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ paddingY: spacing.lg }}>
        <DialogContentText
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          padding: spacing.lg,
          gap: spacing.md,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          onClick={() => response(false)}
          color="inherit"
          variant="outlined"
          sx={{
            borderColor: theme.palette.divider,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={() => response(true)}
          variant="contained"
          color={
            severity === 'error'
              ? 'error'
              : severity === 'success'
                ? 'success'
                : severity === 'warning'
                  ? 'warning'
                  : 'primary'
          }
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
