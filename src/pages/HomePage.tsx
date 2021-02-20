import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from "styled-components";

import Console from './components/Console';
import Editor from './components/Editor';
import Header from './components/Header';
import { VariablesContext } from '../contexts/VariablesContext';
import { Variable } from '../types/Variable.type';
import * as Interpreter from '../utils/Interpreter';

export default function HomePage () {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isInput, setIsInput] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);
  const { variables, appendVariables, clearVariables } = useContext(VariablesContext);

  function onChange(newValue: string) {
    setCode(newValue);
  }

  async function onRun() {
    setIsLoading(true);
    clearVariables();

    const terminal = await Interpreter.executeProgram(
      code.split('\n'),
      variables,
      appendVariables,
    );
    
    
    setIsError(terminal.status);
    setOutput(terminal.output);
    setIsLoading(false);
  }

  function onInput(value: string) {
    setOutput(value);
  }

  const displayVariables = variables.map((variable, index) => {
    return (
      <VariableWrapper key={index}>
        <h5>{variable.identifier}</h5>
        <h6>Datatype: {variable.dataType}</h6>
        <h6>Value: {String(variable.value)}</h6>
      </VariableWrapper>
    );
  });

  return (
    <StyledContainer fluid>
      <StyledRow className="mr-0 ml-0">
        <Header onRun={onRun} />
        <StyledCol md={6} sm={12} >
          <Editor value={code} onChange={onChange} />
        </StyledCol>
        <StyledCol md={6} sm={12} >
          <Console
            isInput={isInput}
            isLoading={isLoading}
            status={isError}
            value={output}
            onInput={onInput}
          />
        </StyledCol>
        <VariableContainer>
          {displayVariables}
        </VariableContainer>
      </StyledRow>
    </StyledContainer>  
  );
}

const StyledContainer = styled(Container)`
  position:absolute;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px auto;
`;

const StyledCol = styled(Col)`
  padding: 0;
`;

const StyledRow = styled(Row)`
  padding: 0;
`;

const VariableContainer = styled(Container)`
  display: flex;
  flex-direction: row;
`;

const VariableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
`;
