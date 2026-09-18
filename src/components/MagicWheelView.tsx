import React, { useState, useEffect, useRef } from 'react';
import { SEASONS } from '../data/storyData';
import { SeasonId } from '../types';
import { BaseDiscSVG, SmallTopDiscSVG } from './SeasonWheelArt';
import { NucaCharacter } from './NucaCharacter';
import { soundEngine, SpeechService } from '../utils/soundEffects';
import {
  RotateCw,
  Volume2,
  Calendar,
  Sparkles,
  Play,
  Pause,
  Clock,
  Compass,
  Smile,
} from 'lucide-react';

interface MagicWheelViewProps {
  initialSeason?: SeasonId;
}

export const MagicWheelView: React.FC<MagicWheelViewProps> = ({
  initialSeason = 'primavara',
}) => {
  // Rotation angle in degrees of the top small disc
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isSlowAutoSpinning, setIsSlowAutoSpinning] = useState<boolean>(false);
  const [hasPointerExtension, setHasPointerExtension] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Drag interaction state
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startAngleRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(0);

  // Sync ref with state
  useEffect(() => {
    currentAngleRef.current = rotationAngle;
  }, [rotationAngle]);

  // Handle initial season if specified
  useEffect(() => {
    if (initialSeason) {
      rotateToSeason(initialSeason);
    }
  }, [initialSeason]);

  // Auto slow spin mode (illustrating the story's "se rotea foarte, foarte încet de-a lungul anului")
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSlowAutoSpinning) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.35) % 360);
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSlowAutoSpinning]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      SpeechService.stop();
    };
  }, []);

  // Compute active season based on rotationAngle
  const normalizedAngle = ((rotationAngle % 360) + 360) % 360;

  const getActiveSeasonKey = (): SeasonId => {
    if (normalizedAngle >= 315 || normalizedAngle < 45) return 'primavara';
    if (normalizedAngle >= 45 && normalizedAngle < 135) return 'vara';
    if (normalizedAngle >= 135 && normalizedAngle < 225) return 'toamna';
    return 'iarna';
  };

  const activeSeasonKey = getActiveSeasonKey();
  const currentSeason = SEASONS[activeSeasonKey];

  // Rotate to specific season quarter
  const rotateToSeason = (seasonId: SeasonId | string) => {
    setIsSlowAutoSpinning(false);
    let target = 0;
    switch (seasonId) {
      case 'primavara':
        target = 0;
        break;
      case 'vara':
        target = 90;
        break;
      case 'toamna':
        target = 180;
        break;
      case 'iarna':
        target = 270;
        break;
    }
    soundEngine.playPop();
    setRotationAngle(target);
  };

  // Step 90 degrees forward
  const rotateToNextSeason = () => {
    setIsSlowAutoSpinning(false);
    soundEngine.playPop();
    const currentSnapped = Math.round(rotationAngle / 90) * 90;
    const nextAngle = currentSnapped + 90;
    setRotationAngle(nextAngle);
    soundEngine.playChime();
  };

  // Calendar sync: identify today's real month
  const syncWithRealCalendar = () => {
    setIsSlowAutoSpinning(false);
    const month = new Date().getMonth(); // 0-11
    let targetSeason: SeasonId = 'primavara';

    if (month >= 2 && month <= 4) {
      targetSeason = 'primavara';
    } else if (month >= 5 && month <= 7) {
      targetSeason = 'vara';
    } else if (month >= 8 && month <= 10) {
      targetSeason = 'toamna';
    } else {
      targetSeason = 'iarna';
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
      () => setIsSpeaking(true),
      `season_${currentSeason.id}`
    );
  };

  // Pointer/Touch rotation
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
      const snapped = Math.round(currentAngleRef.current / 90) * 90;
      setRotationAngle(snapped);
      soundEngine.playChime();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Interactive Title Banner */}
      <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-amber-300 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center border-2 border-amber-300 shadow-xs text-amber-800">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Roata Fermecată a Anului
            </h1>
            <p className="text-xs sm:text-sm text-amber-900 font-semibold">
              Rotește discul cu Nuca și privește prin fereastra magică cum se schimbă natura!
            </p>
          </div>
        </div>

        {/* Sync with Today's Calendar Button */}
        <button
          id="calendar-sync-btn"
          onClick={syncWithRealCalendar}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-amber-100/90 hover:bg-amber-200 text-amber-950 border-2 border-amber-300 transition-transform active:scale-95 shadow-xs"
          title="Unde este Nuca în calendarul de azi?"
        >
          <Calendar className="w-4 h-4 text-amber-800" />
          <span>Unde e Nuca azi? (Calendar) 📅</span>
        </button>
      </div>

      {/* Main Wheel Playground & Info Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Top: The Interactive 2-Disc Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Wheel Frame Platform */}
          <div className="relative p-3 sm:p-4 bg-gradient-to-br from-amber-200 via-orange-100 to-amber-200 rounded-full border-4 border-amber-400 shadow-2xl">
            {/* The Outer Base Disc */}
            <div
              ref={wheelContainerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] cursor-grab active:cursor-grabbing touch-none select-none rounded-full"
              title="Trage cu degetul sau mouse-ul pentru a roti roata fermecată!"
            >
              {/* Layer 1: Base Season Disc (4 seasons) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <BaseDiscSVG size={380} className="w-full h-full" />
              </div>

              {/* Layer 2: Rotating Small Cover Disc with cutout window and cute Nuca */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <SmallTopDiscSVG size={315} className="w-[82%] h-[82%]" />
              </div>

              {/* Layer 3: Optional Pedagogical Extension: Fixed Nuca Pointer on Rim */}
              {hasPointerExtension && (
                <div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none filter drop-shadow-md"
                  title="Nuca fixă arată anotimpul activ"
                >
                  <div className="flex flex-col items-center">
                    <NucaCharacter pose="pointing" size={54} />
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-amber-600 -mt-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Touch / Drag hint badge */}
          <p className="text-xs text-amber-900 font-bold mt-4 flex items-center gap-1.5 bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-300 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Trage de roată cu degetul sau apasă butoanele de mai jos!
          </p>

          {/* Wheel Control Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button
              id="next-quarter-btn"
              onClick={rotateToNextSeason}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform active:scale-95 border-2 border-amber-600"
            >
              <RotateCw className="w-4 h-4" />
              Rotește la următorul sfert!
            </button>

            <button
              id="slow-spin-toggle-btn"
              onClick={() => {
                soundEngine.playPop();
                setIsSlowAutoSpinning(!isSlowAutoSpinning);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all border-2 ${
                isSlowAutoSpinning
                  ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102'
                  : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-300 shadow-xs'
              }`}
            >
              {isSlowAutoSpinning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isSlowAutoSpinning ? 'Oprește rotirea' : 'Rotește singură (ca în poveste)'}</span>
            </button>
          </div>

          {/* Extension feature toggle from story */}
          <div className="mt-3">
            <label className="inline-flex items-center gap-2 text-xs font-bold text-amber-950 bg-white/90 px-3.5 py-1.5 rounded-xl border border-amber-300 cursor-pointer select-none shadow-2xs">
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
              <span>Indicator: Nuca arată prin fereastră</span>
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
              const emoji =
                sId === 'primavara'
                  ? '🌸'
                  : sId === 'vara'
                  ? '☀️'
                  : sId === 'toamna'
                  ? '🍂'
                  : '❄️';
              return (
                <button
                  key={sId}
                  id={`season-pill-${sId}`}
                  onClick={() => rotateToSeason(sId)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5 border-2 ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-md border-amber-600 scale-105'
                      : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200 shadow-2xs'
                  }`}
                >
                  <span className="text-sm">{emoji}</span>
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Season Card */}
          <div
            className={`p-6 sm:p-7 rounded-3xl border-3 transition-all shadow-xl bg-gradient-to-br ${currentSeason.bgGradient} border-amber-300 relative storybook-card`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${currentSeason.badgeColor}`}>
                  {currentSeason.temperature}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-2">
                  {currentSeason.title}
                </h2>
              </div>

              {/* Nuca Avatar for this season */}
              <div
                className="shrink-0 bg-white/95 p-2 rounded-2xl border-2 border-amber-300 shadow-md cursor-pointer group"
                title="Apasă pe Nuca pentru o reacție simpatică!"
              >
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
                  size={70}
                />
              </div>
            </div>

            {/* Nuca's Story Quote Bubble */}
            <div className="mt-4 p-4 bg-white/95 rounded-2xl border-l-4 border-amber-500 shadow-xs flex items-center gap-3">
              <span className="text-2xl shrink-0">💬</span>
              <p className="text-base sm:text-lg font-bold text-amber-950 italic">
                „{currentSeason.quote}”
              </p>
            </div>

            {/* Nature Description */}
            <div className="mt-4 space-y-3">
              <div className="bg-white/85 p-4 rounded-2xl border border-amber-200">
                <p className="text-xs font-black uppercase text-amber-800 mb-1 flex items-center gap-1.5">
                  <span>🌲</span> Ce se întâmplă în pădure:
                </p>
                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                  {currentSeason.natureDescription}
                </p>
              </div>

              <div className="bg-white/85 p-4 rounded-2xl border border-amber-200">
                <p className="text-xs font-black uppercase text-amber-800 mb-1 flex items-center gap-1.5">
                  <span>🐿️</span> Ce face Nuca:
                </p>
                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                  {currentSeason.nucaActivity}
                </p>
              </div>
            </div>

            {/* Months in Romanian */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" /> Lunile:
              </span>
              {currentSeason.months.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1 bg-white/95 text-slate-800 text-xs font-extrabold rounded-xl border border-amber-200 shadow-2xs"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Action Bar: Audio and Nature sounds */}
            <div className="mt-5 pt-4 border-t-2 border-amber-200 flex flex-wrap items-center justify-between gap-3">
              <button
                id="speak-season-btn"
                onClick={speakSeason}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-xs transition-all active:scale-95 ${
                  isSpeaking
                    ? 'bg-amber-500 text-white animate-pulse shadow-amber-300'
                    : 'bg-white hover:bg-amber-50 text-amber-950 border-2 border-amber-300'
                }`}
              >
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>{isSpeaking ? 'Oprește vocea' : 'Ascultă povestea sezonului 🔊'}</span>
              </button>

              <button
                id="sound-effect-season-btn"
                onClick={() => {
                  if (currentSeason.soundType === 'birds') soundEngine.playSpringBirds();
                  else if (currentSeason.soundType === 'splash') soundEngine.playSummerSplash();
                  else if (currentSeason.soundType === 'leaves') soundEngine.playAutumnLeaves();
                  else if (currentSeason.soundType === 'wind') soundEngine.playWinterWind();
                }}
                className="flex items-center gap-2 px-3.5 py-2.5 bg-white/95 hover:bg-amber-50 text-amber-950 text-xs font-extrabold rounded-2xl border-2 border-amber-300 shadow-2xs transition-colors active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                Sunetul naturii
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
