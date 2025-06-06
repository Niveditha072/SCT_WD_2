import React, { useState } from 'react';
import Stopwatch from './Stopwatch';
import './index.css';

const App = () => {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? 'app dark' : 'app light'}>
      <button onClick={() => setDark(!dark)} className="toggle-theme">
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Stopwatch />
    </div>
  );
};

export default App;
