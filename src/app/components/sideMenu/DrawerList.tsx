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
import { useState } from 'react';
import { grey } from '@mui/material/colors';

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
  const [selectedIndex, setSelectedIndex] = useState(1);
  const onClick = (index: number) => {
    setSelectedIndex(index);
  };
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
            <ListItemButton
              component={Link}
              href={item.path}
              onClick={() => {
                onClick(index);
              }}
            >
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
