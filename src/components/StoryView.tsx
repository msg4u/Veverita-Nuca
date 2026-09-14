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
      {/* Top Story Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm border border-amber-300">
            {currentPageIndex + 1}
          </span>
          <span className="text-sm font-semibold text-amber-900">
            din {STORY_PAGES.length} capitole
          </span>
          {season && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${season.badgeColor}`}>
              {season.name}
            </span>
          )}
        </div>

        {/* Read to Me Button */}
        <div className="flex items-center gap-2">
          <button
            id="read-aloud-btn"
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              isReading
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
            }`}
          >
            {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
            <span>{isReading ? 'Oprește lectura' : 'Citește-mi povestea'}</span>
          </button>

          <button
            id="story-sound-toggle"
            onClick={toggleSound}
            aria-label="Comută sunetele"
            className="p-2 rounded-xl text-amber-700 hover:bg-amber-100 transition-colors border border-amber-200"
            title={isSoundMuted ? 'Activează sunetul' : 'Dezactivează sunetul'}
          >
            {isSoundMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Story Card (Booklet Style) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-xl overflow-hidden relative">
        {/* Decorative corner leaves */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-50 blur-lg pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-full opacity-50 blur-lg pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left / Top: Interactive Visual Scene */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/70 to-orange-50/40 rounded-2xl border border-amber-100">
            {currentPage.illustrationType === 'intro' && (
              <div className="text-center space-y-3">
                <NucaCharacter pose="happy" size={150} />
                <div className="bg-amber-100/90 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Nuca și Roata Anului
                </div>
              </div>
            )}

            {currentPage.illustrationType === 'primavara' && (
              <div className="text-center space-y-3">
                <NucaCharacter pose="happy" size={145} />
                <div className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-emerald-200">
                  🌸 Copaci înfloriți & ploaie blândă
                </div>
              </div>
            )}

            {currentPage.illustrationType === 'vara' && (
              <div className="text-center space-y-3">
                <NucaCharacter pose="swimming" size={145} />
                <div className="bg-yellow-100 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-yellow-200">
                  ☀️ Nuca se scaldă în râu
                </div>
              </div>
            )}

            {currentPage.illustrationType === 'toamna' && (
              <div className="text-center space-y-3">
                <NucaCharacter pose="collecting" size={145} />
                <div className="bg-orange-100 text-orange-900 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-orange-200">
                  🍂 Strângând alune aurii
                </div>
              </div>
            )}

            {currentPage.illustrationType === 'iarna' && (
              <div className="text-center space-y-3">
                <NucaCharacter pose="sleeping" size={145} />
                <div className="bg-sky-100 text-sky-900 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-sky-200">
                  ❄️ Somn dulce în scorbură
                </div>
              </div>
            )}

            {currentPage.illustrationType === 'cycle' && (
              <div className="text-center space-y-3">
                <NucaCharacter pose="pointing" size={145} />
                <div className="bg-purple-100 text-purple-900 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-purple-200">
                  🔄 Ciclul fermecat se repetă!
                </div>
              </div>
            )}

            {/* Sound trigger button */}
            <button
              id={`sound-effect-btn-${currentPage.id}`}
              onClick={() => playPageSound(currentPage.soundEffect)}
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-200 shadow-sm transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              Ascultă sunetul naturii
            </button>
          </div>

          {/* Right: Story Text and Quotes */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                {currentPage.subtitle}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display mt-0.5">
                {currentPage.title}
              </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
              {currentPage.text}
            </p>

            {currentPage.nucaQuote && (
              <div className="p-4 bg-amber-50 rounded-2xl border-l-4 border-amber-500 text-amber-950 italic text-base md:text-lg font-semibold shadow-xs">
                {currentPage.nucaQuote}
              </div>
            )}

            {/* Prompt question for the child */}
            {currentPage.questionPrompt && (
              <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-emerald-800 uppercase">Întrebare pentru tine:</p>
                  <p className="text-sm font-semibold text-emerald-950 mt-0.5">
                    {currentPage.questionPrompt}
                  </p>
                </div>
              </div>
            )}

            {/* Context action */}
            {currentPage.seasonId && (
              <div className="pt-2">
                <button
                  id={`go-to-wheel-btn-${currentPage.seasonId}`}
                  onClick={() => onGoToWheel(currentPage.seasonId)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 bg-amber-100/60 hover:bg-amber-100 px-3.5 py-1.5 rounded-xl transition-colors border border-amber-200"
                >
                  <Compass className="w-4 h-4 text-amber-600" />
                  Vezi acest anotimp pe Roata Magică →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Pagination Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <button
            id="prev-page-btn"
            onClick={goToPrevPage}
            disabled={currentPageIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              currentPageIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Pagina dinainte
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-1.5">
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
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentPageIndex
                    ? 'w-7 bg-amber-500'
                    : 'w-2.5 bg-slate-200 hover:bg-amber-300'
                }`}
              />
            ))}
          </div>

          {currentPageIndex < STORY_PAGES.length - 1 ? (
            <button
              id="next-page-btn"
              onClick={goToNextPage}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform active:scale-95"
            >
              Următoarea
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="finish-story-btn"
              onClick={() => {
                soundEngine.playSuccessFanfare();
                onGoToWheel();
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-transform active:scale-95"
            >
              Încearcă Roata!
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
