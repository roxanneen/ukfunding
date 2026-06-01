import { tickerItems } from '@/data';

export default function Ticker() {
  // Triple the items so the linear-loop animation has no visible seam.
  const tripled = [...tickerItems, ...tickerItems, ...tickerItems];
  return (
    <div className="max-w-full overflow-hidden whitespace-nowrap border-b border-line bg-bg-paper py-2 font-mono text-[11.5px] tracking-[0.04em] text-ink-mute">
      <div className="ticker-track">
        {tripled.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-2">
            <span aria-hidden className={item.isUp ? 'text-accent' : 'text-warn'}>
              {item.isUp ? '▲' : '▽'}
            </span>
            <span className="text-ink-mute">{item.label}</span>
            <span className={item.isUp ? 'text-ink' : 'text-warn'}>{item.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
