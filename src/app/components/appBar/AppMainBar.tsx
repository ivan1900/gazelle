'use client';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'next-auth/react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Link from 'next/link';
import { spacing } from '@/app/designTokens';

interface Props {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export default function AppMainBar(props: Props) {
  const { drawerWidth, handleDrawerToggle } = props;
  const theme = useTheme();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        backgroundColor: '#FFFFFF',
        boxShadow: `0 1px 3px rgba(0, 0, 0, 0.08)`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: '56px', md: '64px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: spacing.md, md: spacing.lg },
        }}
      >
        {/* Left section - Menu & Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Abrir menú de navegación"
            aria-expanded={false}
            onClick={handleDrawerToggle}
            sx={{
              mr: spacing.sm,
              display: { md: 'none' },
              color: theme.palette.text.primary,
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: theme.palette.primary.main,
              letterSpacing: '-0.5px',
            }}
          >
            Gazelle
          </Typography>
        </Box>

        {/* Right section - Settings & Logout */}
        <Box sx={{ display: 'flex', gap: spacing.sm }}>
          <IconButton
            component={Link}
            href="/dashboard/settings"
            aria-label="Abrir configuración de usuario"
            title="Configuración"
            size="large"
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px',
              },
            }}
          >
            <SettingsRoundedIcon />
          </IconButton>
          <IconButton
            aria-label="Cerrar sesión actual"
            title="Cerrar sesión"
            size="large"
            onClick={handleLogout}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px',
              },
            }}
          >
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
