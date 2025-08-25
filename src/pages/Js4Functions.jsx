import React, { useState, useEffect, useRef } from 'react';

const Js4Functions = () => {
  const defaultCode = `// JavaScript Functions

// 1. Function Declaration
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice"));

// 2. Function Expression
const add = function (a, b) {
  return a + b;
};
console.log("Add 3 + 4 =", add(3, 4));

// 3. Arrow Function
const multiply = (a, b) => a * b;
console.log("Multiply 3 * 4 =", multiply(3, 4));

// 4. Arrow function with block body
const divide = (a, b) => {
  if (b === 0) return "Cannot divide by zero";
  return a / b;
};
console.log("Divide 10 / 2 =", divide(10, 2));

// 5. Function with default parameters
function power(base, exponent = 2) {
  return base ** exponent;
}
console.log("Power 5^2 =", power(5));

// 6. Rest Parameters (...args)
function sumAll(...nums) {
  return nums.reduce((total, num) => total + num, 0);
}
console.log("Sum of 1,2,3 =", sumAll(1, 2, 3));

// 7. Immediately Invoked Function Expression (IIFE)
(function () {
  console.log("IIFE called immediately!");
})();

// 8. Function inside a function (Closure)
function outer() {
  let count = 0;
  function inner() {
    count++;
    return count;
  }
  return inner;
}
const counter = outer();
console.log("Counter:", counter()); // 1
console.log("Counter:", counter()); // 2
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
      <h2>4. Functions & Arrow Functions</h2>
      <p>
        JavaScript functions allow you to encapsulate reusable logic. There are various ways to
        define them including declarations, expressions, and arrow syntax.
      </p>

      <h3>📌 Topics Covered:</h3>
      <ul>
        <li>Function declarations & expressions</li>
        <li>Arrow functions (concise & block body)</li>
        <li>Default & rest parameters</li>
        <li>IIFE (Immediately Invoked Function Expressions)</li>
        <li>Closures (functions returning functions)</li>
      </ul>

      <h3>🧪 Try it Yourself:</h3>
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

export default Js4Functions;
