// src/pages/Js16Storage.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js16Storage = () => {
  const defaultCode = `// Storage API demo

localStorage.setItem("username", "Dinesh");
sessionStorage.setItem("session", "active");

console.log("localStorage username:", localStorage.getItem("username"));
console.log("sessionStorage session:", sessionStorage.getItem("session"));

localStorage.removeItem("nonexistent"); // safe no-op
console.log("All localStorage keys:", Object.keys(localStorage));
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('(Storage will use your real browser storage)');
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
      f().then(()=> {
        setOutput(logs.join('\n') || '(No output)');
        setError('');
      }).catch(e=>{
        setOutput('');
        setError(e.message);
      }).finally(()=> console.log = original);
    } catch (e){
      setOutput('');
      setError(e.message);
      console.log = original;
    }
  };

  const resetCode = () => { setCode(defaultCode); setOutput('(Storage will use your real browser storage)'); setError(''); };

  return (
    <div className="page">
      <h2>16. localStorage & sessionStorage</h2>
      <ul>
        <li><code>localStorage</code> persists across tabs/reloads</li>
        <li><code>sessionStorage</code> lasts for a tab session</li>
        <li>APIs: <code>setItem</code>, <code>getItem</code>, <code>removeItem</code>, <code>clear</code></li>
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

export default Js16Storage;
