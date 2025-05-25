import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Divider
} from '@mui/material';

interface LocationState {
  country: string;
  lowerBound: number;
  upperBound: number;
  houseIncome: number;
  cost: number;
  livingWage: number;
  adults: number;
}

const OutputPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const getNumberSuffix = (num: number) => {
    const digit = num % 10;
    if (digit === 1) return "st";
    if (digit === 2) return "nd";
    if (digit === 3) return "rd";
    return "th";
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg,rgb(0, 47, 255) 0%,rgb(255, 255, 255) 100%)',
        p: 2
      }}
    >
      <Paper
        sx={{
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          p: 4,
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        {state?.country ? (
          <>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 2,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Your Results for {state.country}
            </Typography>

            <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.3)' }} />

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              color: 'white'
            }}>
              <Typography variant="h6">
                Income Percentile:
              </Typography>
              <Typography>
                You are between the {state.lowerBound}
                {getNumberSuffix(state.lowerBound)} and {state.upperBound}
                {getNumberSuffix(state.upperBound)} percentiles
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Cost Analysis:
              </Typography>
              <Typography>
                Annual Cost of Living: <strong>${state.cost.toLocaleString()}</strong>
              </Typography>
              <Typography>
                Your Household Income: <strong>${state.houseIncome.toLocaleString()}</strong>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: state.houseIncome < state.cost ? 'error.light' : 'success.light',
                  fontWeight: 'bold'
                }}
              >
                {state.houseIncome < state.cost
                  ? "⚠️ Below Living Wage"
                  : "✓ Meets Living Wage"}
              </Typography>

              <Typography>
                Monthly Difference: <strong>
                  ${Math.abs(Math.round((state.houseIncome - state.cost) / 12)).toLocaleString()}
                </strong>
              </Typography>

              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                Based on {state.adults} adult{state.adults > 1 ? 's' : ''} in household
              </Typography>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 4,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
              onClick={() => navigate('/')}
            >
              Calculate Again
            </Button>
          </>
        ) : (
          <Typography color="white" textAlign="center">
            No results found. Please go back and submit the form.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default OutputPage;