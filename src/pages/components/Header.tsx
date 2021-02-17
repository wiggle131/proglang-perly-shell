import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styled from "styled-components";

type Props = {
  onRun?: (value: string) => void;
};

export default function Header(props: Props) {
  const { onRun } = props;


  return(
    <Wrapper>
      <Text>CIT’s First Programming Language (CFPL)</Text>
      <Row>
        <Col md={6} sm={12}>
          <StyledButton onClick={onRun}>Run</StyledButton>
        </Col>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const StyledButton = styled(Button)`
  width: auto;
  background-color: transparent !important;
  border-color: #ffc107;
`;

const Text = styled.h1`
  text-align: center;
`;
