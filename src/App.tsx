import React from 'react';
import './App.css';
import Heading from './Components/Heading';
import Board from './Components/Board';

function App() {
  return (
    <div className="App">
      <Heading />
      <Board numGuesses={6}/>
    </div>
  );
}

export default App;
