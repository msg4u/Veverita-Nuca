import React, { useState, useEffect, useRef } from 'react';
import { SEASONS } from '../data/storyData';
import { SeasonId } from '../types';
import { BaseDiscSVG, SmallTopDiscSVG } from './SeasonWheelArt';
import { NucaCharacter } from './NucaCharacter';
import { soundEngine, SpeechService } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  RotateCw,
  Play,
  Pause,
  Calendar,
  Sparkles,
  Volume2,
  CheckCircle2,
  Info,
  Clock,
  Compass,
} from 'lucide-react';

interface MagicWheelViewProps {
  initialSeason?: SeasonId;
}

export const MagicWheelView: React.FC<MagicWheelViewProps> = ({
  initialSeason = 'primavara',
}) => {
  // Current rotation angle in degrees (0 = Primavara, 90 = Vara, 180 = Toamna, 270 = Iarna)
  const [rotationAngle, setRotationAngle] = useState<number>(() => {
    switch (initialSeason) {
      case 'vara': return 90;
      case 'toamna': return 180;
      case 'iarna': return 270;
      default: return 0;
    }
  });

  const [isSlowAutoSpinning, setIsSlowAutoSpinning] = useState(false);
  const [activeSeasonKey, setActiveSeasonKey] = useState<SeasonId>(initialSeason);
  const [hasPointerExtension, setHasPointerExtension] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const autoSpinIntervalRef = useRef<number | null>(null);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startAngleRef = useRef(0);
  const currentAngleRef = useRef(rotationAngle);

  // Sync ref with state
  currentAngleRef.current = rotationAngle;

  // Calculate which season is currently visible based on angle (normalized 0 to 360)
  const getSeasonFromAngle = (deg: number): SeasonId => {
    const norm = ((deg % 360) + 360) % 360;
    // 0 to 45 or 315 to 360 -> Primavara (window is top-right, aligned at 0)
    // In our SVG, window reveals quadrant from angle - 45 to + 45, or exactly:
    if (norm >= 315 || norm < 45) return 'primavara';
    if (norm >= 45 && norm < 135) return 'vara';
    if (norm >= 135 && norm < 225) return 'toamna';
    return 'iarna';
  };

  const currentSeason = SEASONS[activeSeasonKey];

  // Update active season when rotation changes
  useEffect(() => {
    const seasonId = getSeasonFromAngle(rotationAngle);
    if (seasonId !== activeSeasonKey) {
      setActiveSeasonKey(seasonId);
      // Play season sound when passing into a new season
      const s = SEASONS[seasonId];
      if (s.soundType === 'birds') soundEngine.playSpringBirds();
      else if (s.soundType === 'splash') soundEngine.playSummerSplash();
      else if (s.soundType === 'leaves') soundEngine.playAutumnLeaves();
      else if (s.soundType === 'wind') soundEngine.playWinterWind();
    }
  }, [rotationAngle, activeSeasonKey]);

  // Handle slow continuous auto-spinning (as in story)
  useEffect(() => {
    if (isSlowAutoSpinning) {
      autoSpinIntervalRef.current = window.setInterval(() => {
        setRotationAngle((prev) => (prev + 0.5) % 360);
      }, 50);
    } else {
      if (autoSpinIntervalRef.current) {
        clearInterval(autoSpinIntervalRef.current);
        autoSpinIntervalRef.current = null;
      }
    }
    return () => {
      if (autoSpinIntervalRef.current) {
        clearInterval(autoSpinIntervalRef.current);
      }
    };
  }, [isSlowAutoSpinning]);

  // Turn smoothly to a specific season
  const rotateToSeason = (seasonId: SeasonId) => {
    setIsSlowAutoSpinning(false);
    SpeechService.stop();
    setIsSpeaking(false);
    soundEngine.playChime();

    let target = 0;
    if (seasonId === 'vara') target = 90;
    else if (seasonId === 'toamna') target = 180;
    else if (seasonId === 'iarna') target = 270;

    setRotationAngle(target);
    setActiveSeasonKey(seasonId);

    // Celebrate when turning
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#38BDF8', '#EA580C'],
    });
  };

  // Next quarter rotation
  const rotateToNextSeason = () => {
    setIsSlowAutoSpinning(false);
    SpeechService.stop();
    setIsSpeaking(false);
    soundEngine.playPop();

    const nextAngle = Math.round(rotationAngle / 90) * 90 + 90;
    setRotationAngle(nextAngle);
  };

  // Calendar sync: find real season for today's month
  const syncWithRealCalendar = () => {
    setIsSlowAutoSpinning(false);
    soundEngine.playSuccessFanfare();

    const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec
    let targetSeason: SeasonId = 'iarna';

    if (currentMonth >= 2 && currentMonth <= 4) {
      targetSeason = 'primavara'; // March, April, May
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      targetSeason = 'vara'; // June, July, August
    } else if (currentMonth >= 8 && currentMonth <= 10) {
      targetSeason = 'toamna'; // Sept, Oct, Nov
    } else {
      targetSeason = 'iarna'; // Dec, Jan, Feb
    }

    rotateToSeason(targetSeason);
  };

  // Read current season out loud
  const speakSeason = () => {
    if (isSpeaking) {
      SpeechService.stop();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${currentSeason.quote}. În ${currentSeason.name}, ${currentSeason.natureDescription} ${currentSeason.nucaActivity}`;
    setIsSpeaking(true);
    soundEngine.playChime();

    SpeechService.speak(
      textToRead,
      () => setIsSpeaking(false),
      () => setIsSpeaking(true)
    );
  };

  // Interactive Drag & Touch rotation logic
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!wheelContainerRef.current) return;
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    const rect = wheelContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clickAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    startAngleRef.current = clickAngle - currentAngleRef.current;
    setIsSlowAutoSpinning(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !wheelContainerRef.current) return;
    const rect = wheelContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentTouchAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    const newAngle = currentTouchAngle - startAngleRef.current;
    setRotationAngle(newAngle);
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      // Snap to nearest 90 degrees lightly for neatness
      const snapped = Math.round(currentAngleRef.current / 90) * 90;
      setRotationAngle(snapped);
      soundEngine.playChime();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Interactive Title Banner */}
      <div className="bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center border border-amber-300 shadow-xs">
            <Compass className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
              Roata Fermecată a Anului
            </h1>
            <p className="text-xs md:text-sm text-amber-800 font-medium">
              Rotește discul cu Nuca și descoperă cum se schimbă natura în cele 4 anotimpuri!
            </p>
          </div>
        </div>

        {/* Sync with Today's Calendar Button */}
        <button
          id="calendar-sync-btn"
          onClick={syncWithRealCalendar}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-transform active:scale-95 shadow-xs"
          title="Unde este Nuca în calendarul de azi?"
        >
          <Calendar className="w-4 h-4 text-amber-700" />
          <span>Unde e Nuca azi? (Calendar)</span>
        </button>
      </div>

      {/* Main Wheel Playground & Info Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Top: The Interactive 2-Disc Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative p-2 bg-amber-100/50 rounded-full border-4 border-amber-300/60 shadow-xl">
            {/* The Outer Base Disc (Fixed or under) */}
            <div
              ref={wheelContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] cursor-grab active:cursor-grabbing touch-none select-none"
              title="Apasă și trage cu degetul sau mouse-ul pentru a roti roata!"
            >
              {/* Layer 1: Base Season Disc (4 seasons) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <BaseDiscSVG size={380} className="w-full h-full" />
              </div>

              {/* Layer 2: Rotating Small Cover Disc with cutout window and Nuca */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <SmallTopDiscSVG size={310} className="w-[82%] h-[82%]" />
              </div>

              {/* Layer 3: Optional Pedagogical Extension: Fixed Nuca Pointer on Rim */}
              {hasPointerExtension && (
                <div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none filter drop-shadow-lg"
                  title="Nuca fixă arată unde ne aflăm în an"
                >
                  <div className="flex flex-col items-center">
                    <NucaCharacter pose="pointing" size={54} />
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-600 -mt-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Touch / Drag hint */}
          <p className="text-xs text-amber-800 font-semibold mt-3 flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Trage de roată cu degetul sau folosește butoanele de mai jos!
          </p>

          {/* Wheel Control Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button
              id="next-quarter-btn"
              onClick={rotateToNextSeason}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform active:scale-95"
            >
              <RotateCw className="w-4 h-4" />
              Rotește la următorul anotimp
            </button>

            <button
              id="slow-spin-toggle-btn"
              onClick={() => {
                soundEngine.playPop();
                setIsSlowAutoSpinning(!isSlowAutoSpinning);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors border ${
                isSlowAutoSpinning
                  ? 'bg-purple-600 text-white border-purple-700'
                  : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-300'
              }`}
            >
              {isSlowAutoSpinning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isSlowAutoSpinning ? 'Oprește rotirea' : 'Rotește singură (poveste)'}</span>
            </button>
          </div>

          {/* Extension feature toggle from story */}
          <div className="mt-3">
            <label className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-white/70 px-3 py-1.5 rounded-lg border border-amber-200 cursor-pointer select-none">
              <input
                id="pointer-extension-checkbox"
                type="checkbox"
                checked={hasPointerExtension}
                onChange={(e) => {
                  soundEngine.playPop();
                  setHasPointerExtension(e.target.checked);
                }}
                className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500"
              />
              <span>Extensie: Silueta lui Nuca fixă ca ac de ceas</span>
            </label>
          </div>
        </div>

        {/* Right: Season Info Panel & Discovery Card */}
        <div className="lg:col-span-6 space-y-4">
          {/* Quick Season Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['primavara', 'vara', 'toamna', 'iarna'] as SeasonId[]).map((sId) => {
              const s = SEASONS[sId];
              const isSelected = activeSeasonKey === sId;
              return (
                <button
                  key={sId}
                  id={`season-pill-${sId}`}
                  onClick={() => rotateToSeason(sId)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md border-slate-900 scale-105'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Season Card */}
          <div
            className={`p-6 md:p-7 rounded-3xl border-2 transition-all shadow-lg bg-gradient-to-br ${currentSeason.bgGradient} border-amber-300/80`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${currentSeason.badgeColor}`}>
                  {currentSeason.temperature}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mt-2">
                  {currentSeason.title}
                </h2>
              </div>

              {/* Nuca Avatar for this season */}
              <div className="shrink-0 bg-white/80 p-2 rounded-2xl border border-amber-200 shadow-sm">
                <NucaCharacter
                  pose={
                    activeSeasonKey === 'vara'
                      ? 'swimming'
                      : activeSeasonKey === 'toamna'
                      ? 'collecting'
                      : activeSeasonKey === 'iarna'
                      ? 'sleeping'
                      : 'happy'
                  }
                  size={65}
                />
              </div>
            </div>

            {/* Nuca's Story Quote */}
            <div className="mt-4 p-3.5 bg-white/90 rounded-2xl border-l-4 border-amber-500 shadow-xs">
              <p className="text-base font-bold text-amber-950 italic">
                {currentSeason.quote}
              </p>
            </div>

            {/* Nature Description */}
            <div className="mt-4 space-y-3">
              <div className="bg-white/80 p-3.5 rounded-xl border border-amber-100">
                <p className="text-xs font-bold uppercase text-slate-500 mb-1">
                  Ce se întâmplă în pădure:
                </p>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {currentSeason.natureDescription}
                </p>
              </div>

              <div className="bg-white/80 p-3.5 rounded-xl border border-amber-100">
                <p className="text-xs font-bold uppercase text-slate-500 mb-1">
                  Ce face Nuca:
                </p>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {currentSeason.nucaActivity}
                </p>
              </div>
            </div>

            {/* Months in Romanian */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Lunile:
              </span>
              {currentSeason.months.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 bg-white/90 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Action Bar: Audio and Nature sounds */}
            <div className="mt-5 pt-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3">
              <button
                id="speak-season-btn"
                onClick={speakSeason}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-xs transition-all ${
                  isSpeaking
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-300'
                }`}
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>{isSpeaking ? 'Oprește vocea' : 'Ascultă povestea sezonului'}</span>
              </button>

              <button
                id="sound-effect-season-btn"
                onClick={() => {
                  if (currentSeason.soundType === 'birds') soundEngine.playSpringBirds();
                  else if (currentSeason.soundType === 'splash') soundEngine.playSummerSplash();
                  else if (currentSeason.soundType === 'leaves') soundEngine.playAutumnLeaves();
                  else if (currentSeason.soundType === 'wind') soundEngine.playWinterWind();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/80 hover:bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
              >
                <Play className="w-3 h-3 text-amber-600 fill-amber-600" />
                Sunetul specific
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
