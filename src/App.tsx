import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { VariablesContext } from './contexts/VariablesContext';
import HomePage from './pages/HomePage';
import defaultTheme from './themes/defaultTheme';

function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={defaultTheme}>
          <VariablesContext.Provider value={[]}>
            <Route component={HomePage} />
          </VariablesContext.Provider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
