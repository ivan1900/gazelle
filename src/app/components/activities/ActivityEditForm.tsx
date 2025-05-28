import { ActivityInfo } from '@/Contexts/Activity/domain/ActivityInfo';
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MyAlert from '../shared/MyAlert';
import useActivityType from '../shared/hooks/useActivityType';
import updateActivity from '@/app/server/actions/activity/updateActivity';

interface Props {
  activity: ActivityInfo;
  refresh: () => void;
}

export default function ActivityEditForm({ activity, refresh }: Props) {
  const [inputs, setInputs] = useState({
    name: activity.name,
    description: activity.description,
    activityType: activity.type.id,
  });
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const { activityTypes, loadActivityTypes } = useActivityType();

  useEffect(() => {
    loadActivityTypes();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const result = await updateActivity({
        id: activity.id,
        name: inputs.name,
        description: inputs.description,
        activityTypeId: parseInt(inputs.activityType?.toString() || '0'),
        status: activity.status, // Mantenemos el estado actual
      });

      if (result.ok) {
        setNotification({
          open: true,
          message: result.message,
          severity: 'success',
        });
        refresh();
      } else {
        setNotification({
          open: true,
          message: result.message,
          severity: 'error',
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error al guardar los cambios',
        severity: 'error',
      });
      console.error('Error al guardar', error);
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <>
      <MyAlert
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        handleClose={handleCloseNotification}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Stack spacing={2}>
          <TextField
            label="Actividad"
            variant="outlined"
            value={inputs.name}
            onChange={(e) => {
              setInputs({ ...inputs, name: e.target.value });
            }}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            value={inputs.description}
            onChange={(e) => {
              setInputs({ ...inputs, description: e.target.value });
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="typeLabel" required>
              Estado
            </InputLabel>
            <Select
              labelId="typeLabel"
              id="activityType"
              name="activityType"
              value={inputs.activityType?.toString() || ''}
              label="Estado"
              required
              onChange={handleSelectChange}
            >
              {activityTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
              Guardar Cambios
            </Button>
          </Box>
        </Stack>
      </LocalizationProvider>
    </>
  );
}
