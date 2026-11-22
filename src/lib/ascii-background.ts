import { createHash } from 'node:crypto';

const glyphs = ' .:-=+*#%@';

export function asciiBackgroundScene(title: string) {
  const seed = createHash('sha256').update(title.trim().normalize('NFC')).digest();
  const tone = seed[0] % 2 === 0 ? 'primary' : 'secondary';

  // Sample a circle and a triangle on the text grid using the title as the seed.
  const circleX = 20 + seed[1] % 15;
  const circleY = 13 + seed[2] % 8;
  const radius = 9 + seed[3] % 6;
  const triangleX = 35 + seed[4] % 12;
  const tilt = (seed[5] % 31 - 15) * Math.PI / 90;
  const cosine = Math.cos(tilt);
  const sine = Math.sin(tilt);

  const text = Array.from({ length: 18 }, (_, row) =>
    Array.from({ length: 60 }, (_, column) => {
      const y = row * 1.8;
      const ring = Math.abs(Math.hypot(column - circleX, y - circleY) - radius);
      const dx = column - triangleX;
      const dy = y - 16;
      const tx = dx * cosine - dy * sine;
      const ty = dx * sine + dy * cosine;
      const triangle = Math.max(ty - 9, Math.abs(tx) * 1.65 - ty - 12);
      const coverage = Math.max(0, 1 - ring / 2.7, 1 - Math.abs(triangle) / 3.6);
      return glyphs[Math.round(coverage * (glyphs.length - 1))];
    }).join('')
  ).join('\n');

  return { tone, text };
}
