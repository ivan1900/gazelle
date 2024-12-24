'use client';

import { ActivityStatusDict } from '@/contexts/shared/constants/ActivityStatus';
import {
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import useActivityType from '../shared/hooks/useActivityType';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

export default function NewActivityForm() {
  const { activityTypes } = useActivityType();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {};

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <Stack spacing={2} pt={'32px'}>
        <TextField
          id="activityName"
          name="activityName"
          label="Nombre de la actividad"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="statusLabel">Estado</InputLabel>
          <Select
            labelId="statusLabel"
            id="activityStatus"
            name="activityStatus"
            // value={status}
            label="Estado"
            // onChange={handleChange}
          >
            {ActivityStatusDict.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="ActivityTypeLabel">Tipo</InputLabel>
          <Select
            labelId="ActivityTypeLabel"
            id="activityType"
            name="activityType"
            // value={status}
            label="Tipo"
            // onChange={handleChange}
          >
            {activityTypes.map((type) => (
              <MenuItem key={type.name} value={type.id}>
                <ListItemIcon>
                  <SquareRoundedIcon
                    fontSize="small"
                    sx={{ color: type.color }}
                  />
                </ListItemIcon>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </form>
  );
}
