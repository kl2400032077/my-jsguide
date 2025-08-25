// src/pages/Js19BuiltIn.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js19BuiltIn = () => {
  const defaultCode = `// Built-in Objects quick tour

// Date
const now = new Date();
console.log("Date:", now.toISOString());

// Math
console.log("Random 0-99:", Math.floor(Math.random()*100));
console.log("PI:", Math.PI);

// Number
console.log("ParseInt('42'):", parseInt("42", 10));
console.log("isNaN('abc'):", isNaN("abc"));

// String
const s = "JavaScript";
console.log("Length:", s.length, "Upper:", s.toUpperCase());

// Array
const arr = [1,2,3,4,5];
console.log("map x2:", arr.map(x=>x*2));
console.log("filter >2:", arr.filter(x=>x>2));
console.log("reduce sum:", arr.reduce((a,c)=>a+c,0));

// Object
const obj = {a:1, b:2};
console.log("keys:", Object.keys(obj));
console.log("values:", Object.values(obj));
console.log("entries:", Object.entries(obj));

// JSON (also built-in global)
console.log("JSON.stringify:", JSON.stringify(obj));
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
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
      <h2>19. Built-in Objects</h2>
      <p>Useful globals: <code>Date</code>, <code>Math</code>, <code>Number</code>, <code>String</code>, <code>Array</code>, <code>Object</code>, <code>JSON</code>.</p>

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

export default Js19BuiltIn;
