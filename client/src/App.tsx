import React, { useState, useEffect } from 'react';

function App() {

  const [message, setMessage] = useState('');

  // const values = [10000, 14999, 19999, 24999, 29999, 34999, 39999, 44999, 49999, 59999, 74999, 99999, 124999, 149999, 199999, 1000000000000]

  const [text, setText] = useState({
    Country: '',
    State: '',
    Metro: '',
    HouseholdIncome: ''

  });
  const [savedText, setSavedText] = useState({
    Country: '',
    State: '',
    Metro: '',
    HouseholdIncome: ''
  });

  // When the input is changed
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText({...text, [e.target.name]: e.target.value});
  }

  // When you click the button
  function handleClick() {
    setSavedText({...text});
    console.log(message);
  }

  useEffect(() => {
    fetch('http://localhost:4000/api/countries')
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Global Income Score</h1>
      <p>Country: 
      TODO: Query the names of countries and list all the elements out in the bar.
      <input
        name="Country"
        type="text"
        value={text.Country}
        onChange={handleChange}
        placeholder="Type something..."
      />
      </p>
      TODO: Get the country ID, query the names of states that have that country ID, list all the elements out in the bar.
      <p>State: 
      <input 
        name="State"
        type="text"
        value={text.State}
        onChange={handleChange}
        placeholder="Type something..."
      />
      </p>
      TODO: Get the state ID, query the names of metro areas that have that state ID, list all the elements out in the bar.
      <p>Metro: 
      <input
        name="Metro"
        type="text"
        value={text.Metro}
        onChange={handleChange}
        placeholder="Optional..."
      />
      </p>
      <p>Total Household Income: 
      <input
        name="HouseholdIncome"
        type="text"
        value={text.HouseholdIncome}
        onChange={handleChange}
        placeholder="Type something..."
      />
      </p>
      <button onClick={handleClick}>Enter</button>
      {savedText && (<p>What you entered: Country - {savedText.Country} State - {savedText.State} Metro - {savedText.Metro} Household Income - {savedText.HouseholdIncome}</p>)}
    </div>
  );
}

export default App;