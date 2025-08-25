import React, { useState, useEffect, useRef } from 'react';

const Js1Introduction = () => {
  // Default demonstration code for introduction
  const defaultCode = `// JavaScript Introduction

// This will display a greeting in the console
console.log("Welcome to JavaScript!");

// Variables can be declared using var, let, or const
var name = "Alice";
let age = 25;
const country = "India";

// Display values
console.log("Name:", name);
console.log("Age:", age);
console.log("Country:", country);

// JavaScript is dynamically typed
let dynamicVar = "Hello";
console.log("Type before:", typeof dynamicVar); // string
dynamicVar = 123;
console.log("Type after:", typeof dynamicVar);  // number
`;

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    // Auto-expand the textarea based on content
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
      <h2>1. Introduction to JavaScript</h2>

      <p>
        JavaScript is a versatile, high-level scripting language primarily used in web development to
        add interactivity and dynamic behavior to web pages.
      </p>

      <h3>🌐 Where JavaScript is used?</h3>
      <ul>
        <li>Web browsers (client-side scripting)</li>
        <li>Web servers (using Node.js)</li>
        <li>Mobile app development (React Native)</li>
        <li>Game development, IoT, and more</li>
      </ul>

      <h3>🚀 Features of JavaScript:</h3>
      <ul>
        <li>Interpreted and lightweight</li>
        <li>Object-based and event-driven</li>
        <li>Dynamically typed</li>
        <li>Supports functional and OOP paradigms</li>
        <li>Runs in any browser without compilation</li>
      </ul>

      <h3>📌 Basic Syntax:</h3>
      <ul>
        <li><code>// Single-line comment</code></li>
        <li><code>/* Multi-line comment */</code></li>
        <li>Statements end with <code>;</code> (optional but recommended)</li>
        <li>Case-sensitive: <code>myVar</code> ≠ <code>MyVar</code></li>
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

export default Js1Introduction;
