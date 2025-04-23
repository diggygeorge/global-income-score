import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function App() {

  type Name =
  {
    name: string;
  }

  // const values = [10000, 14999, 19999, 24999, 29999, 34999, 39999, 44999, 49999, 59999, 74999, 99999, 124999, 149999, 199999, 1000000000000]
  var countries: string[] = [];

  useEffect(() => {
    fetch('http://localhost:4000/api/countries')
    .then((res) => res.json())
    .then((data) => {
      let i = 0;
      while (i < data.length) {
        countries[i] = data[i].name;
        i += 1;
      }
    })
    .catch((err) => console.log(err));
  })


  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [metro, setMetro] = useState('');
  const [houseIncome, setHouseIncome] = useState<string | number>(0);

  const [savedCountry, setSavedCountry] = useState('');
  const [savedState, setSavedState] = useState('');
  const [savedMetro, setSavedMetro] = useState('');
  const [savedHouseIncome, setSavedHouseIncome] = useState<string | number>(0);

  const [stateNames, setStateNames] = useState([]);
  const [metroNames, setMetroNames] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/states?country=${encodeURIComponent(country)}`)
      .then((res) => res.json())
      .then((data) => {
        let states = data.map((s: Name) => s.name);
        setStateNames(states);
      })
      .catch((err) => console.log(err));
    }, [country])

  useEffect(() => {
    fetch(`http://localhost:4000/api/metros?state=${encodeURIComponent(state)}`)
      .then((res) => res.json())
      .then((data) => {
        let mets = data.map((s: Name) => s.name);
        setMetroNames(mets);
      })
      .catch((err) => console.log(err));
    }, [state])

  // When you click the button
  function handleClick() {
    // figure something out
    setSavedCountry(country);
    setSavedState(state);
    setSavedMetro(metro);
    setSavedHouseIncome(houseIncome);

    console.log("Countries: " + countries);
    console.log("States: " + stateNames);
    console.log("Metro Areas: " + metroNames);
  }

  return (
    <div>
      <h1>Global Income Score</h1>
      <Autocomplete
        disablePortal
        options={countries}
        sx={{ width: 300 }}
        value={country}
        onInputChange={(event, newInputValue) => {
          setCountry(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Choose a country"/>}
      />
      <Autocomplete
        disablePortal
        options={stateNames}
        sx={{ width: 300 }}
        value={state}
        onInputChange={(event, newInputValue) => {
          setState(newInputValue);
          }}
        renderInput={(params) => <TextField {...params} label="Choose a state (optional)"/>}
      />
      <Autocomplete
        disablePortal
        options={metroNames}
        sx={{ width: 300 }}
        value={metro}
        onInputChange={(event, newInputValue) => {
          setMetro(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Choose a metro area (optional)"/>}
      />
      <input
        name="houseIncome"
        type="number"
        value={houseIncome}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHouseIncome(event.currentTarget.value)}
        placeholder="Type something..."
      />
      <button onClick={handleClick}>Enter</button>
      {savedCountry && (<p>What you entered: Country - {savedCountry} State - {savedState} Metro - {savedMetro} Household Income - {savedHouseIncome}</p>)}
    </div>
  );
}

export default App;