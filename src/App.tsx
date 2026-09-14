import React, { useState, useEffect } from 'react';
import { Navigation, TabType } from './components/Navigation';
import { StoryView } from './components/StoryView';
import { MagicWheelView } from './components/MagicWheelView';
import { CraftWorkshopView } from './components/CraftWorkshopView';
import { GamesView } from './components/GamesView';
import { ParentGuideView } from './components/ParentGuideView';
import { SeasonId } from './types';
import { soundEngine, SpeechService } from './utils/soundEffects';
import { NucaCharacter } from './components/NucaCharacter';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('story');
  const [selectedSeasonForWheel, setSelectedSeasonForWheel] = useState<SeasonId>('primavara');
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playPop();
    }
  };

  const handleGoToWheel = (seasonId?: string) => {
    if (seasonId) {
      setSelectedSeasonForWheel(seasonId as SeasonId);
    }
    setActiveTab('wheel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch tab safely stopping speech synthesis
  const handleSelectTab = (tab: TabType) => {
    SpeechService.stop();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Navigation Header */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Arena */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <StoryView onGoToWheel={handleGoToWheel} />
            </motion.div>
          )}

          {activeTab === 'wheel' && (
            <motion.div
              key="wheel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <MagicWheelView initialSeason={selectedSeasonForWheel} />
            </motion.div>
          )}

          {activeTab === 'craft' && (
            <motion.div
              key="craft"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <CraftWorkshopView />
            </motion.div>
          )}

          {activeTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <GamesView />
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ParentGuideView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto py-6 border-t border-amber-200/60 bg-white/70 backdrop-blur-xs text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <NucaCharacter pose="happy" size={28} animate={false} />
            <span className="font-bold text-slate-700">
              Veverița Nuca și Roata Fermecată a Anului
            </span>
          </div>
          <p className="flex items-center gap-1 font-medium">
            Creat cu <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> pentru educația copiilor de 4-7 ani
          </p>
          <div className="text-[11px] text-amber-800 font-semibold bg-amber-100/60 px-2.5 py-1 rounded-full border border-amber-200">
            Ciclul infinit al anotimpurilor ✨
          </div>
        </div>
      </footer>
    </div>
  );
}
