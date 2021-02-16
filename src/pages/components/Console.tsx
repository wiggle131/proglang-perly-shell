import React from 'react';
import AceEditor from "react-ace";
import styled from "styled-components";

import "ace-builds/src-noconflict/theme-terminal";

type Props = {
  value: string;
};

export default function Console(props: Props) {
  const { value } = props;
  
  return(
    <StyledEditor
      readOnly
      placeholder="_"
      mode="text"
      theme="terminal"
      name="console"
      fontSize={14}
      showPrintMargin={true}
      showGutter={false}
      highlightActiveLine={false}
      value={value}
      setOptions={{
        showLineNumbers: false,
      }}
    />
  );
}

const StyledEditor = styled(AceEditor)`
  width: 100% !important;
`;