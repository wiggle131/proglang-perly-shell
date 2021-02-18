import { createContext } from 'react';
import { Variable } from '../types/Variable.type';

type Context = {
  variables: Variable[],
  appendVariables: (value: Variable[]) => void,
  clearVariables: () => void,
}

const defaultContext: Context = {
  variables: [],
  appendVariables: (value: Variable[]) => {},
  clearVariables: () => {},
}

export const VariablesContext = createContext<Context>(defaultContext);