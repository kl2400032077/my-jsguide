// src/pages/Js11ES6.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js11ES6 = () => {
  const defaultCode = `// ES6+ Essentials

// 1) let/const, block scoping
let a = 10; const b = 20; { let a = 99; console.log("block a:", a); }
console.log("outer a:", a, "b:", b);

// 2) Template literals
const name = "Alice";
console.log(\`Hello, \${name}! 2 + 3 = \${2+3}\`);

// 3) Destructuring
const user = { id: 1, uname: "bob", city: "Chennai" };
const { uname, city } = user;
console.log("Destructured:", uname, city);
const arr = [1,2,3];
const [first, ...rest] = arr;
console.log("first:", first, "rest:", rest);

// 4) Spread & Rest
const arr2 = [...arr, 4,5];
console.log("spread arr2:", arr2);
function sum(...nums){ return nums.reduce((a,c)=>a+c,0); }
console.log("sum(1,2,3,4):", sum(1,2,3,4));

// 5) Arrow functions
const square = x => x*x;
console.log("square(6):", square(6));

// 6) Enhanced object literals
const x = 5; const obj = { x, say(){ return "hi"; } };
console.log("enhanced:", obj.x, obj.say());

// 7) Optional chaining & nullish coalescing
const nested = { a: { b: { c: 42 } } };
console.log("optional:", nested?.a?.b?.c ?? "not found");
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'hidden';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const runCode = () => {
    let original = console.log;
    try {
      const logs = [];
      console.log = (...args) => logs.push(args.join(' '));
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const f = new AsyncFunction(code);
      f().then(()=>{
        setOutput(logs.join('\n'));
        setError('');
      }).catch(e=>{
        setOutput('');
        setError(e.message);
      }).finally(()=>{
        console.log = original;
      });
    } catch (e) {
      setOutput('');
      setError(e.message);
      console.log = original;
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput('');
    setError('');
  };

  return (
    <div className="page">
      <h2>11. ES6+ Features</h2>
      <ul>
        <li><strong>let/const</strong> (block scope)</li>
        <li><strong>Template literals</strong></li>
        <li><strong>Destructuring</strong> (objects & arrays)</li>
        <li><strong>Spread/Rest</strong></li>
        <li><strong>Arrow functions</strong></li>
        <li><strong>Enhanced object literals</strong></li>
        <li><strong>Optional chaining</strong> <code>?.</code> & <strong>Nullish coalescing</strong> <code>??</code></li>
      </ul>

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

export default Js11ES6;
