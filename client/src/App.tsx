import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  function handleChange(e:any) {
    setText(e.target.value);
  }

  function handleClick() {
    setSavedText(text);
    setText('');
  }

  return (
    <div>
      <h1>Global Income Score</h1>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <button onClick={handleClick}>Enter</button>
      {savedText && <p>You entered: {savedText}</p>}
    </div>
  );
}

export default App;