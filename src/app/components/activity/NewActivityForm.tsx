'use client';

import { ActivityStatusDict } from '@/Contexts/shared/constants/ActivityStatus';
import {
  Button,
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import useActivityType from '../shared/hooks/useActivityType';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { useEffect, useState } from 'react';

interface Inputs {
  activityName: string;
  activityDescription: string;
  activityStatus: string;
  activityType: string;
}

export default function NewActivityForm() {
  const { activityTypes } = useActivityType();
  const [inputs, setInputs] = useState<Inputs>({
    activityName: '',
    activityDescription: '',
    activityStatus: '',
    activityType: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <Stack spacing={2} pt={'32px'}>
        <TextField
          id="activityName"
          name="activityName"
          label="Nombre de la actividad"
          variant="outlined"
          required
          value={inputs.activityName}
          onChange={handleChange}
        />
        <TextField
          id="activityDescription"
          name="activityDescription"
          label="Descripción"
          variant="outlined"
          value={inputs.activityDescription}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="statusLabel" required>
            Estado
          </InputLabel>
          <Select
            labelId="statusLabel"
            id="activityStatus"
            name="activityStatus"
            value={inputs.activityStatus}
            label="Estado"
            required
            onChange={handleSelectChange}
          >
            {ActivityStatusDict.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="ActivityTypeLabel" required>
            Tipo
          </InputLabel>
          <Select
            labelId="ActivityTypeLabel"
            id="activityType"
            name="activityType"
            value={inputs.activityType}
            label="Tipo"
            required
            onChange={handleSelectChange}
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
        <Button type="submit" variant="contained" color="primary">
          Crear
        </Button>
      </Stack>
    </form>
  );
}
