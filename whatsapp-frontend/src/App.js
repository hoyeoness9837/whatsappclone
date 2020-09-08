import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {
  return (
    <div className='app'>
      <h1>What's App clone</h1>
      <div className='app__body'>
        {/* sidebar */}
        <Sidebar />

        {/* chat component */}
        <Chat />
      </div>
    </div>
  );
}

export default App;
