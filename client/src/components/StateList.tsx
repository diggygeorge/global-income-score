import { useState, useEffect } from 'react';
import { List, ListItemButton, Paper, Typography, TextField, Box } from '@mui/material';
import { Theme, glassEffect } from '../styles/Theme';
import { useAppTheme } from '../styles/ThemeContext';

export interface State {
  state_id: number;
  state_name: string;
}

interface StateListProps {
  country_id: number
  onSelect: (state: State) => void;
  selectedState: State | null;
}


export default function StateList({ country_id, selectedState, onSelect }: StateListProps) {
  const { textColor } = useAppTheme();
  const [search, setSearch] = useState('');
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
  if (!country_id) {
    setStates([]);
    return;
  }

  setSearch('');
  fetch(`https://global-income-score.onrender.com/api/states?country_id=${country_id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed states fetch');
      }
      return res.json();
    })
    .then(data => {
      console.log(data)
      setStates(data);
     
    })
}, [country_id]);

  const filteredStates = states.filter(c =>
    c.state_name.toLowerCase().includes(search.toLowerCase())
  );; 

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
          placeholder="Search state"
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
        {filteredStates.map((state) => (
          <ListItemButton
            key={`state-${state.state_id}`}
            selected={selectedState?.state_id === state.state_id}
            onClick={() => onSelect(state)}
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
              <Typography>{state.state_name}</Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
