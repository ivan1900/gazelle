import { useState } from 'react';

export default function useMyModal() {
  const [openModal, setOpenModal] = useState(false);

  const handleClickAdd = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return {
    openModal,
    handleClickAdd,
    handleCloseModal,
  };
}
