'use client';
import { Button, Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';
import MyModal from '../shared/MyModal';
import NewActivityForm from '../activity/NewActivityForm';
import useMyModal from '../shared/useMyModal';

export default function CurrentActivities() {
  const { handleClickAdd, handleCloseModal, openModal } = useMyModal();
  return (
    <>
      <MyModal
        isOpen={openModal}
        onClose={handleCloseModal}
        title="Nueva Actividad"
        width="600px"
      >
        <NewActivityForm closeParent={handleCloseModal} />
      </MyModal>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" spacing={2} padding={'20px'} alignItems="center">
          <Button variant="outlined" color="primary" onClick={handleClickAdd}>
            Nueva
          </Button>
          <Typography>Actividades:</Typography>
        </Stack>
      </Paper>
    </>
  );
}
