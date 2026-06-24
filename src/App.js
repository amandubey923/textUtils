import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [mode, setMode] = useState('dark');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor =
      mode === 'dark'
        ? '#0F172A'
        : '#F8FAFC';

    document.body.style.transition =
      'background-color .3s ease';
  }, [mode]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      showAlert(
        'Dark mode enabled',
        'success'
      );
    } else {
      setMode('light');
      showAlert(
        'Light mode enabled',
        'success'
      );
    }
  };

  return (
    <Router>

      <div className={`app ${mode}`}>

        <Navbar
          title="TextPro AI"
          aboutText="About"
          mode={mode}
          toggleMode={toggleMode}
        />

        <Alert alert={alert} />

        <Switch>

          <Route exact path="/">

            <Hero mode={mode} />

            <TextForm
              heading="AI Powered Text Workspace"
              mode={mode}
              showAlert={showAlert}
            />

          </Route>

          <Route exact path="/about">

            <About mode={mode} />

          </Route>

        </Switch>

        <Footer mode={mode} />

      </div>

    </Router>
  );
}

export default App;