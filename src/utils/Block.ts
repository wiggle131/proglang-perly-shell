import { listeners } from 'process';
import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import { MISS_START_ERROR,START_ERROR } from '../constants/errors';


export default function checkCompleteBlock(statement: string): ExecuteOutput {

    let counter = localStorage.getItem('flag');
    let integer = Number(counter);
    let updateValue=0;
    let output : ExecuteOutput = {
      output: '',
      status: false,
    };


    if(statement == "START"){
        // console.log("START Flag");
        updateValue = 1;
        localStorage.setItem('flag', updateValue.toString());
    }

    if(statement == "STOP" && integer==0){
        // console.log("Missing Start Keyword");
        output.output = MISS_START_ERROR;
    }

    if(statement == "STOP" && integer==1){
        // console.log("Full Block");
        updateValue = 2;
        localStorage.setItem('flag', updateValue.toString());
    }



    return output;
}