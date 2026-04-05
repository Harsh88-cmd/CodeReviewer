import { useState } from "react";
import ScoreBar from "./ScoreBar";
import IssueCard from "./IssueCard";

export default function ReviewPanel({ result, loading, error }) {
  const [tab, setTab] = useState("issues");

  const errors   = result?.issues?.filter(i => i.type === "error").length   ?? 0;
  const warnings = result?.issues?.filter(i => i.type === "warning").length ?? 0;
  const goods    = result?.issues?.filter(i => i.type === "good").length    ?? 0;

  const fixedCode = result?.issues
    ?.filter(i => i.fix)
    .map(i => `// ${i.title}\n${i.fix}`)
    .join("\n\n") || "";

  return (
    <div className="flex flex-col h-full bg-zinc-900 overflow-hidden">

      {/* ── Score header ── */}
      <div className="px-4 pt-4 pb-3 border-b border-zinc-800 flex-shrink-0">
        <ScoreBar score={result?.score ?? 0} />
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-zinc-800 flex-shrink-0">
        {["issues", "fixed"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 sm:flex-none px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors border-b-2 ${
              tab === t
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t === "issues" ? "Issues" : "Fixed Code"}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-500">
            <svg className="animate-spin w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-sm">AI is reviewing your code...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p className="text-sm text-red-400 font-medium">Something went wrong</p>
            <p className="text-xs text-zinc-500">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && !result && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-zinc-600 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400">No review yet</p>
              <p className="text-xs text-zinc-600 mt-1">Paste your code and click Review →</p>
            </div>
          </div>
        )}

        {/* Issues tab */}
        {!loading && !error && result && tab === "issues" && (
          result.issues.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-500">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="text-sm text-green-400 font-medium">No issues found!</p>
              <p className="text-xs text-zinc-600">Your code looks clean.</p>
            </div>
          ) : (
            result.issues.map((issue, i) => (
              <IssueCard key={i} issue={issue} />
            ))
          )
        )}

        {/* Fixed code tab */}
        {!loading && !error && result && tab === "fixed" && (
          fixedCode ? (
            <pre className="text-xs sm:text-sm bg-zinc-950 text-green-400 rounded-lg p-4 overflow-x-auto font-mono whitespace-pre-wrap break-all leading-relaxed border border-zinc-800">
              {fixedCode}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-zinc-600">
              No fixes available.
            </div>
          )
        )}
      </div>

      {/* ── Summary pills ── */}
      {result && !loading && (
        <div className="flex gap-2 px-3 py-2.5 border-t border-zinc-800 flex-shrink-0">
          <div className="flex-1 text-center py-1.5 rounded-md bg-red-500/10 text-red-400 text-xs font-medium">
            {errors} error{errors !== 1 ? "s" : ""}
          </div>
          <div className="flex-1 text-center py-1.5 rounded-md bg-amber-400/10 text-amber-400 text-xs font-medium">
            {warnings} warning{warnings !== 1 ? "s" : ""}
          </div>
          <div className="flex-1 text-center py-1.5 rounded-md bg-green-500/10 text-green-400 text-xs font-medium">
            {goods} good
          </div>
        </div>
      )}

      {/* ── Export button ── */}
      <div className="px-3 pb-3 flex-shrink-0">
        <button
          onClick={() => window.print()}
          className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-indigo-500 text-zinc-400 hover:text-zinc-200 rounded-lg py-2 text-xs sm:text-sm transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export as PDF
        </button>
      </div>
    </div>
  );
}