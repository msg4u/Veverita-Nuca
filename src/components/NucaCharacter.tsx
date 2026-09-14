import React from 'react';

interface NucaCharacterProps {
  pose?: 'happy' | 'swimming' | 'collecting' | 'sleeping' | 'pointing' | 'badge';
  size?: number;
  className?: string;
  animate?: boolean;
}

export const NucaCharacter: React.FC<NucaCharacterProps> = ({
  pose = 'happy',
  size = 120,
  className = '',
  animate = true,
}) => {
  const isWiggling = animate && pose !== 'sleeping';

  return (
    <div
      className={`inline-block select-none ${isWiggling ? 'animate-wiggle' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="Veverița Nuca"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-md"
      >
        <defs>
          {/* Gradients for Nuca's fur */}
          <linearGradient id="furGradient" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F97316" />
            <stop offset="0.7" stopColor="#EA580C" />
            <stop offset="1" stopColor="#C2410C" />
          </linearGradient>
          <linearGradient id="bellyGradient" x1="40" y1="50" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="acornGradient" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#92400E" />
            <stop offset="1" stopColor="#78350F" />
          </linearGradient>
        </defs>

        {/* Tail (Fluffy big squirrel tail) */}
        {pose !== 'sleeping' ? (
          <path
            d="M75 85 C95 80 115 65 110 38 C105 15 80 10 75 22 C70 30 85 45 78 65 C74 74 68 80 75 85 Z"
            fill="url(#furGradient)"
            stroke="#9A3412"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        ) : (
          /* Sleeping curled tail acting as a warm blanket */
          <path
            d="M30 85 C15 75 10 45 35 35 C65 25 105 40 100 85 C95 105 45 105 30 85 Z"
            fill="url(#furGradient)"
            stroke="#9A3412"
            strokeWidth="3"
          />
        )}

        {/* Tail inner fluff detail */}
        {pose !== 'sleeping' && (
          <path
            d="M85 30 C95 35 100 48 95 58 C90 68 80 72 82 55"
            stroke="#FDBA74"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* Body */}
        <ellipse
          cx="60"
          cy="75"
          rx="26"
          ry="28"
          fill="url(#furGradient)"
          stroke="#9A3412"
          strokeWidth="3"
        />

        {/* Belly */}
        <ellipse
          cx="60"
          cy="80"
          rx="17"
          ry="19"
          fill="url(#bellyGradient)"
        />

        {/* Feet / Paws */}
        <ellipse cx="45" cy="98" rx="8" ry="5" fill="#C2410C" stroke="#9A3412" strokeWidth="2" />
        <ellipse cx="75" cy="98" rx="8" ry="5" fill="#C2410C" stroke="#9A3412" strokeWidth="2" />

        {/* Head */}
        <circle
          cx="60"
          cy="46"
          r="23"
          fill="url(#furGradient)"
          stroke="#9A3412"
          strokeWidth="3"
        />

        {/* Cheeks (plump squirrel cheeks) */}
        <circle cx="44" cy="53" r="10" fill="#FDBA74" opacity="0.9" />
        <circle cx="76" cy="53" r="10" fill="#FDBA74" opacity="0.9" />
        {/* Rosy blush */}
        <circle cx="43" cy="54" r="4" fill="#F43F5E" opacity="0.35" />
        <circle cx="77" cy="54" r="4" fill="#F43F5E" opacity="0.35" />

        {/* Ears */}
        <path
          d="M44 32 C42 16 35 14 38 28 C39 33 43 35 44 32 Z"
          fill="#EA580C"
          stroke="#9A3412"
          strokeWidth="2.5"
        />
        <path d="M41 24 C40 20 37 19 39 26" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />

        <path
          d="M76 32 C78 16 85 14 82 28 C81 33 77 35 76 32 Z"
          fill="#EA580C"
          stroke="#9A3412"
          strokeWidth="2.5"
        />
        <path d="M79 24 C80 20 83 19 81 26" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />

        {/* Ear tufts (fluffy tips) */}
        <path d="M37 14 C35 11 32 12 33 16" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
        <path d="M83 14 C85 11 88 12 87 16" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

        {/* Eyes & Expressions */}
        {pose === 'sleeping' ? (
          /* Sleeping peaceful curved eyes */
          <g stroke="#451A03" strokeWidth="2.5" strokeLinecap="round">
            <path d="M48 48 Q53 53 58 48" />
            <path d="M62 48 Q67 53 72 48" />
          </g>
        ) : (
          /* Big lively happy eyes */
          <g>
            {/* Left Eye */}
            <circle cx="51" cy="45" r="5" fill="#1E293B" />
            <circle cx="49.5" cy="43.5" r="2" fill="white" />
            <circle cx="53" cy="47" r="0.8" fill="white" />

            {/* Right Eye */}
            <circle cx="69" cy="45" r="5" fill="#1E293B" />
            <circle cx="67.5" cy="43.5" r="2" fill="white" />
            <circle cx="71" cy="47" r="0.8" fill="white" />
          </g>
        )}

        {/* Snout & Little Nose */}
        <ellipse cx="60" cy="51" rx="5.5" ry="4" fill="#FEF3C7" />
        <path d="M58 50 C58 48.5 62 48.5 62 50 C62 51.5 60 52.5 58 50 Z" fill="#78350F" />

        {/* Smiling Mouth */}
        <path
          d="M57 53 Q60 56 63 53"
          stroke="#78350F"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers */}
        <path d="M38 51 L44 52 M38 54 L44 54" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M82 51 L76 52 M82 54 L76 54" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />

        {/* POSE-SPECIFIC ACCESSORIES & ACTIONS */}
        {pose === 'happy' && (
          /* Holding a nice hazelnut */
          <g transform="translate(52, 68)">
            {/* Acorn cap */}
            <path d="M3 5 C3 1 13 1 13 5 Z" fill="#78350F" />
            <rect x="7" y="0" width="2" height="3" rx="1" fill="#451A03" />
            {/* Acorn body */}
            <path d="M3 5 C2 12 14 12 13 5 Z" fill="url(#acornGradient)" />
            {/* Front paws holding it */}
            <ellipse cx="2" cy="7" rx="3.5" ry="3" fill="#EA580C" />
            <ellipse cx="14" cy="7" rx="3.5" ry="3" fill="#EA580C" />
          </g>
        )}

        {pose === 'swimming' && (
          /* Swimming in river water with ripples and summer water flower */
          <g>
            {/* Water waves */}
            <path
              d="M20 92 Q35 86 50 92 T80 92 T105 92"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M15 99 Q30 95 45 99 T75 99 T105 99"
              stroke="#0284C7"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Flower on head */}
            <circle cx="75" cy="30" r="4" fill="#F43F5E" />
            <circle cx="75" cy="30" r="1.5" fill="#FEF08A" />
            {/* Splash droplets */}
            <circle cx="32" cy="85" r="2.5" fill="#38BDF8" />
            <circle cx="88" cy="83" r="2" fill="#38BDF8" />
          </g>
        )}

        {pose === 'collecting' && (
          /* Autumn basket or double nuts and red maple leaf */
          <g>
            {/* Autumn Leaf in paw */}
            <path
              d="M75 66 C85 62 90 75 80 82 C72 78 70 70 75 66 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="1.5"
            />
            <line x1="75" y1="66" x2="80" y2="82" stroke="#FDE047" strokeWidth="1" />
            {/* Acorns pile */}
            <ellipse cx="48" cy="78" rx="5" ry="6" fill="#92400E" />
            <ellipse cx="56" cy="79" rx="5" ry="6" fill="#B45309" />
          </g>
        )}

        {pose === 'sleeping' && (
          /* Cozy tree hollow & warm scarf */
          <g>
            {/* Red winter scarf */}
            <path
              d="M46 62 Q60 67 74 62 Q76 68 70 72 Q60 70 50 72 Z"
              fill="#E11D48"
              stroke="#9F1239"
              strokeWidth="1.5"
            />
            {/* Scarf tails */}
            <path d="M68 68 L73 82 L65 83 L63 69 Z" fill="#BE123C" />
            {/* Zzz sleep bubbles */}
            <text x="82" y="36" fill="#60A5FA" fontSize="13" fontWeight="bold">Z</text>
            <text x="92" y="26" fill="#93C5FD" fontSize="10" fontWeight="bold">z</text>
            <text x="98" y="18" fill="#BFDBFE" fontSize="8" fontWeight="bold">z</text>
          </g>
        )}

        {pose === 'pointing' && (
          /* Arm pointing out to show the current season */
          <g>
            <path
              d="M72 68 Q90 60 102 55"
              stroke="#EA580C"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="102" cy="55" r="4" fill="#C2410C" />
          </g>
        )}
      </svg>
    </div>
  );
};
