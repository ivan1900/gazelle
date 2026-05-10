'use client';

import { NoteInfo } from '@/Contexts/Note/domain/NoteInfo';
import { TagInfo } from '@/Contexts/Note/domain/TagDto';
import { NoteFilters } from '@/Contexts/Note/domain/NoteRepository';
import deleteNoteAction from '@/app/server/actions/note/deleteNoteAction';
import getNotesAction from '@/app/server/actions/note/getNotesAction';
import { Box, Button, Stack, Typography } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useCallback, useState } from 'react';
import NoteFiltersBar from './NoteFiltersBar';
import NoteForm from './NoteForm';
import NoteTimeline from './NoteTimeline';

interface Props {
  initialNotes: NoteInfo[];
  initialTags: TagInfo[];
}

export default function NotesPage({ initialNotes, initialTags }: Props) {
  const [notes, setNotes] = useState<NoteInfo[]>(initialNotes);
  const [tags, setTags] = useState<TagInfo[]>(initialTags);
  const [formOpen, setFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteInfo | null>(null);
  const [filters, setFilters] = useState<NoteFilters>({});

  const reload = useCallback(
    async (nextFilters?: NoteFilters) => {
      const f = nextFilters ?? filters;
      const updated = await getNotesAction(f);
      setNotes(updated);
    },
    [filters]
  );

  const handleFilterChange = async (next: NoteFilters) => {
    setFilters(next);
    await reload(next);
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setFormOpen(true);
  };

  const handleEdit = (note: NoteInfo) => {
    setEditingNote(note);
    setFormOpen(true);
  };

  const handleDelete = async (noteId: number) => {
    await deleteNoteAction(noteId);
    await reload();
  };

  const handleFormClose = async (refreshed?: boolean) => {
    setFormOpen(false);
    setEditingNote(null);
    if (refreshed) await reload();
  };

  const handleTagsChange = (next: TagInfo[]) => setTags(next);

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <NoteAltIcon color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Bitácora
          </Typography>
        </Stack>
        <Button variant="contained" onClick={handleNewNote}>
          Nueva nota
        </Button>
      </Stack>

      <NoteFiltersBar tags={tags} onFilterChange={handleFilterChange} />

      {notes.length === 0 ? (
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No hay notas. ¡Escribe la primera!
          </Typography>
        </Box>
      ) : (
        <NoteTimeline
          notes={notes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <NoteForm
        open={formOpen}
        note={editingNote}
        tags={tags}
        onClose={handleFormClose}
        onTagsChange={handleTagsChange}
      />
    </Stack>
  );
}
