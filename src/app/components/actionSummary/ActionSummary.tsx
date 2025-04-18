'use client';

import {
  Card,
  CardContent,
  Typography,
  Stack,
  CardHeader,
  Paper,
  Box,
} from '@mui/material';
import useActionSummary from './hooks/useActionSummary';
import useSummaryByType from './hooks/useSummaryByType';

export default function ActionSummary() {
  const { activities } = useActionSummary();
  const { summaryBytypes } = useSummaryByType(activities);

  return (
    <Paper style={{ width: '100%' }}>
      <Box m={1}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h6" color="text.primary">
            Resumen de actividades
          </Typography>
          {summaryBytypes.map((activity) => (
            <Stack key={activity.type} direction="row" spacing={4}>
              <Typography variant="body2" color="text.secondary">
                {activity.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.totalTime}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
