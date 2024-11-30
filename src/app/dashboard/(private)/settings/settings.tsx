'use client';

import getActivityTypeAction from '@/app/server/controllers/activityType/getActivityTypeAction';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Settings() {
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     console.log(session);
  //     console.log(session?.user.userId);
  //   }
  // }, [session]);

  const loadActivityTypes = async () => {
    const activityTypes = await getActivityTypeAction(1);
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader arial-label="Tipos de actividad">
          <TableHead>
            <TableRow></TableRow>
          </TableHead>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
