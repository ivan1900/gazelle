'use client';
import ActionSummary from '@/app/components/actionSummary/ActionSummary';
import { Grid2 as Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const DailyPieChart = dynamic(
  () => import('@/app/components/analytics/DailyPieChart'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <Grid container display="flex" columnSpacing={2}>
        <Grid size={{ xs: 12, md: 6 }} justifyItems={'center'}>
          <DailyPieChart title="Hoy" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} justifyItems={'center'}>
          <ActionSummary />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <div>Second Grid</div>
        </Grid>
      </Grid>
    </>
  );
}
