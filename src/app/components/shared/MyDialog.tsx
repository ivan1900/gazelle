import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  response: (response: boolean) => void;
}

export default function MyDialog(props: Props) {
  const { isOpen, title, description, response } = props;

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => response(false)} color="primary">
          {' '}
          Cancelar{' '}
        </Button>
        <Button onClick={() => response(true)} color="primary">
          {' '}
          Aceptar{' '}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
