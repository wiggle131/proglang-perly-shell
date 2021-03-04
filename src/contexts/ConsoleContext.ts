import { createContext } from 'react';

type Context = {
  consoleInput: string;
  consoleOutput: string;
  isInput: Boolean;
  getInput: () => string;
  setIsInput: (value: boolean) => void;
  setInput: (value: string) => void;
  setOutput: (value: string) => void;
  clearInput: () => void;
  clearOutput: () => void;
}

const defaultContext: Context = {
  consoleInput: '',
  consoleOutput: '',
  isInput: false,
  getInput: () => {return ''},
  setIsInput: () => {},
  setInput: () => {},
  setOutput: () => {},
  clearInput: () => {},
  clearOutput: () => {},
}

export const ConsoleContext = createContext<Context>(defaultContext);