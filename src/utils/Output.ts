
import constantTypes from '../constants/constantTypes';
import { APPND_NULL_ERROR } from '../constants/errors';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';

export default function Output(
    statement: ActualValue[],
    variables: Variable[],
): ExecuteOutput {
    const output: ExecuteOutput = {
      output: '',
      status: false,
    }
    let concatFlag = false;
    let temp,cleanedChar,actualOutput;
    statement.forEach((token) => {
      if (output.status) {
        return;
      } 
      else if(token.value === '&' && token.type === constantTypes.SPECIAL){
         if(output.output !== ''){
           concatFlag = true;
         }
         else if(output.output === ''){
          output.output = APPND_NULL_ERROR.replace(/:token/, token.value ?? '');
          output.status = true;
          concatFlag = false;
         }
      }
      else{
        if(token.type === constantTypes.VAR){
            const thisVar =  variables.find((variable: Variable)=> {
                return variable.identifier === token.value;
            })
            if(concatFlag){
              temp = output.output.concat(thisVar?.value?.toString() ?? '');
              actualOutput = temp;
              //console.log(output.output);
            } else{
              actualOutput = thisVar?.value?.toString() ?? '';
            }
            output.output = actualOutput;
        }
        else if(token.type === constantTypes.CHAR || token.type === constantTypes.FLOAT || token.type === constantTypes.INT){
          console.log(token.value);
          if(token.type === constantTypes.CHAR){
            cleanedChar = token.value.toString();
            cleanedChar = cleanedChar.replaceAll('\'','');
            temp = output.output.concat(cleanedChar);
          }else
            temp = output.output.concat(token.value.toString());
          output.output = temp;
        }
      }
      
    });
   return output;
}
