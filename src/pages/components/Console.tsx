import React, { useContext, useRef, useState } from 'react';
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
  const refEditor = useRef<AceEditor>(null);
  const [value, setValue] = useState('');
  const { consoleOutput, isInput, setIsInput } = useContext(ConsoleContext);
  const placeholder = isLoading ? 'Running program...' : 'CFPL Interpreter (2021)\nPerly Shell Team';

  function handleKeyPress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (isInput && setIsInput) {
      const charCode = event.key;
      let newValue = value;

      if (charCode === 'Backspace') {
        newValue = value.slice(0, -1);
      } else if (charCode === 'Enter') {
        newValue = value + '\n';

        setIsInput(false);
        setValue(newValue);
      } else if (checkKeyIfSpecialCharacter(charCode)){
        newValue = value;
      } else if (inputRegEx.test(charCode)) {
        newValue = value + charCode;
      }

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
        value={consoleOutput}
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