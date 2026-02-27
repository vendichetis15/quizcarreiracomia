import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    smartplayer?: any;
  }
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showCTA, setShowCTA] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    name: "",
    state: "",
    time: "",
  });

  const handleEnableAudio = () => {
    setMuted(false);
    videoRef.current?.play();
  };

  const handleEnded = () => {
    setShowCTA(true);
  };

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

        {/* Vídeo local com controle de áudio e CTA */}
        <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-border relative aspect-w-3 aspect-h-4">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            // utilize o nome real do arquivo na pasta public (espaços codificados)
            src="/vsl%20TTKSHOP.mp4"
            muted={muted}
            autoPlay
            playsInline
            onEnded={handleEnded}
            controls={false}
          />
          {muted && (
            <button
              onClick={handleEnableAudio}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold"
            >
              Soltar áudio ▶
            </button>
          )}
        </div>

        {!showCTA && (
          <p className="text-xs text-muted-foreground text-center">
            Vídeo em reprodução...
          </p>
        )}

        {showCTA && (
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
            GARANTIR MINHA VAGA AGORA
          </button>
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
