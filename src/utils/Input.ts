import { listeners } from 'process';
import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import { MISS_START_ERROR } from '../constants/errors';
import { count } from 'console';

export default function inputValue(statement: ActualValue[], firstWord: String): ExecuteOutput {
        let output : ExecuteOutput = {
          output: '',
          status: false,
        };

        let count = 0;

        if(firstWord=="INPUT:") {statement.forEach((token) => {

            if(token.type === constantTypes.VAR){
                count++;
            }
            
        });
    }
        
        //console.log(count);
        return output;
}

