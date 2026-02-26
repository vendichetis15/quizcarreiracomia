import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const steps = [
  "Analisando suas respostas...",
  "Verificando compatibilidade de mercado...",
  "Cruzando dados com tendências de 2026...",
  "RESULTADO: 98% de Compatibilidade encontrada!",
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setStepIndex(0);
    else if (progress < 55) setStepIndex(1);
    else if (progress < 85) setStepIndex(2);
    else setStepIndex(3);
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-6">
      {/* Circular loader */}
      <div className="relative w-28 h-28">
        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50" cy="50" r="42"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.64} ${264 - progress * 2.64}`}
            className="transition-all duration-100"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(330 90% 56%)" />
              <stop offset="100%" stopColor="hsl(280 80% 50%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{progress}%</span>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-xl font-bold text-foreground">{steps[stepIndex]}</h2>
        <div className="flex flex-col gap-1">
          {steps.slice(0, stepIndex + 1).map((s, i) => (
            <p key={i} className={`text-xs transition-all duration-300 ${i === stepIndex ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {i < stepIndex ? "✅ " : "⏳ "}{s}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
