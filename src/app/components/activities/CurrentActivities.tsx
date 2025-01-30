'use client';
import {
  Box,
  Button,
  FormControlLabel,
  Grid2 as Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import MyModal from '../shared/MyModal';
import NewActivityForm from '../activity/NewActivityForm';
import useMyModal from '../shared/useMyModal';
import getActivitiesOnGoing from '@/app/server/actions/activity/getActivitiesOnGoing';
import { useEffect, useState } from 'react';
import ActivityCard from './activityCard';
import ActivityInfo from '@/app/server/shared/types/ActivityInfo';
import getActivitiesFinished from '@/app/server/actions/activity/getActivitiesFinished';

export default function CurrentActivities() {
  const { handleClickAdd, handleCloseModal, openModal } = useMyModal();
  const [activities, setActivities] = useState<ActivityInfo[]>([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    loadActivities();
  }, [showFinished]);

  const loadActivities = async () => {
    const result = showFinished
      ? await getActivitiesFinished(90)
      : await getActivitiesOnGoing();
    setActivities(result);
  };

  const handleClose = () => {
    handleCloseModal();
    loadActivities();
  };

  const handleOnChangeSwitch = () => {
    setShowFinished(!showFinished);
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
          <FormControlLabel
            checked={showFinished}
            control={<Switch color="primary" />}
            label="Finalizadas"
            labelPlacement="end"
            onChange={handleOnChangeSwitch}
          />
        </Stack>
        <Box sx={{ overflow: 'auto', maxHeight: '75vh' }}>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              update={loadActivities}
            />
          ))}
        </Box>
      </Paper>
    </>
  );
}
