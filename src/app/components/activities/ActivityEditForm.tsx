import { ActivityInfo } from '@/Contexts/Activity/domain/ActivityInfo';
import {
  Stack,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import actionTimeUpdate from '@/app/server/actions/activity/actionTimeUpdate';
import MyAlert from '../shared/MyAlert';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';

interface Props {
  activity: ActivityInfo;
  refresh: () => void;
}

export default function ActivityEditForm({ activity, refresh }: Props) {
  const [editingActionId, setEditingActionId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({
    start: null,
    end: null,
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
  const [disableSaveTime, setDisableSaveTime] = useState(false);

  useEffect(() => {
    if (
      editValues.start &&
      editValues.end &&
      editValues.start.isAfter(editValues.end)
    ) {
      setDisableSaveTime(true);
    } else {
      setDisableSaveTime(false);
    }
  }, [editValues]);

  const handleStartEditing = (
    actionId: number,
    start: Date | null,
    end: Date | null
  ) => {
    setEditingActionId(actionId);
    setEditValues({
      start: start ? dayjs(start) : null,
      end: end ? dayjs(end) : null,
    });
  };

  const handleUpdateTime = async (actionId: number) => {
    try {
      const startDate = editValues.start?.toDate() || null;
      const endDate = editValues.end?.toDate() || null;
      const result = await actionTimeUpdate(actionId, startDate, endDate);

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
        message: 'Error al actualizar los tiempos',
        severity: 'error',
      });
      console.error('Error al guardar', error);
    } finally {
      setEditingActionId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingActionId(null);
  };

  const handleDateChange = (field: 'start' | 'end', value: Dayjs | null) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
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
            value={activity.name}
            onChange={(e) => {
              /* handle change */
            }}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            value={activity.description}
            onChange={(e) => {
              /* handle change */
            }}
          />

          <Box mt={2}>
            <Typography variant="h6">Registro de tiempos</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Inicio</TableCell>
                  <TableCell>Fin</TableCell>
                  <TableCell>Duración</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activity.actions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>{action.id}</TableCell>
                    <TableCell>
                      {editingActionId === action.id ? (
                        <DateTimePicker
                          value={editValues.start}
                          onChange={(newValue) =>
                            handleDateChange('start', newValue)
                          }
                          maxDateTime={editValues.end || undefined}
                          slotProps={{
                            textField: {
                              size: 'small',
                              fullWidth: true,
                            },
                          }}
                        />
                      ) : action.start ? (
                        action.start.toLocaleString()
                      ) : (
                        'No iniciado'
                      )}
                    </TableCell>
                    <TableCell>
                      {editingActionId === action.id ? (
                        action.end === null ? (
                          'En curso'
                        ) : (
                          <DateTimePicker
                            value={editValues.end}
                            minDateTime={editValues.start || undefined}
                            maxDateTime={dayjs()}
                            onChange={(newValue) =>
                              handleDateChange('end', newValue)
                            }
                            slotProps={{
                              textField: {
                                size: 'small',
                                fullWidth: true,
                              },
                            }}
                            disabled={action.end === null}
                          />
                        )
                      ) : action.end ? (
                        action.end.toLocaleString()
                      ) : (
                        'En curso'
                      )}
                    </TableCell>
                    <TableCell>
                      {action.start && action.end
                        ? `${Math.round((action.end.getTime() - action.start.getTime()) / (1000 * 60))} min`
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {editingActionId === action.id ? (
                        <>
                          <IconButton
                            disabled={disableSaveTime}
                            size="small"
                            color="primary"
                            onClick={() => handleUpdateTime(action.id)}
                          >
                            <SaveIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={handleCancelEdit}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            handleStartEditing(
                              action.id,
                              action.start,
                              action.end
                            )
                          }
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {activity.actions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay registros de tiempo para esta actividad
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Stack>
      </LocalizationProvider>
    </>
  );
}
