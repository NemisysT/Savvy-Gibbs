
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Anchor, X } from 'lucide-react';

interface Connect4Props {
  onComplete: () => void;
  onClose: () => void;
  stageInfo: any;
}

const Connect4 = ({ onComplete, onClose, stageInfo }: Connect4Props) => {
  const [board, setBoard] = useState<number[][]>(Array(6).fill(null).map(() => Array(7).fill(0)));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState<number | null>(null);
  const [gameMessage, setGameMessage] = useState("Drop your pieces to connect 4!");
  const [playerWins, setPlayerWins] = useState(0);

  const checkWinner = (board: number[][], row: number, col: number, player: number) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      
      // Check positive direction
      for (let i = 1; i < 4; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7 && board[newRow][newCol] === player) {
          count++;
        } else break;
      }
      
      // Check negative direction
      for (let i = 1; i < 4; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7 && board[newRow][newCol] === player) {
          count++;
        } else break;
      }
      
      if (count >= 4) return true;
    }
    return false;
  };

  const makeMove = (col: number) => {
    if (winner || board[0][col] !== 0) return;

    const newBoard = board.map(row => [...row]);
    let row = -1;
    
    for (let r = 5; r >= 0; r--) {
      if (newBoard[r][col] === 0) {
        newBoard[r][col] = currentPlayer;
        row = r;
        break;
      }
    }

    if (row === -1) return;

    setBoard(newBoard);

    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer);
      if (currentPlayer === 1) {
        const newWins = playerWins + 1;
        setPlayerWins(newWins);
        if (newWins >= 2) {
          setGameMessage("🎉 Victory! You've mastered the seas!");
          setTimeout(() => onComplete(), 2000);
        } else {
          setGameMessage(`Round won! Win ${2 - newWins} more to claim the fragment!`);
          setTimeout(() => resetBoard(), 2000);
        }
      } else {
        setGameMessage("AI wins this round! Try again, brave pirate!");
        setTimeout(() => resetBoard(), 2000);
      }
    } else if (newBoard.every(row => row.every(cell => cell !== 0))) {
      setGameMessage("Draw! The battle continues...");
      setTimeout(() => resetBoard(), 2000);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      if (currentPlayer === 1) {
        setTimeout(() => makeAIMove(newBoard), 500);
      }
    }
  };

  const makeAIMove = (currentBoard: number[][]) => {
    const availableCols = [];
    for (let col = 0; col < 7; col++) {
      if (currentBoard[0][col] === 0) {
        availableCols.push(col);
      }
    }

    if (availableCols.length > 0) {
      // Simple AI: try to block player or make random move
      let bestCol = availableCols[Math.floor(Math.random() * availableCols.length)];
      
      // Check if AI can win
      for (const col of availableCols) {
        const testBoard = currentBoard.map(row => [...row]);
        for (let r = 5; r >= 0; r--) {
          if (testBoard[r][col] === 0) {
            testBoard[r][col] = 2;
            if (checkWinner(testBoard, r, col, 2)) {
              bestCol = col;
              break;
            }
            break;
          }
        }
      }

      makeMove(bestCol);
    }
  };

  const resetBoard = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(0)));
    setCurrentPlayer(1);
    setWinner(null);
    setGameMessage("New round! Drop your pieces to connect 4!");
  };

  useEffect(() => {
    if (currentPlayer === 2 && !winner) {
      const timer = setTimeout(() => makeAIMove(board), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, winner, board]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900/95 via-blue-900/90 to-slate-800/95 flex items-center justify-center z-50 backdrop-blur-sm">
      <Card className="relative max-w-4xl w-full mx-4 bg-gradient-to-br from-blue-50/95 to-blue-100/90 border-4 border-blue-600 shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-blue-700 hover:text-blue-900"
        >
          <X size={24} />
        </Button>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-pirate text-blue-900 mb-2 flex items-center justify-center gap-3">
              {stageInfo.icon}
              {stageInfo.name}
            </h2>
            <p className="text-blue-800 font-serif italic">
              "Align your forces against the digital pirates! Win 2 rounds to claim victory!"
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Game Board */}
            <div className="flex-1 flex justify-center">
              <div className="bg-blue-900 p-4 rounded-lg border-2 border-blue-700">
                <div className="grid grid-cols-7 gap-2">
                  {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => makeMove(colIndex)}
                        disabled={winner !== null || currentPlayer === 2 || cell !== 0}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                          cell === 0 
                            ? 'bg-white border-blue-300 hover:bg-blue-100 cursor-pointer'
                            : cell === 1
                              ? 'bg-red-500 border-red-700'
                              : 'bg-yellow-500 border-yellow-700'
                        }`}
                      >
                        {cell === 1 && '🏴‍☠️'}
                        {cell === 2 && '⚓'}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="lg:w-80 space-y-4">
              <Card className="p-4 bg-blue-900/20 border-blue-600">
                <h3 className="text-blue-800 font-serif font-bold mb-3">Battle Status</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold">Your Wins:</span> {playerWins}/2</p>
                  <p><span className="font-bold">Current Turn:</span> {
                    currentPlayer === 1 ? 'Your Turn' : 'AI Thinking...'
                  }</p>
                  <p><span className="font-bold">Objective:</span> Connect 4 in a row</p>
                </div>
              </Card>

              <Card className="p-4 bg-blue-900/20 border-blue-600">
                <p className="text-blue-800 font-serif text-sm text-center italic">
                  {gameMessage}
                </p>
              </Card>

              <Card className="p-4 bg-blue-900/20 border-blue-600">
                <h4 className="text-blue-800 font-serif font-bold mb-2">How to Play</h4>
                <div className="space-y-1 text-xs text-blue-700">
                  <p>• Click columns to drop your pieces</p>
                  <p>• Connect 4 pieces in a row to win</p>
                  <p>• Win 2 rounds to claim the fragment</p>
                  <p>• 🏴‍☠️ = You, ⚓ = AI Enemy</p>
                </div>
              </Card>

              {playerWins > 0 && (
                <Card className="p-4 bg-green-900/20 border-green-600">
                  <p className="text-green-800 font-serif text-sm text-center">
                    Progress: {playerWins}/2 rounds won!
                  </p>
                </Card>
              )}

              <Button
                onClick={resetBoard}
                variant="outline"
                className="w-full border-blue-600 text-blue-700 hover:bg-blue-100 font-serif"
              >
                Reset Current Round
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Connect4;
