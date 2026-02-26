import { useEffect } from "react";

const VSL = () => {
  useEffect(() => {
    // Load the Converte AI smart player script
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/5d9f8480-70ee-4640-ab7d-afc37958aa16/players/69963cfbe72b943e07e7b685/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-10 animate-fade-in">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
          Aprenda a lucrar de 500 a 1000 reais por dia no TikTok Shop com{" "}
          <span className="text-primary">Influenciadores IA</span>
        </h1>

        <p className="text-base text-muted-foreground font-medium">
          Sem aparecer. Sem nenhum risco.
        </p>

        <p className="text-sm text-muted-foreground">
          Mesmo começando do absoluto zero.
        </p>

        {/* Smart Player Video Embed */}
        <div className="w-full rounded-2xl overflow-hidden border border-border">
          <div
            id="ifr_69963cfbe72b943e07e7b685_wrapper"
            style={{ margin: "0 auto", width: "100%" }}
          >
            <div
              style={{ padding: "122% 0 0 0", position: "relative" }}
            >
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
      </div>
    </div>
  );
};

export default VSL;
