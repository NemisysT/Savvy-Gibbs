import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Scroll, Gem } from 'lucide-react';

interface TreasureRevealProps {
  onClose: () => void;
}

const TreasureReveal = ({ onClose }: TreasureRevealProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [revealedChars, setRevealedChars] = useState(0);

  const integer = [
    87, 87, 57, 49, 74, 51, 90, 108, 73, 71, 74, 108, 90, 87, 52, 103, 86, 72, 74, 112, 99, 71, 86, 121, 66, 77, 101, 120, 114, 118, 105, 110, 104
  ]
    .map((c) => String.fromCharCode(c))
    .join("");

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 1000);
    const timer2 = setTimeout(() => {
      const interval = setInterval(() => {
        setRevealedChars(prev => {
          if (prev >= integer.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 100);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [integer.length]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="relative max-w-2xl w-full mx-4">
        {/* Glowing treasure scroll */}
        <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg border-4 border-amber-600 shadow-2xl animate-pulse">
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 text-amber-600">
            <Scroll size={24} />
          </div>
          <div className="absolute -top-2 -right-2 text-amber-600">
            <Gem size={24} />
          </div>
          <div className="absolute -bottom-2 -left-2 text-amber-600">
            <Gem size={24} />
          </div>
          <div className="absolute -bottom-2 -right-2 text-amber-600">
            <Scroll size={24} />
          </div>

          {/* Golden glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent animate-treasure-glow rounded-lg"></div>

          <div className="text-center space-y-6 relative z-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-pirate text-amber-900 drop-shadow-lg">
                Ye Have Proven Worthy!
              </h2>
              
              <p className="text-amber-800 font-serif text-lg italic animate-fade-in">
                "You've bested the beast... but are ye worthy of the treasure?"
              </p>
            </div>

            {showMessage && (
              <div className="space-y-4">
                <p className="text-amber-700 font-serif text-sm">
                  The ancient scroll unfurls, revealing its secrets...
                </p>
                
                <div className="bg-black/20 p-6 rounded border-2 border-amber-600 font-mono text-amber-900">
                  <div className="text-xs text-amber-700 mb-2">
                    {[
                      84, 82, 69, 65, 83, 85, 82, 69, 32, 77, 65, 80, 32, 67, 79, 79, 82, 68, 73, 78, 65, 84, 69, 83, 58
                    ].map(c => String.fromCharCode(c)).join("")}
                  </div>
                  <div className="text-lg font-bold tracking-wider break-all">
                    {integer.slice(0, revealedChars)}
                    {revealedChars < integer.length && (
                      <span className="animate-pulse">|</span>
                    )}
                  </div>
                </div>

                {revealedChars >= integer.length && (
                  <div className="space-y-3 animate-fade-in">
                    <p className="text-amber-800 font-serif text-sm italic">
                      "Guard this secret well, for the digital seas are treacherous..."
                    </p>
                    
                    <Button 
                      onClick={onClose}
                      className="bg-amber-800 hover:bg-amber-700 text-amber-100 font-serif px-8 py-3"
                    >
                      🏴‍☠️ Hide the Treasure
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureReveal;
