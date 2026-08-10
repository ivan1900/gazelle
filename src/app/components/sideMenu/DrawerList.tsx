'use client';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  alpha,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { spacing } from '@/app/designTokens';

const menuItems = [
  {
    name: 'Home',
    label: 'Dashboard',
    icon: DashboardIcon,
    path: '/dashboard/home',
  },
  {
    name: 'Daily activities',
    label: 'Actividades',
    icon: AppRegistrationIcon,
    path: '/dashboard/activities',
  },
  {
    name: 'Notes',
    label: 'Bitácora',
    icon: NoteAltIcon,
    path: '/dashboard/notes',
  },
];

export default function DrawerList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const path = usePathname();
  const theme = useTheme();

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.path === path);
    setSelectedIndex(index !== -1 ? index : 0);
  }, [path]);

  return (
    <div>
      <Toolbar />
      <Divider sx={{ my: spacing.md }} />
      <List sx={{ px: spacing.sm }}>
        {menuItems.map((item, index) => {
          const isActive = index === selectedIndex;
          return (
            <ListItem
              key={item.name}
              disablePadding
              sx={{
                mb: spacing.xs,
              }}
            >
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.1)
                    : 'transparent',
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  '& .MuiListItemIcon-root': {
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    minWidth: '40px',
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.9375rem',
                  },
                  '&:hover': {
                    backgroundColor: alpha(
                      theme.palette.primary.main,
                      isActive ? 0.15 : 0.08
                    ),
                  },
                  py: spacing.md,
                  px: spacing.md,
                }}
              >
                <ListItemIcon>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ my: spacing.md }} />
    </div>
  );
}
