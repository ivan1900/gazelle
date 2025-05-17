'use client';
import {
  Box,
  Button,
  Grid2 as Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useActivityType from '../shared/hooks/useActivityType';
import MyModal from '../shared/MyModal';
import useMyModal from '../shared/useMyModal';
import NewActivityForm from '../activity/NewActivityForm';

interface Props {
  handleReload: () => void;
}

export default function OperationBoard(props: Props) {
  const { handleReload } = props;
  const { handleClickOpen, handleCloseModal, openModal } = useMyModal();
  const { activityTypes } = useActivityType();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [selectedActivityType, setSelectedActivityType] = useState(0);

  const handleClose = () => {
    handleCloseModal();
    handleReload();
  };

  const handleSelectedActivityType = (activityType: number) => {
    setSelectedActivityType(activityType);
    handleClickOpen();
  };

  return (
    <>
      <MyModal
        isOpen={openModal}
        onClose={handleClose}
        title="Nueva Actividad"
        width={isMobile ? '90vw' : '45vw'}
      >
        <NewActivityForm
          closeParent={handleClose}
          preselectedActivityType={selectedActivityType}
        />
      </MyModal>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box p={1}>
          <Typography>Inicia una nueva actividad</Typography>
        </Box>
        <Box sx={{ overflow: 'auto', maxHeight: '30vh' }}>
          <Grid container spacing={2} p={2}>
            {activityTypes.map((activityType) => (
              <Grid size={12} key={activityType.id}>
                <Button
                  variant="contained"
                  sx={{ background: activityType.color }}
                  fullWidth
                  onClick={() => {
                    handleSelectedActivityType(activityType.id || 0);
                  }}
                >
                  {activityType.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
