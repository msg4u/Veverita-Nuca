import React from 'react';
import { NucaCharacter } from './NucaCharacter';
import { soundEngine } from '../utils/soundEffects';
import {
  BookOpen,
  Compass,
  Scissors,
  Gamepad2,
  HelpCircle,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';

export type TabType = 'story' | 'wheel' | 'craft' | 'games' | 'guide';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  isMuted,
  onToggleMute,
}) => {
  const tabs = [
    {
      id: 'story' as TabType,
      label: 'Povestea',
      fullLabel: 'Povestea lui Nuca',
      icon: BookOpen,
      iconEmoji: '📖',
      color: 'from-emerald-500 to-teal-600',
      activeBg: 'bg-emerald-500 text-white shadow-emerald-200',
    },
    {
      id: 'wheel' as TabType,
      label: 'Roata Magică',
      fullLabel: 'Roata Magică',
      icon: Compass,
      iconEmoji: '🎡',
      color: 'from-amber-500 to-orange-600',
      activeBg: 'bg-amber-500 text-white shadow-amber-200',
    },
    {
      id: 'craft' as TabType,
      label: 'Atelier DIY',
      fullLabel: 'Construiește Roata',
      icon: Scissors,
      iconEmoji: '✂️',
      color: 'from-orange-500 to-rose-600',
      activeBg: 'bg-orange-500 text-white shadow-orange-200',
    },
    {
      id: 'games' as TabType,
      label: 'Jocuri',
      fullLabel: 'Jocul Ghicitorilor',
      icon: Gamepad2,
      iconEmoji: '🌰',
      color: 'from-indigo-500 to-purple-600',
      activeBg: 'bg-indigo-500 text-white shadow-indigo-200',
    },
    {
      id: 'guide' as TabType,
      label: 'Părinți',
      fullLabel: 'Ghid Pedagogic',
      icon: HelpCircle,
      iconEmoji: '🌱',
      color: 'from-teal-500 to-cyan-600',
      activeBg: 'bg-teal-600 text-white shadow-teal-200',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-300 shadow-sm transition-colors">
      {/* Top playful seasonal color ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-amber-400 via-orange-400 to-sky-400" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Brand / Logo with cute animated Nuca */}
        <div
          onClick={() => {
            soundEngine.playChime();
            onSelectTab('story');
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          title="Mergi la coperta poveștii"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center border-2 border-amber-400 group-hover:scale-105 group-hover:rotate-3 transition-all shadow-sm">
            <NucaCharacter pose="happy" size={42} />
            <span className="absolute -top-1 -right-1 text-xs">✨</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-display block leading-tight group-hover:text-amber-700 transition-colors">
                Veverița Nuca
              </span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded-full border border-amber-300 hidden sm:inline-block">
                4-7 ani
              </span>
            </div>
            <span className="text-[11px] font-bold text-amber-800 block -mt-0.5">
              și Roata Fermecată a Anului 🌰
            </span>
          </div>
        </div>

        {/* Tab Buttons (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-amber-50/80 p-1 rounded-2xl border border-amber-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => {
                  soundEngine.playPop();
                  onSelectTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? `${tab.activeBg} shadow-md scale-105`
                    : 'text-slate-700 hover:text-amber-900 hover:bg-white/90'
                }`}
              >
                <span>{tab.iconEmoji}</span>
                <span>{tab.fullLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side: Sound toggle with cute badge */}
        <div className="flex items-center gap-2">
          <button
            id="global-sound-toggle-btn"
            onClick={onToggleMute}
            aria-label="Activează sau oprește sunetele"
            className={`px-3 py-2 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-bold shadow-xs active:scale-95 ${
              isMuted
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300'
                : 'bg-amber-100/80 hover:bg-amber-100 text-amber-950 border-amber-300'
            }`}
            title={isMuted ? 'Sunet oprit. Apasă pentru a porni.' : 'Sunet activ. Apasă pentru a opri.'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
            <span className="hidden sm:inline font-bold">{isMuted ? 'Sunet oprit' : 'Sunet activ'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom-bar style navigation */}
      <div className="flex md:hidden items-center justify-around border-t border-amber-200/80 bg-amber-50/90 px-1 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-tab-${tab.id}`}
              onClick={() => {
                soundEngine.playPop();
                onSelectTab(tab.id);
              }}
              className={`flex flex-col items-center py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-sm scale-105'
                  : 'text-slate-700 hover:text-amber-900'
              }`}
            >
              <span className="text-base leading-none mb-0.5">{tab.iconEmoji}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
