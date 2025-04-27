import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import "./CodePanel.css"
const CodePanel = ({ code, language }) => {
    return (
      <div className="code-panel">
        <SyntaxHighlighter language={language} style={oneDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };
  
  export default CodePanel;
