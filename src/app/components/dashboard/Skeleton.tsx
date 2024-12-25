import { Grid2, Skeleton } from '@mui/material';

export default function DashboardSkeleton() {
  return (
    <>
      <Skeleton variant='rectangular' width={240} height='100vh' />
      <Grid2 container>
        <Grid2 size={3}>
          <Skeleton variant='rectangular' height={64} />
        </Grid2>
        <Grid2 size={2}>
          <Skeleton variant='rectangular' height={64} />
        </Grid2>
      </Grid2>
    </>
  );
}
