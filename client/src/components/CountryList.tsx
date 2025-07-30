import { useEffect, useState } from 'react';
import { List, ListItemButton, Paper, Typography, TextField, Box } from '@mui/material';
import { Theme, glassEffect } from '../styles/Theme';
import { useAppTheme } from '../styles/ThemeContext';

export interface Country {
  id: number;
  country_name: string;
}

interface CountryListProps {
  onSelect: (country: Country) => void;
  selectedCountry: Country | null;
}

export default function CountryList({ onSelect, selectedCountry }: CountryListProps) {
  const { textColor } = useAppTheme();
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchCountries = async () => {
    let data = []
    try {
      const res = await fetch('https://global-income-score.onrender.com/api/countries')
      if (!res.ok) {
        throw new Error('Failed to fetch countries');
      }
      const raw = await res.text();
      data = raw ? JSON.parse(raw) : [];
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setCountries(data.map((c: any) => {
            return {
              id: c.id,
              country_name: c.country_name,
            };
          }))
      setLoading(false);
    }
  }

  fetchCountries()
  }, []);

  
  const filteredCountries = countries.filter(c =>
    c.country_name.toLowerCase().includes(search?.toLowerCase())
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
          placeholder="Search country"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: { color: textColor },
            '& .MuiOutlinedInput-root': {
              borderRadius: '64px',
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
          minHeight: 0,
          overflowY: 'auto',
          paddingX: 2,
          paddingBottom: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
          },
        }}
      >
        <List disablePadding>
        {filteredCountries.map((country) => (
          <ListItemButton
            selected={selectedCountry?.id === country.id}
            onClick={() => onSelect({ id: country.id, country_name: country.country_name })}
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
            <Typography>{country.country_name}</Typography>
          </ListItemButton>
          ))}
        </List>
      </Box>
    </Paper>
  );
}