'use client';

import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, useTheme } from '@mui/material';
import AppMainBar from '../../components/appBar/AppMainBar';
import SideMenu from '../../components/sideMenu/SideMenu';
import { spacing } from '@/app/designTokens';

const drawerWidth = 280;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const theme = useTheme();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
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
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: '56px', md: '64px' },
          }}
        />

        {/* Content container with consistent padding */}
        <Box
          sx={{
            p: { xs: spacing.sm, sm: spacing.sm, md: spacing.sm },
            maxWidth: '1400px',
            mx: 'auto',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
