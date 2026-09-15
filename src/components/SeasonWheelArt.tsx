import React from 'react';

export const BaseDiscSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 500,
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`rounded-full shadow-2xl ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clip paths for 4 quadrants */}
        <clipPath id="quad-spring">
          {/* Top-Right Quadrant: angle 0 to 90 (0 to PI/2 in polar, or top-right box) */}
          <path d="M 250,250 L 250,0 A 250,250 0 0,1 500,250 Z" />
        </clipPath>
        <clipPath id="quad-summer">
          {/* Bottom-Right Quadrant: angle 90 to 180 */}
          <path d="M 250,250 L 500,250 A 250,250 0 0,1 250,500 Z" />
        </clipPath>
        <clipPath id="quad-autumn">
          {/* Bottom-Left Quadrant: angle 180 to 270 */}
          <path d="M 250,250 L 250,500 A 250,250 0 0,1 0,250 Z" />
        </clipPath>
        <clipPath id="quad-winter">
          {/* Top-Left Quadrant: angle 270 to 360 */}
          <path d="M 250,250 L 0,250 A 250,250 0 0,1 250,0 Z" />
        </clipPath>

        {/* Outer Rim Wood Pattern */}
        <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
          <stop offset="90%" stopColor="#78350F" />
          <stop offset="96%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#451A03" />
        </radialGradient>
      </defs>

      {/* Main outer border */}
      <circle cx="250" cy="250" r="248" fill="#FFFBEB" stroke="url(#rimGrad)" strokeWidth="12" />

      {/* ============================================================ */}
      {/* 1. PRIMĂVARA (Top-Right: 0 to 90 deg / 12:00 to 3:00) */}
      {/* ============================================================ */}
      <g clipPath="url(#quad-spring)">
        {/* Sky / Background */}
        <rect x="250" y="0" width="250" height="250" fill="#ECFDF5" />
        {/* Soft grass hill */}
        <path d="M 250,250 Q 360,180 500,210 L 500,250 Z" fill="#A7F3D0" />
        <path d="M 250,250 Q 380,210 500,240 L 500,250 Z" fill="#6EE7B7" />

        {/* Rain clouds and gentle rain */}
        <path d="M 330,40 Q 345,25 365,35 Q 380,20 400,32 Q 415,35 415,50 Q 415,65 390,65 L 335,65 Q 320,60 330,40 Z" fill="#BAE6FD" opacity="0.8" />
        <line x1="345" y1="72" x2="338" y2="86" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" />
        <line x1="370" y1="75" x2="363" y2="92" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" />
        <line x1="395" y1="72" x2="388" y2="86" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" />

        {/* Spring Tree Trunk & Crown */}
        <path d="M 345,200 Q 355,150 350,110 L 365,110 Q 362,150 375,200 Z" fill="#78350F" />
        <path d="M 352,130 Q 330,115 325,100" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
        <path d="M 360,125 Q 385,115 395,105" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
        {/* Delicate green foliage buds */}
        <circle cx="320" cy="95" r="22" fill="#86EFAC" opacity="0.85" />
        <circle cx="355" cy="85" r="26" fill="#4ADE80" opacity="0.85" />
        <circle cx="395" cy="95" r="20" fill="#86EFAC" opacity="0.85" />

        {/* Spring Flowers (Pink & White blossoms) */}
        <circle cx="325" cy="90" r="5" fill="#F472B6" />
        <circle cx="325" cy="90" r="2" fill="#FEF08A" />
        <circle cx="350" cy="78" r="6" fill="#FB7185" />
        <circle cx="350" cy="78" r="2.5" fill="#FEF08A" />
        <circle cx="365" cy="95" r="5" fill="#F472B6" />
        <circle cx="365" cy="95" r="2" fill="#FEF08A" />
        <circle cx="390" cy="88" r="5" fill="#FDA4AF" />
        <circle cx="390" cy="88" r="2" fill="#FEF08A" />

        {/* Returning Migratory Birds */}
        <path d="M 285,60 Q 295,50 305,60 Q 315,50 325,60" fill="none" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 300,78 Q 308,70 316,78 Q 324,70 332,78" fill="none" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />

        {/* Big Spring Title */}
        <text x="365" y="195" fill="#065F46" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="2">
          PRIMĂVARĂ
        </text>
        <text x="365" y="215" fill="#047857" fontSize="12" fontWeight="700" textAnchor="middle">
          Flori, muguri & ploaie blândă
        </text>
      </g>

      {/* ============================================================ */}
      {/* 2. VARA (Bottom-Right: 90 to 180 deg / 3:00 to 6:00) */}
      {/* ============================================================ */}
      <g clipPath="url(#quad-summer)">
        {/* Sky / Sun background */}
        <rect x="250" y="250" width="250" height="250" fill="#FEF9C3" />

        {/* Radiant Bright Sun in corner */}
        <circle cx="450" cy="290" r="32" fill="#FBBF24" />
        <circle cx="450" cy="290" r="24" fill="#F59E0B" />
        {/* Sun rays */}
        <g stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round">
          <line x1="450" y1="245" x2="450" y2="235" />
          <line x1="485" y1="260" x2="495" y2="252" />
          <line x1="495" y1="290" x2="505" y2="290" />
          <line x1="485" y1="320" x2="495" y2="328" />
          <line x1="415" y1="260" x2="405" y2="252" />
          <line x1="420" y1="320" x2="410" y2="328" />
        </g>

        {/* Lush Green Summer Tree */}
        <path d="M 330,340 Q 338,300 334,265 L 348,265 Q 345,300 355,340 Z" fill="#78350F" />
        <circle cx="320" cy="275" r="30" fill="#15803D" />
        <circle cx="355" cy="265" r="35" fill="#16A34A" />
        <circle cx="335" cy="250" r="30" fill="#22C55E" />

        {/* Refreshing Forest River where Nuca swims */}
        <path d="M 250,420 Q 330,380 400,430 T 500,410 L 500,500 L 250,500 Z" fill="#38BDF8" />
        <path d="M 250,440 Q 340,410 410,450 T 500,435 L 500,500 L 250,500 Z" fill="#0284C7" />
        {/* River sparkles */}
        <path d="M 300,445 Q 315,442 330,445" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 370,430 Q 385,427 400,430" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Little swimming ripples icon */}
        <circle cx="320" cy="460" r="8" stroke="#E0F2FE" strokeWidth="2" fill="none" />
        <circle cx="320" cy="460" r="14" stroke="#BAE6FD" strokeWidth="1.5" fill="none" />

        {/* Big Summer Title */}
        <text x="365" y="360" fill="#92400E" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="2">
          VARĂ
        </text>
        <text x="365" y="380" fill="#B45309" fontSize="12" fontWeight="700" textAnchor="middle">
          Soare, verdeață & baie în râu
        </text>
      </g>

      {/* ============================================================ */}
      {/* 3. TOAMNA (Bottom-Left: 180 to 270 deg / 6:00 to 9:00) */}
      {/* ============================================================ */}
      <g clipPath="url(#quad-autumn)">
        {/* Warm Autumn sky */}
        <rect x="0" y="250" width="250" height="250" fill="#FFF7ED" />
        {/* Rustling ground with leaves */}
        <path d="M 0,390 Q 100,380 250,420 L 250,500 L 0,500 Z" fill="#FDBA74" />
        <path d="M 0,420 Q 120,400 250,450 L 250,500 L 0,500 Z" fill="#EA580C" />

        {/* Golden & Red Autumn Tree */}
        <path d="M 140,360 Q 148,310 142,270 L 158,270 Q 155,310 166,360 Z" fill="#78350F" />
        {/* Multi-colored foliage */}
        <circle cx="120" cy="275" r="30" fill="#EAB308" />
        <circle cx="150" cy="255" r="34" fill="#EA580C" />
        <circle cx="175" cy="275" r="28" fill="#DC2626" />
        <circle cx="140" cy="285" r="25" fill="#F97316" />

        {/* Falling fluttering leaves */}
        <path d="M 90,320 C 80,310 95,300 100,315 C 95,325 85,325 90,320 Z" fill="#DC2626" transform="rotate(25 90 320)" />
        <path d="M 180,330 C 170,320 185,310 190,325 Z" fill="#F59E0B" transform="rotate(-30 180 330)" />
        <path d="M 120,380 C 112,372 125,365 128,378 Z" fill="#EA580C" transform="rotate(45 120 380)" />

        {/* Acorns on the ground (Nuca's treasures) */}
        <ellipse cx="60" cy="445" rx="7" ry="9" fill="#92400E" />
        <path d="M 53,440 Q 60,436 67,440" stroke="#78350F" strokeWidth="3" />
        <ellipse cx="78" cy="455" rx="6" ry="8" fill="#B45309" />
        <path d="M 72,451 Q 78,447 84,451" stroke="#78350F" strokeWidth="2.5" />

        {/* Big Autumn Title */}
        <text x="135" y="360" fill="#9A3412" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="2">
          TOAMNĂ
        </text>
        <text x="135" y="380" fill="#C2410C" fontSize="12" fontWeight="700" textAnchor="middle">
          Frunze aurii & cămara cu alune
        </text>
      </g>

      {/* ============================================================ */}
      {/* 4. IARNA (Top-Left: 270 to 360 deg / 9:00 to 12:00) */}
      {/* ============================================================ */}
      <g clipPath="url(#quad-winter)">
        {/* Cold wintry sky */}
        <rect x="0" y="0" width="250" height="250" fill="#F0F9FF" />

        {/* Fluffy Snowdrifts */}
        <path d="M 0,190 Q 80,160 250,220 L 250,250 L 0,250 Z" fill="#E0F2FE" />
        <path d="M 0,215 Q 120,190 250,235 L 250,250 L 0,250 Z" fill="#BAE6FD" />

        {/* Bare Winter Tree with Snow on branches */}
        <path d="M 125,210 Q 135,160 130,115 L 145,115 Q 142,160 152,210 Z" fill="#57534E" />
        <path d="M 133,145 Q 105,130 95,110" stroke="#57534E" strokeWidth="5" strokeLinecap="round" />
        <path d="M 140,135 Q 165,120 175,100" stroke="#57534E" strokeWidth="5" strokeLinecap="round" />
        <path d="M 135,120 Q 138,90 142,80" stroke="#57534E" strokeWidth="4" strokeLinecap="round" />

        {/* Snow caps on branches */}
        <path d="M 92,108 Q 105,100 120,118" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M 145,116 Q 160,102 176,98" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <circle cx="140" cy="78" r="6" fill="white" />

        {/* Cozy Tree Hollow for Nuca */}
        <ellipse cx="138" cy="165" rx="7" ry="10" fill="#292524" />
        {/* Warm golden light inside hollow */}
        <circle cx="138" cy="167" r="4" fill="#FBBF24" opacity="0.9" />

        {/* Sparkling Snowflakes */}
        <g stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round">
          {/* Snowflake 1 */}
          <line x1="60" y1="50" x2="60" y2="66" />
          <line x1="52" y1="58" x2="68" y2="58" />
          <line x1="54" y1="52" x2="66" y2="64" />
          <line x1="54" y1="64" x2="66" y2="52" />
          {/* Snowflake 2 */}
          <line x1="185" y1="60" x2="185" y2="72" />
          <line x1="179" y1="66" x2="191" y2="66" />
          {/* Snowflake 3 */}
          <line x1="85" y1="120" x2="85" y2="130" />
          <line x1="80" y1="125" x2="90" y2="125" />
        </g>

        {/* Big Winter Title */}
        <text x="135" y="195" fill="#0369A1" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="2">
          IARNĂ
        </text>
        <text x="135" y="215" fill="#0284C7" fontSize="12" fontWeight="700" textAnchor="middle">
          Zăpadă pufoasă & somn în scorbură
        </text>
      </g>

      {/* Axis Divider Lines */}
      <line x1="250" y1="0" x2="250" y2="500" stroke="#78350F" strokeWidth="4" strokeDasharray="6 4" opacity="0.6" />
      <line x1="0" y1="250" x2="500" y2="250" stroke="#78350F" strokeWidth="4" strokeDasharray="6 4" opacity="0.6" />

      {/* Center Pivot Marker dot */}
      <circle cx="250" cy="250" r="14" fill="#D97706" stroke="#78350F" strokeWidth="3" />
      <circle cx="250" cy="250" r="4" fill="#FEF3C7" />
    </svg>
  );
};

export const SmallTopDiscSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 400,
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={`rounded-full filter drop-shadow-xl ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Mask that cuts out the 90 degree window (from angle 0 to 90 deg: top-right) */}
        <mask id="windowMask">
          {/* White everywhere (visible) */}
          <rect x="0" y="0" width="400" height="400" fill="white" />
          {/* Black in the window (transparent cutout to reveal the season beneath!) */}
          <path d="M 200,200 L 200,10 A 190,190 0 0,1 390,200 Z" fill="black" />
        </mask>

        <linearGradient id="woodTexture" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#D97706" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Disc body with the window cut out */}
      <circle
        cx="200"
        cy="200"
        r="195"
        fill="url(#woodTexture)"
        stroke="#78350F"
        strokeWidth="6"
        mask="url(#windowMask)"
      />

      {/* Window Highlight Border (The frame of the magic window) */}
      <path
        d="M 200,200 L 200,10 A 190,190 0 0,1 390,200 Z"
        fill="none"
        stroke="#FEF3C7"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 200,200 L 200,10 A 190,190 0 0,1 390,200 Z"
        fill="none"
        stroke="#92400E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Golden stars & magic symbols engraved on the solid wheel part */}
      <g fill="#FEF3C7" opacity="0.85">
        {/* Star 1 */}
        <polygon points="120,80 123,88 131,88 125,93 127,101 120,96 113,101 115,93 109,88 117,88" transform="scale(0.8) translate(40, 20)" />
        {/* Star 2 */}
        <polygon points="90,160 93,168 101,168 95,173 97,181 90,176 83,181 85,173 79,168 87,168" transform="scale(0.8) translate(10, 40)" />
        {/* Star 3 */}
        <polygon points="120,290 123,298 131,298 125,303 127,311 120,306 113,311 115,303 109,298 117,298" transform="scale(0.8) translate(30, 70)" />
      </g>

      {/* Inspiring Romanian Text Engraved on the Disc */}
      <text x="120" y="240" fill="#78350F" fontSize="13" fontWeight="900" textAnchor="middle" transform="rotate(-45 120 240)">
        ROATA LUI NUCA
      </text>
      <text x="110" y="260" fill="#FFFBEB" fontSize="10" fontWeight="700" textAnchor="middle" transform="rotate(-45 120 240)">
        Timpul se rotește neîncetat ✨
      </text>

      {/* Center Brass Fastener (brida tip fluture) */}
      <circle cx="200" cy="200" r="16" fill="#FCD34D" stroke="#78350F" strokeWidth="3" />
      <ellipse cx="200" cy="200" rx="9" ry="5" fill="#F59E0B" />
      <circle cx="196" cy="197" r="3" fill="white" opacity="0.6" />
      {/* 2 prongs of butterfly clip */}
      <line x1="188" y1="200" x2="212" y2="200" stroke="#78350F" strokeWidth="2.5" />

      {/* Squirrel Nuca illustration sitting right by the window's edge */}
      {/* Placed at top edge of the window, pointing joyfully inside! */}
      <g transform="translate(150, -12)">
        {/* Fluffy tail with highlights */}
        <path d="M 52,58 C 72,50 86,34 82,14 C 77,-4 54,-4 48,8 C 44,14 56,26 50,40 C 47,46 42,52 48,56 Z" fill="#EA580C" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 58,16 C 68,22 74,32 70,44" stroke="#FED7AA" strokeWidth="2.5" strokeLinecap="round" />

        {/* Squirrel body */}
        <ellipse cx="38" cy="50" rx="18" ry="20" fill="#F97316" stroke="#78350F" strokeWidth="2.5" />
        <ellipse cx="38" cy="53" rx="11" ry="14" fill="#FFFBEB" />

        {/* Head */}
        <circle cx="38" cy="28" r="16" fill="#F97316" stroke="#78350F" strokeWidth="2.5" />

        {/* Big fluffy ears with brush tufts */}
        <path d="M 26,18 C 24,6 18,5 21,15 Z" fill="#EA580C" stroke="#78350F" strokeWidth="2" />
        <path d="M 20,6 C 18,2 15,4 17,9" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 50,18 C 52,6 58,5 55,15 Z" fill="#EA580C" stroke="#78350F" strokeWidth="2" />
        <path d="M 56,6 C 58,2 61,4 59,9" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

        {/* Chubby cheeks & rosy blush */}
        <circle cx="27" cy="34" r="7" fill="#FDBA74" opacity="0.9" />
        <circle cx="49" cy="34" r="7" fill="#FDBA74" opacity="0.9" />
        <circle cx="26" cy="35" r="3.5" fill="#FB7185" opacity="0.6" />
        <circle cx="50" cy="35" r="3.5" fill="#FB7185" opacity="0.6" />

        {/* Big anime storybook eyes with double catchlights */}
        <ellipse cx="32" cy="26" rx="3.8" ry="4.2" fill="#1E293B" />
        <circle cx="30.8" cy="24.8" r="1.5" fill="white" />
        <circle cx="33.2" cy="27.5" r="0.7" fill="white" />

        <ellipse cx="44" cy="26" rx="3.8" ry="4.2" fill="#1E293B" />
        <circle cx="42.8" cy="24.8" r="1.5" fill="white" />
        <circle cx="45.2" cy="27.5" r="0.7" fill="white" />

        {/* Cute nose, smile and FUNNY WHITE SQUIRREL TOOTH */}
        <circle cx="38" cy="31" r="1.8" fill="#78350F" />
        <path d="M 34,34 Q 38,39 42,34" fill="#BE123C" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tiny buck tooth */}
        <rect x="37" y="34" width="2" height="2" rx="0.5" fill="white" stroke="#78350F" strokeWidth="0.5" />

        {/* Paw pointing happily through the window! */}
        <path d="M 48,48 Q 66,48 76,56" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
        <circle cx="76" cy="56" r="4" fill="#C2410C" />
        {/* Golden star sparkle at paw tip */}
        <polygon points="78,48 80,52 84,53 80,54 78,58 76,54 72,53 76,52" fill="#FCD34D" />
      </g>
    </svg>
  );
};
