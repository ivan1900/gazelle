'use client';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MyModal from '../shared/MyModal';
import FormAddType from './FormAddType';
import getActivityTypeAction from '@/app/server/actions/activityType/getActivityTypeAction';
import { useEffect, useState } from 'react';
import { ActivityTypeDto } from '@/Contexts/ActivityType/domain/ActivityTypeDto';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MyDialog from '../shared/MyDialog';
import removeActivityTypeAction from '@/app/server/actions/activityType/removeActivityTypeActions';
import useMyDialog from '../shared/useMyDialog';
import useMyModal from '../shared/useMyModal';
import useActivityType from '../shared/hooks/useActivityType';

export default function ActivityTypesConfig() {
  const { activityTypes, loadActivityTypes } = useActivityType();
  const [deleteActivityType, setDeleteActivityType] = useState('');
  const { dialogTitle, dialogDescription, openDialog, setDialog, unsetDialog } =
    useMyDialog();
  const { openModal, handleClickAdd, handleCloseModal } = useMyModal();

  useEffect(() => {
    loadActivityTypes();
  }, [openModal]);

  const handleDelete = async (response: boolean) => {
    if (response) {
      await removeActivityTypeAction(deleteActivityType);
      loadActivityTypes();
    }
    unsetDialog();
  };

  const showDeleteDialog = (name: string) => {
    setDeleteActivityType(name);
    setDialog(
      'Eliminar tipo de actividad',
      `¿Estás seguro de eliminar ${name}?`
    );
  };

  return (
    <>
      <MyDialog
        title={dialogTitle}
        description={dialogDescription}
        isOpen={openDialog}
        response={handleDelete}
      ></MyDialog>
      <MyModal
        isOpen={openModal}
        onClose={handleCloseModal}
        title="Agregar tipo de actividad"
        width="600px"
      >
        <FormAddType closeParent={handleCloseModal} />
      </MyModal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" spacing={2} padding={'20px'}>
          <Button variant="contained" color="primary" onClick={handleClickAdd}>
            Agregar
          </Button>
        </Stack>
        <Box padding={'20px'}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table stickyHeader arial-label="Tipos de actividad">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Productiva</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityTypes.map((activityType) => (
                  <TableRow key={activityType.id}>
                    <TableCell>
                      <Typography>{activityType.name}</Typography>
                    </TableCell>
                    <TableCell>
                      {activityType.isProductive ? (
                        <CheckRoundedIcon
                          fontSize="large"
                          sx={{ color: 'success.main' }}
                        />
                      ) : (
                        <CloseRoundedIcon
                          fontSize="large"
                          sx={{ color: 'error.main' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <SquareRoundedIcon
                        fontSize="large"
                        sx={{ color: activityType.color }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteForeverRoundedIcon
                        fontSize="medium"
                        sx={{ color: 'error.main', cursor: 'pointer' }}
                        onClick={() => showDeleteDialog(activityType.name)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </>
  );
}
