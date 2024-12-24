import {
  Box,
  Fade,
  Grid2,
  Grow,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
      <Grow in={isOpen} timeout={500}>
        <Paper
          style={{
            width: width || 'auto',
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Box p={2}>
            <Grid2 container>
              <Grid2 size={10}>
                <Typography variant="h5">{props.title}</Typography>
              </Grid2>
              <Grid2 size={2}>
                <Typography align="right" variant="h5" onClick={onClose}>
                  <CloseRoundedIcon sx={{ cursor: 'pointer' }} />
                </Typography>
              </Grid2>
            </Grid2>
            {props.children}
          </Box>
        </Paper>
      </Grow>
    </Modal>
  );
}
