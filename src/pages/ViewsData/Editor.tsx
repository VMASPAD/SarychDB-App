import React, { useState } from 'react'
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  data: any;
}

function CodeEditor({ data }: CodeEditorProps) {
  // Formatear los datos como JSON
  const formattedData = React.useMemo(() => {
    try {
      if (!data) return '// No data available';
      
      // Si data tiene la propiedad .data del browse response, usarla
      const jsonData = data.data || data;
      return JSON.stringify(jsonData, null, 2);
    } catch (error) {
      console.error('Error formatting data:', error);
      return '// Error formatting data';
    }
  }, [data]);

  const [value, setValue] = useState(formattedData);

  return (
    <div className="w-full h-[90vh] rounded-lg overflow-hidden border border-border">
      <Editor
        height="100%"
        defaultLanguage="json"
        language="json"
        value={value}
        onChange={(newValue: string | undefined) => setValue(newValue || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: true,
          automaticLayout: true,
          formatOnPaste: true,
          formatOnType: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}

export default CodeEditor
