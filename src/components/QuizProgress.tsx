interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress = ({ current, total }: QuizProgressProps) => {
  // Start at 20% and scale to 100%
  const percentage = 20 + ((current - 1) / total) * 80;
  const displayPercentage = Math.round(20 + (current / total) * 80);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>Pergunta {current} de {total}</span>
        <span>{displayPercentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full quiz-gradient rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
