import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RelicDecoderProps {
  message: string;
  onSolved: () => void;
  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}

const RelicDecoder = ({ message, onSolved, attempts, setAttempts }: RelicDecoderProps) => {
  const [userInput, setUserInput] = useState('');
  const [hint, setHint] = useState('');
  const [showAdvancedHint, setShowAdvancedHint] = useState(false);

  const x1 = [
    84, 72, 69, 79, 78, 69, 95, 80, 82, 79, 67, 69, 83, 83, 95, 73, 78, 73, 84, 73, 65, 84, 69
  ].map(c => String.fromCharCode(c)).join("");

  const crypticMessage = message;

  const handleSubmit = () => {
    const cleanInput = userInput.toUpperCase().replace(/[^A-Z_]/g, '');
    setAttempts(a => a + 1);

    if (cleanInput === x1) {
      onSolved();
      console.log('Cipher solved! The ancient knowledge is yours...');
    } else {
      if (attempts >= 3 && !hint) {
        setHint('The ancients spoke in shifted tongues... perhaps Caesar knew their ways?');
      } else if (attempts >= 6 && !showAdvancedHint) {
        setShowAdvancedHint(true);
      } else {
        setHint('The spirits whisper of failure... try again, mortal.');
      }
    }
  };

  const caesarDecrypt = (text: string, shift: number) => {
    return text.split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      return char;
    }).join('');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-red-900/40 to-slate-800/60 border-red-600">
        <h3 className="text-2xl font-pirate text-red-200 mb-4 text-center">
          Decipher the Ancients
        </h3>
        
        <div className="bg-black/80 p-6 rounded border border-amber-600 font-mono text-center">
          <div className="text-green-400 mb-2">[ANCIENT CIPHER DETECTED]</div>
          <div className="text-2xl text-amber-300 tracking-widest mb-4">
            {crypticMessage}
          </div>
          <div className="text-red-400 text-sm">
            [DECRYPTION REQUIRED] | Attempts: {attempts}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your decryption..."
              className="flex-1 p-3 bg-black/60 border border-amber-600 rounded text-amber-200 font-mono focus:border-amber-400"
            />
            <Button
              onClick={handleSubmit}
              className="bg-red-800 hover:bg-red-700 text-red-100 font-serif"
            >
              Decode
            </Button>
          </div>

          {hint && (
            <Card className="p-4 bg-amber-900/30 border border-amber-600">
              <p className="text-amber-300 font-serif text-sm italic text-center">
                💀 Whisper from the void: "{hint}"
              </p>
            </Card>
          )}

          {showAdvancedHint && (
            <Card className="p-4 bg-blue-900/30 border border-blue-600">
              <div className="space-y-2 text-blue-300 font-serif text-sm">
                <p className="font-bold">🔍 Advanced Cryptanalysis:</p>
                <p>• Pattern: Substitution cipher detected</p>
                <p>• Hint: None today xD</p>
                <p>• Historical: Named after a Roman Emperor</p>
              </div>
            </Card>
          )}

          {attempts >= 10000000 && (
            <Card className="p-4 bg-green-900/30 border border-green-600">
              <div className="space-y-2 text-green-300 font-serif text-sm">
                <p className="font-bold">🎯 Desperate Times Call for Desperate Measures:</p>
                <p>Gl :D</p>
                <p className="font-mono">You really thought, I'd give it away so easy lmao?</p>
                <p>Apply this to: {crypticMessage}</p>
              </div>
            </Card>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-amber-400 font-serif text-sm">
            "The relics have revealed their secret. Decode the message to proceed..."
          </p>
          {attempts > 0 && (
            <p className="text-red-400 font-serif text-xs mt-2">
              Failed attempts: {attempts} | The ancients grow impatient...
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RelicDecoder;
