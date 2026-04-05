import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import IssueCard from "../components/review/IssueCard";
import ScoreBar from "../components/review/ScoreBar";
import { fetchHistory, fetchReview, deleteReview } from "../api/review";

export default function HistoryPage() {
  const navigate                    = useNavigate();
  const [history, setHistory]       = useState([]);
  const [selected, setSelected]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [detailLoad, setDetailLoad] = useState(false);
  const [deleting, setDeleting]     = useState(null); // id being deleted
  const [view, setView]             = useState("list"); // mobile: "list" | "detail"

  // Fetch history on mount
  useEffect(() => {
    fetchHistory()
      .then(setHistory)
      .catch(() => toast.error("Failed to load history."))
      .finally(() => setLoading(false));
  }, []);

  // Open a review detail
  const openDetail = async (id) => {
    setDetailLoad(true);
    setView("detail");
    try {
      const review = await fetchReview(id);
      setSelected(review);
    } catch {
      toast.error("Failed to load review.");
      setView("list");
    } finally {
      setDetailLoad(false);
    }
  };

  // Delete a review
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // don't trigger openDetail
    setDeleting(id);
    try {
      await deleteReview(id);
      setHistory(prev => prev.filter(r => r._id !== id));
      if (selected?._id === id) {
        setSelected(null);
        setView("list");
      }
      toast.success("Review deleted.");
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const scoreColor = (s) =>
    s >= 80 ? "text-green-400" : s >= 50 ? "text-amber-400" : "text-red-400";

  const scoreBg = (s) =>
    s >= 80 ? "bg-green-500/10" : s >= 50 ? "bg-amber-400/10" : "bg-red-500/10";

  const langColor = "bg-indigo-500/10 text-indigo-400";

  return (
    <div className="flex flex-col h-screen bg-zinc-950 overflow-hidden">

      <Navbar />

      {/* ── Page header ── */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
        <button
          onClick={() => navigate("/editor")}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-indigo-400 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Editor
        </button>
        <span className="text-zinc-700">|</span>
        <h1 className="text-sm font-semibold text-zinc-200">Review History</h1>

        {/* Mobile — back to list */}
        {view === "detail" && (
          <button
            onClick={() => setView("list")}
            className="ml-auto text-xs text-indigo-400 md:hidden"
          >
            ← List
          </button>
        )}
      </div>

      {/* ── Main layout ── */}
      <div className="flex-1 overflow-hidden flex">

        {/* ── LEFT: History list ── */}
        <div className={`
          flex flex-col border-r border-zinc-800 overflow-hidden
          ${view === "detail" ? "hidden md:flex" : "flex"}
          w-full md:w-80 lg:w-96 flex-shrink-0
        `}>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center flex-1 gap-2 text-zinc-500">
              <svg className="animate-spin w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <span className="text-sm">Loading history...</span>
            </div>
          )}

          {/* Empty */}
          {!loading && history.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-zinc-600 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">No reviews yet</p>
                <p className="text-xs text-zinc-600 mt-1">Run your first review in the editor</p>
              </div>
              <button
                onClick={() => navigate("/editor")}
                className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg transition-colors"
              >
                Go to Editor
              </button>
            </div>
          )}

          {/* List */}
          {!loading && history.length > 0 && (
            <div className="overflow-y-auto flex-1">
              {history.map(r => (
                <div
                  key={r._id}
                  onClick={() => openDetail(r._id)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 cursor-pointer transition-colors group
                    ${selected?._id === r._id
                      ? "bg-zinc-800 border-l-2 border-l-indigo-500"
                      : "hover:bg-zinc-900"
                    }
                  `}
                >
                  {/* Left — lang + score */}
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wide ${langColor}`}>
                        {r.language}
                      </span>
                      <span className={`text-sm font-bold ${scoreColor(r.score)}`}>
                        {r.score}/100
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="text-red-400">
                        {r.issues?.filter(i => i.type === "error").length} err
                      </span>
                      <span className="text-amber-400">
                        {r.issues?.filter(i => i.type === "warning").length} warn
                      </span>
                      <span className="text-green-400">
                        {r.issues?.filter(i => i.type === "good").length} good
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600">{formatDate(r.createdAt)}</p>
                  </div>

                  {/* Right — score ring + delete */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${scoreBg(r.score)} ${scoreColor(r.score)}`}>
                      {r.score}
                    </div>
                    <button
                      onClick={e => handleDelete(e, r._id)}
                      disabled={deleting === r._id}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-all"
                    >
                      {deleting === r._id ? (
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6M14 11v6"/>
                          <path d="M9 6V4h6v2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Detail panel ── */}
        <div className={`
          flex-1 flex flex-col overflow-hidden
          ${view === "list" ? "hidden md:flex" : "flex"}
        `}>

          {/* No selection */}
          {!selected && !detailLoad && (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 text-zinc-600 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-zinc-400">Select a review</p>
              <p className="text-xs text-zinc-600">Click any review from the list to see details</p>
            </div>
          )}

          {/* Loading detail */}
          {detailLoad && (
            <div className="flex items-center justify-center flex-1 gap-2 text-zinc-500">
              <svg className="animate-spin w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <span className="text-sm">Loading review...</span>
            </div>
          )}

          {/* Detail view */}
          {selected && !detailLoad && (
            <div className="flex flex-col h-full overflow-hidden">

              {/* Detail header */}
              <div className="px-4 sm:px-6 py-4 border-b border-zinc-800 bg-zinc-900 flex-shrink-0">
                <ScoreBar score={selected.score} />
                <div className="flex items-center gap-3 mt-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wide ${langColor}`}>
                    {selected.language}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {formatDate(selected.createdAt)}
                  </span>
                  <button
                    onClick={() => {
                      setSelected(null);
                      setView("list");
                    }}
                    className="ml-auto text-zinc-600 hover:text-zinc-300 transition-colors p-1"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Code snippet */}
              <div className="px-4 sm:px-6 py-3 border-b border-zinc-800 bg-zinc-950 flex-shrink-0 max-h-36 overflow-y-auto">
                <p className="text-xs text-zinc-600 mb-2 font-medium uppercase tracking-wide">Code</p>
                <pre className="font-mono text-xs text-zinc-400 whitespace-pre-wrap break-all leading-relaxed">
                  {selected.code}
                </pre>
              </div>

              {/* Issues */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-3">
                <p className="text-xs text-zinc-600 font-medium uppercase tracking-wide flex-shrink-0">
                  Issues ({selected.issues?.length || 0})
                </p>
                {selected.issues?.length === 0 ? (
                  <div className="flex items-center justify-center flex-1 text-sm text-green-400">
                    No issues found — clean code!
                  </div>
                ) : (
                  selected.issues?.map((issue, i) => (
                    <IssueCard key={i} issue={issue} />
                  ))
                )}
              </div>

              {/* Summary pills */}
              <div className="flex gap-2 px-4 sm:px-6 py-3 border-t border-zinc-800 bg-zinc-900 flex-shrink-0">
                <div className="flex-1 text-center py-1.5 rounded-md bg-red-500/10 text-red-400 text-xs font-medium">
                  {selected.issues?.filter(i => i.type === "error").length} errors
                </div>
                <div className="flex-1 text-center py-1.5 rounded-md bg-amber-400/10 text-amber-400 text-xs font-medium">
                  {selected.issues?.filter(i => i.type === "warning").length} warnings
                </div>
                <div className="flex-1 text-center py-1.5 rounded-md bg-green-500/10 text-green-400 text-xs font-medium">
                  {selected.issues?.filter(i => i.type === "good").length} good
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}