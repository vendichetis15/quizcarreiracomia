import { useState, useEffect } from "react";
import { CheckCircle, ShieldCheck, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";



const ResultScreen = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center px-5 py-8 min-h-[70vh] justify-center gap-6">
      <div className="w-16 h-16 rounded-full quiz-gradient flex items-center justify-center glow-primary">
        <CheckCircle className="w-8 h-8 text-primary-foreground" />
      </div>

      <div className="text-center space-y-3 max-w-sm">
        <h2 className="text-2xl font-extrabold text-foreground">
          98% de Compatibilidade! ✅
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Com base nas suas respostas, você tem o <span className="text-primary font-semibold">perfil ideal</span> para operar a tecnologia do estrategista Gabriel. Ele criou um motor de vendas para o TikTok Shop que roda 100% no automático, sem precisar de modelos reais.
        </p>
      </div>

      {/* Estudo de Caso */}
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">[ ESTUDO DE CASO LIBERADO ]</span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          No vídeo abaixo, você verá a <span className="font-semibold">Nina e a Ju</span> — duas influenciadoras 100% criadas por IA pelo Gabriel. Elas provam como o Plano 10K funciona nos bastidores de um podcast real. Assista e veja como copiar essa estrutura.
        </p>
      </div>

      {showButton ?
      <>
          <ChevronDown className="w-8 h-8 text-primary animate-bounce animate-fade-in" />
          <button
            onClick={() => navigate("/vsl")}
            className="w-full max-w-sm py-4 rounded-2xl quiz-gradient text-primary-foreground font-extrabold text-lg tracking-wide glow-primary pulse-glow transition-transform active:scale-95 animate-fade-in"
          >
            ASSISTIR AO ESTUDO DE CASO AGORA
          </button>
          <p className="text-xs text-destructive/80 text-center font-semibold animate-fade-in">
            ⚠️ Este vídeo sairá do ar assim que as vagas da mentoria forem preenchidas.
          </p>
        </> :

      <p className="text-xs text-muted-foreground/60 text-center animate-pulse">
          Leia o depoimento acima...
        </p>
      }
    </div>);

};

export default ResultScreen;
