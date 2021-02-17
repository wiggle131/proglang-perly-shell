import React, { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from "styled-components";

import Console from './components/Console';
import Editor from './components/Editor';
import Header from './components/Header';
import * as Interpreter from '../utils/Interpreter';

export default function HomePage () {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isInput, setIsInput] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);

  function onChange(newValue: string) {
    setCode(newValue);
  }

  async function onRun() {
    setIsLoading(true);
    const terminal = await Interpreter.executeProgram(
      code.split('\n'),
      setIsInput,
    );

    setIsError(terminal.status);
    setOutput(terminal.output);
    setIsLoading(false);
  }

  function onInput(value: string) {
    setOutput(value);
  }

  return (
    <StyledContainer fluid>
      <Header onRun={onRun} />
      <StyledRow>
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
  margin: 0;
`;