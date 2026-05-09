import { Grid, Skeleton } from '@mui/material';

export default function DashboardSkeleton() {
  return (
    <>
      <Skeleton variant='rectangular' width={240} height='100vh' />
      <Grid container>
        <Grid size={3}>
          <Skeleton variant='rectangular' height={64} />
        </Grid>
        <Grid size={2}>
          <Skeleton variant='rectangular' height={64} />
        </Grid>
      </Grid>
    </>
  );
}
