'use client';

import { NoteInfo } from '@/Contexts/Note/domain/NoteInfo';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey, blue } from '@mui/material/colors';
import { useState } from 'react';
import NoteDeleteDialog from './NoteDeleteDialog';

interface Props {
  note: NoteInfo;
  onEdit: (note: NoteInfo) => void;
  onDelete: (noteId: number) => void;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export default function NoteCard({ note, onEdit, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isLong = note.content.length > 300;
  const displayContent =
    isLong && !expanded ? note.content.slice(0, 300) + '…' : note.content;

  return (
    <Stack direction="row" spacing={1.5} sx={{ display: 'flex' }}>
      {/* Timeline stem */}
      <Stack sx={{ alignItems: 'center', pt: 0.5 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: blue[600],
            flexShrink: 0,
            mt: 0.3,
          }}
        />
        <Box sx={{ width: 2, flex: 1, bgcolor: grey[300], mt: 0.5 }} />
      </Stack>

      {/* Card content */}
      <Paper variant="outlined" sx={{ flex: 1, p: 2, mb: 2, borderRadius: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            {formatDate(note.date)}
          </Typography>
          <Stack direction="row" spacing={0} sx={{ display: 'flex' }}>
            <Tooltip title="Editar">
              <IconButton size="small" onClick={() => onEdit(note)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                size="small"
                color="error"
                onClick={() => setDeleteOpen(true)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="body2"
          sx={{ whiteSpace: 'pre-wrap', color: 'text.primary' }}
        >
          {displayContent}
        </Typography>

        {isLong && (
          <Typography
            variant="caption"
            color="primary"
            sx={{ cursor: 'pointer', mt: 0.5, display: 'inline-block' }}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </Typography>
        )}

        {note.tags.length > 0 && (
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
            {note.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        )}
      </Paper>

      <NoteDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false);
          onDelete(note.id);
        }}
      />
    </Stack>
  );
}
