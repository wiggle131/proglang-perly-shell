import { listeners } from 'process';
import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import { VAR_NOT_INIT, INPUT_INVALID } from '../constants/errors';
import { count } from 'console';
import { stream } from '../constants/reservedWords';

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
    let value = 0;
   
    statement.forEach((token) => {
  
      
        if(token.type === constantTypes.VAR){
            variables = variables.map((inputVar) => {
              if(inputVar.identifier === token.value){
                if(inputVar.dataType === "INT"){
                  if(newInput[i].match(/^\d+$/)){
                    inputVar.value = newInput[i];
                    i++;
                    flag = 1;
                  }
                  else{
                    output.output = INPUT_INVALID;
                    output.status = true;
                    console.log("Integer error");
                    flag = 1;
                  }
                }
                else if(inputVar.dataType === "FLOAT"){
                  if(newInput[i].match(/^[-+]?[0-9]+\.[0-9]+$/)){
                    inputVar.value = newInput[i];
                    i++;
                    flag = 1;
                  }
                  else{
                    output.output = INPUT_INVALID;
                    output.status = true;
                    console.log("Float error");
                    flag = 1;
                  }
                }
                else if(inputVar.dataType === "CHAR"){
                  if(newInput[i].match(/^[a-zA-Z0-9]*$/)){
                    inputVar.value = newInput[i];
                    i++;
                    flag = 1;
                  }
                  else{
                    output.output = INPUT_INVALID;
                    output.status = true;
                    console.log("Char error");
                    flag = 1;
                  }
                }
                else if(inputVar.dataType === "BOOL"){
                  if(newInput[i].match("TRUE") || newInput[i].match("FALSE")){
                    inputVar.value = newInput[i];
                    i++;
                    flag = 1;
                  }
                  else{
                    output.output = INPUT_INVALID;
                    output.status = true;
                    console.log("Bool error");
                    flag = 1;
                  }
                }
                
              }
              
              return inputVar;
            });

            if(flag===0){
              output.output = VAR_NOT_INIT.replace(/:token/, token.value);
              output.status = true;
              console.log("Variable "+token.value+" not initialized");
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