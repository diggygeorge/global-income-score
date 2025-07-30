import { useState, useEffect } from 'react';
import { List, ListItemButton, Paper, Typography, TextField, Box } from '@mui/material';
import { Theme, glassEffect } from '../styles/Theme';
import { useAppTheme } from '../styles/ThemeContext';

export interface Metro {
  metro_id: number;
  metro_name: string;
}

interface Props {
  state_id: number;
  selectedMetroId: number | null;
  onSelect: (metro: Metro) => void;
}

export default function MetroAreaList({ state_id, selectedMetroId, onSelect }: Props) {
  const { textColor } = useAppTheme();
  const [search, setSearch] = useState('');
  const [metros, setMetros] = useState<Metro[]>([]);

  useEffect(() => {
  if (!state_id) {
    setMetros([]);
    return;
  }

  setSearch('');
  fetch(`https://global-income-score.onrender.com/api/metros?state_id=${state_id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch metros');
      }
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setMetros(data);
      } else {
        console.error('Invalid metros data:', data);
        setMetros([]);
      }
    })
}, [state_id]);

  const filteredMetros = metros.filter(metro =>
    metro.metro_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        height: '100%',
        ...glassEffect,
        borderRadius: '64px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ padding: 3 }}>
        <TextField
          fullWidth
          placeholder="Search metro area"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: { color: textColor },
            '& .MuiOutlinedInput-root': {
              borderRadius: '32px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: Theme.text,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: Theme.border,
            },
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          paddingX: 2,
          paddingBottom: 2,
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
          },
        }}
      >
        <List disablePadding>
        {filteredMetros.map((metro) => (
          <ListItemButton
            key={`metro-${metro.metro_id}`}
            selected={selectedMetroId === metro.metro_id}
            onClick={() => {
                            onSelect(metro)
                            console.log(metro?.metro_name)
                          }}
              sx={{
                padding: 2,
                color: textColor,
                borderRadius: '32px',
                transition: '0.2s ease',
                '&.Mui-selected': {
                  ...glassEffect,
                  backgroundColor: 'rgba(10, 132, 255, 0.3)',
                },
                '&:hover': {
                  ...glassEffect,
                  backgroundColor: 'rgba(10, 132, 255, 0.2)',
                },
              }}
            >
              <Typography>{metro.metro_name}</Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Paper>
  );
}