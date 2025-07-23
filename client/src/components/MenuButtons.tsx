import { Box, Button } from '@mui/material';
import settingsIcon from '../assets/settings_Icon.png';
import { Theme, glassEffect } from '../styles/Theme';

interface MenuButtonsProps {
  onToggleSettings: () => void;
}

import { useAppTheme } from '../styles/ThemeContext';

export default function MenuButtons({ onToggleSettings }: MenuButtonsProps) {
  const { textColor } = useAppTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        borderRadius: '48px',
        padding: 2,
      }}
    >
      <Button
        onClick={onToggleSettings}
        variant="outlined"
        sx={{
          ...glassEffect,
          borderRadius: '35px',
          backgroundColor: 'rgba(203, 203, 203, 0.5)',
          textTransform: 'none',
          color: textColor,
          borderColor: Theme.border,
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: Theme.highlight,
            borderColor: 'rgba(255,255,255,0.4)',
          },
        }}
      >
        <img
          src={settingsIcon}
          alt="Settings"
          style={{ width: '35px', height: '35px' }}
        />
      </Button>
    </Box>
  );
}
