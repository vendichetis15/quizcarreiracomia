import { CheckCircle, Sparkles } from "lucide-react";

const AFFILIATE_LINK = "https://seulink.com/afiliado";

const ResultScreen = () => {
  return (
    <div className="flex flex-col items-center px-5 py-8 min-h-[70vh] justify-center gap-6">
      <div className="w-16 h-16 rounded-full quiz-gradient flex items-center justify-center glow-primary">
        <CheckCircle className="w-8 h-8 text-primary-foreground" />
      </div>

      <div className="text-center space-y-3 max-w-sm">
        <h2 className="text-2xl font-extrabold text-foreground">
          Perfil Compatível! ✅
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Com base nas suas respostas, você tem o <span className="text-primary font-semibold">perfil ideal</span> para
          aplicar o método do Gabriel Morais.
        </p>
      </div>

      {/* Depoimento */}
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Depoimento</span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed italic">
          "Eu faturei R$ 100k no TikTok Shop, mas parei tudo para focar nessa nova tecnologia de Avatares.
          Veja por que..."
        </p>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-xs">
        Assista ao vídeo abaixo para liberar seu acesso aos <span className="text-primary font-semibold">prompts ultra-realistas</span>.
      </p>

      <a
        href={AFFILIATE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-sm block"
      >
        <button className="w-full py-4 rounded-2xl quiz-gradient text-primary-foreground font-extrabold text-lg tracking-wide glow-primary pulse-glow transition-transform active:scale-95">
          🔓 QUERO MEU ACESSO
        </button>
      </a>

      <p className="text-xs text-muted-foreground/60 text-center">
        Vagas limitadas • Acesso imediato
      </p>
    </div>
  );
};

export default ResultScreen;
