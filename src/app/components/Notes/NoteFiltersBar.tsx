'use client';

import { NoteFilters } from '@/Contexts/Note/domain/NoteRepository';
import { TagInfo } from '@/Contexts/Note/domain/TagDto';
import { Box, Chip, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useRef, useState } from 'react';

interface Props {
  tags: TagInfo[];
  onFilterChange: (filters: NoteFilters) => void;
}

export default function NoteFiltersBar({ tags, onFilterChange }: Props) {
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [search, setSearch] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const emit = useCallback(
    (params: {
      dateFrom?: Dayjs | null;
      dateTo?: Dayjs | null;
      search?: string;
      tagIds?: number[];
    }) => {
      const filters: NoteFilters = {};
      const from = params.dateFrom ?? dateFrom;
      const to = params.dateTo ?? dateTo;
      const s = params.search ?? search;
      const tids = params.tagIds ?? selectedTagIds;

      if (from) filters.dateFrom = from.toDate();
      if (to) {
        const end = to.endOf('day').toDate();
        filters.dateTo = end;
      }
      if (s.trim()) filters.search = s.trim();
      if (tids.length > 0) filters.tagIds = tids;
      onFilterChange(filters);
    },
    [dateFrom, dateTo, search, selectedTagIds, onFilterChange]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => emit({ search: value }), 400);
  };

  const handleDateFrom = (val: Dayjs | null) => {
    setDateFrom(val);
    emit({ dateFrom: val });
  };

  const handleDateTo = (val: Dayjs | null) => {
    setDateTo(val);
    emit({ dateTo: val });
  };

  const toggleTag = (tagId: number) => {
    const next = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    setSelectedTagIds(next);
    emit({ tagIds: next });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Stack spacing={1.5}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: 'center' }}
        >
          <DatePicker
            label="Desde"
            value={dateFrom}
            onChange={handleDateFrom}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
          />
          <DatePicker
            label="Hasta"
            value={dateTo}
            onChange={handleDateTo}
            minDate={dateFrom ?? undefined}
            slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
          />
          <TextField
            size="small"
            placeholder="Buscar en contenido..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
          />
        </Stack>

        {tags.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              Filtrar por etiqueta:
            </Typography>
            <Stack
              direction="row"
              sx={{ flexWrap: 'wrap', gap: 0.5 }}
              component="span"
            >
              {tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  onClick={() => toggleTag(tag.id)}
                  color={
                    selectedTagIds.includes(tag.id) ? 'primary' : 'default'
                  }
                  variant={
                    selectedTagIds.includes(tag.id) ? 'filled' : 'outlined'
                  }
                />
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </LocalizationProvider>
  );
}
