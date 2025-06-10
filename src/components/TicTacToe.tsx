import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TicTacToeProps {
  onWin: () => void;
  onClose: () => void;
}

type Player = '⚓️' | '☠️' | null;
type Board = Player[];

const TicTacToe = ({ onWin, onClose }: TicTacToeProps) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'draw'>('playing');

  const checkWinner = (board: Board): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const makeAIMove = (currentBoard: Board): number => {
    // Simple AI that tries to win, block, or play randomly
    const availableMoves = currentBoard.map((cell, index) => cell === null ? index : null).filter(val => val !== null) as number[];
    
    // Try to win
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = '☠️';
      if (checkWinner(testBoard) === '☠️') return move;
    }
    
    // Block player from winning
    for (const move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = '⚓️';
      if (checkWinner(testBoard) === '⚓️') return move;
    }
    
    // Random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const handleCellClick = (index: number) => {
    if (board[index] || !isPlayerTurn || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = '⚓️';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winner = checkWinner(newBoard);
    if (winner === '⚓️') {
      setGameStatus('won');
      setTimeout(() => onWin(), 1500);
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setGameStatus('draw');
      return;
    }

    // AI move
    setTimeout(() => {
      const aiMove = makeAIMove(newBoard);
      if (aiMove !== undefined) {
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = '☠️';
        setBoard(aiBoard);

        const aiWinner = checkWinner(aiBoard);
        if (aiWinner === '☠️') {
          setGameStatus('lost');
        } else if (aiBoard.every(cell => cell !== null)) {
          setGameStatus('draw');
        } else {
          setIsPlayerTurn(true);
        }
      }
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('playing');
  };

  
  const zq = [
    87, 87, 57, 49, 74, 51, 90, 108, 73, 71, 74, 108, 90, 87, 52, 103, 86, 72, 74, 112, 99, 71, 86, 121, 66, 105, 66, 78, 90, 88, 74, 50, 97, 87, 52, 104
  ]
    .map((x) => String.fromCharCode(x))
    .join(""); 

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-lg border-4 border-amber-700 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-pirate text-amber-900 mb-2">Kraken's Challenge</h2>
          <p className="text-amber-800 font-serif text-sm">
            Best the digital beast at its own game!
          </p>
          <p className="text-amber-700 text-xs mt-2">
            You are ⚓️ • The Kraken is ☠️
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 bg-amber-50 p-4 rounded border-2 border-amber-600">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className="w-16 h-16 bg-amber-100 border-2 border-amber-600 rounded text-2xl font-bold hover:bg-amber-200 transition-colors disabled:opacity-50"
              disabled={!isPlayerTurn || gameStatus !== 'playing'}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="text-center space-y-3">
          {gameStatus === 'playing' && (
            <p className="text-amber-800 font-serif">
              {isPlayerTurn ? "Your turn, brave sailor!" : "The Kraken thinks..."}
            </p>
          )}
          {gameStatus === 'won' && (
            <p className="text-green-700 font-bold font-serif animate-pulse">
              Victory! The Kraken retreats...
            </p>
          )}
          {gameStatus === 'lost' && (
            <>
              <p className="text-red-700 font-bold font-serif">
                The Kraken claims another soul...
              </p>
              <div className="mt-4 text-xs text-amber-700 font-mono break-all">
                {zq}
              </div>
            </>
          )}
          {gameStatus === 'draw' && (
            <p className="text-amber-700 font-serif">
              A draw! Even the Kraken respects ye...
            </p>
          )}

          <div className="flex gap-2 justify-center">
            {(gameStatus === 'lost' || gameStatus === 'draw') && (
              <Button onClick={resetGame} className="bg-amber-700 hover:bg-amber-600 text-amber-100">
                Try Again
              </Button>
            )}
            <Button onClick={onClose} variant="outline" className="border-amber-600 text-amber-700">
              Retreat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
