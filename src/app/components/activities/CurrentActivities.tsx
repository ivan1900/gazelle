'use client';
import {
  Box,
  Button,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import MyModal from '../shared/MyModal';
import NewActivityForm from '../activity/NewActivityForm';
import useMyModal from '../shared/useMyModal';
import getActivitiesOnGoing from '@/app/server/actions/activity/getActivitiesOnGoing';
import { useEffect, useState } from 'react';
import ActivityCard from './activityCard';
import ActivityInfo from '@/app/server/shared/types/ActivityInfo';

export default function CurrentActivities() {
  const { handleClickAdd, handleCloseModal, openModal } = useMyModal();
  const [activities, setActivities] = useState<ActivityInfo[]>([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    const result = await getActivitiesOnGoing();
    setActivities(result);
  };

  const handleClose = () => {
    console.log('handleClose');
    handleCloseModal();
    loadActivities();
  };

  return (
    <>
      <MyModal
        isOpen={openModal}
        onClose={handleClose}
        title="Nueva Actividad"
        width="600px"
      >
        <NewActivityForm closeParent={handleClose} />
      </MyModal>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" spacing={2} padding={'20px'} alignItems="center">
          <Button variant="outlined" color="primary" onClick={handleClickAdd}>
            Nueva
          </Button>
          <Typography>Actividades:</Typography>
        </Stack>
        <Box sx={{ overflow: 'auto', maxHeight: '75vh' }}>
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </Box>
      </Paper>
    </>
  );
}
