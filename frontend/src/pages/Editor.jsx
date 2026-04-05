import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/review/CodeEditor";
import ReviewPanel from "../components/review/ReviewPanel";
import { reviewCode } from "../api/review";

const DEFAULT_CODE = `async function fetchUser(id) {
  var res = await fetch('/api/users/' + id)
  var data = res.json()
  if(data == null) {
    console.log("not found")
  }
  return data
}`;

export default function Editor() {
  const [code, setCode]         = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("javascript");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [view, setView]         = useState("editor"); // "editor" | "panel"

  const errors   = result?.issues?.filter(i => i.type === "error").length   ?? 0;
  const warnings = result?.issues?.filter(i => i.type === "warning").length ?? 0;

  const handleReview = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code first.");
      return;
    }
    setLoading(true);
    setError(null);
    setView("panel"); // on mobile → auto switch to panel after review

    try {
      const data = await reviewCode(code, language);
      setResult(data);
      toast.success("Review complete!");
    } catch (err) {
      const msg = err?.response?.data?.error || "Review failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 overflow-hidden">

      {/* Your existing Navbar */}
      <Navbar />

      {/* ── Mobile tab switcher ── */}
      <div className="flex md:hidden border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
        <button
          onClick={() => setView("editor")}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 ${
            view === "editor"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-zinc-500"
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setView("panel")}
          className={`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 ${
            view === "panel"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-zinc-500"
          }`}
        >
          Review
          {result && (
            <span className="ml-1.5 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {errors + warnings}
            </span>
          )}
        </button>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-hidden">

        {/* Desktop — side by side */}
        <div className="hidden md:grid md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] h-full">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
            onReview={handleReview}
            loading={loading}
            errors={errors}
            warnings={warnings}
            issues={result?.issues || []}
          />
          <ReviewPanel
            result={result}
            loading={loading}
            error={error}
          />
        </div>

        {/* Mobile — one panel at a time */}
        <div className="md:hidden h-full">
          {view === "editor" ? (
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              onReview={handleReview}
              loading={loading}
              errors={errors}
              warnings={warnings}
              issues={result?.issues || []}   
            />
          ) : (
            <ReviewPanel
              result={result}
              loading={loading}
              error={error}
            />
          )}
        </div>

      </div>
    </div>
  );
}