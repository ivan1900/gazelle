'use client';
import ActionSummary from '@/app/components/actionSummary/ActionSummary';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const DailyPieChart = dynamic(
  () => import('@/app/components/analytics/DailyPieChart'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <Grid container columnSpacing={2} sx={{
        display: "flex"
      }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{
          justifyItems: 'center'
        }}>
          <DailyPieChart title="Hoy" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{
          justifyItems: 'center'
        }}>
          <ActionSummary />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <div>Second Grid</div>
        </Grid>
      </Grid>
    </>
  );
}
