// src/pages/Js17Modules.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js17Modules = () => {
  // Use normal quotes for the inner module source to avoid breaking the outer template string.
  const defaultCode = `// Dynamic module demo using Blob + import()

// Create a module source as a normal string (NOT backticks)
const moduleCode =
  'export const add = (a,b) => a + b;\\n' +
  'export default function greet(n){ return "Hello " + n; }\\n';

// Turn the source into a Blob URL with JS MIME type
const blob = new Blob([moduleCode], { type: 'text/javascript' });
const url = URL.createObjectURL(blob);

(async () => {
  // Dynamically import the module from the Blob URL
  const mod = await import(url);
  console.log("Default greet:", mod.default("Alice"));   // Hello Alice
  console.log("Named add:", mod.add(2, 3));              // 5

  // Clean up the object URL
  URL.revokeObjectURL(url);
})();`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState(
    'Click Run to dynamically import a module from a Blob URL.'
  );
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize the editor height to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'hidden';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const runCode = () => {
    let original = console.log;
    try {
      const logs = [];
      console.log = (...args) => logs.push(args.join(' '));

      // Execute the user code (which uses dynamic import)
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const f = new AsyncFunction(code);
      f()
        .catch((e) => logs.push('Runtime error: ' + e.message))
        .finally(() => {
          // allow a tick for async import logs to land
          setTimeout(() => {
            setOutput(logs.join('\n') || '(No output)');
            setError('');
            console.log = original;
          }, 200);
        });
    } catch (e) {
      setOutput('');
      setError(e.message);
      console.log = original;
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput('Click Run to dynamically import a module from a Blob URL.');
    setError('');
  };

  return (
    <div className="page">
      <h2>17. Modular JavaScript</h2>
      <p>
        Modern JavaScript uses modules (<code>export</code>/<code>import</code>) to split code into
        reusable files. Below we demonstrate a <strong>dynamic import</strong> by generating a module
        at runtime using a Blob URL.
      </p>

      <ul>
        <li><code>export</code> / <code>export default</code> to expose values</li>
        <li><code>import ... from 'path'</code> to consume modules</li>
        <li>Dynamic <code>import(url)</code> to load modules at runtime</li>
      </ul>

      <h3>Try it</h3>
      <textarea
        ref={textareaRef}
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={runCode}>Run</button>
        <button onClick={resetCode} style={{ marginLeft: 8 }}>
          Reset
        </button>
      </div>

      {output && (
        <div className="output-box">
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <div className="error-box">
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default Js17Modules;
