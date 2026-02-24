import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  selected: boolean;
  recommended?: boolean;
  onClick: () => void;
}

const QuizOption = ({ label, selected, recommended, onClick }: QuizOptionProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium",
      selected
        ? "border-primary bg-primary/15 text-foreground"
        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-card/80"
    )}
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
          selected ? "border-primary bg-primary" : "border-muted-foreground/40"
        )}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
      </div>
      <span>{label}</span>
      {recommended && (
        <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
          Recomendado
        </span>
      )}
    </div>
  </button>
);

export default QuizOption;
