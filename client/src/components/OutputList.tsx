import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { glassEffect } from '../styles/Theme'; 
import { useAppTheme } from '../styles/ThemeContext';

type CostProps = {
  cost: number
  income: number
}

export default function OutputList({cost, income}: CostProps) {

  // Inputs: cost of living, input income
  const { textColor } = useAppTheme();

  const numberList = []

  for (let i = 0; i <= 5; i += 1) {
    numberList.push(<Typography sx={{ color: textColor, fontSize: '0.875rem' }}>{Math.max(income, cost) <= 250000 ? i * 50 : Math.round(i/5000 * income)}k</Typography>)
  }

  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '64px',
        ...glassEffect,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0)',
  backdropFilter: 'blur(0px)',
  border: `rgba(0, 0, 0, 0)`,
  boxShadow: '0px 0px 0px 0px',
      }}
    >
      {/* Range Bar */}
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          height: '60%',
          borderRadius: '64px',
          ...glassEffect,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 2,
        }}
      >
        <Typography
          sx={{
            color: textColor,
            fontWeight: 600,
            fontSize: '1.25rem',
            textAlign: 'center',
            letterSpacing: '-0.2px',
          }}
        >
          {income < cost ? 'Your income is less than the cost of living for this area' : 'Your income meets the cost of living for this area'}
          
        </Typography>

        <Box
          sx={{
            width: '80%',
            height: '20%',
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Paper
              elevation={4}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '32px',
                padding: 1,
                ...glassEffect,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative',
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  width: `${Math.max(income, cost) <= 250000 ? income/2500 : 100}%`,
                  height: '100%',
                  borderRadius: '40px 0 0 40px',
                  backgroundColor: 'rgba(38, 0, 255, 0.5)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: `${100 * cost/income}%`,
                    height: '100%',
                    borderRadius: '40px 0 0 40px',
                    backgroundColor: 'rgba(255, 0, 0, 0.4)',
                    backdropFilter: 'blur(12px)',
                    position: 'absolute',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: 1,
                      bottom: 1,
                      width: '2px',
                      backgroundColor: 'white',
                      borderRadius: '1px',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: 1,
                    bottom: 1,
                    width: '2px',
                    backgroundColor: 'white',
                    borderRadius: '1px',
                  }}
                />
              </Paper>
            </Paper>

            <Box
              sx={{
                position: 'absolute',
                bottom: -36,
                left: -5,
                right: -25,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {numberList}
            </Box>
          </Box>
        </Box>
      </Paper>
      {/* Underbar Components */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginTop: 3,
          paddingLeft: 8,
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: textColor }}>
          Key:
        </Typography>

        <Box
          sx={{
            width: '30%',
            height: '36px',
            borderRadius: '32px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...glassEffect,
            padding: '0 8px',
            gap: '8px',
          }}
        >
          {[
            { label: 'input', bg: 'rgba(157, 0, 255, 0.5)' },
            { label: '- income', bg: 'rgba(255, 0, 0, 0.5)' },
            { label: '+ income', bg: 'rgba(30, 0, 255, 0.6)' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i !== 0 && (
                <Box
                  sx={{
                    width: '2px',
                    height: '70%',
                    backgroundColor: 'white',
                    borderRadius: '32px',
                  }}
                />
              )}
              <Box
                sx={{
                  flex: 1,
                  height: '70%',
                  backgroundColor: item.bg,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: '0.625rem', fontWeight: 500, color: textColor }}>
                  {item.label}
                </Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: textColor,
            marginLeft: 2,
          }}
        >
          Income Difference:
        </Typography>

        <Paper
          elevation={2}
          sx={{
            borderRadius: '24px',
            padding: '4px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: textColor }}>
            {income >= cost ? '+' : ''}{Math.round(income - cost)}
          </Typography>
        </Paper>

        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: textColor,
            marginLeft: 2,
          }}
        >
          Survivable?:
        </Typography>

        <Paper
          elevation={2}
          sx={{
            borderRadius: '24px',
            padding: '4px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: `${income >= cost ? 'rgb(0, 255, 42)' : 'rgb(255, 0, 42)'}` }}>
            {income === 0 && cost === 0 ? '' : income >= cost ? 'yes' : 'no'}
          </Typography>
        </Paper>
      </Box>
      
    </Paper>
    
  );
}