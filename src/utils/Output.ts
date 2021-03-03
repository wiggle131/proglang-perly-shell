
import constantTypes from '../constants/constantTypes';
import { APPND_NULL_ERROR } from '../constants/errors';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';

export default function Append(
    statement: ActualValue[],
    variables: Variable[],
    appendVariables: (value: Variable[]) => void,
): ExecuteOutput {
    const output: ExecuteOutput = {
      output: '',
      status: false,
    }
    let concatFlag = false;
    let temp,cleanedChar;
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
          variables.forEach((item) => {
            if(item.identifier === token.value && item.value !== null){
              if(concatFlag){
                temp = output.output.concat(item.value.toString());
                output.output = temp;
                console.log(output.output);
              } else{
                output.output = item.value.toString();
              }
            }
          });
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
  
    
    