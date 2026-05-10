'use client';

import { NoteInfo } from '@/Contexts/Note/domain/NoteInfo';
import { TagInfo } from '@/Contexts/Note/domain/TagDto';
import createNoteAction from '@/app/server/actions/note/createNoteAction';
import updateNoteAction from '@/app/server/actions/note/updateNoteAction';
import createTagAction from '@/app/server/actions/note/createTagAction';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

const PRESET_TAG_NAMES = ['high impact', 'discovery', 'improve'];

interface Props {
  open: boolean;
  note: NoteInfo | null;
  tags: TagInfo[];
  onClose: (refreshed?: boolean) => void;
  onTagsChange: (tags: TagInfo[]) => void;
}

export default function NoteForm({
  open,
  note,
  tags,
  onClose,
  onTagsChange,
}: Props) {
  const isEditing = note !== null;

  const [content, setContent] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [selectedTags, setSelectedTags] = useState<TagInfo[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upsertedNote, setUpsertedNote] = useState<NoteInfo | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setUpsertedNote(null);
      setNewTagName('');
      if (note) {
        setContent(note.content);
        setDate(dayjs(note.date));
        setSelectedTags(note.tags);
      } else {
        setContent('');
        setDate(dayjs());
        setSelectedTags([]);
      }
    }
  }, [open, note]);

  const resolveOrCreateTag = async (name: string): Promise<TagInfo> => {
    const trimmed = name.trim();
    const existing = tags.find(
      (t) => t.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (existing) return existing;
    const created = await createTagAction(trimmed);
    onTagsChange([...tags, created]);
    return created;
  };

  const addTagByName = async (name: string) => {
    if (!name.trim()) return;
    const tag = await resolveOrCreateTag(name);
    if (!selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setNewTagName('');
  };

  const removeSelectedTag = (tagId: number) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== tagId));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('El contenido no puede estar vacío.');
      return;
    }
    if (!date || !date.isValid()) {
      setError('Selecciona una fecha válida.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let finalTags = [...selectedTags];
      if (newTagName.trim()) {
        const tag = await resolveOrCreateTag(newTagName.trim());
        if (!finalTags.some((t) => t.id === tag.id)) {
          finalTags = [...finalTags, tag];
        }
        setNewTagName('');
      }

      const tagIds = finalTags.map((t) => t.id);
      const noteDate = date.startOf('day').toDate();

      if (isEditing || upsertedNote) {
        const target = note ?? upsertedNote!;
        await updateNoteAction({
          id: target.id,
          accountId: target.accountId,
          content: content.trim(),
          date: noteDate,
          tagIds,
        });
        onClose(true);
      } else {
        const result = await createNoteAction({
          accountId: 0,
          content: content.trim(),
          date: noteDate,
          tagIds,
        });

        if (!result.isNew) {
          setUpsertedNote(result.note);
          setContent(result.note.content);
          setDate(dayjs(result.note.date));
          setSelectedTags(result.note.tags);
          setError('Ya existe una nota para ese día. Puedes editarla aquí.');
          setLoading(false);
          return;
        }

        onClose(true);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const effectiveNote = upsertedNote ?? note;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="sm">
        <DialogTitle>
          {effectiveNote !== null ? 'Editar nota' : 'Nueva nota'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <DatePicker
              label="Fecha"
              value={date}
              onChange={setDate}
              disabled={isEditing || upsertedNote !== null}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />

            <TextField
              label="Contenido"
              multiline
              minRows={5}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe tu nota aquí..."
            />

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
              >
                Sugerencias rápidas:
              </Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                {PRESET_TAG_NAMES.map((name) => (
                  <Chip
                    key={name}
                    label={name}
                    size="small"
                    variant="outlined"
                    onClick={() => addTagByName(name)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Stack>
            </Box>

            <Autocomplete<TagInfo, true>
              multiple
              options={tags}
              getOptionLabel={(option) => option.name}
              value={selectedTags}
              onChange={(_, newValue) => setSelectedTags(newValue)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Etiquetas existentes"
                  placeholder="Selecciona una etiqueta..."
                  size="small"
                />
              )}
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'flex-start' }}
            >
              <TextField
                label="Nueva etiqueta"
                size="small"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTagByName(newTagName);
                  }
                }}
                placeholder="Escribe y pulsa Agregar o Enter"
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => addTagByName(newTagName)}
                disabled={!newTagName.trim()}
                sx={{ mt: 0.5 }}
              >
                Agregar
              </Button>
            </Stack>

            {selectedTags.length > 0 && (
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    size="small"
                    color="primary"
                    onDelete={() => removeSelectedTag(tag.id)}
                  />
                ))}
              </Stack>
            )}

            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onClose()} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {upsertedNote !== null || isEditing
              ? 'Guardar cambios'
              : 'Crear nota'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
