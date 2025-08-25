// src/pages/Js18Classes.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js18Classes = () => {
  const defaultCode = `// Classes, inheritance, static, getters/setters

class Person {
  constructor(name){ this._name = name; }
  greet(){ return "Hi, I'm " + this._name; }
  get name(){ return this._name; }
  set name(n){ this._name = n.trim(); }
  static species(){ return "Homo sapiens"; }
}

class Student extends Person {
  constructor(name, roll){ super(name); this.roll = roll; }
  greet(){ return super.greet() + ", roll " + this.roll; }
}

const p = new Person("Alice");
console.log(p.greet());
console.log("Getter:", p.name);
p.name = "  Alice Updated  ";
console.log("Setter ->", p.name);
console.log("Static:", Person.species());

const s = new Student("Bob", 101);
console.log(s.greet());
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
      <h2>18. Classes & Objects</h2>
      <ul>
        <li>Constructors, methods</li>
        <li>Inheritance with <code>extends</code>, <code>super()</code></li>
        <li>Static methods</li>
        <li>Getters/Setters</li>
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

export default Js18Classes;
