import { useState } from 'react';
import { set } from 'zod';

export default function useMyDialog() {
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const setDialog = (title: string, description: string) => {
    setDialogTitle(title);
    setDialogDescription(description);
    setOpenDialog(true);
  };

  const unsetDialog = () => {
    setDialogTitle('');
    setDialogDescription('');
    setOpenDialog(false);
  };

  return {
    dialogTitle,
    dialogDescription,
    openDialog,
    setDialog,
    unsetDialog,
  };
}
