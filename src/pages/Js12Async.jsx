// src/pages/Js12Async.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js12Async = () => {
  const defaultCode = `// Promises & Async/Await

// Promise that resolves after 1s
function delay(msg, ms=1000){
  return new Promise(res=> setTimeout(()=> res(msg), ms));
}

// then/catch/finally
delay("Resolved with .then()", 1000)
  .then(v => console.log(v))
  .catch(e => console.log("err:", e))
  .finally(()=> console.log("finally called"));

// async/await
async function run(){
  const a = await delay("Awaited A", 800);
  console.log(a);
  const b = await delay("Awaited B", 800);
  console.log(b);
}
run();

// Promise.all
Promise.all([delay("P1", 500), delay("P2", 600)])
  .then(vals => console.log("All:", vals));
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('Click Run and give it a second…');
  const [error, setError] = useState('');
  const textareaRef = useRef(null);
  let timerRef = useRef(null);

  useEffect(()=>{
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'hidden';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  },[code]);

  const runCode = () => {
    clearTimeout(timerRef.current);
    let original = console.log;
    try {
      const logs = [];
      console.log = (...args)=> logs.push(args.join(' '));
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const f = new AsyncFunction(code);
      f().catch(e => logs.push("Runtime error: " + e.message));
      // Allow async operations to complete before displaying logs
      timerRef.current = setTimeout(()=>{
        setOutput(logs.join('\n'));
        setError('');
        console.log = original;
      }, 2200);
    } catch (e) {
      setOutput('');
      setError(e.message);
      console.log = original;
    }
  };

  const resetCode = () => {
    clearTimeout(timerRef.current);
    setCode(defaultCode);
    setOutput('Click Run and give it a second…');
    setError('');
  };

  return (
    <div className="page">
      <h2>12. Promises & Async/Await</h2>
      <p>Use promises for async flows; <code>async/await</code> makes them easier to read.</p>

      <h3>Try it</h3>
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

export default Js12Async;
