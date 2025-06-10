
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Crown, X, Eye, EyeOff } from 'lucide-react';

interface MemoryGameProps {
  onComplete: () => void;
  onClose: () => void;
  stageInfo: any;
}

const MemoryGame = ({ onComplete, onClose, stageInfo }: MemoryGameProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameMessage, setGameMessage] = useState("Watch the pattern, then repeat it!");
  const [highlightedTile, setHighlightedTile] = useState<number | null>(null);

  const symbols = ['🏴‍☠️', '⚓', '🗡️', '💎', '🏆', '⚡', '🔥', '💀', '👑'];
  const targetLevel = 5;

  const generateSequence = (length: number) => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * 9));
    }
    setSequence(newSequence);
    setPlayerSequence([]);
    setCurrentIndex(0);
  };

  const showSequence = async () => {
    setShowingSequence(true);
    setGameMessage("Watch carefully...");
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setHighlightedTile(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
      setHighlightedTile(null);
    }
    
    setShowingSequence(false);
    setGameMessage("Now repeat the pattern!");
  };

  const handleTileClick = (index: number) => {
    if (showingSequence) return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      setGameMessage("Wrong! Try again from the beginning...");
      setTimeout(() => {
        setPlayerSequence([]);
        setCurrentIndex(0);
        setGameMessage("Watch the pattern again...");
        setTimeout(showSequence, 1000);
      }, 1500);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      if (level >= targetLevel) {
        setGameMessage("🎉 Master of Memory! You've unlocked the fragment!");
        setTimeout(() => onComplete(), 2000);
      } else {
        const newLevel = level + 1;
        setLevel(newLevel);
        setGameMessage(`Level ${newLevel}! Pattern gets longer...`);
        setTimeout(() => {
          generateSequence(newLevel + 2);
          setTimeout(showSequence, 1000);
        }, 2000);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    generateSequence(3); // Start with 3 symbols
    setTimeout(showSequence, 1000);
  };

  const resetGame = () => {
    setLevel(1);
    setGameStarted(false);
    setSequence([]);
    setPlayerSequence([]);
    setCurrentIndex(0);
    setShowingSequence(false);
    setHighlightedTile(null);
    setGameMessage("Watch the pattern, then repeat it!");
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900/95 via-purple-900/90 to-slate-800/95 flex items-center justify-center z-50 backdrop-blur-sm">
      <Card className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-purple-50/95 to-purple-100/90 border-4 border-purple-600 shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-purple-700 hover:text-purple-900"
        >
          <X size={24} />
        </Button>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-pirate text-purple-900 mb-2 flex items-center justify-center gap-3">
              {stageInfo.icon}
              {stageInfo.name}
            </h2>
            <p className="text-purple-800 font-serif italic">
              "Remember the ancient patterns to unlock the secrets of the depths!"
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Game Board */}
            <div className="flex-1">
              {!gameStarted ? (
                <Card className="p-8 bg-purple-900/20 border-purple-600 text-center">
                  <h3 className="text-2xl font-serif text-purple-800 mb-4">Memory Challenge</h3>
                  <p className="text-purple-700 mb-6">
                    Watch the glowing sequence, then repeat it exactly. 
                    Reach level {targetLevel} to claim your fragment!
                  </p>
                  <Button
                    onClick={startGame}
                    className="bg-purple-800 hover:bg-purple-700 text-purple-100 font-serif"
                  >
                    Begin the Trial
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    {symbols.map((symbol, index) => (
                      <button
                        key={index}
                        onClick={() => handleTileClick(index)}
                        disabled={showingSequence}
                        className={`w-20 h-20 rounded-lg border-2 text-2xl font-bold transition-all duration-300 ${
                          highlightedTile === index
                            ? 'bg-yellow-400 border-yellow-600 scale-110 shadow-lg'
                            : showingSequence
                              ? 'bg-purple-200 border-purple-400 cursor-not-allowed opacity-60'
                              : 'bg-purple-200 border-purple-400 hover:bg-purple-300 hover:scale-105 cursor-pointer'
                        }`}
                      >
                        {symbol}
                      </button>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="text-center">
                    <div className="flex justify-center gap-1 mb-2">
                      {sequence.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            index < playerSequence.length 
                              ? 'bg-green-500' 
                              : 'bg-purple-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-purple-700 text-sm">
                      Progress: {playerSequence.length}/{sequence.length}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Game Info */}
            <div className="lg:w-80 space-y-4">
              <Card className="p-4 bg-purple-900/20 border-purple-600">
                <h3 className="text-purple-800 font-serif font-bold mb-3">Challenge Status</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">Current Level:</span> {level}/{targetLevel}</p>
                  <p><span className="font-bold">Sequence Length:</span> {sequence.length}</p>
                  <p><span className="font-bold">Status:</span> {
                    showingSequence ? 'Showing Pattern' : 'Your Turn'
                  }</p>
                </div>
              </Card>

              <Card className="p-4 bg-purple-900/20 border-purple-600">
                <div className="flex items-center gap-2 mb-2">
                  {showingSequence ? <Eye className="text-purple-700" size={16} /> : <EyeOff className="text-purple-700" size={16} />}
                  <h4 className="text-purple-800 font-serif font-bold">Game Message</h4>
                </div>
                <p className="text-purple-800 font-serif text-sm italic">
                  {gameMessage}
                </p>
              </Card>

              <Card className="p-4 bg-purple-900/20 border-purple-600">
                <h4 className="text-purple-800 font-serif font-bold mb-2">How to Play</h4>
                <div className="space-y-1 text-xs text-purple-700">
                  <p>• Watch the glowing sequence carefully</p>
                  <p>• Click tiles in the exact same order</p>
                  <p>• Each level adds more symbols</p>
                  <p>• Reach level {targetLevel} to win!</p>
                  <p>• Make a mistake and start over</p>
                </div>
              </Card>

              {level > 1 && (
                <Card className="p-4 bg-green-900/20 border-green-600">
                  <p className="text-green-800 font-serif text-sm text-center">
                    Level Progress: {level}/{targetLevel}
                  </p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(level / targetLevel) * 100}%` }}
                    />
                  </div>
                </Card>
              )}

              <Button
                onClick={resetGame}
                variant="outline"
                className="w-full border-purple-600 text-purple-700 hover:bg-purple-100 font-serif"
              >
                Restart Challenge
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MemoryGame;
