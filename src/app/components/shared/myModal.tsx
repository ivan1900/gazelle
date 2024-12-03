import { Grid2, Modal, Paper, Typography } from '@mui/material';

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  title: string;
  children: React.ReactNode;
}

export default function MyModal(props: MyModalProps) {
  const { isOpen, onClose, width } = props;

  return (
    <Modal open={isOpen}>
      <Paper
        style={{
          width: width || 'auto',
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid2 container>
          <Grid2 size={10}>
            <Typography variant="h5">{props.title}</Typography>
          </Grid2>
          <Grid2 size={2}>
            <Typography align="right" variant="h5" onClick={onClose}>
              X
            </Typography>
          </Grid2>
        </Grid2>
        {props.children}
      </Paper>
    </Modal>
  );
}
