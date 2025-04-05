import { ActivityStatusDict } from '@/app/server/shared/constants/ActivityStatusOption';
import ActivityInfo from '@/app/server/shared/types/ActivityInfo';
import {
  Button,
  Card,
  Chip,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import { ActivityStatusOption } from '@/Contexts/shared/domain/constants/ActivityStatus';
import startActivityTimer from '@/app/server/actions/activity/startActivityTimer';
import stopActivityTimer from '@/app/server/actions/activity/stopActivityTimer';
import useTimeHook from './hooks/useTimeHook';
import finishActivity from '@/app/server/actions/activity/finishActivity';
import MyDialog from '../shared/MyDialog';
import useMyDialog from '../shared/useMyDialog';
import removeActivity from '@/app/server/actions/activity/removeActivity';

interface Props {
  activity: ActivityInfo;
  update: () => void;
}

export default function ActivityCard(props: Props) {
  const { activity, update } = props;
  const { totalDuration, startTimer, stopTimer } = useTimeHook(
    activity.actions
  );
  const { dialogDescription, dialogTitle, openDialog, setDialog, unsetDialog } =
    useMyDialog();

  const handleStartTimer = async () => {
    // todo: handle error
    const response = await startActivityTimer(activity.id);
    update();
    startTimer();
  };

  const handleStopTimer = async () => {
    // todo handle error
    const ok = await stopActivityTimer(activity.id);
    stopTimer();
    update();
  };

  const handleFinishActivity = async () => {
    // todo: handle error
    const response = await finishActivity(activity.id);
    stopTimer();
    update();
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
      update();
    }
    unsetDialog();
  };

  return (
    <>
      <MyDialog
        description={dialogDescription}
        title={dialogTitle}
        isOpen={openDialog}
        response={handleRemoveActivity}
      ></MyDialog>
      <Card
        sx={{
          padding: '10px',
          margin: '10px',
        }}
      >
        <Grid container spacing={1}>
          <Grid size={12}>
            {activity.status === ActivityStatusOption.ON_PROGRESS && (
              <LinearProgress />
            )}
          </Grid>
          <Grid size={9} display={'flex'} direction={'row'}>
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
          <Grid
            size={3}
            display={'flex'}
            direction={'row'}
            justifyContent={'flex-end'}
          >
            <Tooltip title="Editar">
              <IconButton>
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
            <Typography fontWeight={700}>{activity.name}</Typography>
          </Grid>

          <Grid size={4} display={'flex'} direction={'row'}>
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
            <Typography>Tiempo Total: {totalDuration}</Typography>
          </Grid>

          <Grid size={4} display={'flex'} direction={'row'}>
            <Button
              disabled={activity.status === ActivityStatusOption.COMPLETED}
              variant="outlined"
              color="primary"
              endIcon={
                activity.status === ActivityStatusOption.ON_PROGRESS ? (
                  <CircularProgress size="20px" color="success" />
                ) : (
                  <AvTimerRoundedIcon />
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
          <Grid size={8} display={'flex'} justifyContent={'end'}>
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
            <Typography color="text.secondary" fontSize={'12px'}>
              Creada: {activity.createdAt?.toLocaleString()}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography color="text.secondary" fontSize={'12px'}>
              Actualizada: {activity.updatedAt?.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
