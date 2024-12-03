'use client';

import getActivityTypeAction from '@server/actions/activityType/getActivityTypeAction';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ActivityTypeDto } from '@/contexts/activity/domain/activityTypeDto';
import MyModal from '@/app/components/shared/myModal';

export default function Settings() {
  const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadActivityTypes();
  }, []);
  const loadActivityTypes = async () => {
    const activityTypesDto = await getActivityTypeAction();
    console.log(activityTypesDto);
    setActivityTypes(activityTypesDto);
  };

  //estos dos pueden ser un custom hook asociado al modal
  const onClickAdd = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <MyModal
        isOpen={openModal}
        onClose={onCloseModal}
        title="Agregar tipo de actividad"
        width="300px"
      >
        <Box padding={'20px'}>Formulario</Box>
      </MyModal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Stack direction="row" spacing={2} padding={'20px'}>
          <Button variant="contained" color="primary" onClick={onClickAdd}>
            Agregar
          </Button>
        </Stack>
        <Box padding={'20px'}>
          <TableContainer>
            <Table stickyHeader arial-label="Tipos de actividad">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityTypes.map((activityType) => (
                  <TableRow key={activityType.id}>
                    <TableCell>{activityType.name}</TableCell>
                    <TableCell>{activityType.isProductive}</TableCell>
                    <TableCell>{activityType.color}</TableCell>
                    <TableCell></TableCell>
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
