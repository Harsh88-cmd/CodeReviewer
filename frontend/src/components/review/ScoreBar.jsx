export default function ScoreBar({ score }) {
  const scoreColor =
    score >= 80 ? 'text-green-400'
    : score >= 50 ? 'text-amber-400'
    : 'text-red-400';

  return (
    <div className="flex flex-col gap-2">

      {/* Title row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-100">AI Review</span>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-bold ${scoreColor}`}>{score}</span>
          <span className="text-xs text-zinc-500">/ 100</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-green-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>

    </div>
  );
}