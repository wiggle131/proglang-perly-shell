import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import HomePage from './pages/HomePage';
import defaultTheme from './themes/defaultTheme';

function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={defaultTheme}>
          <Route component={HomePage} />
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
