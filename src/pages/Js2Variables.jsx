import React, { useState, useEffect, useRef } from 'react';

const Js2Variables = () => {
  const defaultCode = `// JavaScript Variables

// 'var' is function-scoped and can be redeclared
var x = 10;
console.log("var x:", x);
var x = 20; // No error
console.log("var x after redeclare:", x);

// 'let' is block-scoped and cannot be redeclared in the same scope
let y = 30;
console.log("let y:", y);
// let y = 40; // ❌ Uncommenting this line will cause an error

// 'const' is also block-scoped and must be initialized at declaration
const z = 50;
console.log("const z:", z);
// z = 60; // ❌ Cannot reassign a const variable

// Hoisting behavior
console.log("Hoisted a:", a); // undefined (due to var hoisting)
var a = 100;

// console.log("Hoisted b:", b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 200;

// Block scope demonstration
{
  let blockLet = "Inside block";
  var blockVar = "Still accessible";
  console.log("blockLet:", blockLet);
}
// console.log(blockLet); // ❌ blockLet is not defined outside the block
console.log("blockVar:", blockVar); // ✅ blockVar is accessible
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const runCode = () => {
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(' '));

      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const func = new AsyncFunction(code);
      func().then(() => {
        setOutput(logs.join('\n'));
        setError('');
        console.log = originalLog;
      });
    } catch (err) {
      setOutput('');
      setError(err.message);
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput('');
    setError('');
  };

  return (
    <div className="page">
      <h2>2. Variables & Data Types</h2>

      <p>
        JavaScript provides three ways to declare variables: <code>var</code>, <code>let</code>, and{' '}
        <code>const</code>. Each has different rules for scoping and reassignment.
      </p>

      <h3>🧠 Quick Notes:</h3>
      <ul>
        <li><strong>var</strong>: Function-scoped, hoisted, can be redeclared</li>
        <li><strong>let</strong>: Block-scoped, not hoisted the same way, no redeclaration</li>
        <li><strong>const</strong>: Block-scoped, must be initialized, cannot be reassigned</li>
      </ul>

      <h3>📌 Demonstration:</h3>
      <textarea
        className="code-editor"
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />
      <button onClick={runCode}>Run</button>
      <button onClick={resetCode}>Reset</button>

      {output && (
        <div className="output-box">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <div className="error-box">
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default Js2Variables;
