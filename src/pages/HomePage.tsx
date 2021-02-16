import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from "styled-components";

import Console from './components/Console';
import Editor from './components/Editor';

export default function HomePage () {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  function onChange(newValue: string) {
    setCode(newValue);
  }

  function onRun() {
    setOutput(code);
  }

  return (
    <StyledContainer fluid>
      <h1>CIT’s First Programming Language (CFPL)</h1>
      <Row>
        <Col md={6} sm={12} >
          <Editor value={code} onChange={onChange} onRun={onRun} />
        </Col>
        <Col md={6} sm={12} >
          <Console value={output}/>
        </Col>
      </Row>
    </StyledContainer>  
  );
}

const StyledContainer = styled(Container)`
  padding: 30px 15px;
  margin: 30px auto;
`;
