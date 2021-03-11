import { listeners } from 'process';
import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import { MISS_START_ERROR } from '../constants/errors';
import { count } from 'console';

export default function inputValue(
  statement: ActualValue[],
  firstWord: String,
  getInput: () => Promise<string>,
): ExecuteOutput {
  let output : ExecuteOutput = {
      output: '',
      status: false,
  };
  const hasInput = !!Number(localStorage.getItem('hasInput'));

  if (hasInput) {
    getInput();

    return {
      ...output,
      output: 'INPUT',
      status: true,
    };
  }

  getInput().then((input) => {  
    localStorage.setItem('hasInput', '1');
    localStorage.setItem('inputLine', '0');
    localStorage.setItem('blockFlag', '0');
    let count = 0;
  
    statement.forEach((token) => {
      console.log(input);
  
        if(token.type === constantTypes.VAR){
            count++;
        }
        
    });
  });
      
  //console.log(count);
  return output;
}

