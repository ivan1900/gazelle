'use client';
import ActionSummary from '@/app/components/actionSummary/ActionSummary';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { spacing } from '@/app/designTokens';

const DailyPieChart = dynamic(
  () => import('@/app/components/analytics/DailyPieChart'),
  { ssr: false }
);

export default function HomePage() {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header section */}
      <Box sx={{ mb: spacing.xxxl }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: spacing.md,
            color: theme.palette.text.primary,
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '1.0625rem',
          }}
        >
          Bienvenido de vuelta. Aquí está el resumen de tu actividad hoy.
        </Typography>
      </Box>

      {/* Analytics Grid - Mobile first responsive */}
      <Grid container spacing={3} sx={{ mb: spacing.xxxl }}>
        {/* Daily Chart - Full width on mobile, half on desktop */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DailyPieChart title="Hoy" />
          </Box>
        </Grid>

        {/* Action Summary - Full width on mobile, half on desktop */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActionSummary />
          </Box>
        </Grid>
      </Grid>

      {/* Secondary section - Placeholder for future widgets */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: spacing.lg,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '12px',
              backgroundColor: theme.palette.background.paper,
              textAlign: 'center',
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            <Typography variant="body2">
              Espacio reservado para widget adicional
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: spacing.lg,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '12px',
              backgroundColor: theme.palette.background.paper,
              textAlign: 'center',
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            <Typography variant="body2">
              Espacio reservado para widget adicional
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
