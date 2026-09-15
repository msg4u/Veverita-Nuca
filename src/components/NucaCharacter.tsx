import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEffects';

export interface NucaCharacterProps {
  pose?: 'happy' | 'swimming' | 'collecting' | 'sleeping' | 'pointing' | 'badge';
  size?: number;
  className?: string;
  animate?: boolean;
  interactive?: boolean;
}

export const NucaCharacter: React.FC<NucaCharacterProps> = ({
  pose = 'happy',
  size = 120,
  className = '',
  animate = true,
  interactive = true,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!interactive) return;
    e.stopPropagation();
    soundEngine.playSquirrelChirp();
    setIsBouncing(true);
    setShowHeart(true);
    setTimeout(() => setIsBouncing(false), 600);
    setTimeout(() => setShowHeart(false), 1200);
  };

  const isWiggling = animate && pose !== 'sleeping' && !isBouncing;

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block select-none transition-transform duration-300 ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${isBouncing ? 'animate-bounce' : isWiggling ? 'animate-wiggle' : ''} ${className}`}
      style={{ width: size, height: size }}
      title={interactive ? 'Apasă pe Nuca pentru o surpriză veselă!' : 'Veverița Nuca'}
    >
      {/* Floating Heart/Sparkle on click */}
      {showHeart && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center gap-1 animate-ping">
          <span className="text-xl">🌰</span>
          <span className="text-base">💖</span>
        </div>
      )}

      <svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-md"
      >
        <defs>
          {/* Rich warm gradients for fur */}
          <linearGradient id="nucaFur" x1="20" y1="20" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="45%" stopColor="#F97316" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          <linearGradient id="nucaBelly" x1="50" y1="65" x2="90" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="60%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          <linearGradient id="nucaTailHighlight" x1="70" y1="10" x2="135" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="40%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="nucaAcornBody" x1="0" y1="0" x2="20" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="gogglesLens" x1="0" y1="0" x2="15" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* ==================== TAIL ==================== */}
        {pose !== 'sleeping' ? (
          <g>
            {/* Main fluffy cloud-tail */}
            <path
              d="M85 102 C115 100 138 82 135 48 C132 20 102 8 86 18 C72 26 82 45 92 48 C108 52 115 72 102 88 C94 98 84 100 85 102 Z"
              fill="url(#nucaTailHighlight)"
              stroke="#9A3412"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Tail inner fluff locks */}
            <path
              d="M95 24 C108 28 122 42 118 60 C114 74 102 80 94 76"
              stroke="#FFFBEB"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M102 32 C112 36 122 46 120 58"
              stroke="#FED7AA"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Fluffy tufts on tail edge */}
            <path d="M128 35 C132 38 134 44 130 46" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            <path d="M132 50 C136 53 137 60 131 63" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          /* Cozy curled tail acting as a warm duvet / sleeping bag */
          <g>
            <path
              d="M32 98 C12 88 6 52 35 38 C70 24 125 40 120 95 C115 125 45 125 32 98 Z"
              fill="url(#nucaTailHighlight)"
              stroke="#9A3412"
              strokeWidth="3.5"
            />
            <path
              d="M38 52 C65 38 108 50 106 90 C104 110 55 112 40 96"
              stroke="#FFFBEB"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        )}

        {/* ==================== BODY ==================== */}
        {/* Chubby round squirrel body */}
        <ellipse
          cx="70"
          cy="88"
          rx="28"
          ry="30"
          fill="url(#nucaFur)"
          stroke="#9A3412"
          strokeWidth="3"
        />

        {/* Soft Creamy Belly */}
        <ellipse
          cx="70"
          cy="92"
          rx="18"
          ry="20"
          fill="url(#nucaBelly)"
        />

        {/* Chubby little feet / paws */}
        <g>
          <ellipse cx="52" cy="114" rx="9" ry="6" fill="#EA580C" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="48" cy="115" r="1.5" fill="#9A3412" />
          <circle cx="52" cy="116" r="1.5" fill="#9A3412" />
          <circle cx="56" cy="115" r="1.5" fill="#9A3412" />

          <ellipse cx="88" cy="114" rx="9" ry="6" fill="#EA580C" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="84" cy="115" r="1.5" fill="#9A3412" />
          <circle cx="88" cy="116" r="1.5" fill="#9A3412" />
          <circle cx="92" cy="115" r="1.5" fill="#9A3412" />
        </g>

        {/* ==================== HEAD ==================== */}
        {/* Head base */}
        <circle
          cx="70"
          cy="56"
          r="26"
          fill="url(#nucaFur)"
          stroke="#9A3412"
          strokeWidth="3"
        />

        {/* Large Fluffy Squirrel Ears with Tufted Tips */}
        {/* Left Ear */}
        <g>
          <path
            d="M51 40 C48 20 40 18 44 34 C45 40 50 43 51 40 Z"
            fill="#EA580C"
            stroke="#9A3412"
            strokeWidth="2.5"
          />
          {/* Inner pinkish cream ear */}
          <path d="M48 30 C47 24 43 23 45 32" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
          {/* Whimsical fluffy ear tuft */}
          <path d="M42 18 C39 12 36 14 38 20" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M43 17 C42 11 46 12 45 19" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Right Ear */}
        <g>
          <path
            d="M89 40 C92 20 100 18 96 34 C95 40 90 43 89 40 Z"
            fill="#EA580C"
            stroke="#9A3412"
            strokeWidth="2.5"
          />
          {/* Inner pinkish cream ear */}
          <path d="M92 30 C93 24 97 23 95 32" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />
          {/* Whimsical fluffy ear tuft */}
          <path d="M98 18 C101 12 104 14 102 20" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M97 17 C98 11 94 12 95 19" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Chubby Cheeks (Bujori pufoși de veveriță) */}
        {/* Expanded cheek puff */}
        <circle cx="51" cy="65" r={pose === 'collecting' ? 14 : 12} fill="#FDBA74" opacity="0.95" />
        <circle cx="89" cy="65" r={pose === 'collecting' ? 14 : 12} fill="#FDBA74" opacity="0.95" />

        {/* Rosy Strawberry Blush */}
        <circle cx="49" cy="66" r="5.5" fill="#FB7185" opacity="0.45" />
        <circle cx="91" cy="66" r="5.5" fill="#FB7185" opacity="0.45" />

        {/* Cute little freckles (3 on each cheek) */}
        <g fill="#9A3412" opacity="0.65">
          <circle cx="46" cy="64" r="0.8" />
          <circle cx="49" cy="63" r="0.8" />
          <circle cx="47" cy="67" r="0.8" />

          <circle cx="94" cy="64" r="0.8" />
          <circle cx="91" cy="63" r="0.8" />
          <circle cx="93" cy="67" r="0.8" />
        </g>

        {/* Muzzle / Snout cream spot */}
        <ellipse cx="70" cy="64" rx="8" ry="6" fill="#FFFBEB" />

        {/* Sweet Button Nose */}
        <path
          d="M68 61 C68 59.5 72 59.5 72 61 C72 63 70 64 68 61 Z"
          fill="#78350F"
        />

        {/* Whiskers (Delicate cute curls) */}
        <g stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
          <path d="M42 62 L48 64" />
          <path d="M41 66 L48 66" />
          <path d="M98 62 L92 64" />
          <path d="M99 66 L92 66" />
        </g>

        {/* ==================== EYES & EXPRESSIONS ==================== */}
        {pose === 'sleeping' ? (
          /* Sleeping peaceful curved eyelashes */
          <g stroke="#451A03" strokeWidth="2.8" strokeLinecap="round">
            <path d="M54 57 Q60 63 65 57" />
            <path d="M75 57 Q80 63 86 57" />
            {/* Cute sleeping lashes */}
            <path d="M57 61 L55 64" strokeWidth="1.8" />
            <path d="M62 61 L63 64" strokeWidth="1.8" />
            <path d="M78 61 L77 64" strokeWidth="1.8" />
            <path d="M83 61 L85 64" strokeWidth="1.8" />
          </g>
        ) : pose === 'badge' ? (
          /* Proud mischievous wink: left eye open wide, right eye winking */
          <g>
            {/* Left Eye (Sparkling wide) */}
            <ellipse cx="58" cy="54" rx="6" ry="6.5" fill="#1E293B" />
            <circle cx="56" cy="52" r="2.4" fill="white" />
            <circle cx="60.5" cy="56.5" r="1.1" fill="white" />
            <path d="M54 48 Q58 45 63 47" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

            {/* Right Eye (Playful Wink) */}
            <path d="M76 55 Q82 50 88 56" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M86 54 L89 52" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M77 48 Q82 45 87 47" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ) : (
          /* Big lively anime/storybook eyes with double reflections */
          <g>
            {/* Eyebrows */}
            <path d="M54 47 Q59 44 64 47" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            <path d="M76 47 Q81 44 86 47" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

            {/* Left Eye */}
            <ellipse cx="58" cy="54" rx="6.5" ry="7" fill="#1E293B" />
            <ellipse cx="58" cy="54.5" rx="5.8" ry="6" fill="#312E81" />
            {/* Large catchlight */}
            <circle cx="56" cy="51.5" r="2.6" fill="white" />
            {/* Secondary cute catchlight */}
            <circle cx="60.5" cy="56.5" r="1.2" fill="white" />

            {/* Right Eye */}
            <ellipse cx="82" cy="54" rx="6.5" ry="7" fill="#1E293B" />
            <ellipse cx="82" cy="54.5" rx="5.8" ry="6" fill="#312E81" />
            {/* Large catchlight */}
            <circle cx="80" cy="51.5" r="2.6" fill="white" />
            {/* Secondary cute catchlight */}
            <circle cx="84.5" cy="56.5" r="1.2" fill="white" />
          </g>
        )}

        {/* ==================== MOUTH & FUNNY SQUIRREL TOOTH ==================== */}
        {pose === 'sleeping' ? (
          /* Little sweet resting mouth */
          <path
            d="M68 67 Q70 69 72 67"
            stroke="#78350F"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          /* Cheerful open smile with HAIOASĂ tiny white buck tooth peeking out! */
          <g>
            {/* Open mouth */}
            <path
              d="M64 66 Q70 73 76 66"
              fill="#BE123C"
              stroke="#78350F"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Pink little tongue inside */}
            <path
              d="M66 69 Q70 73 74 69"
              fill="#FB7185"
            />
            {/* Adorable white squirrel tooth (DINIȘORUL DE VEVERIȚĂ) */}
            <rect
              x="68.5"
              y="66"
              width="3.2"
              height="3.2"
              rx="0.8"
              fill="white"
              stroke="#9A3412"
              strokeWidth="0.8"
            />
          </g>
        )}

        {/* ==================== POSE ACCESSORIES ==================== */}

        {/* 1. HAPPY: Giant Acorn & Daisy in hair */}
        {pose === 'happy' && (
          <g>
            {/* Daisy Flower behind right ear */}
            <g transform="translate(86, 26)">
              <circle cx="0" cy="-4" r="3" fill="white" />
              <circle cx="4" cy="-1" r="3" fill="white" />
              <circle cx="3" cy="4" r="3" fill="white" />
              <circle cx="-3" cy="4" r="3" fill="white" />
              <circle cx="-4" cy="-1" r="3" fill="white" />
              <circle cx="0" cy="1" r="2.5" fill="#FBBF24" />
            </g>

            {/* Huge glossy acorn hugged lovingly with both paws */}
            <g transform="translate(60, 78)">
              {/* Acorn cap with cute scales pattern */}
              <path d="M2 9 C2 2 18 2 18 9 Z" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
              <rect x="9" y="0" width="2.5" height="3.5" rx="1" fill="#451A03" />
              {/* Acorn body */}
              <path d="M2 9 C1 20 19 20 18 9 Z" fill="url(#nucaAcornBody)" stroke="#451A03" strokeWidth="1.5" />
              {/* Shiny glint on acorn */}
              <path d="M6 11 Q10 13 8 16" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

              {/* Front little paws hugging it */}
              <ellipse cx="1" cy="11" rx="4" ry="3.5" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
              <ellipse cx="19" cy="11" rx="4" ry="3.5" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
              {/* Tiny paw fingers */}
              <circle cx="-1" cy="11" r="0.8" fill="#FFFBEB" />
              <circle cx="21" cy="11" r="0.8" fill="#FFFBEB" />
            </g>
          </g>
        )}

        {/* 2. SWIMMING: Hilarious Goggles & Yellow Ducky Swim Ring */}
        {pose === 'swimming' && (
          <g>
            {/* Retro Aqua Swimming Goggles on forehead */}
            <g transform="translate(48, 38)">
              {/* Goggles Strap */}
              <path d="M0 7 Q22 0 44 7" stroke="#0284C7" strokeWidth="3" fill="none" />
              {/* Left Lens */}
              <ellipse cx="10" cy="6" rx="9" ry="7" fill="url(#gogglesLens)" stroke="#0284C7" strokeWidth="2" />
              <path d="M6 3 L13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              {/* Right Lens */}
              <ellipse cx="32" cy="6" rx="9" ry="7" fill="url(#gogglesLens)" stroke="#0284C7" strokeWidth="2" />
              <path d="M28 3 L35 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              {/* Bridge */}
              <rect x="18" y="5" width="6" height="2.5" rx="1" fill="#0369A1" />
            </g>

            {/* Yellow Rubber Duck Swim Ring around tummy */}
            <g transform="translate(36, 88)">
              {/* Ring body */}
              <ellipse cx="34" cy="12" rx="34" ry="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
              <ellipse cx="34" cy="12" rx="20" ry="7" fill="#38BDF8" opacity="0.3" />

              {/* Ducky Head on left side of ring */}
              <circle cx="10" cy="2" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
              <circle cx="8" cy="0" r="1.5" fill="#1E293B" />
              <circle cx="7.5" cy="-0.5" r="0.5" fill="white" />
              {/* Orange beak */}
              <path d="M3 3 C-1 3 -1 6 3 6 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.2" />
            </g>

            {/* Water Waves & Splashing Drops */}
            <path
              d="M18 108 Q35 102 52 108 T86 108 T122 108"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M24 116 Q42 110 60 116 T96 116 T126 116"
              stroke="#0284C7"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Splash droplets */}
            <circle cx="28" cy="98" r="3" fill="#38BDF8" />
            <circle cx="112" cy="96" r="3.5" fill="#38BDF8" />
            <circle cx="118" cy="88" r="2" fill="#7DD3FC" />
          </g>
        )}

        {/* 3. COLLECTING: Puffed cheeks, Giant maple leaf umbrella & Hazelnuts */}
        {pose === 'collecting' && (
          <g>
            {/* Giant Colorful Autumn Maple Leaf held like an umbrella */}
            <g transform="translate(80, 48) rotate(-15)">
              {/* Leaf stem */}
              <line x1="8" y1="36" x2="8" y2="4" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
              {/* Maple Leaf */}
              <path
                d="M8 -6 L14 4 L26 0 L20 12 L28 20 L16 22 L14 32 L8 24 L2 32 L0 22 L-12 20 L-4 12 L-10 0 L2 4 Z"
                fill="#DC2626"
                stroke="#991B1B"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M8 -2 L12 6 L20 4 L16 12 L22 18 L14 19 L8 16 L2 19 L-6 18 L0 12 L-4 4 L4 6 Z"
                fill="#F97316"
              />
            </g>

            {/* Paws holding a bundle of acorns and golden nuts */}
            <g transform="translate(56, 84)">
              <ellipse cx="8" cy="6" rx="6" ry="7" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
              <ellipse cx="20" cy="7" rx="6" ry="7" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
              <ellipse cx="14" cy="3" rx="5" ry="6" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
              {/* Holding paws */}
              <ellipse cx="2" cy="7" rx="4" ry="3.5" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
              <ellipse cx="26" cy="7" rx="4" ry="3.5" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
            </g>
          </g>
        )}

        {/* 4. SLEEPING: Fuzzy Nightcap with Pompom, Polka-dot Scarf & Snores */}
        {pose === 'sleeping' && (
          <g>
            {/* Cute Nightcap on head with red & white stripes */}
            <g transform="translate(52, 24)">
              <path
                d="M4 22 C6 6 28 0 38 12 C44 19 46 26 44 30 Z"
                fill="#3B82F6"
                stroke="#1D4ED8"
                strokeWidth="2"
              />
              {/* White fluffy brim */}
              <rect x="0" y="22" width="44" height="6" rx="3" fill="#FFFBEB" stroke="#CBD5E1" strokeWidth="1" />
              {/* Fuzzy white pompom at tip */}
              <circle cx="43" cy="13" r="5" fill="#FFFBEB" stroke="#94A3B8" strokeWidth="1.5" />
            </g>

            {/* Cozy Red Polka-dot Scarf wrapped around neck */}
            <g transform="translate(48, 72)">
              <path
                d="M0 4 Q22 10 44 4 Q46 12 40 18 Q22 16 4 18 Z"
                fill="#E11D48"
                stroke="#9F1239"
                strokeWidth="2"
              />
              {/* Scarf hanging tail with fringe */}
              <path d="M28 14 L34 32 L24 33 L22 16 Z" fill="#BE123C" stroke="#9F1239" strokeWidth="1.5" />
              {/* Polka dots */}
              <circle cx="8" cy="11" r="2" fill="#FFFBEB" />
              <circle cx="20" cy="12" r="2" fill="#FFFBEB" />
              <circle cx="34" cy="10" r="2" fill="#FFFBEB" />
              <circle cx="28" cy="24" r="2" fill="#FFFBEB" />
            </g>

            {/* Funny & sweet cartoon "Zzz" bubbles */}
            <g transform="translate(94, 20)">
              <text x="0" y="24" fill="#60A5FA" fontSize="16" fontWeight="900" fontFamily="Fredoka, cursive">Z</text>
              <text x="12" y="12" fill="#93C5FD" fontSize="13" fontWeight="900" fontFamily="Fredoka, cursive">z</text>
              <text x="22" y="2" fill="#BAE6FD" fontSize="10" fontWeight="900" fontFamily="Fredoka, cursive">z</text>
              {/* Tiny dreaming star */}
              <text x="28" y="20" fill="#FCD34D" fontSize="12">✨</text>
            </g>
          </g>
        )}

        {/* 5. POINTING: Explorer Spyglass / Wand pointing to the wheel */}
        {pose === 'pointing' && (
          <g>
            {/* Leaning arm pointing enthusiastically with a golden leaf wand */}
            <path
              d="M84 80 Q106 70 120 62"
              stroke="#EA580C"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Little paw pointing */}
            <circle cx="120" cy="62" r="5" fill="#C2410C" />
            {/* Golden Star Sparkle at tip */}
            <g transform="translate(122, 54)">
              <polygon points="6,0 8,5 13,6 8,7 6,12 4,7 -1,6 4,5" fill="#FBBF24" />
            </g>
          </g>
        )}

        {/* 6. BADGE / TROPHY: Acorn-Cup Crown & Thumbs-Up */}
        {pose === 'badge' && (
          <g>
            {/* Acorn-cup golden crown on head */}
            <g transform="translate(56, 18)">
              <path
                d="M2 14 L8 2 L14 10 L20 2 L26 14 Z"
                fill="#F59E0B"
                stroke="#B45309"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Crown jewels (red forest berries) */}
              <circle cx="8" cy="3" r="2.5" fill="#DC2626" />
              <circle cx="14" cy="9" r="2" fill="#3B82F6" />
              <circle cx="20" cy="3" r="2.5" fill="#DC2626" />
            </g>

            {/* Front paw giving a cute proud thumbs up */}
            <g transform="translate(86, 78)">
              <circle cx="6" cy="6" r="5" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
              {/* Thumbs up finger */}
              <rect x="5" y="-1" width="3" height="6" rx="1.5" fill="#EA580C" stroke="#9A3412" strokeWidth="1.2" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
