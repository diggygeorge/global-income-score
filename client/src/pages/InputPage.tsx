import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Autocomplete, 
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment
} from '@mui/material';

interface Name {
  name: string;
}

const InputPage = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [metro, setMetro] = useState("");
  const [houseIncome, setHouseIncome] = useState<number>(0);
  const [adults, setAdults] = useState<number>(3);
  const [rpp, setRpp] = useState<number>(100);
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [livingWage, setLivingWage] = useState<number>(0);
  const [stateNames, setStateNames] = useState<string[]>([]);
  const [metroNames, setMetroNames] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/countries')
      .then((res) => res.json())
      .then((data: Name[]) => {
        setCountries(data.map(item => item.name));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (country) {
      fetch(`http://localhost:4000/api/livingwage?country=${encodeURIComponent(country)}`)
        .then((res) => res.json())
        .then((data) => {
          setLivingWage(data[0].living_wage);
        })
        .catch((err) => console.log(err));

      fetch(`http://localhost:4000/api/states?country=${encodeURIComponent(country)}`)
        .then((res) => res.json())
        .then((data: Name[]) => {
          setStateNames(data.map(s => s.name));
        })
        .catch((err) => console.log(err));
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      fetch(`http://localhost:4000/api/metros?state=${encodeURIComponent(state)}`)
        .then((res) => res.json())
        .then((data: Name[]) => {
          setMetroNames(data.map(s => s.name));
        })
        .catch((err) => console.log(err));
    }
  }, [state]);

  const handleClick = () => {
    navigate('/output', {
      state: {
        country,
        lowerBound,
        upperBound,
        houseIncome,
        cost,
        livingWage,
        adults
      }
    });
  };

  const getNumberSuffix = (num: number) => {
    const digit = num % 10;
    if (digit === 1) return "st";
    if (digit === 2) return "nd";
    if (digit === 3) return "rd";
    return "th";
  };

  const getCostOfLiving = () => {
    const adjustedLivingWage = livingWage * rpp / 100;
    return Math.round(adjustedLivingWage * (adults * 0.7 + 0.3));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg,rgb(127, 174, 255) 0%,rgb(25, 0, 255) 100%)',
        p: 2
      }}
    >
      <Paper
  sx={{
    borderRadius: '128px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    p: 4,
    width: '2000px',
    maxWidth: '95vw',
    height: '2000px',
    maxHeight: '90vh',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.3)',
    overflow: 'auto'  
  }}
>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 4, 
            textAlign: 'left',
            color: 'white',
            fontWeight: 'bold',
              marginLeft: '64px',  // 64px from left
    marginTop: '64px'    // 64px from top
  }}
>
  Global Income Score
</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Autocomplete
            disablePortal
            options={countries}
            sx={{ width: '100%' }}
            value={country}
            onChange={(event, newValue) => setCountry(newValue || '')}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Choose a country" 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '32px',
                  width: '208px'
                  }
                }}
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={stateNames}
            sx={{ width: '100%' }}
            value={state}
            disabled={!country}
            onChange={(event, newValue) => setState(newValue || '')}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Choose a state (optional)" 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '32px',
                  width: '256px'
                  }
                }}
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={metroNames}
            sx={{ width: '100%' }}
            value={metro}
            disabled={!state}
            onChange={(event, newValue) => setMetro(newValue || '')}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Choose a metro area (optional)" 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '32px',
                    width: '288px'
                  }
                }}
              />
            )}
          />

          <FormControl fullWidth>
            <TextField
              label="Household Income"
              type="number"
              value={houseIncome || ''}
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const newIncome = Math.min(Math.max(Number(event.target.value), 0), 999999999999);
                setHouseIncome(newIncome);
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '32px',
                  width: '256px'
                }
              }}
            />
          </FormControl>

          <FormControl fullWidth>
  <TextField
    label="Adults in Household"
    type="number"
    value={adults || ''}
    variant="outlined"
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      const newAdults = Math.min(Math.max(Number(event.target.value), 1), 99);
      setAdults(newAdults);
    }}
    InputProps={{
      sx: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '32px',
        width: '160px'
      }
    }}
  />
  <FormHelperText sx={{ 
    color: '#e0f2fe', // Light blue color
    fontSize: '0.8rem',
    mt: 0.5,
    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
  }}>
    Note: This assumes all adults in the household are employed.
  </FormHelperText>
</FormControl>

          <Button
            variant="contained"
            size="large"
            onClick={handleClick}
            disabled={!country}
            sx={{
              mt: 2,
              py: 2,
              borderRadius: '32px',
              width: '7%',
              background: 'linear-gradient(to right,rgb(0, 47, 255),rgb(17, 0, 255))',
              color: 'white',
              fontWeight: 'bold',
          '&:hover': {
          background: 'linear-gradient(to right,rgb(0, 23, 125),rgb(28, 0, 131))'
              }
            }}
          >
            Calculate
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default InputPage;