import React, { useContext, useEffect, useRef, useState } from 'react';
import AceEditor from "react-ace";
import styled, { css } from "styled-components";

import { ConsoleContext } from '../../contexts/ConsoleContext';
import { inputRegEx } from '../../constants/RegEx';
import { checkKeyIfSpecialCharacter } from '../../utils/StringUtils';

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-terminal";

type Props = {
  isLoading?: Boolean;
  status: Boolean;
};

export default function Console(props: Props) {
  const { isLoading, status } = props;
  const [value, setValue] = useState<string>('');
  const refEditor = useRef<AceEditor>(null);
  const { consoleInput, consoleOutput, isInput, setIsInput, setInput, setOutput } = useContext(ConsoleContext);
  const placeholder = isLoading ? 'Running program...' : 'CFPL Interpreter (2021)\nPerly Shell Team';

  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (isInput) {
      const charCode = event.key;
      let newValue = consoleInput;

      if (charCode === 'Backspace') {
        newValue = consoleInput.slice(0, -1);
      } else if (charCode === 'Enter') {
        setIsInput(false);
      } else if (checkKeyIfSpecialCharacter(charCode)){
        newValue = consoleInput;
      } else if (inputRegEx.test(charCode)) {
        newValue = consoleInput + charCode;
      }

      setInput(newValue);console.log(newValue)
      setOutput(newValue);
      (refEditor as any)?.current.editor.gotoLine((newValue.match(/\n/g) || []).length+1);
      (refEditor as any)?.current.editor.navigateLineEnd();
    }
  }

  useEffect(() => {
    setValue(consoleOutput);
  }, [consoleOutput])

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

  & .ace_line {
    color: ${(props) => props.status ? '#BB0000' : '#BFFF00'};
  }

  & .ace_placeholder {
    color: #BFFF00 !important;
  }
`;

const Wrapper = styled.div``;