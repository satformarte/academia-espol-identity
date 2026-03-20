import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1500, prefix: "+", suffix: "+", label: "Alumnes formats" },
  { value: 98, prefix: "", suffix: "%", label: "Satisfacció" },
  { value: 40, prefix: "+", suffix: "", label: "Cursos disponibles" },
  { value: 12, prefix: "", suffix: "+", label: "Anys d'experiència" },
  { value: 500, prefix: "+", suffix: "", label: "Aprovats" },
];

const useCountUp = (target: number, trigger: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, trigger]);
  return count;
};

const StatItem = ({ stat, visible }: { stat: typeof stats[0]; visible: boolean }) => {
  const count = useCountUp(stat.value, visible);
  return (
    <div className="text-center px-4 py-7">
      <div className="font-display font-black text-[30px] text-primary">
        <span className="text-accent">{stat.prefix}</span>
        {count.toLocaleString()}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="font-body text-[11px] uppercase tracking-[0.15em] text-muted-foreground mt-1.5 font-semibold">
        {stat.label}
      </div>
    </div>
  );
};

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-card border-b border-border">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} visible={visible} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
