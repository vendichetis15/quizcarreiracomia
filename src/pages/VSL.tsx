import { useEffect, useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    name: "",
    state: "",
    time: "",
  });

  // Atualiza progresso do vídeo e CTA
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const showButton = () => {
      setProgress(100);
      setShowCTA(true);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", showButton);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", showButton);
    };
  }, []);

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

        {/* Player Vertical 9:16 */}
        <div className="w-full rounded-2xl overflow-visible border border-border relative max-w-sm mx-auto">
          <div style={{ paddingTop: "177.78%", position: "relative" }}>
            <video
              ref={videoRef}
              src="https://drive.usercontent.google.com/u/0/uc?id=1BVIZp1Pc3nGmN5oWqRuuzD7ABZveGlXy&export=download"
              controls={false}
              autoPlay
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
            />
          </div>

          {/* Barra de progresso roxa */}
          <div className="h-2 w-full bg-gray-300 rounded-b-xl mt-2 overflow-hidden">
            <div
              className="h-2 bg-purple-600 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!showCTA && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Vídeo em reprodução...
          </p>
        )}

        {showCTA && (
          <>
            <div className="flex flex-col items-center gap-2 mt-4">
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
            </div>
            <button
              onClick={() => console.log("CTA clicked")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              GARANTIR MINHA VAGA AGORA
            </button>
          </>
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
