import { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  Typography,
  TextField,
  Box
} from '@mui/material';
import StateList from '../components/StateList';
import CountryList from '../components/CountryList';
import MetroAreaList from '../components/MetroAreaList';
import GoogleMapsSection from '../components/GoogleMapsSection';
import OutputList from '../components/OutputList';
import { Theme, glassEffect } from '../styles/Theme';
import SettingsPage from './SettingsPage';
import MenuButtons from '../components/MenuButtons';
import { useAppTheme } from '../styles/ThemeContext';
import type { Country } from '../components/CountryList';
import type { State } from '../components/StateList';
import type { Metro } from '../components/MetroAreaList';


export default function OutputPage() {
  const [showSettings, setShowSettings] = useState(false);
  const { mainbackground, textColor } = useAppTheme();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedMetro, setSelectedMetro] = useState<Metro | null>(null);

  const [income, setIncome] = useState(0);
  const [savedIncome, setSavedIncome] = useState(0)
  const [costOfLiving, setCostOfLiving] = useState(0)

  const [loading, setLoading] = useState(false)

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    console.log(country?.name)
    setSelectedState(null);
    setSelectedMetro(null);
  };

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    console.log(state?.name)
    setSelectedMetro(null);
  };



  useEffect(() => {
    
     fetch(`http://localhost:4000/api/income?country=${selectedCountry?.name}&state=${selectedState?.name}&metro=${selectedMetro?.name}`)
        .then((res) => res.json())
        .then((data) =>
          setCostOfLiving(data[0][0].living_wage * data[1][0].rpp * 0.01)     
        )
        .then(() => console.log(costOfLiving))
        .catch(console.error)
        .finally(() => setLoading(false))

  }, [loading])

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: mainbackground,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          ...glassEffect,
          borderRadius: '128px',
          width: '90%',
          height: '90%',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          background: Theme.glass,
        }}
      >
        {/* Top bar */}
        <Paper
          elevation={4}
          sx={{
            ...glassEffect,
            borderRadius: '97px',
            width: '90%',
            height: '5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 2,
            gap: 2,
            backgroundColor: Theme.glass,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 300, fontSize: '2rem', color: textColor }}
            >
              Global Income Score
            </Typography>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Rotating_globe.gif"
              alt="Globe"
              style={{
                ...glassEffect,
                borderWidth: '12px',
                width: '48px',
                height: '48px',
                borderRadius: '48px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              }}
            />
          </Box>
          <MenuButtons onToggleSettings={() => setShowSettings(prev => !prev)} />
        </Paper>

        {/* Main section */}
        <Box
          sx={{
            width: '98%',
            height: '83%',
            display: 'flex',
            flexDirection: 'row',
            gap: 6,
          }}
        >
          {/* Left column */}
          <Paper
            elevation={4}
            sx={{
              ...glassEffect,
              borderRadius: '97px',
              width: '47.5%',
              height: '98%',
              display: 'flex',
              flexDirection: 'column',
              padding: 2,
              justifyContent: 'space-between',
              gap: 0,
            }}
          >
            {/* Country / State / Metro Lists */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: '86%',
                width: '100%',
                gap: 6,
                paddingX: '3%',
                paddingY: '3%',
                boxSizing: 'border-box',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <CountryList
                  onSelect={handleCountrySelect}
                  selectedCountry={selectedCountry}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                {selectedCountry && (
                  <>
                    <StateList
                      country_id={selectedCountry.id}
                      selectedState={selectedState}
                      onSelect={handleStateSelect}
                    />
                  </>
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                {selectedState && (
                  <MetroAreaList
                    state_id={selectedState.id}
                    selectedMetroId={selectedMetro?.id || null}
                    onSelect={setSelectedMetro}
                  />
                )}
              </Box>
            </Box>

            {/* Income input */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
                paddingX: 2,
                paddingBottom: 3,
              }}
            >
              <TextField
                placeholder="Enter Income"
                variant="outlined"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value as unknown as number)}
                sx={{
                  width: '30%',
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
              <Button
                variant="contained"
                sx={{
                  ...glassEffect,
                  borderRadius: '128px',
                  paddingX: 4,
                  paddingY: 1.5,
                  fontWeight: 'medium',
                  color: textColor,
                  alignSelf: 'center',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(193, 199, 255, 0.36)',
                  },
                }}
                onClick={() => {
                                  setLoading(true)
                                  setSavedIncome(income)}}
              >
                Calculate
              </Button>
            </Box>
          </Paper>

          {/* Right column */}
          <Paper
            elevation={4}
            sx={{
              ...glassEffect,
              borderRadius: '97px',
              width: '47.5%',
              height: '103%',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 6,
              paddingX: '2.5%',
              paddingY: '2.5%',
              boxSizing: 'border-box',
            }}
          >
            <Paper
              elevation={4}
              sx={{
                ...glassEffect,
                borderRadius: '70px',
                width: '100%',
                height: '53.3%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <GoogleMapsSection />
            </Paper>
            <OutputList cost={costOfLiving} income={savedIncome}/>
          </Paper>
        </Box>

        {/* Settings Page */}
        {showSettings && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              backgroundColor: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setShowSettings(false)}
          >
            <Box
              sx={{ width: '100%', height: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <SettingsPage onClose={() => setShowSettings(false)} color={{background: mainbackground, textcolor: textColor }}/>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}


