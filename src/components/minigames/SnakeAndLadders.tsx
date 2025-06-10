
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Skull, X } from 'lucide-react';

interface SnakeAndLaddersProps {
  onComplete: () => void;
  onClose: () => void;
  stageInfo: any;
}

const SnakeAndLadders = ({ onComplete, onClose, stageInfo }: SnakeAndLaddersProps) => {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameMessage, setGameMessage] = useState("Roll the dice to begin your journey!");
  const [moves, setMoves] = useState(0);

  // Snakes and Ladders positions
  const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
  const ladders = { 1: 38, 4: 14, 9: 21, 16: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const DiceIcon = diceIcons[diceValue - 1];

  useEffect(() => {
    if (playerPosition >= 100) {
      setGameMessage("🎉 Victory! You've reached the treasure!");
      setTimeout(() => onComplete(), 2000);
    }
  }, [playerPosition, onComplete]);

  const rollDice = () => {
    if (isRolling || playerPosition >= 100) return;
    
    setIsRolling(true);
    setMoves(moves + 1);
    
    // Simulate dice rolling animation
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalRoll);
        movePlayer(finalRoll);
        setIsRolling(false);
      }
    }, 100);
  };

  const movePlayer = (steps: number) => {
    const newPosition = Math.min(playerPosition + steps, 100);
    setPlayerPosition(newPosition);
    
    // Check for snakes or ladders
    if (snakes[newPosition as keyof typeof snakes]) {
      const snakeEnd = snakes[newPosition as keyof typeof snakes];
      setTimeout(() => {
        setPlayerPosition(snakeEnd);
        setGameMessage(`🐍 Oh no! A snake bit you! Slide down to ${snakeEnd}`);
      }, 1000);
    } else if (ladders[newPosition as keyof typeof ladders]) {
      const ladderTop = ladders[newPosition as keyof typeof ladders];
      setTimeout(() => {
        setPlayerPosition(ladderTop);
        setGameMessage(`🪜 Lucky! You climbed a ladder to ${ladderTop}!`);
      }, 1000);
    } else {
      setGameMessage(`You rolled ${steps}! Now at position ${newPosition}`);
    }
  };

  const getBoardPosition = (position: number) => {
    const row = Math.floor((position - 1) / 10);
    const col = (position - 1) % 10;
    const isEvenRow = row % 2 === 0;
    const actualCol = isEvenRow ? col : 9 - col;
    return { row: 9 - row, col: actualCol };
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const position = (9 - row) * 10 + (row % 2 === 1 ? 9 - col : col) + 1;
        const isPlayer = position === playerPosition;
        const isSnake = snakes[position as keyof typeof snakes];
        const isLadder = ladders[position as keyof typeof ladders];
        
        board.push(
          <div
            key={position}
            className={`w-8 h-8 border border-amber-600 flex items-center justify-center text-xs font-bold relative ${
              isPlayer 
                ? 'bg-blue-500 text-white animate-pulse' 
                : isSnake 
                  ? 'bg-red-200 text-red-800'
                  : isLadder
                    ? 'bg-green-200 text-green-800'
                    : 'bg-amber-100 text-amber-800'
            }`}
            style={{
              gridColumn: col + 1,
              gridRow: row + 1
            }}
          >
            {isPlayer ? '🏴‍☠️' : position}
            {isSnake && <Skull className="absolute top-0 right-0 w-3 h-3 text-red-600" />}
            {isLadder && <span className="absolute top-0 right-0 text-green-600">🪜</span>}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900/95 via-green-900/90 to-slate-800/95 flex items-center justify-center z-50 backdrop-blur-sm">
      <Card className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-green-50/95 to-green-100/90 border-4 border-green-600 shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-green-700 hover:text-green-900"
        >
          <X size={24} />
        </Button>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-pirate text-green-900 mb-2 flex items-center justify-center gap-3">
              {stageInfo.icon}
              {stageInfo.name}
            </h2>
            <p className="text-green-800 font-serif italic">
              "Navigate the treacherous board to claim your treasure fragment!"
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Game Board */}
            <div className="flex-1">
              <div className="grid grid-cols-10 gap-1 bg-amber-200 p-4 rounded border-2 border-amber-600">
                {renderBoard()}
              </div>
            </div>

            {/* Game Controls */}
            <div className="lg:w-80 space-y-4">
              <Card className="p-4 bg-green-900/20 border-green-600">
                <h3 className="text-green-800 font-serif font-bold mb-3">Game Stats</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">Position:</span> {playerPosition}/100</p>
                  <p><span className="font-bold">Moves:</span> {moves}</p>
                  <p><span className="font-bold">Progress:</span> {Math.round((playerPosition / 100) * 100)}%</p>
                </div>
              </Card>

              <Card className="p-4 bg-green-900/20 border-green-600">
                <div className="text-center">
                  <div className="mb-4">
                    <DiceIcon size={48} className="mx-auto text-green-700" />
                    <p className="text-green-800 font-bold">Last Roll: {diceValue}</p>
                  </div>
                  
                  <Button
                    onClick={rollDice}
                    disabled={isRolling || playerPosition >= 100}
                    className="w-full bg-green-800 hover:bg-green-700 text-green-100 font-serif"
                  >
                    {isRolling ? "Rolling..." : "Roll Dice"}
                  </Button>
                </div>
              </Card>

              <Card className="p-4 bg-green-900/20 border-green-600">
                <p className="text-green-800 font-serif text-sm text-center italic">
                  {gameMessage}
                </p>
              </Card>

              <Card className="p-4 bg-green-900/20 border-green-600">
                <h4 className="text-green-800 font-serif font-bold mb-2">Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Your Position</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 rounded flex items-center justify-center">
                      <Skull className="w-2 h-2" />
                    </div>
                    <span>Snake Head</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 rounded flex items-center justify-center">
                      🪜
                    </div>
                    <span>Ladder Bottom</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SnakeAndLadders;
