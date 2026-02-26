import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuizProgress from "@/components/QuizProgress";
import QuizOption from "@/components/QuizOption";
import { Bot } from "lucide-react";

const questions = [
{
  id: 1,
  title: "Conexão com o Criativo",
  question: "Você já tinha visto uma Inteligência Artificial tão realista quanto a que te trouxe até aqui?",
  options: [
  { label: "Sim, já estou acompanhando essa revolução." },
  { label: "Não, fiquei impressionado com o realismo." },
  { label: "Vi algo parecido, mas não sabia que era IA." }]

},
{
  id: 2,
  title: "Identificação da Dor",
  question: "Qual o seu maior receio em relação ao avanço acelerado da IA no mercado de trabalho?",
  options: [
  { label: "Ser substituído e perder minha fonte de renda." },
  { label: "Ficar estagnado enquanto outros ganham mais usando IA." },
  { label: "Não conseguir aprender a tempo de me destacar." }]

},
{
  id: 3,
  title: "Qualificação de Desejo",
  question: "Se você dominasse as ferramentas que automatizam 80% do seu trabalho hoje, o que você faria?",
  options: [
  { label: "Buscaria um cargo de liderança com salário maior." },
  { label: "Criaria meu próprio negócio digital do zero." },
  { label: "Prestaria serviços para empresas de fora ganhando em dólar." }]

},
{
  id: 4,
  title: "Micro-comprometimento",
  question: "Você está disposto a dedicar 15 minutos agora para entender o método exato que gerou 6 digitos se precisar contratar modelos reais?",
  options: [
  { label: "Sim, quero o acesso imediato." },
  { label: "Com certeza, não quero perder essa chance." }]

}];


type Phase = "quiz" | "loading" | "result";

const Index = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");
  const navigate = useNavigate();

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
      navigate("/vsl");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
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