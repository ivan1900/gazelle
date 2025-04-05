'use client';
import { Box, Button, Grid2 as Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useActivityType from '../shared/hooks/useActivityType';

export default function OperationBoard() {
  // const { handleClickAdd, handleCloseModal, openModal } = useMyModal();

  const { activityTypes } = useActivityType();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box p={2}>
        <Typography>Inicia una nueva actividad</Typography>
      </Box>
      <Grid container spacing={2} p={2}>
        {activityTypes.map((activityType) => (
          <Grid size={12} key={activityType.id}>
            <Button
              variant="contained"
              sx={{ background: activityType.color }}
              fullWidth
              onClick={() => {
                // handleClickAdd();
              }}
            >
              {activityType.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
