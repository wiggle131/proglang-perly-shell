import { ExecuteOutput, ParseOutput } from '../types/Output.type';
import { parseStatement } from './LexicalAnalyzer';

export async function executeProgram (
  lines: Array<string>,
  setIsInput: React.Dispatch<React.SetStateAction<Boolean>>,
) : Promise<ExecuteOutput> {
  let lineNumber = 0;
  const output : ExecuteOutput = {
    output: '',
    status: false,
  };

  await lines.forEach((line) => {
    const cleanedLine = line.trim();
    lineNumber += 1;

    if (cleanedLine.length === 0 || output.status){
      return;
    }

    const parsedStatement: ParseOutput = parseStatement(line);

    if (parsedStatement.error !== '') {
      output.output = parsedStatement.error.replace(/:lineNumber/, lineNumber.toString());
      output.status = true;

      return;
    }
  });

  return output;
}