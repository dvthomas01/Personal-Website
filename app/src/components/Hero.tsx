import type { ReactNode } from 'react';
import { useEncryptedText } from '../hooks/useEncryptedText';
import damiGrad from '../assets/profile/dami-grad.jpg';

const SEGMENTS = [
  { text: 'Hello, I build ' },
  { text: 'machines', className: 'font-bold' },
  { text: ' and the ' },
  { text: 'software', className: 'italic' },
  { text: ' that drives them.' },
] as const;

const FULL_TEXT = SEGMENTS.map((s) => s.text).join('');

export function Hero() {
  const text = useEncryptedText(FULL_TEXT, { speed: 25 });

  const parts = SEGMENTS.reduce<{ offset: number; nodes: ReactNode[] }>(
    (acc, segment, i) => {
      const slice = text.slice(acc.offset, acc.offset + segment.text.length);
      acc.nodes.push(
        <span key={i} className={'className' in segment ? segment.className : undefined}>
          {slice}
        </span>,
      );
      return { offset: acc.offset + segment.text.length, nodes: acc.nodes };
    },
    { offset: 0, nodes: [] },
  ).nodes;

  return (
    <section className="grid gap-4 md:grid-cols-[3fr_2fr]">
      <div className="bento flex items-center">
        <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">{parts}</h1>
      </div>
      <div className="bento overflow-hidden p-0">
        <img
          src={damiGrad}
          alt="Dami Thomas at MIT"
          className="h-full max-h-96 w-full object-cover object-[50%_32%] transition-[filter] dark:brightness-90"
          loading="eager"
        />
      </div>
    </section>
  );
}
