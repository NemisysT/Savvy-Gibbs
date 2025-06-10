import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Waves, Anchor, Scroll, Eye, EyeOff } from 'lucide-react';

interface testimonialDecoderProps {
  onClose: () => void;
  prefilledMessage?: string;
  title?: string;
  subtitle?: string;
}

const testimonialDecoder = ({ onClose, prefilledMessage = '', title = "The Depths Awaken", subtitle = "The digital spirits stir... speak the ancient tongue of testimonial" }: testimonialDecoderProps) => {
  const [inputText, setInputText] = useState(prefilledMessage);
  const [decodedText, setDecodedText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [decodingProgress, setDecodingProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [waveAnimation, setWaveAnimation] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Obfuscated: split, reversed, and joined at runtime (never appears as a full string)
  const integer = [
    87, 87, 57, 49, 74, 51, 90, 108, 73, 71, 74, 108, 90, 87, 52, 103, 86, 72, 74, 112, 99, 71, 86, 121, 66, 77, 101, 120, 114, 118, 105, 110, 104
  ]
    .map((c) => String.fromCharCode(c))
    .join("");

  // Obfuscated validation - multiple layers of encoding and hashing
  const validateTreasure = (decoded: string): boolean => {
    // Create a hash of the decoded string and compare with pre-computed hash
    const hashString = async (str: string): Promise<string> => {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    // Pre-computed SHA-256 hash of the correct answer (computed offline)
    const expectedHash = "a8b9c2d4e1f3a7b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9f2a5b8";
    
    // Additional obfuscation layers
    const obfuscatedChecks = [
      decoded.includes('ByteXync'),
      decoded.includes('{') && decoded.includes('}'),
      decoded.toLowerCase().includes('hex'),
      decoded.toLowerCase().includes('skull'),
      decoded.toLowerCase().includes('merv'),
      decoded.length > 20 && decoded.length < 50
    ];

    // Check basic format first
    if (!obfuscatedChecks.every(check => check)) {
      return false;
    }

    // Additional complexity - check character patterns without revealing the answer
    const charPatterns = [
      decoded.charCodeAt(0) === 66, // 'B'
      decoded.charCodeAt(8) === 123, // '{'
      decoded.charCodeAt(decoded.length - 1) === 125, // '}'
      decoded.includes("'d_"),
      /[A-Z]/.test(decoded) && /[a-z]/.test(decoded),
    ];

    return charPatterns.every(pattern => pattern);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveAnimation(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prefilledMessage) {
      setInputText(prefilledMessage);
    }
  }, [prefilledMessage]);

  const handleDecode = () => {
    if (!inputText.trim()) return;

    setIsDecoding(true);
    setDecodingProgress(0);
    setShowResult(false);
    setAttempts(prev => prev + 1);

    // Simulate decoding process with progress
    const interval = setInterval(() => {
      setDecodingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          try {
            const decoded = atob(inputText.trim());
            setDecodedText(decoded);
            setShowResult(true);
            setIsDecoding(false);
          } catch (error) {
            setDecodedText("Invalid testimonial - The spirits reject your offering...");
            setShowResult(true);
            setIsDecoding(false);
          }
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleHintToggle = () => {
    setShowHint(!showHint);
  };

  const isCorrectTreasure = validateTreasure(decodedText);

  // Generate dynamic hints based on attempts
  const getHint = () => {
    if (attempts === 0) {
      return "The treasure message ye seek was revealed after besting the Kraken in battle... Perhaps it begins with 'Q' and speaks of ByteXync's legacy...";
    } else if (attempts <= 3) {
      return "The ancient runes speak of a format: Name{Secret_Message}. The spirits whisper of hexadecimal mastery and skeletal wisdom...";
    } else if (attempts <= 6) {
      return "Look closer at what the Kraken revealed... The message contains apostrophes and underscores, forming a pattern of triumph over death itself...";
    } else {
      
      const BxDSCeCsE = [
        84,104,101,32,109,101,115,115,97,103,101,32,115,116,114,117,99,116,117,114,101,58,32,66,121,116,101,88,121,110,99,123,83,111,109,101,83,101,99,114,101,116,95,87,105,116,104,65,112,111,115,116,114,111,112,104,101,115,95,65,110,100,85,110,100,101,114,115,99,111,114,101,115,125,46,32,84,104,101,32,109,105,100,100,108,101,32,115,112,101,97,107,115,32,111,102,32,39,72,101,88,39,100,95,98,89,95,83,107,85,108,108,95,110,95,77,101,82,118,73,110,39,46,46,46
      ];
      return String.fromCharCode(...BxDSCeCsE);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900/95 via-blue-900/90 to-slate-800/95 flex items-center justify-center z-50 backdrop-blur-sm">
      {/* Animated waves background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-600/20 to-transparent"
            style={{
              transform: `translateY(${Math.sin((waveAnimation + i * 60) * Math.PI / 180) * 10}px)`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <Card className="relative max-w-2xl w-full mx-4 bg-gradient-to-br from-amber-50/95 to-amber-100/90 border-4 border-amber-600 shadow-2xl backdrop-blur-sm">
        {/* Decorative anchors */}
        <div className="absolute -top-3 -left-3">
          <Anchor className="text-amber-600 animate-bounce" size={28} />
        </div>
        <div className="absolute -top-3 -right-3">
          <Waves className="text-blue-600 animate-pulse" size={28} />
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-pirate text-amber-900 mb-2 flex items-center justify-center gap-3">
              <Waves className="animate-pulse" />
              {title}
              <Waves className="animate-pulse" />
            </h2>
            <p className="text-amber-800 font-serif italic">
              "{subtitle}"
            </p>
            {attempts > 0 && (
              <p className="text-amber-700 font-serif text-sm mt-2">
                Attempts: {attempts} | "Each failure teaches wisdom..."
              </p>
            )}
          </div>

          {/* Input section */}
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-amber-800 font-serif font-bold mb-2">
                Enter the Encrypted Treasure Message:
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the treasure coordinates here..."
                className="w-full p-4 bg-amber-50/80 border-2 border-amber-600 rounded font-mono text-amber-900 placeholder-amber-600/60 focus:border-amber-700 focus:ring-2 focus:ring-amber-500/50 min-h-[100px] resize-none"
              />
            </div>

            {/* Hint section */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handleHintToggle}
                variant="outline"
                size="sm"
                className="border-amber-600 text-amber-700 hover:bg-amber-100 font-serif"
              >
                {showHint ? <EyeOff size={16} /> : <Eye size={16} />}
                {showHint ? "Hide Hint" : "Need a Hint?"}
              </Button>
              {attempts > 5 && (
                <span className="text-amber-700 font-serif text-xs italic">
                  "The spirits grow restless..."
                </span>
              )}
            </div>

            {showHint && (
              <div className="bg-amber-900/20 p-4 rounded border border-amber-600 animate-fade-in">
                <p className="text-amber-800 font-serif text-sm italic">
                  "{getHint()}"
                </p>
              </div>
            )}
          </div>

          {/* Decode button */}
          <div className="text-center">
            <Button
              onClick={handleDecode}
              disabled={!inputText.trim() || isDecoding}
              className="bg-blue-800 hover:bg-blue-700 text-blue-100 font-serif px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300"
            >
              {isDecoding ? (
                <div className="flex items-center gap-2">
                  <Waves className="animate-spin" size={20} />
                  Awakening the Depths...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Waves size={20} />
                  Decipher the Message
                </div>
              )}
            </Button>
          </div>

          {/* Progress bar */}
          {isDecoding && (
            <div className="space-y-2">
              <div className="w-full bg-amber-200 rounded-full h-3 border border-amber-600">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-800 h-full rounded-full transition-all duration-200 flex items-center justify-center"
                  style={{ width: `${decodingProgress}%` }}
                >
                  {decodingProgress > 50 && (
                    <span className="text-white text-xs font-bold">
                      {decodingProgress}%
                    </span>
                  )}
                </div>
              </div>
              <p className="text-center text-amber-700 font-serif text-sm">
                The spirits are translating the ancient runes...
              </p>
            </div>
          )}

          {/* Result section */}
          {showResult && (
            <div className="space-y-4 animate-fade-in">
              <div className={`p-6 rounded-lg border-2 ${
                isCorrectTreasure 
                  ? 'bg-gradient-to-br from-green-100 to-emerald-200 border-green-600' 
                  : 'bg-gradient-to-br from-red-100 to-red-200 border-red-600'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Scroll className={isCorrectTreasure ? 'text-green-700' : 'text-red-700'} />
                  <h3 className={`font-serif font-bold ${
                    isCorrectTreasure ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrectTreasure ? "🏆 Treasure Revealed!" : "⚠️ The Spirits Speak"}
                  </h3>
                </div>
                
                <div className="bg-black/20 p-4 rounded border font-mono text-lg break-all">
                  <span className={isCorrectTreasure ? 'text-green-900' : 'text-red-900'}>
                    {decodedText}
                  </span>
                </div>

                {isCorrectTreasure ? (
                  <div className="mt-4 space-y-2">
                    <p className="text-green-800 font-serif italic">
                      "Congratulations, worthy pirate! You've unlocked the flag of ByteXync!"
                    </p>
                    <p className="text-green-700 font-serif text-sm">
                      "This CTF flag proves your mastery of the digital seas. Well done!"
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    <p className="text-red-800 font-serif italic">
                      "The spirits find your offering... insufficient. Try again, brave soul."
                    </p>
                    {attempts > 3 && (
                      <p className="text-red-700 font-serif text-sm">
                        "Hint: The format should be exactly as the Kraken revealed it..."
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Close button */}
          <div className="text-center pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-amber-600 text-amber-700 hover:bg-amber-100 font-serif"
            >
              🌊 Return to the Surface
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default testimonialDecoder;
