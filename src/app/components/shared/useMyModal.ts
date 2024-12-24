import { useState } from 'react';

export default function useMyModal() {
  const [openModal, setOpenModal] = useState(false);

  const onClickAdd = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  return {
    openModal,
    onClickAdd,
    onCloseModal,
  };
}
