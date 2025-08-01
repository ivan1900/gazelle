'use client';
import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useActivityType from '../shared/hooks/useActivityType';
import MyModal from '../shared/MyModal';
import useMyModal from '../shared/useMyModal';
import NewActivityForm from '../activity/NewActivityForm';
import ChatAI from '../chatAI/chatAI';
import mcpCleanHistory from '@/app/server/actions/mcp/mcpCleanHistory';

interface Props {
  handleReload: () => void;
}

export default function OperationBoard(props: Props) {
  const { handleReload } = props;
  const { handleClickOpen, handleCloseModal, openModal } = useMyModal();
  const {
    handleClickOpen: handleClickOpenAI,
    handleCloseModal: handleCloseModalAI,
    openModal: openModalAI,
  } = useMyModal();
  const { activityTypes } = useActivityType();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [selectedActivityType, setSelectedActivityType] = useState(0);

  const handleClose = () => {
    handleCloseModal();
    handleReload();
  };

  const handleSelectedActivityType = (activityType: number) => {
    setSelectedActivityType(activityType);
    handleClickOpen();
  };

  const handleOpenAIChat = async () => {
    await mcpCleanHistory();
    handleClickOpenAI();
  };

  const handleCloseAI = () => {
    handleCloseModalAI();
    handleReload();
  };

  return (
    <>
      <MyModal
        isOpen={openModal}
        onClose={handleClose}
        title="Nueva Actividad"
        width={isMobile ? '90vw' : '45vw'}
      >
        <NewActivityForm
          closeParent={handleClose}
          preselectedActivityType={selectedActivityType}
        />
      </MyModal>

      {/* Modal de Chat IA */}
      <MyModal
        isOpen={openModalAI}
        onClose={handleCloseAI}
        title="Asistente de IA"
        width={isMobile ? '95vw' : '60vw'}
      >
        <ChatAI onClose={handleCloseAI} />
      </MyModal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Inicia una nueva actividad</Typography>
          <IconButton
            color="primary"
            size="small"
            onClick={() => {
              handleOpenAIChat();
            }}
          >
            <AutoAwesome />
          </IconButton>
        </Box>
        <Box sx={{ overflow: 'auto', maxHeight: '30vh' }}>
          <Grid container spacing={2} p={2}>
            {activityTypes.map((activityType) => (
              <Grid size={12} key={activityType.id}>
                <Button
                  variant="contained"
                  sx={{ background: activityType.color }}
                  fullWidth
                  onClick={() => {
                    handleSelectedActivityType(activityType.id || 0);
                  }}
                >
                  {activityType.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
