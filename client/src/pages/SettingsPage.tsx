import { Button, Box, Typography, Paper, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Theme, glassEffect } from '../styles/Theme';
import { useState, useEffect } from 'react';
import { useAppTheme } from '../styles/ThemeContext';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


interface SettingsPageProps {
  onClose: () => void;
}

export default function SettingsPage({ onClose }: SettingsPageProps) {
  
  const { setBackground, toggleTextColor, textColor,  } = useAppTheme();



  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [accentColor, setAccentColor] = useState("#000000");


  useEffect(() => {
  setBackground(`linear-gradient(135deg, ${primaryColor}, ${accentColor})`);
}, [primaryColor, accentColor]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      {/* Layout */}
      <Paper
        elevation={4}
        sx={{
          ...glassEffect,
          borderRadius: '128px',
          width: '50%',
          height: '50%',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          background: Theme.glass,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          gap: 3,
        }}
      >
        {/* X button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 3,
            right: 3,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" sx={{ marginBottom: 1, color: 'white', justifyContent: 'flex-start' }}>
          Settings
        </Typography>

        {/* Background Colors*/}
        <Paper elevation={4} sx={{...glassEffect, height: "27.5%", width: "75%", justifyContent: 'center', borderRadius: '48px'}}>
        <Box sx={{ display: 'flex', gap: 2, borderRadius: '48px', flexDirection: 'column', paddingLeft: '24px', paddingTop: '12px' }}>
          <Typography sx={{color: 'white'}}>
            Background Colors
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: '48px', paddingRight: '0px' }}>
            
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => {
    setPrimaryColor(e.target.value);

  }}
              style={{
                width: '24px',
                height: '24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            />
            <Typography sx={{ color: 'white', marginLeft: 2 }}>1st Background Color Selection</Typography>
            
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: '48px' }}>
            
            <input
              type="color"
              value={accentColor}
              onChange={(e) => {
  setAccentColor(e.target.value);
}}
              style={{
                width: '24px',
                height: '24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            />
            <Typography sx={{ color: 'white', marginLeft: 2}}>2nd Background Color Selection</Typography>
          </Box>
        </Box>
</Paper>
{/* Font Colors */}
<Paper elevation={4} sx={{...glassEffect, width: '75%', height: '20%', borderRadius: '32px'}}>
    <Typography sx={{ color: 'white', marginLeft: 3, marginTop: 1 }}>
      Font Color
    </Typography>
    <Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '48px',
    marginLeft: 3,
    marginTop: 2,
    gap: 2,
  }}
>
  <Button
    onClick={toggleTextColor}
    variant="outlined"
    sx={{
      borderRadius: '50%',
      minWidth: '40px',
      width: '40px',
      height: '40px',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderColor: Theme.border,
      color: textColor === '#ffffff' ? '#ffffff' : '#000000',
      '&:hover': {
        backgroundColor: Theme.highlight,
      },
    }}
  >
    {textColor === '#ffffff' ? (
      <RadioButtonCheckedIcon />
    ) : (
      <RadioButtonUncheckedIcon />
    )}
  </Button>

  <Typography sx={{ color: 'white' }}>
    Font Color: {textColor === '#ffffff' ? 'White' : 'Black'}
  </Typography>
</Box>

</Paper>
      </Paper>
    </Box>
  );
}
