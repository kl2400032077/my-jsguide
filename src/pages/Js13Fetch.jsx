// src/pages/Js13Fetch.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js13Fetch = () => {
  const defaultCode = `// Fetch API

async function run(){
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    console.log("Title:", data.title);
    console.log("Body:", data.body.slice(0, 60) + "...");
  } catch (e) {
    console.log("Fetch error:", e.message);
  }
}
run();`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('Click Run (requires internet)');
  const [error, setError] = useState('');
  const textareaRef = useRef(null);
  const timerRef = useRef(null);

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
      // Give time for fetch to complete
      timerRef.current = setTimeout(()=>{
        setOutput(logs.join('\n') || '(No output)');
        setError('');
        console.log = original;
      }, 2500);
    } catch (e) {
      setOutput('');
      setError(e.message);
      console.log = original;
    }
  };

  const resetCode = () => {
    clearTimeout(timerRef.current);
    setCode(defaultCode);
    setOutput('Click Run (requires internet)');
    setError('');
  };

  return (
    <div className="page">
      <h2>13. Fetch API</h2>
      <p><code>fetch(url)</code> → <code>Response</code> → <code>res.json()</code>. Always handle errors.</p>

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

export default Js13Fetch;
