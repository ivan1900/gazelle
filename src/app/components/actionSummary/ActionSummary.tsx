'use client';

import {
  Typography,
  Stack,
  Paper,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { useState } from 'react';
import useActionSummary from './hooks/useActionSummary';
import useSummaryByType from './hooks/useSummaryByType';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

export default function ActionSummary() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { activities } = useActionSummary(selectedDate);
  const { summaryBytypes } = useSummaryByType(activities);

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
          {summaryBytypes.map((activity) => (
            <Stack key={activity.type} direction="row" spacing={4}>
              <Typography variant="body2" color="text.secondary">
                {activity.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.totalTime}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
