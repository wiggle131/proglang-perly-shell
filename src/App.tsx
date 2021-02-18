import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { VariablesContext } from './contexts/VariablesContext';
import HomePage from './pages/HomePage';
import defaultTheme from './themes/defaultTheme';
import { Variable } from './types/Variable.type';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [variables, setVariables] = useState<Variable[]>([]);

  function clearVariables () {
    variables.splice(0, variables.length);
  }

  function appendVariables (value: Variable[]) {
    value.forEach((value) => variables.push(value));
  }

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={defaultTheme}>
          <VariablesContext.Provider value={{variables, appendVariables, clearVariables}}>
            <Route component={HomePage} />
          </VariablesContext.Provider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
