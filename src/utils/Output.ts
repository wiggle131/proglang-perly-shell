
import constantTypes from '../constants/constantTypes';
import { APPND_NULL_ERROR } from '../constants/errors';
import { dataType } from '../constants/reservedWords';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';

export default function Output(
    statement: ActualValue[],
    variables: Variable[],
    setOutput: (value: string) => void,
    consoleOutput: {output: string},
    ): ExecuteOutput {
    const output: ExecuteOutput = {
      output: '',
      status: false,
    }
    let concatFlag = false;
    let flagOnBrackets = false;
    let flagNegative = false;
    let temp,cleanedChar,actualOutput;
    let varString = ''
    statement.forEach((token) => {
      if (output.status) {
        return;
      }
      else if(token.value === '-' && token.type === constantTypes.OPERATOR){
        flagNegative = true;
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
            if(flagNegative && (thisVar?.dataType === dataType.INT || thisVar?.dataType === dataType.FLOAT)){
              thisVar.value = Number(thisVar.value) * -1;
            }
            if(concatFlag){
              temp = output.output.concat(thisVar?.value?.toString() ?? '');
              actualOutput = temp;
              console.log(output.output);
            } else{
              actualOutput = thisVar?.value?.toString() ?? '';
            }
            output.output = actualOutput;
            if(flagNegative && (thisVar?.dataType === dataType.INT || thisVar?.dataType === dataType.FLOAT)){
              thisVar.value = Number(thisVar.value) * -1;
            }
        }
        else if(token.type === constantTypes.CHAR || token.type === constantTypes.FLOAT || token.type === constantTypes.INT){
          
          if(token.type === constantTypes.CHAR){
            const tempS = token.value.toString();
            cleanedChar = tempS.substring(1,tempS.length-1);
            
            varString = '';

            for(let i = 0; i < cleanedChar.length; i++){
              if(cleanedChar[i] === '['){
                flagOnBrackets = true;
                continue;
              }
              if(flagOnBrackets){
                if(cleanedChar[i] !== ']'){
                  varString += cleanedChar[i];
                }
                else{
                  flagOnBrackets = false;
                  continue;
                }
              }
              else{
                if(cleanedChar[i] === '#'){
                  varString += ':newline';
                }
                else{
                  varString += cleanedChar[i];
                }
              }
            }

            const withNewLine = varString.replace(':newline','\n');
            temp = output.output.concat(withNewLine);
          }else
            temp = output.output.concat(token.value.toString());
          output.output = temp;
        }
      }
    });

    if (!output.status) {
      consoleOutput.output += output.output;
    }
   return output;
}
