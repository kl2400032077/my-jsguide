// src/pages/Js9DOM.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js9DOM = () => {
  // Default code shown in the editor
  const defaultCode = `// DOM Manipulation in JavaScript

// Select element by ID
document.getElementById("demo").innerHTML = "Hello from JS!";

// Change style
document.getElementById("demo").style.color = "blue";

// Create new element
let newPara = document.createElement("p");
newPara.textContent = "This paragraph was created via JavaScript!";
document.body.appendChild(newPara);

// Change attribute
document.getElementById("myImage").setAttribute("src", "https://via.placeholder.com/100");

// Remove element
// document.getElementById("demo").remove();
`;

  const [code, setCode] = useState(defaultCode);
  const [error, setError] = useState('');
  const iframeRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  // Run the user-entered code in a sandbox iframe
  const runCode = () => {
    try {
      setError('');
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      iframeDoc.open();
      iframeDoc.write(`
        <html>
        <body>
          <h3 id="demo">Original Text</h3>
          <img id="myImage" src="https://via.placeholder.com/50" alt="Placeholder" />
          <script>
            try {
              ${code}
            } catch (err) {
              document.body.innerHTML += '<pre style="color:red;">' + err.message + '</pre>';
            }
          <\/script>
        </body>
        </html>
      `);
      iframeDoc.close();
    } catch (err) {
      setError(err.message);
    }
  };

  // Reset to original code
  const resetCode = () => {
    setCode(defaultCode);
    setError('');
  };

  return (
    <div className="page">
      <h2>9. DOM Manipulation</h2>

      <p>
        The <strong>Document Object Model (DOM)</strong> represents the structure of a web page. 
        JavaScript can manipulate the DOM to change content, styles, attributes, and even add or remove elements dynamically.
      </p>

      <h3>📌 Common DOM Methods:</h3>
      <ul>
        <li><code>document.getElementById()</code> – Select element by ID</li>
        <li><code>document.querySelector()</code> – Select first element that matches a CSS selector</li>
        <li><code>element.innerHTML</code> – Change element content</li>
        <li><code>element.style.property</code> – Change style</li>
        <li><code>document.createElement()</code> – Create new HTML element</li>
        <li><code>element.setAttribute()</code> – Change attributes</li>
        <li><code>element.remove()</code> – Remove element</li>
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

      <h3>🔍 Output:</h3>
      <iframe ref={iframeRef} title="DOM Output" className="iframe-output"></iframe>

      {error && (
        <div className="error-box">
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default Js9DOM;
