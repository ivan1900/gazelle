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
import MyModal from '../shared/myModal';
import FormAddType from './formAddType';
import getActivityTypeAction from '@/app/server/actions/activityType/getActivityTypeAction';
import { useEffect, useState } from 'react';
import { ActivityTypeDto } from '@/contexts/activity/domain/activityTypeDto';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MyDialog from '../shared/myDialog';
import removeActivityTypeAction from '@/app/server/actions/activityType/removeActivityTypeActions';

export default function ActivityTypesConfig() {
  const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteActivityType, setDeleteActivityType] = useState('');

  useEffect(() => {
    loadActivityTypes();
  }, [openModal]);

  const loadActivityTypes = async () => {
    const activityTypesDto = await getActivityTypeAction();
    console.log(activityTypesDto);
    setActivityTypes(activityTypesDto);
  };

  const handleDelete = async (response: boolean) => {
    if (response) {
      await removeActivityTypeAction(deleteActivityType);
      loadActivityTypes();
    }
    setOpenDialog(false);
  };

  const showDeleteDialog = (name: string) => {
    setDeleteActivityType(name);
    setDialogTitle('Eliminar tipo de actividad');
    setDialogDescription(`¿Estás seguro de eliminar ${name}?`);
    setOpenDialog(true);
  };

  // esto en un hook para dialogos
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  //estos dos pueden ser un custom hook asociado al modal
  const onClickAdd = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
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
        onClose={onCloseModal}
        title="Agregar tipo de actividad"
        width="600px"
      >
        <FormAddType closeParent={onCloseModal} />
      </MyModal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" spacing={2} padding={'20px'}>
          <Button variant="contained" color="primary" onClick={onClickAdd}>
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
