import { useState, useEffect } from "react";
import { Compass, Anchor, Scroll, Map, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TicTacToe from "@/components/TicTacToe";
import TreasureReveal from "@/components/TreasureReveal";
import BrutalTreasureHunt from "@/components/BrutalTreasureHunt";

const Index = () => {
  const [candleFlicker, setCandleFlicker] = useState(0);
  const [showTicTacToe, setShowTicTacToe] = useState(false);
  const [showTreasureReveal, setShowTreasureReveal] = useState(false);
  const [showCaptainLog, setShowCaptainLog] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showBrutalHunt, setShowBrutalHunt] = useState(false);
  const [currentLogEntry, setCurrentLogEntry] = useState(0);
  const [selectedMapLocation, setSelectedMapLocation] = useState("");

  const logEntries = [
    {
      day: "1337",
      entry: "The crew speaks of a legendary treasure, encrypted in the ancient tongues of binary and hex..."
    },
    {
      day: "1338", 
      entry: "Strange symbols appeared on the ship's hull overnight. The digital spirits are restless..."
    },
    {
      day: "1339",
      entry: "Found an ancient USB drive buried in the sand. It glows with an otherworldly light..."
    },
    {
      day: "1340",
      entry: "The Kraken's tentacles reach through the network cables. We must solve its riddles to proceed..."
    }
  ];

  const mapLocations = [
    {
      name: "Skull Island",
      description: "Web Exploitation Challenges",
      details: "Navigate through XSS forests and SQL injection caves to find the hidden treasure.",
      difficulty: "Beginner"
    },
    {
      name: "Dead Man's Chest", 
      description: "Cryptography Puzzles",
      details: "Decode ancient ciphers and break mystical encryption spells left by digital pirates.",
      difficulty: "Intermediate"
    },
    {
      name: "Kraken's Lair",
      description: "Binary Exploitation", 
      details: "Face the digital beast in its underwater domain. Buffer overflows and ROP chains await.",
      difficulty: "Advanced"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCandleFlicker(Math.random() * 0.3 + 0.7);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const toggleBrutalTreasureHunt = () => {
    setShowBrutalHunt(!showBrutalHunt);
  };

  const handleFightTheBeast = () => {
    setShowTicTacToe(true);
  };

  const handleTicTacToeWin = () => {
    setShowTicTacToe(false);
    setShowTreasureReveal(true);
  };

  const handleTicTacToeClose = () => {
    setShowTicTacToe(false);
  };

  const handleTreasureRevealClose = () => {
    setShowTreasureReveal(false);
  };

  const handleCaptainLogClick = () => {
    setShowCaptainLog(!showCaptainLog);
  };

  const handleMapClick = () => {
    setShowMap(!showMap);
  };

  const nextLogEntry = () => {
    setCurrentLogEntry((prev) => (prev + 1) % logEntries.length);
  };

  const prevLogEntry = () => {
    setCurrentLogEntry((prev) => (prev - 1 + logEntries.length) % logEntries.length);
  };

  const handleBrutalHuntClose = () => {
    setShowBrutalHunt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-amber-950 to-slate-800 relative overflow-hidden">
      {/* Hidden CTF Message */}
      <div className="hidden" data-secret="VGhlIGZpcnN0IGtleSBpcyBoaWRkZW4gaW4gdGhlIGNvbXBhc3MgLSBsb29rIGZvciBhbmNob3IgcG9pbnRz">
        {/* testimonial: The first key is hidden in the compass - look for anchor points */}
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='parchment' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='2' fill='%23d4af37' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23parchment)'/%3E%3C/svg%3E")`
      }}></div>
      
      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-2 h-2 bg-amber-400' : 
              i % 3 === 1 ? 'w-1 h-1 bg-red-400' : 
              'w-1.5 h-1.5 bg-orange-300'
            } animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header with Candle Effect */}
        <header className="text-center mb-12 relative">
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-orange-400 to-red-600 rounded-full blur-sm"
            style={{ opacity: candleFlicker }}
          />
          <div className="font-serif text-6xl font-bold text-amber-100 mb-4 text-shadow-lg tracking-wider transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            The Curse of ByteXync
          </div>
          <div className="text-amber-300 text-xl italic mb-6 font-serif animate-fade-in">
            "Where Digital Treasures Lie Hidden in Ancient Code"
          </div>
          
          <Button
            onClick={toggleBrutalTreasureHunt}
            variant="outline"
            className="bg-red-900/50 border-red-600 text-red-200 hover:bg-red-800/70 transform hover:scale-105 transition-all duration-300 font-pirate text-lg"
          >
            {showBrutalHunt ? "🔥 Close the Abyss" : "🔥 Enter the Kraken's Trial"}
          </Button>
        </header>

        {/* Enhanced Navigation Compass */}
        <div className="flex justify-center mb-12">
          <div className="relative group">
            <Compass 
              size={120} 
              className="text-amber-400 animate-spin hover:text-amber-300 transition-colors cursor-pointer" 
              style={{ animationDuration: '20s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Anchor size={40} className="text-amber-600 group-hover:text-amber-500 transition-colors" data-ctf-clue="Y29tcGFzcyBwb2ludHMgdG8gdGhlIHRydXRo" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-amber-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Navigate the Digital Seas
            </div>
          </div>
        </div>

        {/* Enhanced Main Sections Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Captain's Log - Interactive */}
          <Card className="bg-gradient-to-br from-amber-950/80 to-slate-800/80 border-amber-700 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl cursor-pointer">
            <div className="text-center mb-4" onClick={handleCaptainLogClick}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Scroll className="text-amber-400" size={24} />
                <h2 className="text-2xl font-serif font-bold text-amber-100">Captain's Log</h2>
              </div>
              <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
            </div>
            
            {!showCaptainLog ? (
              <div className="text-amber-200 font-serif space-y-3 text-sm leading-relaxed">
                <p className="italic">
                  "Day {logEntries[currentLogEntry].day} - {logEntries[currentLogEntry].entry}"
                </p>
                <p className="text-amber-400 font-bold text-center">
                  "Click to read more entries..."
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded border border-amber-600">
                  <div className="text-amber-300 text-xs mb-2">Day {logEntries[currentLogEntry].day}</div>
                  <p className="text-amber-200 font-serif text-sm">{logEntries[currentLogEntry].entry}</p>
                </div>
                <div className="flex justify-between">
                  <Button onClick={prevLogEntry} size="sm" className="bg-amber-800 hover:bg-amber-700 text-amber-100">
                    ← Previous
                  </Button>
                  <Button onClick={nextLogEntry} size="sm" className="bg-amber-800 hover:bg-amber-700 text-amber-100">
                    Next →
                  </Button>
                </div>
              </div>
            )}
            
            {!showCaptainLog && (
              <Button onClick={handleCaptainLogClick} className="w-full mt-4 bg-amber-800 hover:bg-amber-700 text-amber-100 font-serif">
                📜 Read All Entries
              </Button>
            )}
          </Card>

          {/* The Map - Interactive */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-amber-950/80 border-amber-700 p-6 transform -rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl cursor-pointer">
            <div className="text-center mb-4" onClick={handleMapClick}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Map className="text-amber-400" size={24} />
                <h2 className="text-2xl font-serif font-bold text-amber-100">The Map</h2>
              </div>
              <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
            </div>
            
            {!showMap ? (
              <div className="space-y-4">
                {mapLocations.map((location, index) => (
                  <div key={index} className="border-l-4 border-amber-600 pl-3 hover:bg-amber-900/20 transition-colors rounded-r">
                    <h3 className="text-amber-300 font-serif font-bold">{location.name}</h3>
                    <p className="text-amber-200 text-sm">{location.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {mapLocations.map((location, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded border transition-all cursor-pointer ${
                      selectedMapLocation === location.name 
                        ? 'bg-amber-900/50 border-amber-500' 
                        : 'bg-black/20 border-amber-700 hover:bg-amber-900/30'
                    }`}
                    onClick={() => setSelectedMapLocation(selectedMapLocation === location.name ? "" : location.name)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-amber-300 font-serif font-bold">{location.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        location.difficulty === 'Beginner' ? 'bg-green-800 text-green-200' :
                        location.difficulty === 'Intermediate' ? 'bg-yellow-800 text-yellow-200' :
                        'bg-red-800 text-red-200'
                      }`}>
                        {location.difficulty}
                      </span>
                    </div>
                    <p className="text-amber-200 text-sm">{location.description}</p>
                    {selectedMapLocation === location.name && (
                      <p className="text-amber-300 text-xs mt-2 italic">{location.details}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <Button onClick={handleMapClick} className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-amber-100 font-serif">
              🗺️ {showMap ? 'Hide Map' : 'Explore Map'}
            </Button>
          </Card>

          {/* Fight the Beast - Enhanced */}
          <Card className="bg-gradient-to-br from-red-950/80 to-slate-900/80 border-red-700 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl border-2 hover:border-red-500">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sword className="text-red-400 animate-pulse" size={24} />
                <h2 className="text-2xl font-serif font-bold text-red-200">Fight the Beast</h2>
              </div>
              <div className="w-16 h-1 bg-red-600 mx-auto"></div>
            </div>
            <div className="text-red-200 font-serif space-y-3 text-sm">
              <p className="italic text-center">
                "The Digital Kraken awaits brave souls who dare challenge its ancient wisdom..."
              </p>
              <div className="bg-black/40 p-3 rounded border border-red-700 font-mono text-xs">
                <div className="text-green-400 mb-1">
                  $ ./challenge --beast-mode
                </div>
                <div className="text-red-400">
                  [SYSTEM] Kraken awakening...
                </div>
                <div className="text-yellow-400">
                  [WARNING] Prepare for battle!
                </div>
              </div>
              <p className="text-red-300 text-center text-xs">
                "Only the worthy shall claim the treasure..."
              </p>
            </div>
            <Button 
              onClick={handleFightTheBeast}
              className="w-full mt-4 bg-red-800 hover:bg-red-700 text-red-100 font-serif transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-900/50"
            >
              ⚔️ Challenge the Kraken
            </Button>
          </Card>
        </div>

        {/* Pirate-themed Info Section */}
        <div className="bg-gradient-to-r from-amber-950/60 to-slate-800/60 border border-amber-700 rounded-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-pirate text-amber-200 mb-2">Tales of the Seven Seas</h3>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-bold text-amber-300 flex items-center gap-2">
                <Anchor className="text-amber-400" size={20} />
                The Code of the Digital Pirates
              </h4>
              <ul className="space-y-2 text-amber-200 font-serif text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  "A pirate's wit is sharper than any blade"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  "The greatest treasures are hidden in plain sight"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  "Every byte tells a story, every bit holds a secret"
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  "Trust no code that ye haven't inspected thyself"
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-bold text-amber-300 flex items-center gap-2">
                <Compass className="text-amber-400" size={20} />
                Legend of ByteXync
              </h4>
              <p className="text-amber-200 font-serif text-sm leading-relaxed">
                Long ago, the legendary pirate captain ByteXync sailed the digital oceans, 
                collecting the most precious treasures of the cyber realm. Before vanishing 
                into the ethernet mists, the captain scattered encrypted clues across the 
                seven servers, challenging future generations to prove their worth.
              </p>
              <p className="text-amber-300 font-serif text-xs italic">
                "Only those who master both sword and cipher shall claim the ultimate prize..."
              </p>
            </div>
          </div>
        </div>

        {/* Hidden CTF Elements */}
        <div className="text-center">
          <div className="text-amber-600 font-serif text-sm opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            "The wise pirate knows to inspect every plank of the ship..."
          </div>
          {/* H4sIAAAAAAAAA3N0dXVyc3J1dXZ2cnF1dQEArl4gjhIAAAA= */}
        </div>

        <footer className="text-center mt-12 text-amber-300 font-serif text-sm">
          <p>"Chart yer own course, but beware the digital depths..."</p>
          <p className="text-amber-500 text-xs mt-2">
            ByteXync CTF Bonus Challenge © 2025 - Designed by Mervin 
          </p>
        </footer>
      </div>

      {/* Atmospheric Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

      {/* Game Modals */}
      {showTicTacToe && (
        <TicTacToe onWin={handleTicTacToeWin} onClose={handleTicTacToeClose} />
      )}

      {showTreasureReveal && (
        <TreasureReveal onClose={handleTreasureRevealClose} />
      )}

      {showBrutalHunt && (
        <BrutalTreasureHunt onClose={handleBrutalHuntClose} />
      )}
    </div>
  );
};

export default Index;
