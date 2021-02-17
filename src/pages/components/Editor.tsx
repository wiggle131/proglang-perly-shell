import React from 'react';
import AceEditor from "react-ace";
import styled from "styled-components";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-monokai";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor(props: Props) {
  const { value, onChange } = props;
  
  return(
    <>
      <StyledEditor
        placeholder="Type your code here"
        mode="text"
        theme="monokai"
        name="editor"
        onChange={onChange}
        fontSize={18}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
      />
    </>
  );
}

const StyledEditor = styled(AceEditor)`
  width: auto !important;
`;
