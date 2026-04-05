import { useRef, useEffect, useCallback } from "react";  // add useCallback
import MonacoEditor from "@monaco-editor/react";
import { getSuggestions } from "./suggestion";

const LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'cpp', 'go', 'rust'];

function extractLines(issues, type) {
  const lines = new Set();
  issues
    .filter(i => i.type === type)
    .forEach(i => {
      if (!i.line) return;
      const nums = i.line.match(/\d+/g);
      if (!nums) return;
      if (nums.length === 1) {
        lines.add(parseInt(nums[0]));
      } else {
        const start = parseInt(nums[0]);
        const end   = parseInt(nums[1]);
        for (let n = start; n <= end; n++) lines.add(n);
      }
    });
  return lines;
}

const getMonacoLanguage = (lang) => {
  const map = {
    javascript: 'javascript',
    typescript: 'typescript',
    python:     'python',
    java:       'java',
    cpp:        'cpp',
    go:         'go',
    rust:       'rust',
  };
  return map[lang] || 'javascript';
};

export default function CodeEditor({
  value,
  onChange,
  language,
  onLanguageChange,
  onReview,
  loading,
  errors = 0,
  warnings = 0,
  issues = [],
}) {
  const editorRef      = useRef(null);
  const monacoRef      = useRef(null);
  const decorationsRef = useRef([]);

  // ✅ Step 1 — define applyDecorations FIRST with useCallback
  const applyDecorations = useCallback(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const errorLines   = extractLines(issues, 'error');
    const warningLines = extractLines(issues, 'warning');

    const newDecorations = [];

    errorLines.forEach(lineNum => {
      newDecorations.push({
        range: new monaco.Range(lineNum, 1, lineNum, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-error-line',
          overviewRuler: {
            color: '#ef4444',
            position: monaco.editor.OverviewRulerLane.Right,
          },
        },
      });
    });

    warningLines.forEach(lineNum => {
      newDecorations.push({
        range: new monaco.Range(lineNum, 1, lineNum, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-warning-line',
          overviewRuler: {
            color: '#f59e0b',
            position: monaco.editor.OverviewRulerLane.Right,
          },
        },
      });
    });

    decorationsRef.current = editor.deltaDecorations(
      decorationsRef.current,
      newDecorations
    );
  }, [issues]); // ← issues is the dependency

  // ✅ Step 2 — useEffect AFTER applyDecorations
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    applyDecorations();
  }, [applyDecorations]); // ← applyDecorations is now the dependency

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    getSuggestions(monaco);
    applyDecorations();
  };

  return (
    <div className="flex flex-col h-full border-r border-zinc-800">

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 px-3 h-11 bg-zinc-900 border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded text-xs text-zinc-200">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="hidden sm:inline">fetchUser.js</span>
          <span className="sm:hidden">file.js</span>
        </div>

        <label className="hidden sm:flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 px-3 py-1 rounded text-xs cursor-pointer transition-colors">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload
          <input
            type="file"
            className="hidden"
            accept=".js,.ts,.py,.java,.cpp,.go,.rs"
            onChange={e => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = ev => onChange(ev.target.result);
              reader.readAsText(file);
            }}
          />
        </label>

        <select
          value={language}
          onChange={e => onLanguageChange(e.target.value)}
          className="ml-auto bg-zinc-800 border border-zinc-700 text-zinc-200 rounded px-2 py-1 text-xs outline-none cursor-pointer"
        >
          {LANGUAGES.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* ── Monaco Editor ── */}
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          language={getMonacoLanguage(language)}
          value={value}
          theme="vs-dark"
          onChange={val => onChange(val || '')}
          onMount={handleEditorMount}
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontLigatures: true,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            formatOnPaste: true,
            formatOnType: true,
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* ── Status bar ── */}
      <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 h-10 bg-zinc-900 border-t border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="hidden sm:inline">{errors} error{errors !== 1 ? 's' : ''}</span>
          <span className="sm:hidden">{errors}e</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="hidden sm:inline">{warnings} warning{warnings !== 1 ? 's' : ''}</span>
          <span className="sm:hidden">{warnings}w</span>
        </div>
        <button
          onClick={onReview}
          disabled={loading}
          className="ml-auto flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <span className="hidden sm:inline">Reviewing...</span>
              <span className="sm:hidden">...</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <span className="hidden sm:inline">Review →</span>
              <span className="sm:hidden">Run</span>
            </>
          )}
        </button>
      </div>

      {/* Monaco highlight styles */}
      <style>{`
        .monaco-error-line {
          background: rgba(239, 68, 68, 0.15) !important;
          border-left: 3px solid #ef4444 !important;
        }
        .monaco-warning-line {
          background: rgba(245, 158, 11, 0.15) !important;
          border-left: 3px solid #f59e0b !important;
        }
      `}</style>
    </div>
  );
}