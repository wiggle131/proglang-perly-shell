import React, { useRef, useState } from 'react';
import AceEditor from "react-ace";
import styled from "styled-components";

import { charRegEx } from '../../constants/RegEx';
import { checkKeyIfSpecialCharacter } from '../../utils/StringUtils';

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-terminal";

type Props = {
  isInput?: Boolean
  isLoading?: Boolean;
  status: Boolean;
  value: string;
  onInput?: (value: string) => void;
};

export default function Console(props: Props) {
  const { isInput, isLoading, status, value, onInput } = props;
  const refEditor = useRef<AceEditor>(null);
  const placeholder = isLoading ? 'Running program...' : 'CFPL Interpreter (2021)\nPerly Shell Team';

  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (isInput && onInput) {
      const charCode = event.key;
      let newValue = value;

      if (charCode === 'Backspace') {
        newValue = value.slice(0, -1);
      } else if (charCode === 'Enter') {
        newValue = value + '\n';
      } else if (checkKeyIfSpecialCharacter(charCode)){
        newValue = value;
      } else if (charRegEx.test(charCode)) {
        newValue = value + charCode;
      }

      onInput(newValue);
      (refEditor as any)?.current.editor.gotoLine((value.match(/\n/g) || []).length+1);
      (refEditor as any)?.current.editor.navigateLineEnd();
    }
  }

  return(
    <Wrapper onKeyDown={handleKeyPress}>
      <StyledEditor
        readOnly
        cursorStart={1}
        fontSize={18}
        highlightActiveLine={false}
        mode="text"
        name="console"
        placeholder={placeholder}
        ref={refEditor}
        setOptions={{
          cursorStyle: 'ace',
          showLineNumbers: false,
        }}
        showGutter={false}
        showPrintMargin={true}
        status={status}
        theme="terminal"
        value={value}
      />
    </Wrapper>
  );
}

const StyledEditor = styled(AceEditor)<Props>`
  width: auto !important;

  color: ${(props) => props.status ? '#BB0000' : '#BFFF00'}
`;

const Wrapper = styled.div``;