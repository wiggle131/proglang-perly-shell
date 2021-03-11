import constantTypes from '../constants/constantTypes';
import { SYNTAX_ERROR, MISS_STOP_ERROR,UNEXP_LINE_ERROR } from '../constants/errors';
import { ActualValue, ExecuteOutput, ParseOutput } from '../types/Output.type';
import { Variable } from '../types/Variable.type';
import * as LexicalAnalyzer from './LexicalAnalyzer';
import Declare from './VariableDeclaration';
import checkCompleteBlock from './Block';
import { Evaluate } from './EvaluateExpressions';
import { stat } from 'fs';
import inputValue from './Input';
import Output from './Output';

export function executeProgram (
  lines: Array<string>,
  variables: Variable[],
  appendVariables: (value: Variable[]) => void,
  setOutput: (value: string) => void,
) : ExecuteOutput {
  let output : ExecuteOutput = {
    output: '',
    status: false,
  };
  let lineNumber = 0;


  lines.forEach((line) => {
    const cleanedLine = line.trim();
    let parsedStatement: ParseOutput;
    lineNumber += 1;

    if (cleanedLine.length === 0 || output.status){
      return;
    } else {
      parsedStatement = LexicalAnalyzer.parseStatement(line);
    }

    //console.log(parsedStatement,output);

    if (parsedStatement.error !== '') {
      output.output = parsedStatement.error.replace(/:lineNumber/, lineNumber.toString());
      output.status = true;
      return;
    } else {
      output = runStatement(
        parsedStatement.actualValue,
        variables,
        appendVariables,
        setOutput,
      );
      if (output.status) {
        output.output = output.output.replace(/:lineNumber/, lineNumber.toString());
        return;
      }
      
    }
  });

  if (!output.status) {
    let flag = Number(localStorage.getItem('blockFlag'));
  
    if(flag !== 2){
      output.output = MISS_STOP_ERROR;
      output.status = true;
    }
  
    if(lines[lines.length-1] != "STOP" && flag == 2){
      output.output = UNEXP_LINE_ERROR;
      output.status = true;
    }
  
    localStorage.setItem('blockFlag', '0'); //reset the blockFlag after reading all the lines
  }

  return output;
}


export function runStatement(
  statement: ActualValue[],
  variables: Variable[],
  appendVariables: (value: Variable[]) => void,
  setOutput: (value: string) => void,
) : ExecuteOutput {
  let output : ExecuteOutput = {
    output: '',
    status: false,
  };
  

  if (statement.length > 0) {
    const statementType = statement[0].type;
    const newStatement = statement.slice(1);
    const firstWord = statement[0].value;
  
    switch (statementType) {
      case (constantTypes.DECLARATION) :
        output = Declare(newStatement, variables, appendVariables);
      
        break;
      case(constantTypes.BLOCK) :
        output = checkCompleteBlock(firstWord);
        break;
      case (constantTypes.IO) :
        if(statement[0].value === "OUTPUT:"){
          output = Output(newStatement, variables, setOutput);
        } else {
          output = inputValue(newStatement, firstWord);
        }
        break;
      case (constantTypes.VAR) :
        output = Evaluate(statement, variables);
        break;
      default:
        output.output = SYNTAX_ERROR.replace(/:token/, statement[0].value);
        output.status = true;
    }
  }

  return output;
}