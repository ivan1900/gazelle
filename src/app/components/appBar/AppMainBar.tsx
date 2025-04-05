import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'next-auth/react';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Link from 'next/link';

interface Props {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export default function AppMainBar(props: Props) {
  const { drawerWidth, handleDrawerToggle } = props;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // for over drawer, next lines for drawer toolbar visible
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gazelle
        </Typography>
        <IconButton
          component={Link}
          href="/dashboard/settings"
          aria-label="settings"
          color="inherit"
          size="large"
        >
          <SettingsRoundedIcon />
        </IconButton>
        <IconButton
          aria-label="exit"
          color="inherit"
          size="large"
          onClick={handleLogout}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
