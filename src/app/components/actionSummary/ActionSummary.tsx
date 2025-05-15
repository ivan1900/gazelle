'use client';

import {
  Typography,
  Stack,
  Paper,
  Box,
  IconButton,
  Button,
  Chip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import getTimeByTypes from '@/app/server/actions/reports/getTimeByTypes';
import { TimeByTypes } from '@/app/server/shared/types/TimeByTipes';

function formatMinutesToHHMM(minutes: number) {
  return dayjs().startOf('day').add(minutes, 'minute').format('HH:mm');
}

export default function ActionSummary() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [report, setReport] = useState<TimeByTypes[]>([]);

  useEffect(() => {
    getReport();
  }, [selectedDate]);

  const getReport = async () => {
    const start = dayjs(selectedDate).startOf('day').toDate();
    const end = dayjs(selectedDate).endOf('day').toDate();
    const report = await getTimeByTypes({ from: start, to: end });
    setReport(report);
  };

  const handlePrevDay = () => {
    const date = dayjs(selectedDate).subtract(1, 'day').toDate();
    setSelectedDate(date);
  };

  const handleNextDay = () => {
    const date = dayjs(selectedDate).add(1, 'day').toDate();
    setSelectedDate(date);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
  };

  const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');
  const isYesterday = dayjs(selectedDate).isSame(
    dayjs().subtract(1, 'day'),
    'day'
  );

  return (
    <Paper style={{ width: '100%' }}>
      <Box m={1}>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h6" color="text.primary">
            Resumen de actividades
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleYesterday}
              disabled={isYesterday}
              sx={{ minWidth: 80 }}
            >
              Ayer
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleToday}
              disabled={isToday}
              sx={{ minWidth: 80 }}
            >
              Hoy
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={handlePrevDay} color="primary">
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {dayjs(selectedDate).format('DD/MM/YYYY')}
            </Typography>
            <IconButton
              onClick={handleNextDay}
              color="primary"
              disabled={isToday}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Stack>
          {report.map((item) => (
            <Stack
              key={item.type}
              direction="row"
              spacing={4}
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%', mt: 1 }}
              px={'10px'}
            >
              <Chip
                label={item.type}
                style={{ backgroundColor: item.color, color: '#fff' }}
              />
              <Typography variant="body2" color="text.secondary">
                {formatMinutesToHHMM(item.totalMinutes)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
