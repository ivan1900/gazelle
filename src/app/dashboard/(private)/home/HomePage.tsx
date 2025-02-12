'use server';
import { Grid2 as Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const DailyPieChart = dynamic(
  () => import('@/app/components/dashboard/DailyPieChart'),
  { ssr: false }
);

export default async function HomePage() {
  return (
    <>
      <Grid container display="flex">
        <Grid size={{ xs: 12, md: 6 }} justifyItems={'center'}>
          <DailyPieChart title="Hoy" />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <div>Second Grid</div>
        </Grid>
      </Grid>
    </>
  );
}
