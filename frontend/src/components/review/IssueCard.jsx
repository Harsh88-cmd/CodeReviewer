const TYPE_STYLES = {
  error:   { border: 'border-red-500',   badge: 'bg-red-500/10 text-red-400',   label: 'Error'   },
  warning: { border: 'border-amber-400', badge: 'bg-amber-400/10 text-amber-400', label: 'Warning' },
  good:    { border: 'border-green-500', badge: 'bg-green-500/10 text-green-400', label: 'Good'   },
  info:    { border: 'border-blue-400',  badge: 'bg-blue-400/10 text-blue-400',   label: 'Info'   },
};

export default function IssueCard({ issue }) {
  const style = TYPE_STYLES[issue.type] || TYPE_STYLES.info;

  return (
    <div className={`border-l-4 ${style.border} bg-zinc-900 rounded-lg p-4 flex flex-col gap-2`}>
      
      {/* Top row — badge + line */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${style.badge}`}>
          {style.label}
        </span>
        {issue.line && (
          <span className="text-xs text-zinc-500">{issue.line}</span>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-zinc-100">{issue.title}</p>

      {/* Description */}
      <p className="text-xs text-zinc-400 leading-relaxed">{issue.desc}</p>

      {/* Fix — only if exists */}
      {issue.fix && (
        <pre className="text-xs bg-zinc-950 text-green-400 rounded p-3 overflow-x-auto font-mono whitespace-pre-wrap break-all">
          {issue.fix}
        </pre>
      )}

    </div>
  );
}