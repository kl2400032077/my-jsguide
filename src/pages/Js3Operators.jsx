import React, { useState, useEffect, useRef } from 'react';

const Js3Operators = () => {
  const defaultCode = `// JavaScript Operators

// 1. Arithmetic Operators
let a = 10;
let b = 3;
console.log("a + b =", a + b);  // 13
console.log("a - b =", a - b);  // 7
console.log("a * b =", a * b);  // 30
console.log("a / b =", a / b);  // 3.33...
console.log("a % b =", a % b);  // 1
console.log("a ** b =", a ** b); // 1000 (Exponentiation)

// 2. Assignment Operators
let x = 5;
x += 3; // same as x = x + 3
console.log("x after += 3:", x); // 8
x *= 2; // same as x = x * 2
console.log("x after *= 2:", x); // 16

// 3. Comparison Operators
console.log("5 == '5':", 5 == '5');   // true (loose equality)
console.log("5 === '5':", 5 === '5'); // false (strict equality)
console.log("5 != '5':", 5 != '5');   // false
console.log("5 !== '5':", 5 !== '5'); // true
console.log("5 > 3:", 5 > 3);         // true
console.log("5 <= 3:", 5 <= 3);       // false

// 4. Logical Operators
let isTrue = true;
let isFalse = false;
console.log("true && false:", isTrue && isFalse); // false
console.log("true || false:", isTrue || isFalse); // true
console.log("!true:", !isTrue);                   // false

// 5. Unary Operators
let n = 5;
console.log("typeof n:", typeof n); // number
console.log("typeof 'Hello':", typeof 'Hello'); // string

// 6. Ternary Operator
let age = 20;
let message = age >= 18 ? "Adult" : "Minor";
console.log("Ternary Result:", message); // Adult
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
    let originalLog = console.log;
    try {
      const logs = [];
      console.log = (...args) => logs.push(args.join(' '));

      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const func = new AsyncFunction(code);
      func().then(() => {
        setOutput(logs.join('\n'));
        setError('');
      }).catch(err => {
        setOutput('');
        setError(err.message);
      }).finally(() => {
        console.log = originalLog;
      });
    } catch (err) {
      setOutput('');
      setError(err.message);
      console.log = originalLog;
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput('');
    setError('');
  };

  return (
    <div className="page">
      <h2>3. JavaScript Operators</h2>

      <p>
        Operators are used to perform operations on variables and values. JavaScript includes a wide
        variety of operators such as arithmetic, assignment, comparison, logical, and more.
      </p>

      <h3>📌 Categories Covered:</h3>
      <ul>
        <li>🧮 Arithmetic Operators: <code>+, -, *, /, %, **</code></li>
        <li>📝 Assignment Operators: <code>=, +=, -=, *=, /=</code></li>
        <li>🔍 Comparison Operators: <code>==, ===, !=, &gt;, &lt;, &gt;=, &lt;=</code></li>
        <li>🤝 Logical Operators: <code>&amp;&amp;, ||, !</code></li>
        <li>🔄 Unary Operators: <code>typeof, +, -</code></li>
        <li>❓ Ternary Operator: <code>condition ? expr1 : expr2</code></li>
      </ul>

      <h3>🧪 Try it Yourself:</h3>
      <textarea
        className="code-editor"
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <button onClick={runCode}>Run</button>
      <button onClick={resetCode} style={{ marginLeft: 8 }}>Reset</button>

      {output && (
        <div className="output-box" style={{ whiteSpace: 'pre-wrap' }}>
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <div className="error-box" style={{ whiteSpace: 'pre-wrap' }}>
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default Js3Operators;
