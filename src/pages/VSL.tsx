import { useEffect, useState } from "react";

declare global {
  interface Window {
    smartplayer?: { instances?: any[] };
  }
}

const VSL = () => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://scripts.converteai.net/5d9f8480-70ee-4640-ab7d-afc37958aa16/players/69963cfbe72b943e07e7b685/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    const checkPlayer = setInterval(() => {
      if (window.smartplayer) {
        const player = window.smartplayer.instances?.[0];

        if (player) {
          clearInterval(checkPlayer);

          // Evento correto do SmartPlayer
          const liberarCTA = () => {
            console.log("VIDEO FINALIZADO");
            setShowCTA(true);
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          };

          player.on("finish", liberarCTA);
          player.on("complete", liberarCTA);
          player.on("ended", liberarCTA);

          // Fallback: escuta mensagens do iframe do SmartPlayer
          const handleMessage = (event: MessageEvent) => {
            if (event.data && (event.data.type === "ended" || event.data.type === "finish" || event.data.type === "complete" || event.data === "ended")) {
              liberarCTA();
            }
          };
          window.addEventListener("message", handleMessage);
        }
      }
    }, 500);

    return () => {
      clearInterval(checkPlayer);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-10">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
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
        <div className="w-full rounded-2xl overflow-hidden border border-border">
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

        {!showCTA && (
          <p className="text-xs text-muted-foreground">
            Assista até o final para entender tudo...
          </p>
        )}

        {showCTA && (
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
