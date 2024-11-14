import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'next-auth/react';

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gazelle
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
