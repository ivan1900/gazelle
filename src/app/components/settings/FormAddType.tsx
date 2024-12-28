'use client';
import { createActivityType } from '@/app/server/actions/activityType/createActivityTypeAction';
import { ActionResponse } from '@/app/server/shared/responseAction';
import {
  Alert,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

interface Props {
  closeParent: () => void;
}

export default function FormAddType(props: Props) {
  const { closeParent } = props;
  const [valueColor, setValueColor] = useState('#000000');
  const initialState: ActionResponse = {
    ok: true,
    message: '',
  };
  const [state, dispatch] = useFormState(createActivityType, initialState);

  useEffect(() => {
    if (state.ok && state.message.length > 0) {
      closeParent();
    }
  });
  return (
    <form action={dispatch}>
      <Stack spacing={2} pt={'32px'}>
        <TextField
          id="name"
          name="name"
          fullWidth
          label="Nombre"
          variant="outlined"
        />
        <MuiColorInput
          id="color"
          name="color"
          format="hex"
          value={valueColor}
          onChange={setValueColor}
        />
        <FormControlLabel
          id="isProductive"
          name="isProductive"
          control={<Switch />}
          label="Tipo productivo"
        />
        {state.message && !state.ok && (
          <Alert severity={'error'}>{state.message}</Alert>
        )}
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
      </Stack>
    </form>
  );
}
