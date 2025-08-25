// src/pages/Js21Debugging.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js21Debugging = () => {
  const defaultCode = `// Debugging & DevTools

console.log("Log: simple message");
console.warn("Warn: check this");
console.error("Error: something went wrong");

// console.table
const rows = [{ id:1, n:"Alice" }, { id:2, n:"Bob" }];
console.table(rows);

// console.time / timeEnd
console.time("loop");
let sum = 0;
for(let i=0;i<1e5;i++) sum+=i;
console.timeEnd("loop");

// debugger statement (set a breakpoint)
function demo(){
  const x = 42;
  debugger; // Open DevTools to see execution pause
  return x * 2;
}
console.log("demo():", demo());
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('Open the browser DevTools console to see table/time & debugger in action.');
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  useEffect(()=>{
    if(textareaRef.current){
      textareaRef.current.style.height='auto';
      textareaRef.current.style.overflow='hidden';
      textareaRef.current.style.height=`${textareaRef.current.scrollHeight}px`;
    }
  },[code]);

  const runCode = () => {
    let original = console.log;
    try {
      const logs = [];
      console.log = (...args)=> logs.push(args.join(' '));
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const f = new AsyncFunction(code);
      f().then(()=>{
        setOutput((logs.join('\n') || '') + '\n(For console.table/time & debugger, open DevTools → Console)');
        setError('');
      }).catch(e=>{
        setOutput('');
        setError(e.message);
      }).finally(()=> console.log = original);
    } catch(e){
      setOutput('');
      setError(e.message);
      console.log = original;
    }
  };

  const resetCode = () => { setCode(defaultCode); setOutput('Open the browser DevTools console to see table/time & debugger in action.'); setError(''); };

  return (
    <div className="page">
      <h2>21. Debugging & Developer Tools</h2>
      <ul>
        <li><code>console.log / warn / error / table / time</code></li>
        <li>Use <code>debugger</code> to pause execution at a line</li>
        <li>Set breakpoints in DevTools, inspect scope/values</li>
      </ul>

      <textarea
        ref={textareaRef}
        className="code-editor"
        value={code}
        onChange={e=>setCode(e.target.value)}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={runCode}>Run</button>
        <button onClick={resetCode} style={{ marginLeft: 8 }}>Reset</button>
      </div>

      {output && <div className="output-box"><pre>{output}</pre></div>}
      {error && <div className="error-box"><pre>{error}</pre></div>}
    </div>
  );
};

export default Js21Debugging;
