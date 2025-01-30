import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    name: 'Home',
    label: 'Home',
    icon: DashboardIcon,
    path: '/dashboard/home',
  },
  {
    name: 'Daily activities',
    label: 'Actividad',
    icon: AppRegistrationIcon,
    path: '/dashboard/activities',
  },
];

export default function DrawerList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const path = usePathname();

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.path === path);
    setSelectedIndex(index);
  }, [path]);

  return (
    <div>
      <Toolbar></Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              backgroundColor: index === selectedIndex ? grey[200] : '',
            }}
          >
            {/* <Link href={item.path}> */}
            <ListItemButton component={Link} href={item.path}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
            {/* </Link> */}
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}
