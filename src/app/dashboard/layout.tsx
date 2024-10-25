'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import AppMainBar from '../components/appBar/appMainBar';
import SideMenu from '../components/sideMenu/sideMenu';

import DashboardSkeleton from '../components/dashboard/skeleton';
import { useSession } from 'next-auth/react';

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {}, [session]);
  const session = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    console.log('handleDrawerToggle');
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // todo llevar a componente dashboard que se client side y mantener layoud en server side
  return (
    <>
      {session.status === 'loading' && <DashboardSkeleton />}

      {session.status === 'authenticated' && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          <AppMainBar
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />

          <SideMenu
            drawerWidth={drawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerClose={handleDrawerClose}
            handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          />

          <Box
            component='main'
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      )}
    </>
  );
}
