// src/pages/Js15Errors.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js15Errors = () => {
  const defaultCode = `// Error Handling: try/catch/finally

function divide(a,b){
  if(b === 0) throw new Error("Division by zero!");
  return a/b;
}

try {
  console.log("10 / 2 =", divide(10,2));
  console.log("10 / 0 =", divide(10,0)); // throws
} catch(e) {
  console.log("Caught:", e.message);
} finally {
  console.log("Finally always runs.");
}

// Custom Error
class InputError extends Error {
  constructor(msg){ super(msg); this.name = "InputError"; }
}
function mustBeNumber(n){
  if(typeof n !== 'number') throw new InputError("Not a number!");
  return true;
}
try {
  mustBeNumber("abc");
} catch(e) {
  console.log(e.name + ":", e.message);
}
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  useEffect(()=>{
    if(textareaRef.current){
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'hidden';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  },[code]);

  const runCode = () => {
    let original = console.log;
    try {
      const logs = [];
      console.log = (...args)=> logs.push(args.join(' '));
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const f = new AsyncFunction(code);
      f().then(()=> {
        setOutput(logs.join('\n'));
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

  const resetCode = () => { setCode(defaultCode); setOutput(''); setError(''); };

  return (
    <div className="page">
      <h2>15. Error Handling</h2>
      <p>Use <code>try/catch/finally</code>, throw <code>Error</code> (or custom errors) to handle failures gracefully.</p>

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

export default Js15Errors;
