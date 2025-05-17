import { useState } from 'react';

export default function useMyModal() {
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return {
    openModal,
    handleClickOpen,
    handleCloseModal,
  };
}
