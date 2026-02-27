import { useEffect, useState } from "react";

declare global {
  interface Window {
    smartplayer?: any;
  }
}

// Estilos CSS para animação de pulse
const pulseStyle = `
  @keyframes pulse-btn {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.02);
    }
  }
  
  .pulse-btn {
    animation: pulse-btn 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

// Injetar CSS de animação
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = pulseStyle;
  document.head.appendChild(style);
}

const fakeClients = [
  "Mariana Souza",
  "Carlos Henrique",
  "Fernanda Lima",
  "Lucas Almeida",
  "Juliana Rocha",
  "Rafael Martins",
  "Patrícia Gomes",
  "Bruno Carvalho",
  "Camila Fernandes",
  "Thiago Ribeiro",
];

const states = ["SP", "RJ", "MG", "PR", "RS", "SC", "BA", "GO", "PE"];

const getRandomItem = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomDelay = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const getRandomMinutesAgo = () => {
  const minutes = Math.floor(Math.random() * 4) + 1;
  return minutes === 1 ? "há 1 minuto" : `há ${minutes} minutos`;
};

const VSL = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [videoWatched, setVideoWatched] = useState(() => {
    // Limpa chave antiga pra não conflitar
    if (typeof window !== "undefined") {
      localStorage.removeItem("vsl_watched_5min");
      const saved = localStorage.getItem("vsl_watched_6min30");
      console.log("localStorage recuperado (6:30):", saved);
      return saved === "true";
    }
    return false;
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    name: "",
    state: "",
    time: "",
  });

  // Verifica localStorage ao montar o componente
  useEffect(() => {
    const saved = localStorage.getItem("vsl_watched_6min30");
    if (saved === "true") {
      console.log("CTA ja foi assistido, mostrando agora");
      setVideoWatched(true);
    }
  }, []);

  // Timer que atualiza a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev + 1;
        // Log a cada 30 segundos pra rastrear (evita spam)
        if (newTime % 30 === 0) {
          console.log(`⏱️ Tempo atual: ${newTime}s (${Math.floor(newTime / 60)}:${String(newTime % 60).padStart(2, "0")})`);
        }
        // Quando chegar aos 6 minutos e 30 segundos (390s), salva no localStorage
        if (newTime >= 390 && !videoWatched) {
          console.log("🎯 Chegou aos 6:30 minutos! Salvando no localStorage e mostrando CTA");
          localStorage.setItem("vsl_watched_6min30", "true");
          setVideoWatched(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [videoWatched]);

  // CTA aparece se já assistiu 6:30 minutos (do localStorage) ou ao atingir 390s
  const shouldShowCTA = videoWatched || currentTime >= 390;

  // Sistema de notificações REALISTA
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const showRandomNotification = () => {
      setNotificationData({
        name: getRandomItem(fakeClients),
        state: getRandomItem(states),
        time: getRandomMinutesAgo(),
      });

      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 6000);

      timeout = setTimeout(
        showRandomNotification,
        getRandomDelay(70000, 110000)
      );
    };

    timeout = setTimeout(
      showRandomNotification,
      getRandomDelay(45000, 75000)
    );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start px-4 py-10 animate-fade-in relative">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
          <span className="text-primary">Diagnóstico Concluído:</span> Seu perfil
          foi <span className="text-primary">aprovado</span> para o{" "}
          <span className="text-primary">Plano 10K</span> em{" "}
          <span className="text-primary">30 dias</span>
        </h1>

        <p className="text-base text-muted-foreground font-medium">
          Sem aparecer. Sem nenhum risco.
        </p>

        <p className="text-sm text-muted-foreground">
          Mesmo começando do absoluto zero.
        </p>

        {/* Vídeo com barra de progresso */}
        <div className="w-full rounded-2xl overflow-hidden border border-border relative">
          {/* Barra de progresso no topo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-10">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${Math.min((currentTime / 300) * 100, 100)}%` }}
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

        {!shouldShowCTA && (
          <p className="text-xs text-muted-foreground text-center">
            Vídeo em reprodução...
          </p>
        )}

        {shouldShowCTA && (
          <div className="w-full space-y-3">
            {/* Setinha apontando para o botão */}
            <div className="flex justify-center">
              <div className="animate-bounce">
                <span className="text-primary text-2xl">↓</span>
              </div>
            </div>
            
            {/* Botão CTA com pulse */}
            <button
              onClick={() => {
                const baseUrl = "https://pay.kiwify.com.br/vjjTIiE?afid=bCH5tjUf";
                const url = new URL(baseUrl);
                
                // Injeta UTMs do sessionStorage
                const params = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src"];
                params.forEach((param) => {
                  const value = sessionStorage.getItem(param);
                  if (value) {
                    url.searchParams.set(param, value);
                    console.log(`🚀 Injetando ${param}: ${value}`);
                  }
                });
                
                console.log("✅ URL Final:", url.toString());
                window.location.href = url.toString();
              }}
              className="pulse-btn w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              GARANTIR MINHA VAGA AGORA
            </button>
          </div>
        )}
      </div>

      {/* Notificação Realista */}
      {showNotification && (
        <div className="fixed bottom-6 left-6 bg-white text-black px-4 py-3 rounded-xl shadow-2xl max-w-xs transition-all duration-500 animate-fade-in">
          <p className="text-sm font-semibold">
            {notificationData.name} de {notificationData.state}
          </p>
          <p className="text-xs">
            acabou de se tornar um Criador de IAs • {notificationData.time}
          </p>
        </div>
      )}
    </div>
  );
};

export default VSL;
