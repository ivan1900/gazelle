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
  },
];

export default function DrawerList() {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}
