// src/pages/Js10Events.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js10Events = () => {
  const defaultCode = `// Event Handling

// Click
document.getElementById("btn").addEventListener("click", () => {
  log("Clicked!");
});

// Input
document.getElementById("name").addEventListener("input", (e) => {
  document.getElementById("live").textContent = "Typing: " + e.target.value;
});

// Mouseover / Mouseout
const hover = document.getElementById("hover");
hover.addEventListener("mouseover", () => hover.style.background = "#fed7aa");
hover.addEventListener("mouseout", () => hover.style.background = "#e2e8f0");

// Form submit (prevent default)
document.getElementById("demoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  log("Form submitted with name: " + document.getElementById("name").value);
});

function log(msg){
  const li = document.createElement('li');
  li.textContent = msg;
  document.getElementById('logs').appendChild(li);
}
`;

  const [code, setCode] = useState(defaultCode);
  const [error, setError] = useState('');
  const iframeRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'hidden';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const runCode = () => {
    try {
      setError('');
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
          <body style="font-family:sans-serif;padding:12px">
            <form id="demoForm">
              <input id="name" placeholder="Type your name" />
              <button id="btn" type="button" style="margin-left:8px">Click</button>
            </form>
            <div id="hover" style="margin-top:10px;padding:8px;background:#e2e8f0;border-radius:6px">
              Hover over this box
            </div>
            <p id="live" style="margin-top:10px;color:#2b6cb0"></p>
            <ul id="logs" style="margin-top:10px;padding-left:16px"></ul>
            <script>
              try {
                ${code}
              } catch(e) {
                const pre = document.createElement('pre');
                pre.style.color='#fff';
                pre.style.background='#c53030';
                pre.style.padding='8px';
                pre.style.borderRadius='6px';
                pre.textContent='Error: '+e.message;
                document.body.appendChild(pre);
              }
            <\/script>
          </body>
        </html>
      `);
      doc.close();
    } catch (e) {
      setError(e.message);
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setError('');
  };

  return (
    <div className="page">
      <h2>10. Event Handling</h2>
      <p>Listen for user actions and respond with handlers.</p>
      <ul>
        <li><code>addEventListener('click' | 'input' | 'submit' | 'mouseover')</code></li>
        <li>Use <code>e.preventDefault()</code> to stop default actions</li>
      </ul>

      <h3>Try it</h3>
      <textarea
        ref={textareaRef}
        className="code-editor"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={runCode}>Run</button>
        <button onClick={resetCode} style={{ marginLeft: 8 }}>Reset</button>
      </div>

      <h3 style={{ marginTop: 16 }}>Output</h3>
      <iframe
        ref={iframeRef}
        title="Events Preview"
        style={{ width: '100%', minHeight: 280, border: '1px solid #e2e8f0', borderRadius: 8 }}
      />

      {error && (
        <div className="error-box" style={{ marginTop: 10 }}>
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default Js10Events;
