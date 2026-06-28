import React, { useState, useEffect, useRef } from 'react';

export default function TerminalWidget() {
  const [history, setHistory] = useState([
    { text: 'Welcome to Abhilash K K\'s interactive console shell.', type: 'info' },
    { text: 'Type "help" to view the list of available commands.', type: 'info' },
    { text: '', type: 'spacer' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef(null);

  const commands = {
    help: [
      'Available commands:',
      '  help     - View command listing',
      '  skills   - List technical abilities and skill ratings',
      '  projects - List core portfolio projects and descriptions',
      '  contact  - List phone, email, and social profile links',
      '  matrix   - Trigger system diagnostic matrix stream animation',
      '  clear    - Clear console display screen history'
    ],
    skills: [
      'Technical Core Competencies:',
      '  Python          [====================] 90%',
      '  HTML & CSS      [==================  ] 85%',
      '  SQL             [================    ] 80%',
      '  C Programming   [===============     ] 75%',
      'Soft Skills:',
      '  - Problem Solving, Fast Learning, Agile Workflows'
    ],
    projects: [
      'Key Developer Accomplishments:',
      '  1. TSRD (Traffic Sign Recognition & Detection) - DL YOLOv8 System',
      '  2. Mr. Sevaka (Internship Trainee App) - Mobile & Web UI Workspace',
      '  3. Student Leave Hub (College Mini Project) - Hosted live at Render'
    ],
    contact: [
      'Primary Communication Channels:',
      '  - Email:    kkabhilash30@gmail.com',
      '  - Phone:    +91 8590979422',
      '  - WhatsApp: https://wa.me/918590979422',
      '  - LinkedIn: https://www.linkedin.com/in/abhilash-k-k-47ba2438a',
      '  - Location: Wayanad, Kerala, India'
    ]
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const commandText = inputVal.trim().toLowerCase();
    setInputVal('');

    if (!commandText) return;

    // Append user input to history
    const newHistory = [...history, { text: `guest@abhilash-kk:~$ ${commandText}`, type: 'input' }];

    if (commandText === 'clear') {
      setHistory([]);
      return;
    }

    if (commandText === 'matrix') {
      setHistory([...newHistory, { text: 'Starting system matrix diagnostic scan...', type: 'success' }]);
      setMatrixActive(true);
      setTimeout(() => {
        setMatrixActive(false);
        setHistory((prev) => [
          ...prev,
          { text: 'System matrix scan completed successfully. Diagnostics OK.', type: 'info' }
        ]);
      }, 4000);
      return;
    }

    if (commands[commandText]) {
      const outputLines = commands[commandText].map((line) => ({ text: line, type: 'output' }));
      setHistory([...newHistory, ...outputLines, { text: '', type: 'spacer' }]);
    } else {
      setHistory([
        ...newHistory,
        { text: `Command not found: "${commandText}". Type "help" for a list of valid commands.`, type: 'error' },
        { text: '', type: 'spacer' }
      ]);
    }
  };

  // Scroll to bottom whenever history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, matrixActive]);

  return (
    <div className="w-full max-w-[800px] bg-[#07070a] border border-border-dark rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] text-left font-mono text-xs md:text-sm h-[320px] flex flex-col relative">
      {/* Console Header Bar */}
      <div className="bg-[#101017] px-4 py-3 border-b border-border-dark/60 flex items-center justify-between select-none shrink-0">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 block"></span>
        </div>
        <span className="text-slate-500 font-bold text-[0.65rem] tracking-wider uppercase font-display">
          guest@abhilash-kk: ~ (Interactive shell)
        </span>
        <span className="text-slate-700 text-[0.65rem]">sh</span>
      </div>

      {/* Console Body Area */}
      <div className="p-4 flex-1 overflow-y-auto relative flex flex-col">
        {matrixActive ? (
          <div className="absolute inset-0 bg-[#07070a] z-10 px-4 py-2 flex flex-col justify-start overflow-hidden text-green-400 opacity-90 select-none animate-pulse">
            <p className="text-green-500 font-bold mb-2">RUNNING DIAGNOSTICS CODE SCANNER...</p>
            <div className="leading-relaxed break-all text-[0.7rem] sm:text-xs">
              {Array.from({ length: 9 }).map((_, idx) => (
                <p key={idx} className="opacity-80">
                  {Math.random().toString(36).substring(2, 15)} {Math.random().toString(36).substring(2, 15)}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {/* History logs */}
        <div className="flex-1 flex flex-col gap-1 text-slate-300">
          {history.map((line, idx) => {
            if (line.type === 'input') {
              return <p key={idx} className="text-white font-bold">{line.text}</p>;
            }
            if (line.type === 'error') {
              return <p key={idx} className="text-red-400">{line.text}</p>;
            }
            if (line.type === 'success') {
              return <p key={idx} className="text-green-400">{line.text}</p>;
            }
            if (line.type === 'spacer') {
              return <div key={idx} className="h-2"></div>;
            }
            return <p key={idx} className="text-slate-400 whitespace-pre-wrap">{line.text}</p>;
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Console Interactive Prompt Input */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border-dark/30 shrink-0">
          <span className="text-primary font-bold shrink-0">guest@abhilash-kk:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={matrixActive}
            placeholder="type 'help'..."
            className="bg-transparent text-white focus:outline-none w-full font-mono caret-primary placeholder:text-slate-700"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
