// A static, stylized "market pulse" strip — the hero's visual anchor.
// Not live data by default; wire it to a real rates API later if you want.
type Pulse = { pair: string; change: number };

const PULSE: Pulse[] = [
  { pair: "XAU/USD", change: 0.62 },
  { pair: "EUR/USD", change: -0.18 },
  { pair: "GBP/USD", change: 0.24 },
  { pair: "USD/JPY", change: -0.41 },
  { pair: "AUD/USD", change: 0.09 },
];

export default function MarketPulse() {
  return (
    <div className="border border-ink/10 bg-ink text-paper">
      <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
        <span className="text-xs uppercase tracking-wide text-paper/60">
          Sample pulse — connect live rates when ready
        </span>
      </div>
      <ul className="divide-y divide-paper/10">
        {PULSE.map((p) => (
          <li
            key={p.pair}
            className="flex items-center justify-between px-5 py-3 font-sans text-sm"
          >
            <span>{p.pair}</span>
            <span className={p.change >= 0 ? "text-gain" : "text-loss"}>
              {p.change >= 0 ? "+" : ""}
              {p.change.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
