import brace from 'brace';
import React, { useEffect, useRef } from 'react';
import AceEditor from "react-ace";
import styled from "styled-components";

import CustomMode from '../../AceHighlighting';

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-monokai";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor(props: Props) {
  const { value, onChange } = props;
  const refEditor = useRef<AceEditor>(null);
  const customMode = new CustomMode();

  useEffect(() => {
    (refEditor as any)?.current.editor.getSession().setMode(customMode);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
        ref={refEditor}
        value={value}
      />
    </>
  );
}

const StyledEditor = styled(AceEditor)`
  width: auto !important;
`;
