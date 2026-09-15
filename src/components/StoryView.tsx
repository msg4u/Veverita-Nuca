import React, { useState, useEffect } from 'react';
import { STORY_PAGES, SEASONS } from '../data/storyData';
import { NucaCharacter } from './NucaCharacter';
import { soundEngine, SpeechService } from '../utils/soundEffects';
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  Compass,
  Heart,
  Music,
} from 'lucide-react';

interface StoryViewProps {
  onGoToWheel: (seasonId?: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ onGoToWheel }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(soundEngine.getMuted());

  const currentPage = STORY_PAGES[currentPageIndex];
  const season = currentPage.seasonId ? SEASONS[currentPage.seasonId] : null;

  useEffect(() => {
    return () => {
      SpeechService.stop();
    };
  }, []);

  const playPageSound = (effect: string) => {
    switch (effect) {
      case 'magic':
      case 'cycle':
        soundEngine.playChime();
        break;
      case 'birds':
        soundEngine.playSpringBirds();
        break;
      case 'splash':
        soundEngine.playSummerSplash();
        break;
      case 'leaves':
        soundEngine.playAutumnLeaves();
        break;
      case 'wind':
        soundEngine.playWinterWind();
        break;
      default:
        soundEngine.playPop();
    }
  };

  const handleReadAloud = () => {
    if (isReading) {
      SpeechService.stop();
      setIsReading(false);
      return;
    }

    const fullTextToRead = `${currentPage.title}. ${currentPage.text} ${currentPage.nucaQuote || ''}`;
    setIsReading(true);
    playPageSound(currentPage.soundEffect);

    SpeechService.speak(
      fullTextToRead,
      () => {
        setIsReading(false);
      },
      () => {
        setIsReading(true);
      }
    );
  };

  const goToNextPage = () => {
    SpeechService.stop();
    setIsReading(false);
    soundEngine.playPop();
    if (currentPageIndex < STORY_PAGES.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    SpeechService.stop();
    setIsReading(false);
    soundEngine.playPop();
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const toggleSound = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    soundEngine.setMuted(nextState);
    if (nextState) {
      SpeechService.stop();
      setIsReading(false);
    } else {
      soundEngine.playPop();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Story Controls Bar */}
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-amber-300 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center font-black text-amber-900 border border-amber-300 shadow-xs text-base">
            {currentPageIndex + 1}
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              Capitolul {currentPageIndex + 1} din {STORY_PAGES.length}
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              {currentPage.subtitle}
            </span>
          </div>
          {season && (
            <span className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-black border shadow-xs ${season.badgeColor}`}>
              {season.name}
            </span>
          )}
        </div>

        {/* Read to Me Button & Sound Controls */}
        <div className="flex items-center gap-2">
          <button
            id="read-aloud-btn"
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all shadow-sm active:scale-95 ${
              isReading
                ? 'bg-amber-500 text-white animate-pulse shadow-amber-300'
                : 'bg-amber-100/90 hover:bg-amber-200 text-amber-950 border-2 border-amber-300 hover:border-amber-400'
            }`}
          >
            {isReading ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-amber-800" />}
            <span>{isReading ? 'Oprește lectura' : 'Citește-mi povestea! 🔊'}</span>
          </button>

          <button
            id="story-sound-toggle"
            onClick={toggleSound}
            aria-label="Comută sunetele"
            className="p-2.5 rounded-2xl text-amber-800 hover:bg-amber-100 transition-colors border-2 border-amber-300 bg-white"
            title={isSoundMuted ? 'Activează sunetul' : 'Dezactivează sunetul'}
          >
            {isSoundMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-amber-700" />}
          </button>
        </div>
      </div>

      {/* Main Story Card (Fairy-tale Picture Book Layout) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-3 border-amber-300 shadow-xl overflow-hidden relative storybook-card">
        {/* Decorative corner fairy-tale ornaments */}
        <div className="absolute top-3 left-3 text-amber-400 select-none opacity-40 text-xl pointer-events-none">🌿</div>
        <div className="absolute top-3 right-3 text-amber-400 select-none opacity-40 text-xl pointer-events-none">🌸</div>
        <div className="absolute bottom-3 left-3 text-amber-400 select-none opacity-40 text-xl pointer-events-none">🍂</div>
        <div className="absolute bottom-3 right-3 text-amber-400 select-none opacity-40 text-xl pointer-events-none">❄️</div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left / Top: Interactive Illustrated Stage with Nuca */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl border-2 border-amber-200 relative overflow-hidden shadow-inner bg-gradient-to-b from-amber-50/90 via-orange-50/50 to-amber-100/40">
            {/* Ambient Background Scenery Elements */}
            {currentPage.illustrationType === 'primavara' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
                <div className="absolute -top-4 -left-4 text-3xl animate-float">🌸</div>
                <div className="absolute top-8 right-3 text-2xl animate-float" style={{ animationDelay: '1s' }}>🌱</div>
                <div className="absolute bottom-4 left-6 text-2xl animate-float" style={{ animationDelay: '2s' }}>🌼</div>
                <div className="absolute top-1/2 -right-2 text-xl animate-float" style={{ animationDelay: '1.5s' }}>🦋</div>
              </div>
            )}

            {currentPage.illustrationType === 'vara' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
                <div className="absolute top-2 right-2 text-3xl animate-spin" style={{ animationDuration: '20s' }}>☀️</div>
                <div className="absolute bottom-1 inset-x-0 h-8 bg-sky-200/50 rounded-t-full" />
                <div className="absolute bottom-3 left-4 text-xl">💦</div>
                <div className="absolute bottom-4 right-4 text-xl">🦆</div>
              </div>
            )}

            {currentPage.illustrationType === 'toamna' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
                <div className="absolute top-3 left-3 text-3xl animate-float">🍁</div>
                <div className="absolute top-6 right-4 text-2xl animate-float" style={{ animationDelay: '1.2s' }}>🍂</div>
                <div className="absolute bottom-3 right-5 text-2xl">🍄</div>
                <div className="absolute bottom-3 left-5 text-2xl">🌰</div>
              </div>
            )}

            {currentPage.illustrationType === 'iarna' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75">
                <div className="absolute top-2 left-4 text-2xl animate-float">❄️</div>
                <div className="absolute top-5 right-5 text-2xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
                <div className="absolute bottom-3 right-6 text-xl animate-float" style={{ animationDelay: '2s' }}>🌨️</div>
              </div>
            )}

            {currentPage.illustrationType === 'cycle' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-4 border-dashed border-amber-400 animate-spin" style={{ animationDuration: '30s' }} />
                </div>
              </div>
            )}

            {/* Squirrel Nuca with her cute and funny poses */}
            <div className="relative z-10 text-center space-y-3">
              <NucaCharacter
                pose={
                  currentPage.illustrationType === 'vara'
                    ? 'swimming'
                    : currentPage.illustrationType === 'toamna'
                    ? 'collecting'
                    : currentPage.illustrationType === 'iarna'
                    ? 'sleeping'
                    : currentPage.illustrationType === 'cycle'
                    ? 'pointing'
                    : 'happy'
                }
                size={160}
              />

              {/* Tag below Nuca */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-xs rounded-full text-xs font-black text-amber-900 border border-amber-300 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {currentPage.illustrationType === 'primavara'
                    ? 'Primăvara cu flori și ciripit'
                    : currentPage.illustrationType === 'vara'
                    ? 'Vara la bălăceală în râu!'
                    : currentPage.illustrationType === 'toamna'
                    ? 'Toamna cu alune aurii'
                    : currentPage.illustrationType === 'iarna'
                    ? 'Iarna la somn dulce în scorbură'
                    : currentPage.illustrationType === 'cycle'
                    ? 'Roata fermecată nu se oprește!'
                    : 'Prietenul tău pufos: Nuca!'}
                </span>
              </div>

              {/* Hint to tap Nuca */}
              <p className="text-[11px] font-bold text-amber-700/80">
                ✨ Apasă pe Nuca pentru o bucurie!
              </p>
            </div>

            {/* Sound trigger button */}
            <button
              id={`sound-effect-btn-${currentPage.id}`}
              onClick={() => playPageSound(currentPage.soundEffect)}
              className="mt-3 relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-amber-100/70 text-amber-950 text-xs font-extrabold rounded-xl border-2 border-amber-300 shadow-sm transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
              Ascultă sunetul naturii
            </button>
          </div>

          {/* Right: Story Text and Quotes */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                {currentPage.subtitle}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display mt-2 leading-tight">
                {currentPage.title}
              </h1>
            </div>

            {/* Story Paragraph with comfortable large text for kids */}
            <p className="text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed font-semibold">
              {currentPage.text}
            </p>

            {/* Nuca's Speech Bubble */}
            {currentPage.nucaQuote && (
              <div className="relative p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300 text-amber-950 text-base md:text-lg font-bold shadow-xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl shrink-0">🐿️</span>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 block mb-0.5">
                      Nuca zice zâmbind:
                    </span>
                    <p className="italic">
                      „{currentPage.nucaQuote}”
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Prompt question for the child */}
            {currentPage.questionPrompt && (
              <div className="p-4 bg-emerald-50/90 rounded-2xl border-2 border-emerald-300 flex items-start gap-3 shadow-xs">
                <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                    Ghicitoare & Întrebare pentru tine:
                  </p>
                  <p className="text-sm sm:text-base font-bold text-emerald-950 mt-0.5">
                    {currentPage.questionPrompt}
                  </p>
                </div>
              </div>
            )}

            {/* Direct jump to wheel button */}
            {currentPage.seasonId && (
              <div className="pt-2">
                <button
                  id={`go-to-wheel-btn-${currentPage.seasonId}`}
                  onClick={() => onGoToWheel(currentPage.seasonId)}
                  className="inline-flex items-center gap-2 text-sm font-black text-amber-900 hover:text-amber-950 bg-amber-200/70 hover:bg-amber-300/80 px-4 py-2 rounded-xl transition-all border-2 border-amber-300 active:scale-95 shadow-xs"
                >
                  <Compass className="w-4 h-4 text-amber-700" />
                  <span>Vezi {season?.name} pe Roata Magică →</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Pagination Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-amber-100">
          <button
            id="prev-page-btn"
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-black transition-all border-2 ${
              currentPageIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400 bg-slate-100 border-slate-200'
                : 'text-slate-700 bg-slate-50 hover:bg-amber-100 border-slate-200 hover:border-amber-300 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Înapoi</span>
          </button>

          {/* Chapter Dots */}
          <div className="flex items-center gap-2">
            {STORY_PAGES.map((p, idx) => (
              <button
                key={p.id}
                id={`indicator-dot-${p.id}`}
                onClick={() => {
                  SpeechService.stop();
                  setIsReading(false);
                  soundEngine.playPop();
                  setCurrentPageIndex(idx);
                }}
                aria-label={`Mergi la pagina ${idx + 1}`}
                className={`h-3 rounded-full transition-all ${
                  idx === currentPageIndex
                    ? 'w-8 bg-amber-500 shadow-sm'
                    : 'w-3 bg-amber-200 hover:bg-amber-300'
                }`}
              />
            ))}
          </div>

          {currentPageIndex < STORY_PAGES.length - 1 ? (
            <button
              id="next-page-btn"
              onClick={goToNextPage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform active:scale-95 border-2 border-amber-600"
            >
              <span>Următoarea</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="finish-story-btn"
              onClick={() => {
                soundEngine.playSuccessFanfare();
                onGoToWheel();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-transform active:scale-95 border-2 border-emerald-700"
            >
              <span>Rotește Roata! 🎡</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
