import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CrypticTerminalProps {
  unlocked: boolean;
  onSuccess: () => void;
  phase: number;
}

const kmap = [
  [115,117,109,109,111,110,32,107,114,97,107,101,110],      
  [114,101,118,101,97,108,45,107,101,121,115,116,111,110,101], 
  [105,110,118,111,107,101,32,97,110,99,105,101,110,116]  
].map(arr => arr.map(c => String.fromCharCode(c)).join(""));

const aliasMap: Record<string, string> = {
  h: 'help',
  c: 'clear',
  l: 'ls',
  ca: 'cat ancient.txt',
  ck: 'cat kraken.log',
  sK: kmap[0],
  rK: kmap[1],
  iA: kmap[2]
};

const enc = {
  a: [0x42, 0x79, 0x74, 0x65],
  b: [0x58, 0x79, 0x6e, 0x63],
  c: [0x7b, 0x48, 0x65, 0x58],
  d: [0x27, 0x64, 0x5f, 0x62],
  e: [0x59, 0x5f, 0x53, 0x6b],
  f: [0x55, 0x6c, 0x6c, 0x5f],
  g: [0x6e, 0x5f, 0x4d, 0x65],
  h: [0x52, 0x76, 0x49, 0x6e],
  i: [0x7d]
};

const fs = {
  '/': ['ancient.txt', 'kraken.log', 'rituals/'],
  '/rituals': ['chant1.txt', 'chant2.txt']
};

let cwd = '/';

const CrypticTerminal = ({ unlocked, onSuccess, phase }: CrypticTerminalProps) => {
  const [inp, setInp] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [stage, setStage] = useState(0);
  const [fail, setFail] = useState(0);
  const [displayedOut, setDisplayedOut] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unlocked && displayedOut.length === 0) {
      printOutput([
        '[SYSTEM] Terminal Online',
        '[WARNING] Authentication required',
        '',
        'Type command...'
      ]);
    }
    // eslint-disable-next-line
  }, [unlocked]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [displayedOut]);

  const printLine = (line: string) => {
    setTyping(true);
    let i = 0;
    let current = '';
    const interval = setInterval(() => {
      current += line[i];
      setDisplayedOut(prev => [...prev.slice(0, -1), current]);
      i++;
      if (i >= line.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 10);
  };

  const printOutput = (lines: string[]) => {
    let idx = 0;
    const next = () => {
      if (idx < lines.length) {
        setDisplayedOut(prev => [...prev, '']);
        printLine(lines[idx]);
        idx++;
        setTimeout(next, lines[idx - 1].length * 10 + 100);
      }
    };
    next();
  };

  const linuxLike = (cmd: string) => {
    let o: string[] = [`> ${cmd}`];
    const c = cmd.trim().toLowerCase();
    if (c === 'help' || c === 'h') {
      o.push('Available commands: help, ls, cat, clear');
    } else if (c === 'clear' || c === 'c') {
      setDisplayedOut([]);
      return;
    } else if (c === 'ls' || c === 'l') {
      o.push('drwxr-xr-x -keystone');
      o.push('-rw-r--r-- ancient.txt');
      o.push('-rw-r--r-- kraken.log');
    } else if (c.startsWith('cat')) {
      if (c.includes('ancient')) {
        o.push('you summon something, reveal what it holds and invoke what you need');
      } else if (c.includes('kraken')) {
        o.push('[LOG] Kraken initialized. Awaiting sequence.');
      } else {
        o.push('cat: file not found');
      }
    } else if (c === kmap[0]) {
      if (stage === 0) {
        o.push('[AUTH] Phase I: Stirring...');
        setStage(1);
      } else {
        o.push('[WARN] Already stirred...');
      }
    } else if (c === kmap[1]) {
      if (stage === 1) {
        o.push('[AUTH] Phase II: Keystone glowing...');
        setStage(2);
      } else {
        o.push('[ERROR] Sequence violation');
      }
    } else if (c === kmap[2]) {
      if (stage === 2) {
        o.push('[AUTH] Final chant accepted...');
        const parts = [enc.a, enc.b, enc.c, enc.d, enc.e, enc.f, enc.g, enc.h, enc.i];
        const cipher = btoa(parts.map(p => String.fromCharCode(...p)).join(''));
        o.push(`[CIPHER]: ${cipher}`);
        setTimeout(() => onSuccess(), 2000);
      } else {
        o.push('[ERROR] Ritual incomplete');
      }
    } else if (c === 'banner') {
      o.push(`
\x1b[32m
  ____  _        _   _           
 |  _ \\| |_   _ | |_| |__   ___  
 | |_) | | | | || __| '_ \\ / _ \\ 
 |  __/| | |_| || |_| | | |  __/ 
 |_|   |_|\\__,_| \\__|_| |_|\\___| 
\x1b[0m
  `);
    } else {
      o.push('command not found');
      if (fail + 1 > 15) {
        o.push('[CLUE] Try permutations and combinations of the commands to reveal the answer.');
      }
      setFail(fail + 1);
    }
    if (Math.random() < 0.05) {
      o.push('SYSTEM GLITCH: 01010111 01101000 01101111 00111111');
    }
    if (c === 'fortune') {
      o.push('You will find the answer where you least expect it...');
    }
    o.push('');
    printOutput(o); // <-- Use printOutput instead of setOut
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inp.trim()) {
      setHist(prev => [...prev, inp]);
      linuxLike(inp);
      setInp('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      setHistIdx(idx => (idx === null ? hist.length - 1 : Math.max(0, idx - 1)));
    } else if (e.key === 'ArrowDown') {
      setHistIdx(idx => (idx === null ? null : Math.min(hist.length - 1, idx + 1)));
    }
  };

  useEffect(() => {
    if (histIdx !== null && hist[histIdx]) setInp(hist[histIdx]);
  }, [histIdx]);

  if (!unlocked) {
    return (
      <Card className="p-6 bg-gradient-to-br from-gray-900/60 to-slate-800/60 border-gray-600">
        <div className="text-center text-gray-400 font-serif">
          <p>🔒 Terminal access locked</p>
          <p className="text-sm mt-2">Solve the cipher to unlock the final phase...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-black/90 border-green-600">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-mono text-green-400 mb-2">
            {'>>> CRYPTIC TERMINAL vX <<<'}
          </h3>
          <p className="text-green-600 font-mono text-sm">
            [Phase {phase}] Ritual Progress: {stage}/3
          </p>
        </div>
        <div
          ref={ref}
          className="bg-black p-4 rounded border border-green-600 h-80 overflow-y-auto font-mono text-sm"
        >
          {displayedOut.map((line, idx) => (
            <div key={idx} className="text-green-400 whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <span className="text-green-400 font-mono">root@void:~$</span>
          <input
            type="text"
            value={inp}
            onChange={e => setInp(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 font-mono outline-none border-none"
            placeholder="Enter incantation..."
            autoFocus
          />
        </form>
        <div className="text-center text-green-600 font-mono text-xs">
          <p>Unlock the final cipher. Chant the ritual phrases in order...</p>
        </div>
      </div>
    </Card>
  );
};

export default CrypticTerminal;