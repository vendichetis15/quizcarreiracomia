import { useEffect, useState } from "react";

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
  const [showArrow, setShowArrow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    name: "",
    state: "",
    time: "",
  });

  // Exibe botão após 30 segundos (30.000 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 30000);

    return () => clearTimeout(timer);
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

        {/* Vídeo */}
        <div className="w-full rounded-2xl overflow-visible border border-border relative">
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
          <p className="text-xs text-muted-foreground text-center">
            Vídeo em reprodução...
          </p>
        )}

        {showArrow && (
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
