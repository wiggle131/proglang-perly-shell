import { listeners } from 'process';
import constantTypes from '../constants/constantTypes';
import { ActualValue, ExecuteOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import { MISS_START_ERROR,START_ERROR } from '../constants/errors';


export default function checkCompleteBlock(statement: string): ExecuteOutput {

    let counter = localStorage.getItem('flag');
    let flag = Number(counter);
    let integer = Number(counter);
    let updateValue=0;
    let flag = Number(localStorage.getItem('blockFlag'));
    let output : ExecuteOutput = {
      output: '',
      status: false,
    };

    if(statement === "START" && flag === 1){ 
        localStorage.setItem('blockFlag', '3');
    }

    else if(statement === "START" && flag===0){
        // console.log("START Flag");
        localStorage.setItem('blockFlag', '1');
        // flagStart = 1;
        // localStorage.setItem('startCounter', updateValue.toString());
    }

    if(statement == "STOP" && flag==0){

    if(statement == "START"){
        // console.log("START Flag");
        updateValue = 1;
        localStorage.setItem('flag', updateValue.toString());
    }

    if(statement == "STOP" && integer==0){
    if(statement === "STOP" && flag===0){
        // console.log("Missing Start Keyword");
        output.output = MISS_START_ERROR;
        output.status = true;
    }

    if(statement === "STOP" && flag==3){
        // console.log("Missing Start Keyword");
        output.output = START_ERROR;
        output.status = true;
    }

    if(statement == "STOP" && flag==1){
    if(statement == "STOP" && integer==1){
        // console.log("Full Block");
        localStorage.setItem('blockFlag', '1');
    }



    return output;
}