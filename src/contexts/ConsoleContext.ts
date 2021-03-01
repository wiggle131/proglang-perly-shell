import { createContext } from 'react';

type Context = {
  consoleOutput: string;
  isInput: Boolean;
  getInput: () => string;
  setIsInput: (value: boolean) => void;
  setOutput: (value: string) => void;
  clearOutput: () => void;
}

const defaultContext: Context = {
  consoleOutput: '',
  isInput: false,
  getInput: () => {return ''},
  setIsInput: () => {},
  setOutput: () => {},
  clearOutput: () => {},
}

export const ConsoleContext = createContext<Context>(defaultContext);