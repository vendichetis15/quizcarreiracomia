interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress = ({ current, total }: QuizProgressProps) => (
  <div className="w-full">
    <div className="flex justify-between text-xs text-muted-foreground mb-2">
      <span>Pergunta {current} de {total}</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full quiz-gradient rounded-full transition-all duration-500 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

export default QuizProgress;
