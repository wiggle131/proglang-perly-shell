import React from 'react';
import AceEditor from "react-ace";
import { Button, Row } from 'react-bootstrap';
import styled from "styled-components";

import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
};

export default function Editor(props: Props) {
  const { value, onChange, onRun } = props;
  
  return(
    <>
      <StyledEditor
        placeholder="Placeholder Text"
        mode="text"
        theme="monokai"
        name="editor"
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
      />
      <Row md={6}>
        <StyledButton onClick={onRun}>Run</StyledButton>
      </Row>
    </>
  );
}

const StyledEditor = styled(AceEditor)`
  width: 100% !important;
`;

const StyledButton = styled(Button)`
  margin-left: 15px;
  width: auto;
`;