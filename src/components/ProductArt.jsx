import { useId } from 'react'

/* Original vector artwork for every cracker type, drawn in the site's maroon / gold / cream palette.
   Real photos can replace these at any time (see src/utils/media.js), so nothing else depends on this file. */

const TAU = Math.PI * 2
const GOLD = '#f6ce58'
const GOLD_DEEP = '#e6b72c'
const CREAM = '#fff8e8'
const RED = '#c9253a'
const MAROON = '#641527'

const PALETTES = [
  ['#f6ce58', '#ff6b6b', '#ff9f43', '#fff8e8'],
  ['#ff7ab6', '#f6ce58', '#7bdcff', '#fff8e8'],
  ['#9be564', '#f6ce58', '#ff6b6b', '#fff8e8'],
  ['#b388ff', '#f6ce58', '#ff7ab6', '#fff8e8'],
]

const STARS = [[34, 40], [92, 22], [150, 58], [250, 30], [318, 54], [366, 26], [52, 120], [352, 118], [24, 200], [376, 196], [300, 20], [120, 96]]

function Burst({ cx, cy, r = 60, n = 14, colors, w = 2.6, inner = 0.22, from = 0, to = TAU }) {
  const step = (to - from) / (to - from >= TAU - 0.01 ? n : Math.max(n - 1, 1))
  return (
    <g strokeLinecap="round">
      <circle cx={cx} cy={cy} r={r * 0.55} fill="url(#glow)" opacity=".55" />
      {Array.from({ length: n }, (_, i) => {
        const a = from + i * step
        const c = Math.cos(a), s = Math.sin(a)
        const col = colors[i % colors.length]
        return (
          <g key={i} stroke={col} strokeWidth={w}>
            <line x1={cx + c * r * inner} y1={cy + s * r * inner} x2={cx + c * r} y2={cy + s * r} />
            <circle cx={cx + c * r * 1.16} cy={cy + s * r * 1.16} r={w * 0.85} fill={col} stroke="none" />
          </g>
        )
      })}
    </g>
  )
}

function Star4({ cx, cy, s = 10, fill = GOLD, className = 'art-twinkle' }) {
  const d = `M${cx} ${cy - s}Q${cx} ${cy} ${cx + s} ${cy}Q${cx} ${cy} ${cx} ${cy + s}Q${cx} ${cy} ${cx - s} ${cy}Q${cx} ${cy} ${cx} ${cy - s}Z`
  return <path d={d} fill={fill} className={className} />
}

function Cracker({ x, y, w = 44, h = 90, color = RED, rot = 0, spark = true }) {
  const cx = x + w / 2
  return (
    <g transform={`rotate(${rot} ${cx} ${y + h})`}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={color} />
      <rect x={x} y={y + h * 0.14} width={w} height={h * 0.09} fill={GOLD} />
      <rect x={x} y={y + h * 0.77} width={w} height={h * 0.09} fill={GOLD} />
      <circle cx={cx} cy={y + h * 0.5} r={w * 0.2} fill={GOLD_DEEP} />
      <rect x={x + 5} y={y + 4} width={4} height={h - 8} rx={2} fill="#fff" opacity=".18" />
      <path d={`M${cx} ${y}q4 -14 12 -16q8 -2 12 -12`} stroke={CREAM} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {spark && <Star4 cx={cx + 24} cy={y - 32} s={8} fill="#fff" />}
    </g>
  )
}

function Tube({ x, y, w, h, color = RED, label = true }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={color} />
      <rect x={x} y={y} width={w} height={h * 0.12} rx={3} fill={GOLD_DEEP} />
      <rect x={x} y={y + h * 0.82} width={w} height={h * 0.1} fill={GOLD_DEEP} />
      {label && <circle cx={x + w / 2} cy={y + h * 0.5} r={w * 0.2} fill={GOLD} />}
      <rect x={x + 4} y={y + 6} width={3} height={h - 12} rx={1.5} fill="#fff" opacity=".2" />
    </g>
  )
}

/* ---------- one drawing per kind ---------- */
const DRAW = {
  sound: (p, v) => (
    <>
      <Cracker x={104} y={150} w={40} h={86} color={RED} rot={-10} />
      <Cracker x={170} y={110} w={52} h={126} color={v % 2 ? '#a31d3a' : RED} />
      <Cracker x={248} y={158} w={38} h={78} color={RED} rot={12} />
    </>
  ),
  atom: (p, v) => (
    <>
      <rect x={140} y={120} width={120} height={120} rx={26} fill={v % 2 ? '#a31d3a' : RED} />
      <rect x={140} y={150} width={120} height={14} fill={GOLD} />
      <rect x={140} y={202} width={120} height={14} fill={GOLD} />
      <circle cx={200} cy={183} r={26} fill={GOLD_DEEP} />
      <Star4 cx={200} cy={183} s={16} fill={MAROON} className="" />
      <path d="M200 120q6 -22 22 -26q14 -4 20 -20" stroke={CREAM} strokeWidth="3" fill="none" strokeLinecap="round" />
      <Star4 cx={246} cy={70} s={11} fill="#fff" />
    </>
  ),
  chakra: (p) => (
    <g className="art-spin" style={{ transformOrigin: '200px 160px' }}>
      <circle cx={200} cy={160} r={88} fill="url(#glow)" opacity=".5" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} transform={`rotate(${i * 60} 200 160)`} d="M200 160C218 128 262 118 286 138C262 128 232 140 212 168Z" fill={p[i % 3]} />
      ))}
      <circle cx={200} cy={160} r={86} fill="none" stroke={GOLD} strokeWidth="3" strokeDasharray="4 9" strokeLinecap="round" />
      <circle cx={200} cy={160} r={18} fill={MAROON} stroke={GOLD} strokeWidth="4" />
      <circle cx={200} cy={160} r={6} fill={CREAM} />
    </g>
  ),
  flowerpot: (p, v) => (
    <>
      {Array.from({ length: 11 }, (_, i) => {
        const k = i - 5
        const col = p[i % 4]
        return (
          <g key={i}>
            <path d={`M200 178Q${200 + k * 20} ${178 - 120 + Math.abs(k) * 10} ${200 + k * 34} ${178 - 56 + Math.abs(k) * 12}`} stroke={col} strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx={200 + k * 34} cy={178 - 56 + Math.abs(k) * 12} r="3.6" fill={col} className="art-twinkle" />
          </g>
        )
      })}
      <polygon points="150,236 250,236 236,184 164,184" fill={v % 2 ? '#a31d3a' : RED} />
      <rect x={158} y={176} width={84} height={14} rx={4} fill={GOLD_DEEP} />
      <rect x={172} y={206} width={56} height={8} fill={GOLD} opacity=".9" />
    </>
  ),
  pencil: (p) => (
    <>
      {[[-14, 130, 0], [0, 200, 1], [14, 270, 2]].map(([rot, x, i]) => (
        <g key={x} transform={`rotate(${rot} ${x} 250)`}>
          <rect x={x - 15} y={130} width={30} height={118} rx={4} fill={p[i]} />
          <rect x={x - 15} y={130} width={30} height={10} fill={GOLD_DEEP} />
          <rect x={x - 15} y={226} width={30} height={22} fill={MAROON} />
          <rect x={x - 11} y={146} width={3.5} height={72} rx={2} fill="#fff" opacity=".28" />
          <polygon points={`${x - 15},130 ${x + 15},130 ${x},96`} fill={CREAM} />
          <polygon points={`${x - 6},112 ${x + 6},112 ${x},96`} fill={RED} />
          <Burst cx={x} cy={80} r={26} n={10} colors={[p[i], p[3], GOLD]} w={2.2} />
        </g>
      ))}
    </>
  ),
  star: (p, v) => (
    <>
      <circle cx={200} cy={110} r={92} fill="url(#glow)" opacity=".6" />
      <Star4 cx={200} cy={110} s={66} fill={GOLD} />
      <Star4 cx={120} cy={82} s={24} fill="#fff" />
      <Star4 cx={290} cy={74} s={28} fill={p[1]} />
      <Star4 cx={268} cy={156} s={18} fill={p[2]} />
      <Star4 cx={134} cy={160} s={16} fill={GOLD} />
      <Star4 cx={200} cy={34} s={14} fill="#fff" />
      <Tube x={176} y={188} w={48} h={70} color={v % 2 ? '#a31d3a' : RED} />
    </>
  ),
  electric: (p) => (
    <>
      <rect x={100} y={150} width={200} height={92} rx={14} fill={RED} />
      {[130, 170, 210, 250].map((x) => <rect key={x} x={x} y={150} width={10} height={92} fill={MAROON} opacity=".35" />)}
      <rect x={100} y={150} width={200} height={14} rx={7} fill={GOLD_DEEP} />
      <rect x={100} y={228} width={200} height={14} rx={7} fill={GOLD_DEEP} />
      <circle cx={200} cy={196} r={32} fill={GOLD} />
      <path d="M208 172L186 200h14l-8 24 26-32h-15z" fill={MAROON} />
      <Burst cx={118} cy={118} r={30} n={9} colors={[GOLD, '#fff']} w={2} />
      <Burst cx={282} cy={118} r={30} n={9} colors={[GOLD, '#fff']} w={2} />
    </>
  ),
  string: (p) => {
    const pts = Array.from({ length: 9 }, (_, i) => {
      const t = 0.07 + i * 0.1075
      const x = (1 - t) ** 2 * 54 + 2 * (1 - t) * t * 200 + t ** 2 * 346
      const y = (1 - t) ** 2 * 60 + 2 * (1 - t) * t * 210 + t ** 2 * 60
      return [x, y]
    })
    return (
      <>
        <path d="M54 60Q200 210 346 60" stroke={CREAM} strokeWidth="3" fill="none" strokeLinecap="round" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 9} y={y} width={18} height={50} rx={5} fill={i % 3 === 1 ? '#a31d3a' : RED} />
            <rect x={x - 9} y={y + 8} width={18} height={6} fill={GOLD} />
            <rect x={x - 9} y={y + 36} width={18} height={6} fill={GOLD} />
          </g>
        ))}
        <Star4 cx={200} cy={236} s={14} fill={GOLD} />
        <Star4 cx={140} cy={246} s={9} fill="#fff" />
        <Star4 cx={262} cy={246} s={9} fill="#fff" />
      </>
    )
  },
  rocket: (p, v) => (
    <>
      <Burst cx={300} cy={74} r={52} n={16} colors={[p[0], p[1], p[2], p[3]]} />
      <g transform="rotate(38 200 170)">
        <rect x={197} y={150} width={6} height={130} fill="#d9b779" />
        <path d="M200 262q-16 26 0 50q16 -24 0 -50z" fill={GOLD} opacity=".9" />
        <rect x={181} y={92} width={38} height={78} rx={6} fill={v % 2 ? '#a31d3a' : RED} />
        <polygon points="181,92 219,92 200,46" fill={GOLD_DEEP} />
        <polygon points="181,170 181,144 160,180" fill={MAROON} />
        <polygon points="219,170 219,144 240,180" fill={MAROON} />
        <rect x={181} y={112} width={38} height={9} fill={GOLD} />
        <rect x={181} y={146} width={38} height={9} fill={GOLD} />
      </g>
    </>
  ),
  sizzling: (p) => (
    <>
      <Burst cx={200} cy={206} r={130} n={26} colors={[GOLD, '#fff', p[2]]} w={2.2} inner={0.12} from={Math.PI * 1.08} to={Math.PI * 1.92} />
      <Burst cx={200} cy={206} r={84} n={16} colors={[p[1], GOLD]} w={2.4} inner={0.1} from={Math.PI * 1.1} to={Math.PI * 1.9} />
      <rect x={160} y={206} width={80} height={54} rx={8} fill={RED} />
      <rect x={160} y={206} width={80} height={10} rx={4} fill={GOLD_DEEP} />
      <circle cx={200} cy={236} r={11} fill={GOLD} />
    </>
  ),
  singleshot: (p) => (
    <>
      <Burst cx={200} cy={92} r={76} n={20} colors={[p[0], p[1], p[2], p[3]]} w={3} />
      <Star4 cx={200} cy={92} s={16} fill="#fff" />
      <Tube x={178} y={186} w={44} h={74} />
    </>
  ),
  multishot: (p) => (
    <>
      <Burst cx={128} cy={112} r={50} n={14} colors={[p[1], p[0], p[3]]} />
      <Burst cx={200} cy={64} r={58} n={18} colors={[p[0], p[2], p[1], p[3]]} w={3} />
      <Burst cx={274} cy={116} r={50} n={14} colors={[p[2], p[3], p[0]]} />
      <rect x={120} y={196} width={160} height={64} rx={8} fill={RED} />
      <rect x={120} y={196} width={160} height={10} rx={5} fill={GOLD_DEEP} />
      {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={146 + i * 27} cy={232} r={9} fill={GOLD} opacity={0.9} />)}
    </>
  ),
  rangoli: (p) => (
    <g className="art-spin" style={{ transformOrigin: '200px 156px' }}>
      <circle cx={200} cy={156} r={100} fill="url(#glow)" opacity=".5" />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx={200} cy={92} rx={15} ry={34} fill={p[i % 3]} transform={`rotate(${i * 30} 200 156)`} opacity=".95" />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={200} cy={46} r={5} fill={GOLD} transform={`rotate(${i * 30 + 15} 200 156)`} />
      ))}
      <circle cx={200} cy={156} r={38} fill={MAROON} stroke={GOLD} strokeWidth="4" />
      <Star4 cx={200} cy={156} s={26} fill={GOLD} className="" />
    </g>
  ),
  gift: (p, v) => {
    const k = 0.8 + 0.14 * Math.min(v, 3)
    return (
      <>
        <g transform={`translate(200 258) scale(${k}) translate(-200 -258)`}>
          <Burst cx={200} cy={68} r={46 + v * 6} n={12 + v * 5} colors={[p[0], p[1], p[2], p[3]]} w={2.4} />
          <rect x={116} y={150} width={168} height={108} rx={8} fill={RED} />
          <rect x={116} y={128} width={168} height={32} rx={8} fill="#a31d3a" />
          <rect x={188} y={128} width={24} height={130} fill={GOLD} />
          <rect x={116} y={186} width={168} height={18} fill={GOLD} opacity=".35" />
          <path d="M200 128C176 92 140 110 160 130Z" fill={GOLD_DEEP} />
          <path d="M200 128C224 92 260 110 240 130Z" fill={GOLD_DEEP} />
          <circle cx={200} cy={128} r={11} fill={GOLD} />
          <Star4 cx={140} cy={226} s={10} fill={GOLD} />
          <Star4 cx={258} cy={178} s={8} fill={GOLD} />
        </g>
        {v > 0 && <rect x={66} y={236} width={50} height={26} rx={5} fill="#a31d3a" stroke={GOLD} strokeWidth="2" />}
        {v > 1 && <rect x={290} y={228} width={44} height={34} rx={5} fill={RED} stroke={GOLD} strokeWidth="2" />}
      </>
    )
  },
  matches: (p) => (
    <>
      {Array.from({ length: 7 }, (_, i) => {
        const rot = -36 + i * 12
        return (
          <g key={i} transform={`rotate(${rot} 200 244)`}>
            <rect x={197} y={104} width={6} height={140} rx={2} fill="#e9c88f" />
            <circle cx={200} cy={102} r={10} fill={p[i % 3]} />
            <circle cx={200} cy={102} r={18} fill="url(#glow)" opacity=".7" />
          </g>
        )
      })}
      <rect x={146} y={226} width={108} height={36} rx={6} fill={RED} />
      <rect x={146} y={236} width={108} height={8} fill={GOLD} />
    </>
  ),
  sparkler: (p) => (
    <>
      {Array.from({ length: 5 }, (_, i) => {
        const rot = -28 + i * 14
        return (
          <g key={i} transform={`rotate(${rot} 200 262)`}>
            <rect x={198} y={92} width={4} height={170} fill="#b9a27a" />
            <rect x={196} y={92} width={8} height={72} fill="#555" opacity=".55" />
            <Burst cx={200} cy={82} r={28} n={11} colors={[GOLD, '#fff', p[1]]} w={2} />
          </g>
        )
      })}
      <Star4 cx={92} cy={150} s={10} fill="#fff" />
      <Star4 cx={316} cy={140} s={12} fill={GOLD} />
    </>
  ),
  fancy: (p) => (
    <>
      <Burst cx={150} cy={96} r={50} n={14} colors={[p[1], p[0], p[3]]} />
      <Burst cx={250} cy={84} r={56} n={16} colors={[p[0], p[2], p[1]]} w={3} />
      <rect x={128} y={184} width={144} height={78} rx={8} fill="#a31d3a" />
      <rect x={136} y={192} width={128} height={62} rx={5} fill="none" stroke={GOLD} strokeWidth="2.4" />
      <circle cx={200} cy={223} r={20} fill={GOLD_DEEP} />
      <Star4 cx={200} cy={223} s={14} fill={MAROON} className="" />
    </>
  ),
  newfancy: (p) => (
    <>
      <g className="art-spin" style={{ transformOrigin: '200px 160px' }}>
        <circle cx={200} cy={160} r={100} fill="url(#glow)" opacity=".5" />
        {Array.from({ length: 8 }, (_, i) => {
          const a1 = (i / 8) * TAU, a2 = ((i + 1) / 8) * TAU
          const d = `M200 160L${200 + 78 * Math.cos(a1)} ${160 + 78 * Math.sin(a1)}A78 78 0 0 1 ${200 + 78 * Math.cos(a2)} ${160 + 78 * Math.sin(a2)}Z`
          return <path key={i} d={d} fill={[RED, GOLD, p[1], p[2]][i % 4]} />
        })}
        <circle cx={200} cy={160} r={78} fill="none" stroke={CREAM} strokeWidth="3" />
        <circle cx={200} cy={160} r={16} fill={MAROON} stroke={GOLD} strokeWidth="4" />
      </g>
      <Burst cx={200} cy={160} r={118} n={24} colors={[GOLD, '#fff']} w={1.8} inner={0.78} />
      <rect x={58} y={40} width={64} height={26} rx={13} fill={GOLD} />
      <text x={90} y={58} textAnchor="middle" fontSize="15" fontWeight="800" fill={MAROON}>NEW</text>
    </>
  ),
}

/* ---------- scenes used by the gallery ---------- */
const SCENES = {
  'sky-bursts': (p) => (
    <>
      <Burst cx={110} cy={110} r={64} n={20} colors={[p[0], p[1], '#fff']} w={3} />
      <Burst cx={250} cy={86} r={78} n={24} colors={[p[2], p[0], p[3]]} w={3} />
      <Burst cx={330} cy={190} r={46} n={16} colors={[p[1], p[0]]} />
      <path d="M0 300V248Q60 226 120 248T240 244T400 252V300Z" fill="#1a0108" />
    </>
  ),
  diyas: (p) => (
    <>
      {[110, 200, 290].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 36} 232Q${x} 272 ${x + 36} 232Z`} fill={i === 1 ? GOLD_DEEP : '#b8741a'} />
          <path d={`M${x} 228C${x - 14} 204 ${x - 4} 190 ${x} 176C${x + 4} 190 ${x + 14} 204 ${x} 228Z`} fill={GOLD} className="art-twinkle" />
          <circle cx={x} cy={206} r={34} fill="url(#glow)" opacity=".6" />
        </g>
      ))}
      <Star4 cx={150} cy={70} s={12} fill="#fff" />
      <Star4 cx={260} cy={56} s={16} fill={GOLD} />
    </>
  ),
  'night-sparklers': (p) => DRAW.sparkler(p, 0),
}

export const SCENE_KEYS = Object.keys(SCENES)

export default function ProductArt({ kind = 'sound', variant = 0, scene, label, className = '' }) {
  const id = useId().replace(/:/g, '')
  const pal = PALETTES[variant % PALETTES.length]
  const draw = scene ? SCENES[scene] : DRAW[kind] ?? DRAW.sound
  return (
    <svg
      className={`art ${className}`}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <radialGradient id={`bg${id}`} cx="50%" cy="46%" r="75%">
          <stop offset="0" stopColor="#7d1b3a" />
          <stop offset=".6" stopColor="#4a0a1c" />
          <stop offset="1" stopColor="#240006" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#bg${id})`} />
      {STARS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 1.4 : 2} fill={CREAM} opacity={0.5} className="art-twinkle" style={{ animationDelay: `${(i % 5) * 0.25}s` }} />)}
      <ellipse cx="200" cy="268" rx="130" ry="10" fill="#000" opacity=".35" />
      <ellipse cx="200" cy="262" rx="150" ry="22" fill={GOLD} opacity=".07" />
      {draw(pal, variant)}
    </svg>
  )
}

/* Shared gradient referenced by every illustration. Render once near the app root. */
export function ArtDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffd45a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
