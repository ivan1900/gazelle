'use client';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { spacing, borderRadius } from '@/app/designTokens';

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export default function MyModal(props: MyModalProps) {
  const {
    isOpen,
    onClose,
    maxWidth = 'sm',
    title,
    children,
    showCloseButton = true,
  } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={isSmallScreen}
      slotProps={{
        paper: {
          sx: {
            borderRadius: isSmallScreen ? 0 : borderRadius.lg,
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.15)`,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '1.25rem',
          fontWeight: 600,
          paddingRight: spacing.sm,
          borderBottom: `1px solid ${theme.palette.divider}`,
          minHeight: '64px',
        }}
      >
        <Box sx={{ flex: 1 }}>{title}</Box>
        {showCloseButton && (
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="cerrar"
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          paddingTop: spacing.lg,
          paddingBottom: spacing.lg,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.action.active,
            },
          },
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
