
import { LOOP_EXCEED_ERROR } from '../constants/errors';
import { dataType } from '../constants/reservedWords';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { getValue } from './EvaluateExpressions';

export function executeWhile(statement: ActualValue[]) {
    let output : ExecuteOutput = {
      output: '',
      status: false,
    };
    const isLoop = !!localStorage.getItem('whileFlag');
    let loopCount = Number(localStorage.getItem('loopCount'));

    if (!isLoop) {
      localStorage.setItem('whileFlag', '1');
      output.output = 'WHILE';
      output.status = true;
    } else {
      if (loopCount > 200) {
        output.output = LOOP_EXCEED_ERROR;
        output.status = true;
      }
      console.log(statement);

      localStorage.setItem('loopCount', (loopCount+1).toString());
    }console.log(isLoop)

    return output;
}