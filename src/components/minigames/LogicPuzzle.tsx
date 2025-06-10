import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Gem, X, CheckCircle } from 'lucide-react';

interface LogicPuzzleProps {
  onComplete: () => void;
  onClose: () => void;
  stageInfo: any;
}

const LogicPuzzle = ({ onComplete, onClose, stageInfo }: LogicPuzzleProps) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [attempts, setAttempts] = useState(0);
  const [gameMessage, setGameMessage] = useState("Solve these riddles to prove your wisdom!");
  const [hintsUsed, setHintsUsed] = useState<boolean[]>([false, false, false]);

  const puzzles = [
    {
      question: "I am a sequence that starts with 0 and 1. Each number is the sum of the two before. What is the 8th number in my sequence?",
      answer: "13",
      hint: "This is the famous Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13...",
      explanation: "The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13. The 8th number is 13."
    },
    {
      question: "In binary, what is 1011 + 1101? Give your answer in decimal.",
      answer: "24",
      hint: "Convert each binary number to decimal first: 1011₂ = 11₁₀ and 1101₂ = 13₁₀",
      explanation: "1011₂ = 11₁₀ and 1101₂ = 13₁₀. So 11 + 13 = 24 in decimal."
    },
    {
      question: "A pirate's treasure chest has a 4-digit combination. The digits are all different, sum to 20, and when arranged in ascending order spell out a year in the 21st century. What is the combination?",
      answer: "2569",
      hint: "Think of years from 2000-2099. The digits must be different and sum to 20.",
      explanation: "The year 2569 has digits 2, 5, 6, 9 which are all different and sum to 20. It's a valid 21st century year."
    }
  ];

  const handleAnswerSubmit = (puzzleIndex: number) => {
    const userAnswer = answers[puzzleIndex].trim();
    const correctAnswer = puzzles[puzzleIndex].answer;
    
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      if (puzzleIndex === puzzles.length - 1) {
        setGameMessage("🎉 Master of Logic! All riddles solved!");
        setTimeout(() => onComplete(), 2000);
      } else {
        setCurrentPuzzle(puzzleIndex + 1);
        setGameMessage(`Puzzle ${puzzleIndex + 1} solved! Moving to the next challenge...`);
      }
    } else {
      setAttempts(attempts + 1);
      setGameMessage(`Incorrect! Think harder, brave soul. (Attempt ${attempts + 1})`);
    }
  };

  const useHint = (puzzleIndex: number) => {
    const newHints = [...hintsUsed];
    newHints[puzzleIndex] = true;
    setHintsUsed(newHints);
  };

  const updateAnswer = (puzzleIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[puzzleIndex] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900/95 via-amber-900/90 to-slate-800/95 flex items-center justify-center z-50 backdrop-blur-sm">
      <Card className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-amber-50/95 to-amber-100/90 border-4 border-amber-600 shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-amber-700 hover:text-amber-900"
        >
          <X size={24} />
        </Button>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-pirate text-amber-900 mb-2 flex items-center justify-center gap-3">
              {stageInfo.icon}
              {stageInfo.name}
            </h2>
            <p className="text-amber-800 font-serif italic">
              "The final test of wisdom. Solve these riddles to claim the ultimate fragment!"
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Puzzles */}
            <div className="flex-1 space-y-6">
              {puzzles.map((puzzle, index) => (
                <Card 
                  key={index}
                  className={`p-6 transition-all duration-300 ${
                    index < currentPuzzle 
                      ? 'bg-green-100 border-green-600' 
                      : index === currentPuzzle
                        ? 'bg-amber-100 border-amber-600 ring-2 ring-amber-400'
                        : 'bg-gray-100 border-gray-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-amber-800">Riddle {index + 1}</span>
                    {index < currentPuzzle && <CheckCircle className="text-green-600" size={20} />}
                    {index > currentPuzzle && <span className="text-gray-500">🔒</span>}
                  </div>

                  <p className="text-amber-800 font-serif mb-4 leading-relaxed">
                    {puzzle.question}
                  </p>

                  {index <= currentPuzzle && (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={answers[index]}
                          onChange={(e) => updateAnswer(index, e.target.value)}
                          placeholder="Your answer..."
                          disabled={index < currentPuzzle}
                          className="flex-1 p-3 border-2 border-amber-400 rounded font-mono bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-300 disabled:bg-gray-100"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && index === currentPuzzle) {
                              handleAnswerSubmit(index);
                            }
                          }}
                        />
                        {index === currentPuzzle && (
                          <Button
                            onClick={() => handleAnswerSubmit(index)}
                            className="bg-amber-800 hover:bg-amber-700 text-amber-100 font-serif"
                          >
                            Submit
                          </Button>
                        )}
                      </div>

                      {index === currentPuzzle && !hintsUsed[index] && (
                        <Button
                          onClick={() => useHint(index)}
                          variant="outline"
                          size="sm"
                          className="border-amber-600 text-amber-700 hover:bg-amber-100 font-serif"
                        >
                          💡 Need a Hint?
                        </Button>
                      )}

                      {hintsUsed[index] && (
                        <Card className="p-3 bg-amber-200/50 border border-amber-400">
                          <p className="text-amber-800 text-sm italic">
                            <strong>Hint:</strong> {puzzle.hint}
                          </p>
                        </Card>
                      )}

                      {index < currentPuzzle && (
                        <Card className="p-3 bg-green-200/50 border border-green-400">
                          <p className="text-green-800 text-sm">
                            <strong>Explanation:</strong> {puzzle.explanation}
                          </p>
                        </Card>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Game Info */}
            <div className="lg:w-80 space-y-4">
              <Card className="p-4 bg-amber-900/20 border-amber-600">
                <h3 className="text-amber-800 font-serif font-bold mb-3">Progress</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">Puzzles Solved:</span> {currentPuzzle}/{puzzles.length}</p>
                  <p><span className="font-bold">Total Attempts:</span> {attempts}</p>
                  <p><span className="font-bold">Hints Used:</span> {hintsUsed.filter(Boolean).length}/{puzzles.length}</p>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3 mt-3">
                  <div
                    className="bg-amber-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(currentPuzzle / puzzles.length) * 100}%` }}
                  />
                </div>
              </Card>

              <Card className="p-4 bg-amber-900/20 border-amber-600">
                <p className="text-amber-800 font-serif text-sm text-center italic">
                  {gameMessage}
                </p>
              </Card>

              <Card className="p-4 bg-amber-900/20 border-amber-600">
                <h4 className="text-amber-800 font-serif font-bold mb-2">The Final Trial</h4>
                <div className="space-y-1 text-xs text-amber-700">
                  <p>• Three riddles guard the final fragment</p>
                  <p>• Use logic, math, and pirate wisdom</p>
                  <p>• Hints are available if you're stuck</p>
                  <p>• Only the worthy shall claim victory</p>
                </div>
              </Card>

              {currentPuzzle > 0 && (
                <Card className="p-4 bg-green-900/20 border-green-600">
                  <p className="text-green-800 font-serif text-sm text-center">
                    "Your wisdom grows stronger with each riddle solved!"
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LogicPuzzle;
