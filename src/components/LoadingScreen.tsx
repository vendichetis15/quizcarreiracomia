import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-6">
      {/* Circular loader */}
      <div className="relative w-28 h-28">
        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42"
            stroke="hsl(240 8% 18%)"
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

      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-foreground">Analisando Perfil...</h2>
        <p className="text-sm text-muted-foreground">
          Processando suas respostas com IA
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
