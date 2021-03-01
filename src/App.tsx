/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ConsoleContext } from './contexts/ConsoleContext';
import { VariablesContext } from './contexts/VariablesContext';
import HomePage from './pages/HomePage';
import defaultTheme from './themes/defaultTheme';
import { Variable } from './types/Variable.type';

function App() {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [value, setValue] = useState<string>('');
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [consoleInput, setConsoleInput] = useState<string>('');
  const [isInput, setIsInput] = useState<boolean>(false);
  const [blockFlag, setBlockFlag] = useState<number>(0);
  localStorage.setItem('blockFlag', '0');

  function handleSetBlockFlag(value: number){
    setBlockFlag(value);console.log(blockFlag);
  }

  function resetBlockFlag(){
    setBlockFlag(0);
  }

  function getInput() {
    setIsInput(true);

    return value;
  }

  function setInput(value: string) {
    setConsoleInput(value);
  }

  function setOutput(value: string) {
    setConsoleOutput(value);
  }

  function clearInput() {
    setConsoleInput('');
  }

  function clearOutput() {
    setConsoleOutput('');
  }

  function handleSetIsInput(value: boolean) {
    setIsInput(value);
  }

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
            <ConsoleContext.Provider value={
              {
                consoleInput,
                consoleOutput,
                isInput,
                getInput,
                setIsInput: handleSetIsInput,
                setInput,
                setOutput,
                clearInput,
                clearOutput,
              }}>
              <Route component={HomePage} />
            </ConsoleContext.Provider>
          </VariablesContext.Provider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
