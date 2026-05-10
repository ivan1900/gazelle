'use client';

import { NoteInfo } from '@/Contexts/Note/domain/NoteInfo';
import { Stack } from '@mui/material';
import NoteCard from './NoteCard';

interface Props {
  notes: NoteInfo[];
  onEdit: (note: NoteInfo) => void;
  onDelete: (noteId: number) => void;
}

export default function NoteTimeline({ notes, onEdit, onDelete }: Props) {
  return (
    <Stack sx={{ pl: 1 }}>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}
