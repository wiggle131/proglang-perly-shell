import { createContext } from 'react';
import { Variable } from '../types/Variable.type';

type Context = {
  variables: Variable[],
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>,
  clearVariables: () => void,
}

const defaultContext: Context = {
  variables: [],
  setVariables: () => {},
  clearVariables: () => {},
}

export const VariablesContext = createContext<Context>(defaultContext);