'use server';
import CurrentActivities from '@/app/components/activities/CurrentActivities';
import { Paper, Stack, Typography, Grid2 as Grid } from '@mui/material';

export default async function Activity() {
  return (
    <Stack direction="column" spacing={2} padding={'20px'}>
      <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
        <Typography variant="h6">Actividad</Typography>
      </Paper>
      <Grid container>
        <Grid size={6}>
          <CurrentActivities />
        </Grid>
      </Grid>
    </Stack>
  );
}
