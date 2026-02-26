import { useEffect, useState } from "react";

const VSL = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://scripts.converteai.net/5d9f8480-70ee-4640-ab7d-afc37958aa16/players/69963cfbe72b943e07e7b685/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    const startTime = Date.now();
    const totalDuration = 679000;
    const acceleratedPhase = 180000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= totalDuration) {
        setProgress(100);
        setShowArrow(true);
        clearInterval(interval);
      } else if (elapsed <= acceleratedPhase) {
        const acceleratedProgress = (elapsed / acceleratedPhase) * 45;
        setProgress(acceleratedProgress);
      } else {
        const remainingTime = elapsed - acceleratedPhase;
        const remainingDuration = totalDuration - acceleratedPhase;
        const naturalProgress =
          45 + (remainingTime / remainingDuration) * 55;
        setProgress(Math.min(naturalProgress, 100));
      }
    }, 100);

    return () => {
      document.head.removeChild(script);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-10 animate-fade-in">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
          <span className="text-primary">Diagnóstico Concluído:</span> Seu perfil foi{" "}
          <span className="text-primary">aprovado</span> para o{" "}
          <span className="text-primary">Plano 10K</span> em{" "}
          <span className="text-primary">30 dias</span>
        </h1>

        <p className="text-base text-muted-foreground font-medium">
          Sem aparecer. Sem nenhum risco.
        </p>

        <p className="text-sm text-muted-foreground">
          Mesmo começando do absoluto zero.
        </p>

        {/* Vídeo */}
        <div className="w-full rounded-2xl overflow-visible border border-border relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/20 z-50">
            <div
              className="h-full bg-purple-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            id="ifr_69963cfbe72b943e07e7b685_wrapper"
            style={{ margin: "0 auto", width: "100%" }}
          >
            <div style={{ padding: "122% 0 0 0", position: "relative" }}>
              <iframe
                id="ifr_69963cfbe72b943e07e7b685"
                src="https://scripts.converteai.net/5d9f8480-70ee-4640-ab7d-afc37958aa16/players/69963cfbe72b943e07e7b685/embed.html"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                referrerPolicy="origin"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {!showArrow && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground">
              Vídeo em reprodução...
            </p>
            <button
              onClick={() => setShowArrow(true)}
              className="text-xs text-primary underline"
            >
              Já assisti, quero garantir minha vaga agora...
            </button>
          </div>
        )}

        {showArrow && (
          <>
            <div className="flex flex-col items-center gap-2">
              <div className="animate-bounce">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Clique abaixo para garantir sua vaga
              </p>
            </div>

            {/* BOTÃO COM SEU LINK DE AFILIADO */}
            <a
              href="https://pay.kiwify.com.br/vjjTIiE?afid=bCH5tjUf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-center"
            >
              GARANTIR MINHA VAGA AGORA
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default VSL;
