import Stack from 'ts-data.stack';

import constantTypes from '../constants/constantTypes';
import { SYNTAX_ERROR } from '../constants/errors';
import { declartion } from '../constants/reservedWords';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';

export default function Declare(
  statement: ActualValue[],
  variables: Variable[],
  setVariables: React.Dispatch<React.SetStateAction<Variable[]>>,
): ExecuteOutput {
  const output: ExecuteOutput = {
    output: '',
    status: false,
  }
  let stack = new Stack<ActualValue>();
  let newVariables: Variable[] = [];
  let dataType = constantTypes.DATATYPE;

  console.log(statement);
  statement.forEach((token) => {
    if (output.status) {
      return;
    }
    
    if (token.type === constantTypes.VAR &&
      (stack.isEmpty() || stack.peek().value === ',')) {
      if (!stack.isEmpty() && stack.peek().value === ',') {
        stack.pop();
      }
      stack.push(token);
    } else if (token.type === constantTypes.CHAR ||
      token.type === constantTypes.INT || token.type === constantTypes.FLOAT) {
      stack.push(token);
    } else if (token.value === ',' || token.value === '=') {
      stack.push(token);
    } else if (token.value === declartion.AS &&
      stack.peek().type === constantTypes.VAR) {
      stack.push(token);
    } else if (token.type === constantTypes.DATATYPE &&
      stack.peek().value === declartion.AS) {
      stack.pop();
      stack.push(token);

      const { variables: newVars, stack: newStack } = getVariables(stack);

      newVariables = newVars;
      stack = newStack;
    } else {
      output.output = SYNTAX_ERROR.replace(/:token/, token.value);
      output.status = true;
    }
    // if (!stack.isEmpty())
    // console.log(stack.peek());
    
  });

  if (!output.status) {
    setVariables(newVariables);
  }
  
  output.status = output.status || !stack.isEmpty();

  return output;
}

export function getVariables(stack: Stack<ActualValue>) {
  const variables: Variable[] = [];
  const variableType = stack.peek().value;
  let variable: Variable = {
    dataType: '',
    identifier: '',
    value: null,
  };

  stack.pop();

  while(!stack.isEmpty()) {
    const token = stack.peek();

    variable = {
      dataType: variableType,
      identifier: token.value,
      value: null,
    }

    variables.push(variable);

    stack.pop();    
  }

  return { variables, stack };
}