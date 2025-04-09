import React from 'react';


function EnterButton() {
  return (
    <button>
      Enter
    </button>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Global Income Score</h1>
          <EnterButton />
      </header>
    </div>
  );
}

export default App;
