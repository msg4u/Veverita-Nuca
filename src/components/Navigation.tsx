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
    { id: 'story' as TabType, label: 'Povestea', fullLabel: 'Povestea lui Nuca', icon: BookOpen, color: 'text-emerald-700' },
    { id: 'wheel' as TabType, label: 'Roata Magică', fullLabel: 'Roata Magică', icon: Compass, color: 'text-amber-700' },
    { id: 'craft' as TabType, label: 'Atelier DIY', fullLabel: 'Construiește Roata', icon: Scissors, color: 'text-orange-700' },
    { id: 'games' as TabType, label: 'Jocuri', fullLabel: 'Jocul Anotimpurilor', icon: Gamepad2, color: 'text-indigo-700' },
    { id: 'guide' as TabType, label: 'Părinți', fullLabel: 'Ghid Părinți & Educatori', icon: HelpCircle, color: 'text-teal-700' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div
          onClick={() => {
            soundEngine.playChime();
            onSelectTab('story');
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          title="Mergi la începutul poveștii"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-100 flex items-center justify-center border-2 border-amber-300 group-hover:scale-105 transition-transform shadow-xs">
            <NucaCharacter pose="happy" size={38} />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-display block leading-tight">
              Veverița Nuca
            </span>
            <span className="text-[11px] font-bold text-amber-700 block -mt-0.5">
              și Roata Fermecată a Anului
            </span>
          </div>
        </div>

        {/* Tab Buttons (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1.5">
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
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm scale-102'
                    : 'bg-transparent hover:bg-amber-50 text-slate-700 border-transparent hover:border-amber-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                <span>{tab.fullLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side: Sound toggle */}
        <div className="flex items-center gap-2">
          <button
            id="global-sound-toggle-btn"
            onClick={onToggleMute}
            aria-label="Activează sau oprește sunetele"
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              isMuted
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
            }`}
            title={isMuted ? 'Sunet oprit. Apasă pentru a porni.' : 'Sunet activ.'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
            <span className="hidden sm:inline">{isMuted ? 'Mut' : 'Sunet'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom-bar style navigation */}
      <div className="flex md:hidden items-center justify-around border-t border-amber-100 bg-amber-50/70 px-1 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-tab-${tab.id}`}
              onClick={() => {
                soundEngine.playPop();
                onSelectTab(tab.id);
              }}
              className={`flex flex-col items-center py-1 px-2 rounded-xl text-[11px] font-bold transition-all ${
                isActive ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
