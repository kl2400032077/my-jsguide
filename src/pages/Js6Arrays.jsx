// src/pages/Js6Arrays.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js6Arrays = () => {
  const defaultCode = `// Arrays: creation, access, mutate, iterate, functional ops

// 1) Create
let fruits = ["Apple","Banana","Cherry"];
console.log("fruits:", fruits);

// 2) Access/update
console.log("first:", fruits[0]);
fruits[1] = "Blueberry";

// 3) Push/pop/shift/unshift
fruits.push("Date");
fruits.pop();
fruits.unshift("Apricot");
fruits.shift();

// 4) Length & slice/splice
console.log("len:", fruits.length);
console.log("slice(0,2):", fruits.slice(0,2));
fruits.splice(1, 0, "Inserted"); // add at index 1
console.log("after splice:", fruits);

// 5) Looping
for(const f of fruits){ console.log("for..of:", f); }
fruits.forEach((f,i)=> console.log("forEach", i, f));

// 6) map/filter/reduce
const nums = [1,2,3,4,5];
console.log("map x2:", nums.map(n=>n*2));
console.log("filter even:", nums.filter(n=>n%2===0));
console.log("reduce sum:", nums.reduce((a,c)=>a+c,0));

// 7) Spread & rest with arrays
const a = [1,2]; const b = [3,4]; const joined = [...a, ...b];
console.log("spread join:", joined);
function collect(...args){ return args.join(","); }
console.log("rest collect:", collect("A","B","C"));
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
      <h2>6. Arrays</h2>

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

export default Js6Arrays;
