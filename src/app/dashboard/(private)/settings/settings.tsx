'use client';

import getActivityTypeAction from '@/app/server/controllers/activityType/getActivityTypeAction';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ActivityTypeDto } from '@server/activity/domain/activityTypeDto';

export default function Settings() {
  const [activityTypes, setActivityTypes] = useState<ActivityTypeDto[]>([]);
  useEffect(() => {
    loadActivityTypes();
  }, []);
  const loadActivityTypes = async () => {
    const activityTypesDto = await getActivityTypeAction();
    console.log(activityTypesDto);
    setActivityTypes(activityTypesDto);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
  );
}
