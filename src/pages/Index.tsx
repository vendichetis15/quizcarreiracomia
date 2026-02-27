import { useState, useCallback } from "react";
import QuizProgress from "@/components/QuizProgress";
import QuizOption from "@/components/QuizOption";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { Bot } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Conexão com o Criativo",
    question: "Você já tinha visto uma Inteligência Artificial tão realista quanto a que está neste vídeo?",
    options: [
      { label: "Sim, já estou acompanhando essa revolução." },
      { label: "Não, fiquei impressionado com o realismo." },
      { label: "Vi algo parecido, mas não sabia que era IA." }
    ]
  },
  {
    id: 2,
    title: "Identificação da Dor",
    question: "O que mais te atrai em criar uma renda sem precisar aparecer na câmera?",
    options: [
      { label: "Ganhar 24 horas por dia sem trabalhar manualmente." },
      { label: "Evitar exposição pessoal mas ganhar dinheiro." },
      { label: "Escalar um negócio usando apenas IA e automação." }
    ]
  },
  {
    id: 3,
    title: "Qualificação de Desejo",
    question: "Qual é seu interesse principal com a estratégia do TikTok Shop?",
    options: [
      { label: "Vender produtos com avatar IA no TikTok." },
      { label: "Escalar rapidamente com o agente IA que criai vídeos." },
      { label: "Começar do zero e gerar 10k+/mês garantido." }
    ]
  },
  {
    id: 4,
    title: "Micro-comprometimento",
    question: "Qual é seu objetivo realista para os próximos 30 dias?",
    options: [
      { label: "Gerar meu primeiro 1.000 reais com IA." },
      { label: "Escalar para 10.000 reais mensais estáveis." },
      { label: "Substituir meu salário completamente." }
    ]
  }
];


type Phase = "quiz" | "loading" | "result";

const Index = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");

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
          Descubra em 30 segundos se você será substituído por IA ou se faz parte dos{" "}
          <span className="text-primary">3% que vão lucrar alto</span> com ela.
        </h1>
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