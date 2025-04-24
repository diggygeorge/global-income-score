import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function App() {

  type Name =
  {
    name: string;
  }

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


  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [metro, setMetro] = useState("");
  const [houseIncome, setHouseIncome] = useState(0);
  const [people, setPeople] = useState(3);
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(0);

  const [savedCountry, setSavedCountry] = useState('');
  const [savedLowerBound, setSavedLowerBound] = useState(0);
  const [savedUpperBound, setSavedUpperBound] = useState(0);

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

  useEffect(() => {
    fetch(`http://localhost:4000/api/income?country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}&metro=${encodeURIComponent(metro)}`)
      .then((res) => res.json())
      .then((data) => {
        let i = 0;
        let sum = 0;
        let distribution: number[] = [];
        const values = [10000, 14999, 19999, 24999, 29999, 34999, 39999, 44999, 49999, 59999, 74999, 99999, 124999, 149999, 199999, Number.MAX_VALUE]

  
        Object.keys(data[0]).forEach(key => {
          distribution[i] = data[0][key];
          i++;
        });
        let population: number = distribution[16];

        i = 0;
        // Adjusts house income to equivalent for 3 person household.  (Ex: If there are 2 people in the household, income is multiplied by 1.5.)
        let adjustedHouseIncome = houseIncome * (2.5 / people);
        while (values[i] < adjustedHouseIncome) {
          sum += distribution[i]
          i++;
        }

        let lower_bound = Math.round((sum / population) * 100);
        let upper_bound = Math.round(((sum + distribution[i]) / population) * 100);

        if (upper_bound === 100) {
          upper_bound -= 1;
        }

        setLowerBound(lower_bound);
        setUpperBound(upper_bound);
      })
      .catch((err) => console.log(err));
    }, [country, state, metro, houseIncome, people])

  // When you click the button
  function handleClick() {
    setSavedCountry(country);
    setSavedLowerBound(lowerBound);
    setSavedUpperBound(upperBound);
  }

  function getNumberSuffix(num: number) {
    let digit = num % 10;
    if (digit === 1) {
      return "st";
    }
    else if (digit === 2) {
      return "nd";
    }
    else if (digit === 3) {
      return "rd";
    }
    else {
      return "th";
    }
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
          setState(newInputValue)
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
      <p>Household Income: 
        <input
          name="houseIncome"
          type="number"
          value={houseIncome}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let newIncome = +event.currentTarget.value;
            if (!isNaN(newIncome)) {
              setHouseIncome(newIncome);
            }
            if (newIncome > 999999999999) {
              setHouseIncome(999999999999)
            }
            if (newIncome < 0) {
              setHouseIncome(0)
            }
          }}
          placeholder="Enter your household income..."
        />
      </p>
      <p>People in Household: 
        <input
          name="amtPeople"
          type="number"
          value={people}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let newPeople = +event.currentTarget.value;
            if (!isNaN(newPeople)) {
              setPeople(newPeople);
            }
            if (newPeople > 99) {
              setPeople(99)
            }
            if (newPeople < 1) {
              setPeople(1)
            }
          }}
          placeholder="Enter the amount of people in your house..."
        />
      </p>
      <button onClick={handleClick}>Enter</button>
      {savedCountry && (
        <>
          <p>You are within the {savedLowerBound}{getNumberSuffix(savedLowerBound)} percentile and the {savedUpperBound}{getNumberSuffix(savedUpperBound)} percentile of household incomes!</p>
        </>
        )}
    </div>
  );
}

export default App;