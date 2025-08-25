// src/pages/Js8SetMap.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js8SetMap = () => {
  const defaultCode = `// Set & Map: unique collections and key/value maps

// 1) Set (unique values)
const set = new Set([1,2,2,3]);
set.add(4);
set.add(3); // ignored duplicate
console.log("set has 2:", set.has(2));
set.delete(1);
console.log("set contents:", [...set]);

// 2) Map (key -> value)
const map = new Map();
map.set("name","Alice");
map.set("age",30);
map.set({id:1}, "object as key"); // any type as key
console.log("map get name:", map.get("name"));
console.log("map has age:", map.has("age"));
map.delete("age");

// Iterate Map entries
for(const [k,v] of map.entries()){
  console.log("entry:", k, "=>", v);
}

// Convert map to object (only if string keys)
const strKeyMap = new Map([["a",1],["b",2]]);
console.log("Object.fromEntries:", Object.fromEntries(strKeyMap));
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
    try{
      const logs = [];
      console.log = (...args)=> logs.push(args.join(' '));
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const f = new AsyncFunction(code);
      f().then(()=>{ setOutput(logs.join('\n')); setError(''); })
       .catch(e => { setOutput(''); setError(e.message); })
       .finally(()=> console.log = original);
    }catch(e){ setOutput(''); setError(e.message); console.log = original; }
  };

  const resetCode = () => { setCode(defaultCode); setOutput(''); setError(''); };

  return (
    <div className="page">
      <h2>8. Sets & Maps</h2>

      <textarea
        ref={textareaRef}
        className="code-editor"
        value={code}
        onChange={(e)=>setCode(e.target.value)}
      />
      <div style={{marginTop:10}}>
        <button onClick={runCode}>Run</button>
        <button onClick={resetCode} style={{marginLeft:8}}>Reset</button>
      </div>

      {output && <div className="output-box"><pre>{output}</pre></div>}
      {error && <div className="error-box"><pre>{error}</pre></div>}
    </div>
  );
};

export default Js8SetMap;
