// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importing all concept components
import Js1Introduction from './pages/Js1Introduction';
import Js2Variables from './pages/Js2Variables';
import Js3Operators from './pages/Js3Operators';
import Js4Functions from './pages/Js4Functions';
import Js5Conditionals from './pages/Js5Conditionals';
import Js6Arrays from './pages/Js6Arrays';
import Js7Objects from './pages/Js7Objects';
import Js8SetMap from './pages/Js8SetMap';
import Js9DOM from './pages/Js9DOM';
import Js10Events from './pages/Js10Events';
import Js11ES6 from './pages/Js11ES6';
import Js12Async from './pages/Js12Async';
import Js13Fetch from './pages/Js13Fetch';
import Js14FormValidation from './pages/Js14FormValidation';
import Js15Errors from './pages/Js15Errors';
import Js16Storage from './pages/Js16Storage';
import Js17Modules from './pages/Js17Modules';
import Js18Classes from './pages/Js18Classes';
import Js19BuiltIn from './pages/Js19BuiltIn';
import Js20JSON from './pages/Js20JSON';
import Js21Debugging from './pages/Js21Debugging';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>JavaScript Concepts Demo</h1>
        <nav className="sidebar">
          <ul>
            <li><Link to="/1">1. Introduction & Syntax</Link></li>
            <li><Link to="/2">2. Variables & Data Types</Link></li>
            <li><Link to="/3">3. Operators</Link></li>
            <li><Link to="/4">4. Functions & Arrow Functions</Link></li>
            <li><Link to="/5">5. Conditionals & Loops</Link></li>
            <li><Link to="/6">6. Arrays</Link></li>
            <li><Link to="/7">7. Objects</Link></li>
            <li><Link to="/8">8. Sets & Maps</Link></li>
            <li><Link to="/9">9. DOM Manipulation</Link></li>
            <li><Link to="/10">10. Event Handling</Link></li>
            <li><Link to="/11">11. ES6+ Features</Link></li>
            <li><Link to="/12">12. Promises & Async/Await</Link></li>
            <li><Link to="/13">13. Fetch API</Link></li>
            <li><Link to="/14">14. Form Validation</Link></li>
            <li><Link to="/15">15. Error Handling</Link></li>
            <li><Link to="/16">16. Storage</Link></li>
            <li><Link to="/17">17. Modular JavaScript</Link></li>
            <li><Link to="/18">18. Classes & Objects</Link></li>
            <li><Link to="/19">19. Built-in Objects</Link></li>
            <li><Link to="/20">20. Working with JSON</Link></li>
            <li><Link to="/21">21. Debugging & Dev Tools</Link></li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/1" element={<Js1Introduction />} />
            <Route path="/2" element={<Js2Variables />} />
            <Route path="/3" element={<Js3Operators />} />
            <Route path="/4" element={<Js4Functions />} />
            <Route path="/5" element={<Js5Conditionals />} />
            <Route path="/6" element={<Js6Arrays />} />
            <Route path="/7" element={<Js7Objects />} />
            <Route path="/8" element={<Js8SetMap />} />
            <Route path="/9" element={<Js9DOM />} />
            <Route path="/10" element={<Js10Events />} />
            <Route path="/11" element={<Js11ES6 />} />
            <Route path="/12" element={<Js12Async />} />
            <Route path="/13" element={<Js13Fetch />} />
            <Route path="/14" element={<Js14FormValidation />} />
            <Route path="/15" element={<Js15Errors />} />
            <Route path="/16" element={<Js16Storage />} />
            <Route path="/17" element={<Js17Modules />} />
            <Route path="/18" element={<Js18Classes />} />
            <Route path="/19" element={<Js19BuiltIn />} />
            <Route path="/20" element={<Js20JSON />} />
            <Route path="/21" element={<Js21Debugging />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
