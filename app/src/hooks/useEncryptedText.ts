import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$';

export function scramble(target: string, revealed: number): string {
  let out = '';
  for (let i = 0; i < target.length; i++) {
    if (i < revealed) out += target[i];
    else if (target[i] === ' ') out += ' ';
    else out += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return out;
}

export function useEncryptedText(target: string, opts: { speed?: number } = {}): string {
  const speed = opts.speed ?? 45;
  const [revealed, setRevealed] = useState(0);
  const [text, setText] = useState(() => scramble(target, 0));

  useEffect(() => {
    setRevealed(0);
    setText(scramble(target, 0));
  }, [target]);

  useEffect(() => {
    if (revealed >= target.length) {
      setText(target);
      return;
    }
    const id = setInterval(() => {
      setRevealed((r) => {
        const next = Math.min(r + 1, target.length);
        setText(scramble(target, next));
        return next;
      });
    }, speed);
    return () => clearInterval(id);
  }, [revealed, target, speed]);

  return text;
}
