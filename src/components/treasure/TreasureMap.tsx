
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Skull, Anchor, Flag, Gem, X } from 'lucide-react';

interface Relic {
  x: number;
  y: number;
  id: string;
  hint: string;
}

interface TreasureMapProps {
  relics: Relic[];
  onRelicFound: (relicId: string) => void;
  foundRelics: string[];
}

const TreasureMap = ({ relics, onRelicFound, foundRelics }: TreasureMapProps) => {
  const [clickedPositions, setClickedPositions] = useState<Array<{x: number, y: number}>>([]);
  const [showHint, setShowHint] = useState<string>('');
  const mapRef = useRef<HTMLDivElement>(null);

  // Generate red herring positions
  const redHerrings = [
    { x: 0.1, y: 0.2 }, { x: 0.3, y: 0.7 }, { x: 0.6, y: 0.4 },
    { x: 0.8, y: 0.8 }, { x: 0.9, y: 0.1 }, { x: 0.2, y: 0.9 }
  ];

  const handleMapClick = (event: React.MouseEvent) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setClickedPositions(prev => [...prev, { x, y }]);

    // Check for relics
    const foundRelic = relics.find(relic => 
      Math.abs(relic.x - x) < 0.05 && 
      Math.abs(relic.y - y) < 0.05 &&
      !foundRelics.includes(relic.id)
    );

    if (foundRelic) {
      onRelicFound(foundRelic.id);
      setShowHint(foundRelic.hint);
      setTimeout(() => setShowHint(''), 3000);
    } else {
      // Check red herrings
      const nearHerring = redHerrings.find(herring =>
        Math.abs(herring.x - x) < 0.05 && Math.abs(herring.y - y) < 0.05
      );
      
      if (nearHerring) {
        setShowHint('Nothing but bones and regret...');
        setTimeout(() => setShowHint(''), 2000);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-amber-900/40 to-slate-800/60 border-amber-600">
        <h3 className="text-xl font-pirate text-amber-200 mb-4 text-center">
          The Cursed Map of ByteXync
        </h3>
        
        <div 
          ref={mapRef}
          className="relative w-full h-96 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-800 rounded cursor-crosshair overflow-hidden"
          onClick={handleMapClick}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.3) 0%, transparent 25%),
              radial-gradient(circle at 70% 60%, rgba(101, 67, 33, 0.2) 0%, transparent 30%),
              radial-gradient(circle at 40% 80%, rgba(160, 82, 45, 0.25) 0%, transparent 20%)
            `
          }}
        >
          {/* Decorative Map Elements */}
          <div className="absolute top-4 left-4">
            <Skull className="text-red-800 opacity-60" size={24} />
          </div>
          <div className="absolute bottom-6 right-8">
            <Anchor className="text-blue-800 opacity-60" size={28} />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <X className="text-red-600 opacity-80" size={32} />
          </div>

          {/* Clicked positions */}
          {clickedPositions.map((pos, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-red-600 rounded-full opacity-50"
              style={{ 
                left: `${pos.x * 100}%`, 
                top: `${pos.y * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}

          {/* Found relics */}
          {relics.map(relic => foundRelics.includes(relic.id) && (
            <div
              key={relic.id}
              className="absolute animate-pulse"
              style={{ 
                left: `${relic.x * 100}%`, 
                top: `${relic.y * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Gem className="text-amber-600" size={20} />
            </div>
          ))}

          {/* Red herring markers */}
          {redHerrings.map((herring, index) => (
            <div
              key={index}
              className="absolute opacity-30"
              style={{ 
                left: `${herring.x * 100}%`, 
                top: `${herring.y * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
            </div>
          ))}
        </div>

        {showHint && (
          <Card className="mt-4 p-3 bg-black/80 border border-amber-600">
            <p className="text-amber-300 font-serif text-sm text-center italic">
              "{showHint}"
            </p>
          </Card>
        )}

        <div className="mt-4 text-center">
          <p className="text-amber-400 font-serif text-sm">
            Click to explore the map. Seek the ancient relics hidden in the shadows...
          </p>
          <p className="text-amber-600 font-serif text-xs mt-2">
            Clicks: {clickedPositions.length} | Precision is key to the worthy...
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TreasureMap;
