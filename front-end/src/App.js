import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/search"
        component={ Search }
      />

      <Route
        exact
        path="*"
        component={ NotFound }
      />
    </Switch>
  );
}

export default App;
