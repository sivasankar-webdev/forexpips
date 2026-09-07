// Generates branded SVG candlestick diagrams for blog content.
// Palette matches tailwind.config.ts: ink #101823, paper #F5F4F0, gold #B9862F, gain #2F6F4E, loss #A83232
import fs from "fs";
import path from "path";

const C = {
  ink: "#101823",
  paper: "#F5F4F0",
  gold: "#B9862F",
  slate: "#7A8896",
  gain: "#3F8F63",
  loss: "#C24545",
};

function makeScale(baseline, scale) {
  return (price) => baseline - price * scale;
}

function drawCandles(candles, toY, startX, step, bodyW) {
  let x = startX;
  const out = candles.map(({ o, h, l, c }) => {
    const up = c > o;
    const color = up ? C.gain : C.loss;
    const yO = toY(o), yC = toY(c), yH = toY(h), yL = toY(l);
    const top = Math.min(yO, yC);
    const bh = Math.max(Math.abs(yC - yO), 2);
    const el = `
      <line x1="${x + bodyW / 2}" y1="${yH}" x2="${x + bodyW / 2}" y2="${yL}" stroke="${color}" stroke-width="2"/>
      <rect x="${x}" y="${top}" width="${bodyW}" height="${bh}" fill="${color}"/>
    `;
    x += step;
    return el;
  }).join("");
  return { markup: out, endX: x };
}

function svgWrap(width, height, inner) {
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Sans, system-ui, sans-serif">
  <rect width="${width}" height="${height}" fill="${C.ink}"/>
  ${inner}
</svg>`;
}

function orderBlockHero() {
  const W = 1200, H = 400;
  const toY = makeScale(340, 6);

  let price = 40;
  const down = [];
  for (let i = 0; i < 9; i++) {
    const o = price;
    const c = price - (3 + Math.random() * 2);
    down.push({ o, c, h: o + 1.5, l: c - 1.5 });
    price = c;
  }
  const obCandle = { o: price, c: price - 3, h: price + 1.5, l: price - 4.5 };
  price = obCandle.c;

  const up = [];
  for (let i = 0; i < 9; i++) {
    const o = price;
    const c = price + (4 + Math.random() * 2.5);
    up.push({ o, c, h: c + 1.5, l: o - 1.5 });
    price = c;
  }

  const allBefore = [...down, obCandle];
  const { markup: m1, endX } = drawCandles(allBefore, toY, 60, 34, 18);
  const { markup: m2 } = drawCandles(up, toY, endX, 34, 18);

  const obX = 60 + 9 * 34;
  const obTop = toY(obCandle.h) - 6;
  const obH = toY(obCandle.l) - toY(obCandle.h) + 12;

  return svgWrap(W, H, `
    ${m1}${m2}
    <rect x="${obX - 6}" y="${obTop}" width="30" height="${obH}" fill="${C.gold}" fill-opacity="0.15" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="4 3"/>
    <text x="${obX - 30}" y="${obTop + obH + 24}" fill="${C.gold}" font-size="16">Order block</text>
    <path d="M ${obX + 40} ${toY(obCandle.c) - 10} L ${endX - 20} ${toY(up[7].c) + 10}" stroke="${C.paper}" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.55" fill="none" marker-end="url(#arrow)"/>
    <text x="${endX - 140}" y="${toY(up[6].c) - 20}" fill="${C.paper}" font-size="15" opacity="0.8">Displacement</text>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="${C.paper}" opacity="0.55"/>
      </marker>
    </defs>
  `);
}

function marketStructureDiagram() {
  const W = 1000, H = 500;
  const pts = [
    [60, 380, null], [160, 240, "HL"], [260, 300, null], [360, 140, "HH"],
    [440, 210, "HL"], [520, 80, "HH"], [600, 170, "HL"],
    [700, 340, "BOS"], [800, 380, null], [900, 330, null],
  ];
  const line = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const dots = pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${C.gold}"/>`).join("");
  const labels = pts
    .filter(([, , l]) => l)
    .map(([x, y, l]) => {
      const isBos = l === "BOS";
      const color = isBos ? C.loss : C.paper;
      const text = isBos ? "BOS \u2193 (change of character)" : l;
      const dx = isBos ? -70 : -12;
      return `<text x="${x + dx}" y="${y - 16}" fill="${color}" font-size="15" font-weight="600">${text}</text>`;
    })
    .join("");

  return svgWrap(W, H, `
    <line x1="600" y1="170" x2="940" y2="170" stroke="${C.slate}" stroke-width="1.5" stroke-dasharray="5 4"/>
    <text x="700" y="160" fill="${C.slate}" font-size="13">Last higher low \u2014 the level that breaks</text>
    <path d="${line}" fill="none" stroke="${C.paper}" stroke-width="2.5" opacity="0.9"/>
    ${dots}
    ${labels}
  `);
}

function xauusdHero() {
  const W = 1200, H = 420;
  const PAD_TOP = 50, PAD_BOTTOM = 40;

  let price = 10;
  const rawCandles = [];
  const drift = [1,1,1,-1,1,1,-1,1,1,-1,1,-1,1,1,-1,1,1,-1,1,1,-1,1,1,-1,1,1,-1,1,1,-1];
  for (const d of drift) {
    const o = price;
    const move = (2 + Math.random() * 5) * d;
    const c = price + move;
    const h = Math.max(o, c) + 1 + Math.random();
    const l = Math.min(o, c) - 1 - Math.random();
    rawCandles.push({ o, h, l, c });
    price = c;
  }

  const minPrice = Math.min(...rawCandles.map((c) => c.l));
  const maxPrice = Math.max(...rawCandles.map((c) => c.h));
  const drawableH = H - PAD_TOP - PAD_BOTTOM;
  const scale = drawableH / (maxPrice - minPrice);
  const toY = (p) => H - PAD_BOTTOM - (p - minPrice) * scale;

  const { markup } = drawCandles(rawCandles, toY, 40, 27, 16);

  const rangeTopY = toY(maxPrice);
  const rangeBotY = toY(minPrice);
  const midY = (rangeTopY + rangeBotY) / 2;

  return svgWrap(W, H, `
    <rect x="0" y="${rangeTopY}" width="${W}" height="${midY - rangeTopY}" fill="${C.loss}" fill-opacity="0.06"/>
    <rect x="0" y="${midY}" width="${W}" height="${rangeBotY - midY}" fill="${C.gain}" fill-opacity="0.06"/>
    <line x1="0" y1="${midY}" x2="${W}" y2="${midY}" stroke="${C.paper}" stroke-opacity="0.3" stroke-dasharray="4 4"/>
    <text x="${W - 110}" y="${rangeTopY + 22}" fill="${C.loss}" font-size="14" opacity="0.9">Premium</text>
    <text x="${W - 110}" y="${rangeBotY - 10}" fill="${C.gain}" font-size="14" opacity="0.9">Discount</text>
    <line x1="0" y1="${rangeTopY + 4}" x2="${W}" y2="${rangeTopY + 4}" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="20" y="${rangeTopY - 8 > 14 ? rangeTopY - 8 : 18}" fill="${C.gold}" font-size="13">Buy-side liquidity</text>
    ${markup}
  `);
}

const out = path.join(process.cwd(), "public", "images");
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "order-block-hero.svg"), orderBlockHero());
fs.writeFileSync(path.join(out, "market-structure-bos.svg"), marketStructureDiagram());
fs.writeFileSync(path.join(out, "xauusd-weekly-hero.svg"), xauusdHero());

console.log("Generated 3 SVG diagrams in public/images/");

// ---------- 4. Default OG/social card (1200x630) ----------
function ogDefault() {
  const W = 1200, H = 630;
  return svgWrap(W, H, `
    <line x1="80" y1="500" x2="1120" y2="500" stroke="${C.gold}" stroke-width="2"/>
    <text x="80" y="220" fill="${C.paper}" font-size="64" font-weight="600">Pip &amp; Structure</text>
    <text x="80" y="280" fill="${C.slate}" font-size="26">Forex analysis built on market structure</text>
    <text x="80" y="460" fill="${C.gold}" font-size="20" letter-spacing="1">XAU/USD &#183; EUR/USD &#183; GBP/USD &#183; ICT/SMC</text>
  `);
}
fs.writeFileSync(path.join(out, "og-default.svg"), ogDefault());
console.log("Generated og-default.svg");
