import { listeners } from 'process';
import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import { MISS_START_ERROR,START_ERROR } from '../constants/errors';


export default function checkCompleteBlock(statement: string): ExecuteOutput {

    let counter = localStorage.getItem('flag');
    let flag = Number(counter);
    let updateValue=0;
    let output : ExecuteOutput = {
      output: '',
      status: false,
    };

    if(statement == "START" && flag==1){ 
        updateValue = 3; // Flag for start already implemented
        localStorage.setItem('flag', updateValue.toString());
    }

    else if(statement == "START" && flag==0){
        // console.log("START Flag");
        updateValue = 1;
        localStorage.setItem('flag', updateValue.toString());
        // flagStart = 1;
        // localStorage.setItem('startCounter', updateValue.toString());
    }

    if(statement == "STOP" && flag==0){
        // console.log("Missing Start Keyword");
        output.output = MISS_START_ERROR;
    }

    if(statement == "STOP" && flag==3){
        // console.log("Missing Start Keyword");
        output.output = START_ERROR;
    }

    if(statement == "STOP" && flag==1){
        // console.log("Full Block");
        updateValue = 2;
        localStorage.setItem('flag', updateValue.toString());
    }



    return output;
}