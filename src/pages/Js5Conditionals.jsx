// Js5Conditionals.jsx
import React, { useState } from 'react';
import '../App.css';

function Js5Conditionals() {
  const initialCode = `
// IF-ELSE
let num = 10;
if (num > 0) {
  console.log(num + " is positive");
} else if (num < 0) {
  console.log(num + " is negative");
} else {
  console.log("Number is zero");
}

// SWITCH CASE
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("End of the week");
    break;
  default:
    console.log("Midweek day");
}

// FOR LOOP
for (let i = 1; i <= 3; i++) {
  console.log("For Loop Count:", i);
}

// WHILE LOOP
let x = 0;
while (x < 3) {
  console.log("While Loop:", x);
  x++;
}

// DO...WHILE LOOP
let y = 0;
do {
  console.log("Do While Loop:", y);
  y++;
} while (y < 2);

// FOR...OF LOOP (for arrays)
let colors = ["Red", "Green", "Blue"];
for (let color of colors) {
  console.log("Color:", color);
}
`.trim();

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runCode = () => {
    try {
      let captured = '';
      const originalLog = console.log;
      console.log = (...args) => {
        captured += args.join(' ') + '\n';
      };

      eval(code);
      console.log = originalLog;

      setOutput(captured.trim());
      setError('');
    } catch (err) {
      setOutput('');
      setError(err.message);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
  };

  return (
    <div className="page">
      <h2>5. Conditionals & Loops</h2>

      <h3>📘 Explanation</h3>
      <p>
        JavaScript supports conditional logic like <code>if</code>, <code>else</code>, <code>switch</code>, and multiple loop types:
        <code>for</code>, <code>while</code>, <code>do-while</code>, and <code>for...of</code>. Loops are useful for repeating actions.
      </p>

      <h3>💡 Try the Code Below</h3>
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={22}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={runCode}>▶ Run Code</button>
        <button onClick={resetCode} style={{ marginLeft: '10px' }}>🔄 Reset</button>
      </div>

      {output && (
        <div className="output-box">{output}</div>
      )}
      {error && (
        <div className="output-box error">⚠️ Error: {error}</div>
      )}
    </div>
  );
}

export default Js5Conditionals;
