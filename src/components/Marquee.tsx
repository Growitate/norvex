type Props = {
  items: string[];
  speed?: "slow" | "normal" | "fast";
  separator?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Marquee({
  items,
  speed = "normal",
  separator = "·",
  className = "",
  size = "sm",
}: Props) {
  const speedCls =
    speed === "slow" ? "animate-marquee-slow" : speed === "fast" ? "animate-marquee-fast" : "animate-marquee";
  const sizeCls =
    size === "lg"
      ? "text-2xl sm:text-3xl font-bold tracking-[0.2em]"
      : size === "md"
        ? "text-sm sm:text-base font-semibold tracking-[0.2em]"
        : "text-[11px] sm:text-xs font-semibold tracking-[0.25em]";

  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`relative overflow-hidden w-full flex items-center ${className}`}>
      <div className={`flex w-max items-center ${speedCls} font-display uppercase text-zinc-900 ${sizeCls}`}>
        {loop.map((t, i) => (
          <span key={i} className="inline-flex shrink-0 items-center gap-6 pr-6">
            <span>{t}</span>
            <span className="text-zinc-400 font-normal text-[10px] sm:text-xs">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
