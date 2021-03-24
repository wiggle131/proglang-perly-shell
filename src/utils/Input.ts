import { listeners } from 'process';
import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import { MISS_START_ERROR, VAR_NOT_INIT } from '../constants/errors';
import { count } from 'console';

export default function inputValue(
  statement: ActualValue[],
): ExecuteOutput {
  let output : ExecuteOutput = {
      output: '',
      status: false,
  };
  const hasInput = !!Number(localStorage.getItem('hasInput'));

  if (hasInput) {
    return {
      ...output,
      output: 'INPUT',
      status: true,
    };
  } else {
    const input = localStorage.getItem('input') ?? '';
    let variables: Variable[] = JSON.parse(localStorage.getItem('variables') || '[]');
    let flag = 0;
    let newInput = input.split(' ');
    let i=0;
    statement.forEach((token) => {
  
      
        if(token.type === constantTypes.VAR){
          variables = variables.map((inputVar, index) => {
            if(inputVar.identifier === token.value){
              inputVar.value = newInput[i];
              i++;
              flag = 1;
            }

            return inputVar;
          });
          if(flag===0){
            output.output = VAR_NOT_INIT.replace(/:token/, token.value);
            output.status = true;
          }
        }
        flag = 0;
    });
    
    localStorage.setItem('hasInput', '1');
    localStorage.setItem('variables',JSON.stringify(variables));
    // console.log(variables)
  }
  
  return output;
}