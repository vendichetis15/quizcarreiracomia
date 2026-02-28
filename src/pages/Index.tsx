import { useState, useCallback, useEffect } from "react";
import QuizProgress from "@/components/QuizProgress";
import QuizOption from "@/components/QuizOption";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { Bot } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Maturidade Digital",
    question: "Qual o seu nível de experiência atual com operações de vendas online?",
    options: [
      { label: "Estou começando agora e busco um plano validado." },
      { label: "Já vendo, mas não consigo escalar meus resultados." },
      { label: "Já sou avançado, mas quero automatizar meus processos com IA." }
    ]
  },
  {
    id: 2,
    title: "Barreira da Imagem",
    question: "O que mais te impede de criar anúncios de alta conversão hoje?",
    options: [
      { label: "Não quero aparecer ou expor minha imagem na internet." },
      { label: "Não tenho orçamento para contratar modelos ou influenciadores." },
      { label: "Tenho dificuldade em manter a consistência de novos vídeos." }
    ]
  },
  {
    id: 3,
    title: "Gestão de Tempo",
    question: "Quanto tempo você pode dedicar para gerenciar seu 'Motor de Vendas' automatizado?",
    options: [
      { label: "Menos de 1 hora por dia (busco automação 100%)." },
      { label: "De 1 a 3 horas (consigo acompanhar as métricas)." },
      { label: "Tempo integral (quero construir uma agência de IA)." }
    ]
  },
  {
    id: 4,
    title: "Ancoragem de Meta",
    question: "Se o seu perfil for aprovado, qual o seu objetivo de faturamento para os próximos 30 dias?",
    options: [
      { label: "Alcançar meus primeiros R$ 2.000 a R$ 5.000." },
      { label: "Validar o Plano 10K com consistência." },
      { label: "Escalar para além dos R$ 30.000 mensais." }
    ]
  }
];


type Phase = "quiz" | "loading" | "result";

const Index = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");

  // Captura e salva UTMs no sessionStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src"];
    
    params.forEach((param) => {
      const value = urlParams.get(param);
      if (value) {
        sessionStorage.setItem(param, value);
        console.log(`✅ Salvou ${param}: ${value}`);
      }
    });
  }, []);

  const selectAnswer = (optIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optIndex;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (answers[currentQ] === null) return;
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase("loading");
    }
  };

  const handleLoadingComplete = useCallback(() => {
    setPhase("result");
  }, []);

  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingScreen onComplete={handleLoadingComplete} />
      </div>);

  }

  if (phase === "result") {
    return (
      <div className="min-h-screen bg-background">
        <ResultScreen />
      </div>);

  }

  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Diagnóstico de Carreira • 2026</span>
        </div>
        <h1 className="text-base font-bold text-foreground leading-snug mb-1">
          Descubra o seu perfil com IA e veja se você está preparado para a{" "}
          <span className="text-primary">nova escala do TikTok Shop</span>.
        </h1>
        <p className="text-xs text-muted-foreground leading-relaxed mt-2">
          Em menos de 60 segundos, entenda por que os criadores de conteúdo tradicionais estão sendo substituídos por motores de vendas automatizados.
        </p>
        <div className="mt-4">
          <QuizProgress current={currentQ + 1} total={questions.length} />
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 px-5 py-4 flex flex-col">
        
        <h2 className="text-lg font-bold text-foreground leading-snug mb-6">
          {q.question}
        </h2>

        <div className="space-y-3 flex-1">
          {q.options.map((opt, i) =>
          <QuizOption
            key={i}
            label={opt.label}
            selected={answers[currentQ] === i}
            onClick={() => selectAnswer(i)} />

          )}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          disabled={answers[currentQ] === null}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all mt-6 mb-4 ${
          answers[currentQ] !== null ?
          "quiz-gradient text-primary-foreground glow-primary active:scale-95" :
          "bg-muted text-muted-foreground cursor-not-allowed"}`
          }>

          {currentQ < questions.length - 1 ? "Próxima →" : "Ver Resultado"}
        </button>
      </main>
    </div>);

};

export default Index;