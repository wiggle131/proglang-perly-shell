import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';

export function CheckSyntax(
    statement: ActualValue[],
    variables: Variable[]
    ): ExecuteOutput {

        const output: ExecuteOutput = {
        output: '',
        status: false,
        }

    let actualOutput = '';

    statement.forEach((token) => {
        if (output.status) {
          return;
        }
            console.log(token)
            if(token.type === constantTypes.VAR){
                const thisVar =  variables.find((variable: Variable)=> {
                    return variable.identifier === token.value;
                })
                actualOutput += thisVar?.value?.toString() ?? '';
                console.log(thisVar)
            }
    });
    
    output.output = actualOutput;
    return output;
    }
