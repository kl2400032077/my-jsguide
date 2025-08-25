// src/pages/Js7Objects.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js7Objects = () => {
  const defaultCode = `// Objects: properties, methods, access, update, iterate, spread, destructuring

// 1) Create object
const person = {
  name: "Alice",
  age: 30,
  greet(){ return "Hi, I'm " + this.name; }
};
console.log(person.greet());

// 2) Access via dot/bracket
console.log(person.name, person["age"]);

// 3) Add/update/delete
person.city = "Chennai";
person.age = 31;
delete person.nonExist;

// 4) Iterate keys
for(const k in person){ console.log(k, "->", person[k]); }

// 5) Object utilities
console.log("keys:", Object.keys(person));
console.log("values:", Object.values(person));
console.log("entries:", Object.entries(person));

// 6) Spread & destructuring
const more = { role: "Engineer", age: 99 };
const merged = { ...person, ...more };
console.log("merged:", merged);

const { name, role, ...rest } = merged;
console.log("destructured name:", name, "role:", role, "rest:", rest);
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
      <h2>7. Objects</h2>

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

export default Js7Objects;
