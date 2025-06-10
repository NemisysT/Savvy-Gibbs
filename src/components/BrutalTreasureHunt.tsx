import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Skull, Anchor, Flag, Gem } from 'lucide-react';
import TreasureMap from './treasure/TreasureMap';
import CrypticTerminal from './treasure/CrypticTerminal';
import RelicDecoder from './treasure/RelicDecoder';

interface BrutalTreasureHuntProps {
  onClose: () => void;
}

interface RelicDecoderProps {
  message: string;
  onSolved: () => void;
  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}

const d1 = "UmVkSGVycmluZ3s=";
const d2 = "Tm90VGhlRmxhZ30=";
const d3 = "RmFrZUZsYWd7";

const BrutalTreasureHunt = ({ onClose }: BrutalTreasureHuntProps) => {
  const [phase, setPhase] = useState(0);
  const [relicsFound, setRelicsFound] = useState<string[]>([]);
  const [crypticMessage, setCrypticMessage] = useState('');
  const [terminalUnlocked, setTerminalUnlocked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const hiddenRelics = [
    { x: 0.234, y: 0.567, id: 'R1', hint: 'Where the compass points true' },
    { x: 0.789, y: 0.123, id: 'R2', hint: 'In the shadow of the skull' },
    { x: 0.456, y: 0.890, id: 'R3', hint: 'Where X marks the spot' },
    { x: 0.123, y: 0.456, id: 'R4', hint: "Beneath the anchor's weight" },
    { x: 0.678, y: 0.345, id: 'R5', hint: 'In the depths of the abyss' }
  ];

  const zyx = [
    87, 75, 72, 82, 81, 79, 92, 95, 83, 85, 82, 70, 72, 86, 92, 95, 76, 81, 76, 87, 76, 68, 87, 72, 84
  ].map(c => String.fromCharCode(c)).join("");

  const generateCrypticMessage = useCallback(() => {
    if (relicsFound.length === 5) {
      setCrypticMessage(zyx);
      setPhase(2);
    }
  }, [relicsFound, zyx]);

  useEffect(() => {
    generateCrypticMessage();
  }, [generateCrypticMessage]);

  const handleRelicFound = (relicId: string) => {
    if (!relicsFound.includes(relicId)) {
      const newRelics = [...relicsFound, relicId];
      setRelicsFound(newRelics);
      console.log(`Relic ${relicId} discovered! Ancient power stirs...`);
      if (newRelics.length === 5) {
        setPhase(2);
        setTimeout(() => {
          console.log('The veil grows thin... decipher the ancients...');
        }, 2000);
      }
    }
  };

  const handleCipherSolved = () => {
    setTerminalUnlocked(true);
    setPhase(3);
    console.log('Terminal access granted... speak the words of power...');
  };

  const handleTerminalSuccess = () => {
    setPhase(4);
    console.log('The ritual is complete... the final truth awaits...');
  };

  const startHunt = () => {
    setGameStarted(true);
    setPhase(1);
    console.log('The hunt begins... seek the lost relics of ByteXync...');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900/98 via-red-900/95 to-slate-800/98 flex items-center justify-center z-50 backdrop-blur-md">
      <Card className="relative max-w-6xl w-full mx-4 bg-gradient-to-br from-amber-950/90 to-slate-900/90 border-4 border-amber-600 shadow-2xl backdrop-blur-sm max-h-[95vh] overflow-y-auto">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-amber-700 hover:text-amber-900 z-10"
        >
          <X size={24} />
        </Button>

        <div className="p-8 space-y-6">
          {!gameStarted ? (
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-pirate text-amber-200 mb-4 flex items-center justify-center gap-4">
                <Skull className="animate-pulse text-red-400" size={48} />
                The Kraken's Trial
                <Skull className="animate-pulse text-red-400" size={48} />
              </h1>
              <div className="bg-black/60 p-6 rounded border border-red-600 font-mono text-green-400 text-sm">
                <div className="mb-2">[SYSTEM] Initializing ancient protocols...</div>
                <div className="mb-2">[WARNING] This trial will test your very soul</div>
                <div className="mb-2">[INFO] Only the worthy may claim the ultimate prize</div>
                <div className="text-red-400">[CAUTION] Many have entered... few have emerged</div>
              </div>
              <p className="text-amber-300 font-serif text-lg leading-relaxed max-w-2xl mx-auto">
                Captain ByteXync's final challenge awaits. Five ancient relics lie hidden across the cursed map. 
                Find them all, decode the cipher of the ancients, and prove your worth to the digital kraken itself.
              </p>
              <div className="space-y-2 text-amber-400 font-serif text-sm">
                <p>• No guides. No hints. No mercy.</p>
                <p>• The weak of mind need not apply.</p>
                <p>• Trust nothing. Question everything.</p>
                <p>• The truth lies in the depths.</p>
              </div>
              <Button
                onClick={startHunt}
                className="bg-red-800 hover:bg-red-700 text-red-100 font-serif text-xl px-8 py-4 transform hover:scale-105 transition-all duration-300"
              >
                ⚔️ Enter the Abyss
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-pirate text-amber-200 mb-2">
                  Phase {phase}: {
                    phase === 1 ? 'The Hunt Begins' :
                    phase === 2 ? 'Decipher the Ancients' :
                    phase === 3 ? 'Speak the Words of Power' :
                    'The Final Revelation'
                  }
                </h2>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1,2,3,4,5].map((i) => (
                    <div 
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 ${
                        relicsFound.length >= i ? 'bg-red-600 border-red-500' : 'bg-gray-600 border-gray-500'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-amber-400 font-serif">
                  Relics Found: {relicsFound.length}/5
                </p>
              </div>

              {phase === 1 && (
                <TreasureMap 
                  relics={hiddenRelics}
                  onRelicFound={handleRelicFound}
                  foundRelics={relicsFound}
                />
              )}

              {phase === 2 && (
                <RelicDecoder 
                  message={crypticMessage}
                  onSolved={handleCipherSolved}
                  attempts={attempts}
                  setAttempts={setAttempts}
                />
              )}

              {phase >= 3 && (
                <CrypticTerminal 
                  unlocked={terminalUnlocked}
                  onSuccess={handleTerminalSuccess}
                  phase={phase}
                />
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BrutalTreasureHunt;
