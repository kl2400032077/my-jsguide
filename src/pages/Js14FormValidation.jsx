// src/pages/Js14FormValidation.jsx
import React, { useState, useEffect, useRef } from 'react';

const Js14FormValidation = () => {
  const defaultCode = `// Client-side validation
const form = document.getElementById('form');
const nameI = document.getElementById('name');
const emailI = document.getElementById('email');
const msg = document.getElementById('msg');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  msg.textContent = "";
  let ok = true;

  if(!/^.{3,}$/.test(nameI.value)){
    ok = false; msg.textContent += "Name must be at least 3 chars. ";
  }
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(emailI.value)){
    ok = false; msg.textContent += "Invalid email. ";
  }

  if(ok){
    msg.style.color = "#2f855a";
    msg.textContent = "Valid ✅ Submitting...";
  }else{
    msg.style.color = "#c53030";
  }
});`;

  const [code, setCode] = useState(defaultCode);
  const [error, setError] = useState('');
  const iframeRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(()=>{
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'hidden';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  },[code]);

  const runCode = () => {
    try {
      setError('');
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
          <body style="font-family:sans-serif;padding:12px">
            <form id="form">
              <input id="name" placeholder="Name" style="display:block;margin-bottom:8px;padding:8px;width:220px" />
              <input id="email" placeholder="Email" style="display:block;margin-bottom:8px;padding:8px;width:220px" />
              <button type="submit">Submit</button>
              <div id="msg" style="margin-top:8px"></div>
            </form>
            <script>
              try {
                ${code}
              } catch (e) {
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
      <h2>14. Form Validation</h2>
      <p>Validate inputs before submit to improve UX and reduce server load.</p>

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

      <h3 style={{ marginTop: 16 }}>Output</h3>
      <iframe
        ref={iframeRef}
        title="Form Validation"
        style={{ width: '100%', minHeight: 260, border: '1px solid #e2e8f0', borderRadius: 8 }}
      />

      {error && <div className="error-box" style={{ marginTop: 10 }}><pre>{error}</pre></div>}
    </div>
  );
};

export default Js14FormValidation;
