'use client';
import { Button, Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';
import MyModal from '../shared/myModal';
import NewActivityForm from '../activity/NewActivityForm';
import useMyModal from '../shared/useMyModal';

export default function CurrentActivities() {
  const { onClickAdd, onCloseModal, openModal } = useMyModal();
  return (
    <>
      <MyModal
        isOpen={openModal}
        onClose={onCloseModal}
        title="Nueva Actividad"
        width="600px"
      >
        <NewActivityForm />
      </MyModal>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" spacing={2} padding={'20px'} alignItems="center">
          <Button variant="outlined" color="primary" onClick={onClickAdd}>
            Nueva
          </Button>
          <Typography>Actividades:</Typography>
        </Stack>
      </Paper>
    </>
  );
}
