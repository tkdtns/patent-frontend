export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            style={{ animation: `bounce 1s ${i * 0.15}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
