import React, { useState, useEffect } from 'react';

function App() {

  const [message, setMessage] = useState('');

  const [text, setText] = useState({
    Country: '',
    State: '',
    Metro: '',
    HouseholdIncome: '',
    amtPeople: '',

  });
  const [savedText, setSavedText] = useState({
    Country: '',
    State: '',
    Metro: '',
    HouseholdIncome: '',
    amtPeople: '',
  });


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText({...text, [e.target.name]: e.target.value});
  }

  function handleClick() {
    setSavedText({...text});
    console.log(message);
  }

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Global Income Score</h1>
      <p>Country: 
      <input
        name="Country"
        type="text"
        value={text.Country}
        onChange={handleChange}
        placeholder="Type something..."
      />
      </p>
      <p>State: 
      <input 
        name="State"
        type="text"
        value={text.State}
        onChange={handleChange}
        placeholder="Type something..."
      />
      </p>
      <p>Metro: 
      <input
        name="Metro"
        type="text"
        value={text.Metro}
        onChange={handleChange}
        placeholder="Optional..."
      />
      </p>
      <p>Household Income without tax: 
      <input
        name="HouseholdIncome"
        type="text"
        value={text.HouseholdIncome}
        onChange={handleChange}
        placeholder="Type something..."
      />
      </p>
      <p># of People in Household: 
      <input
        name="amtPeople"
        type="text"
        value={text.amtPeople}
        onChange={handleChange}
        placeholder="Type something..."
      />
      </p>
      <button onClick={handleClick}>Enter</button>
      {savedText && (<p>What you entered: Country - {savedText.Country} State - {savedText.State} Metro - {savedText.Metro} Household Income - {savedText.HouseholdIncome} Amount of People in your Household - {savedText.amtPeople}</p>)}
    </div>
  );
}

export default App;