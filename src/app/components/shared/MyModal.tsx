'use client';
import {
  Box,
  Fade,
  Grid,
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
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Box sx={{
            p: 2
          }}>
            <Grid container>
              <Grid size={10}>
                <Typography variant="h5">{props.title}</Typography>
              </Grid>
              <Grid size={2}>
                <Typography align="right" variant="h5" onClick={onClose}>
                  <CloseRoundedIcon sx={{ cursor: 'pointer' }} />
                </Typography>
              </Grid>
            </Grid>
            {props.children}
          </Box>
        </Paper>
      </Grow>
    </Modal>
  );
}
