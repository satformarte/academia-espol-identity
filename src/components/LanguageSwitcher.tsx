import { useLanguage, type Lang } from "@/contexts/LanguageContext";

// Catalan Senyera: 9 horizontal stripes (alternating yellow / red)
const SenyeraFlag = () => (
  <svg width="22" height="15" viewBox="0 0 22 15" className="rounded-[2px] block">
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <rect key={i} x="0" width="22" height="1.67" y={i * 1.67} fill={i % 2 === 0 ? "#FCDD09" : "#DA121A"} />
    ))}
  </svg>
);

// Spanish flag: red / yellow (wider) / red
const SpainFlag = () => (
  <svg width="22" height="15" viewBox="0 0 22 15" className="rounded-[2px] block">
    <rect width="22" height="3.75" fill="#C60B1E" />
    <rect width="22" height="7.5" y="3.75" fill="#FFC400" />
    <rect width="22" height="3.75" y="11.25" fill="#C60B1E" />
  </svg>
);

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  const options: { l: Lang; icon: JSX.Element; title: string }[] = [
    { l: "ca", icon: <SenyeraFlag />, title: "Català" },
    { l: "es", icon: <SpainFlag />, title: "Español" },
  ];

  return (
    <div className="flex items-center gap-0.5 bg-muted/60 rounded-lg p-0.5 border border-border">
      {options.map(({ l, icon, title }) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          title={title}
          className={`p-1.5 rounded-md transition-all duration-150 cursor-pointer flex items-center justify-center ${
            lang === l
              ? "bg-card shadow-sm"
              : "opacity-45 hover:opacity-75"
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
