'use client';

import { ActivityStatusDict } from '@/Contexts/shared/constants/ActivityStatus';
import {
  Alert,
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
import { useState } from 'react';
import createActivityAction from '@/app/server/actions/activity/createAcitvityAction';
import { ActionResponse } from '@/app/server/shared/responseAction';

interface Inputs {
  activityName: string;
  activityDescription: string;
  activityStatus: string;
  activityType: string;
}

interface Props {
  closeParent: () => void;
}

export default function NewActivityForm(props: Props) {
  const { closeParent } = props;
  const { activityTypes } = useActivityType();
  const [response, setResponse] = useState<ActionResponse>(
    {} as ActionResponse
  );
  const [inputs, setInputs] = useState<Inputs>({
    activityName: '',
    activityDescription: '',
    activityStatus: '',
    activityType: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await createActivityAction({
      name: inputs.activityName,
      description: inputs.activityDescription,
      status: inputs.activityStatus,
      activityTypeId: Number(inputs.activityType) || 0,
    });

    if (response.ok) {
      console.log('Activity created');
      closeParent();
      return;
    }
    setResponse(result);
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
        {response.message && !response.ok && (
          <Alert severity={'error'}>{response.message}</Alert>
        )}
        <Button type="submit" variant="contained" color="primary">
          Crear
        </Button>
      </Stack>
    </form>
  );
}
