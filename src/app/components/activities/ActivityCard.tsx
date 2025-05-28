import { ActivityStatusDict } from '@/app/server/shared/constants/ActivityStatusOption';
import ActivityInfo from '@/app/server/shared/types/ActivityInfo';
import {
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { ActivityStatusOption } from '@/Contexts/shared/domain/constants/ActivityStatus';
import startActivityTimer from '@/app/server/actions/activity/startActivityTimer';
import stopActivityTimer from '@/app/server/actions/activity/stopActivityTimer';
import useTimeHook from './hooks/useTimeHook';
import finishActivity from '@/app/server/actions/activity/finishActivity';
import MyDialog from '../shared/MyDialog';
import useMyDialog from '../shared/useMyDialog';
import removeActivity from '@/app/server/actions/activity/removeActivity';
import MyModal from '../shared/MyModal';
import ActivityEditForm from './ActivityEditForm';
import useMyModal from '../shared/useMyModal';
import ActivityTimeForm from './ActivityTimeForm';
import { useState } from 'react';

interface Props {
  activity: ActivityInfo;
  refresh: () => void;
}

export default function ActivityCard(props: Props) {
  const { activity, refresh } = props;
  const { totalDuration, startTimer, stopTimer } = useTimeHook(
    activity.actions
  );
  const { dialogDescription, dialogTitle, openDialog, setDialog, unsetDialog } =
    useMyDialog();

  const { openModal, handleClickOpen, handleCloseModal } = useMyModal();
  const [isTimerLoading, setIsTimerLoading] = useState(false);

  const handleStartTimer = async () => {
    setIsTimerLoading(true);
    try {
      // todo: handle error
      const response = await startActivityTimer(activity.id);
      refresh();
      startTimer();
    } finally {
      setIsTimerLoading(false);
    }
  };

  const handleStopTimer = async () => {
    setIsTimerLoading(true);
    try {
      // todo handle error
      const ok = await stopActivityTimer(activity.id);
      stopTimer();
      refresh();
    } finally {
      setIsTimerLoading(false);
    }
  };

  const handleFinishActivity = async () => {
    // todo: handle error
    const response = await finishActivity(activity.id);
    stopTimer();
    refresh();
  };

  const showRemoveDialog = async () => {
    setDialog(
      'Eliminar actividad',
      '¿Estás seguro de eliminar esta actividad?'
    );
  };

  const handleRemoveActivity = async (response: boolean) => {
    if (response) {
      await removeActivity(activity.id);
      refresh();
    }
    unsetDialog();
  };

  const handleEditActivity = () => {
    handleClickOpen();
  };

  return (
    <>
      <MyDialog
        description={dialogDescription}
        title={dialogTitle}
        isOpen={openDialog}
        response={handleRemoveActivity}
      ></MyDialog>
      <MyModal
        isOpen={openModal}
        onClose={handleCloseModal}
        title="Editar actividad"
        width="850px"
      >
        <ActivityEditForm activity={activity} refresh={refresh} />
        <Divider sx={{ my: 2 }} />
        <ActivityTimeForm activity={activity} refresh={refresh} />
      </MyModal>
      <Card
        sx={{
          padding: '10px',
          margin: '10px',
          width: '310px',
        }}
      >
        <Grid container spacing={1}>
          <Grid size={12} minHeight={4}>
            {activity.status === ActivityStatusOption.ON_PROGRESS && (
              <LinearProgress />
            )}
          </Grid>
          <Grid
            size={9}
            display={'flex'}
            direction={'row'}
            alignItems={'center'}
          >
            <Tooltip title={activity.name}>
              <Typography fontWeight={700} fontSize={20}>
                {activity.name.length > 20
                  ? `${activity.name.substring(0, 20)}...`
                  : activity.name}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid
            size={3}
            display={'flex'}
            direction={'row'}
            justifyContent={'flex-end'}
          >
            <Tooltip title="Editar">
              <IconButton onClick={handleEditActivity}>
                <NotesRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={showRemoveDialog}>
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid size={12}>
            <Chip
              size="small"
              label={activity.type.isProductive ? 'Productiva' : 'Improdutiva'}
              color={activity.type.isProductive ? 'primary' : 'secondary'}
            />
            <Chip
              size="small"
              variant="outlined"
              label={activity.type.name}
              sx={{
                ml: '8px',
                color: activity.type.color,
                borderColor: activity.type.color,
              }}
            />
          </Grid>

          <Grid size={12} display={'flex'} justifyContent={'center'}>
            <Typography fontWeight={400} fontSize={16}>
              Tiempo Total
            </Typography>
          </Grid>
          <Grid size={12} display={'flex'} justifyContent={'center'}>
            <Typography fontWeight={700} fontSize={24}>
              {totalDuration}
            </Typography>
          </Grid>

          <Grid size={12} display={'flex'} direction={'row'}>
            <Chip
              size="small"
              label={
                ActivityStatusDict.filter(
                  (item) => item.value === activity.status
                )[0].label
              }
            />
          </Grid>

          <Grid size={6} display={'flex'} direction={'row'}>
            <Button
              disabled={activity.status === ActivityStatusOption.COMPLETED || isTimerLoading}
              variant={
                activity.status === ActivityStatusOption.ON_PROGRESS
                  ? 'outlined'
                  : 'contained'
              }
              color="primary"
              endIcon={
                isTimerLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : activity.status === ActivityStatusOption.ON_PROGRESS ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )
              }
              onClick={
                activity.status === ActivityStatusOption.WAITING
                  ? handleStartTimer
                  : handleStopTimer
              }
            >
              {activity.status === ActivityStatusOption.ON_PROGRESS
                ? 'Parar'
                : 'Iniciar'}
            </Button>
          </Grid>
          <Grid size={6} display={'flex'} justifyContent={'end'}>
            {activity.status !== ActivityStatusOption.COMPLETED && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleFinishActivity}
              >
                Finalizar
              </Button>
            )}
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary" fontSize={'8px'}>
              Creada: {activity.createdAt?.toLocaleString()}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography color="text.secondary" fontSize={'8px'}>
              Actualizada: {activity.updatedAt?.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
