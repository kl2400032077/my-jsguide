// src/pages/Js20JSON.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js20JSON = () => {
  const defaultCode = `// JSON parse/stringify, replacer, reviver

const obj = { name: "Alice", age: 30, active: true, nested: { a: 1 } };

// stringify
const s1 = JSON.stringify(obj);
console.log("stringified:", s1);

// stringify with replacer to filter keys
const s2 = JSON.stringify(obj, ["name","active"]);
console.log("only name+active:", s2);

// stringify with pretty print (space=2)
console.log("pretty:", JSON.stringify(obj, null, 2));

// parse
const parsed = JSON.parse(s1);
console.log("parsed name:", parsed.name);

// reviver (e.g., convert numbers)
const revived = JSON.parse('{"x":"42","y":"07"}', (k,v)=>{
  if(typeof v === 'string' && /^\\d+$/.test(v)) return Number(v);
  return v;
});
console.log("revived:", revived);

// deep copy via JSON (note: drops functions/undefined)
const copy = JSON.parse(JSON.stringify(obj));
console.log("deep copy:", copy);
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
      <h2>20. Working with JSON</h2>
      <p>Serialize with <code>JSON.stringify</code>, parse with <code>JSON.parse</code>, use replacer/reviver for customization.</p>

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

export default Js20JSON;
