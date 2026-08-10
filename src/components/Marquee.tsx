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
      ? "text-5xl md:text-7xl lg:text-8xl"
      : size === "md"
        ? "text-2xl md:text-4xl"
        : "text-xs";

  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`flex w-max ${speedCls} font-display uppercase tracking-brand ${sizeCls}`}>
        {loop.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center pr-8">
            {t}
            <span className="pl-8 opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
