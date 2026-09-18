import React, { useState } from 'react';
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
import { Heart, MessageCircle, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('story');
  const [selectedSeasonForWheel, setSelectedSeasonForWheel] = useState<SeasonId>('primavara');
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [companionBubble, setCompanionBubble] = useState<string | null>(null);

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

  const nucaJokes = [
    'Chiț-chiț! Ai văzut unde mi-am ascuns ghindele? 🌰',
    'Primăvara îmi place să număr florile din copaci! 🌸',
    'Vara mă bălăcesc în râu până mi se udă mustățile! 💦',
    'Toamna am cele mai pufoase lăbuțe când strâng alune! 🍂',
    'Iarna dorm dusă în scorbură și visez la soare! ❄️',
    'Rotește roata fermecată ca să vezi magia timpului! 🎡',
  ];

  const handleCompanionClick = () => {
    soundEngine.playSquirrelChirp();
    const jokeIdx = Math.floor(Math.random() * nucaJokes.length);
    const randomJoke = nucaJokes[jokeIdx];
    setCompanionBubble(randomJoke);
    SpeechService.speak(randomJoke, undefined, undefined, `nuca_${jokeIdx + 1}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-slate-800 relative overflow-x-hidden selection:bg-amber-200">
      {/* Whimsical Ambient Forest Particles in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <span className="absolute top-16 left-[5%] text-2xl animate-float" style={{ animationDuration: '6s' }}>🌸</span>
        <span className="absolute top-48 right-[8%] text-2xl animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>🍃</span>
        <span className="absolute top-[60%] left-[3%] text-xl animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }}>🌰</span>
        <span className="absolute top-[75%] right-[6%] text-2xl animate-float" style={{ animationDuration: '9s', animationDelay: '3s' }}>🍁</span>
        <span className="absolute top-[35%] right-[4%] text-lg animate-float" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>✨</span>
        <span className="absolute top-[85%] left-[8%] text-lg animate-float" style={{ animationDuration: '7.5s', animationDelay: '2.5s' }}>❄️</span>
      </div>

      {/* Navigation Header */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Arena */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
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

      {/* Cute Floating Nuca Companion Buddy (Bottom Right) */}
      <div className="no-print fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        {companionBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="relative max-w-xs bg-white p-3.5 rounded-2xl border-2 border-amber-300 shadow-xl text-xs sm:text-sm font-bold text-amber-950 pr-7"
          >
            <button
              onClick={() => setCompanionBubble(null)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Închide mesajul"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p>{companionBubble}</p>
            {/* Little speech bubble arrow pointing to Nuca */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-r-2 border-b-2 border-amber-300 rotate-45" />
          </motion.div>
        )}

        <button
          onClick={handleCompanionClick}
          className="group relative bg-amber-100 hover:bg-amber-200 p-2 rounded-2xl border-2 border-amber-400 shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
          title="Apasă pe Nuca pentru o vorbă veselă!"
          aria-label="Vorbește cu Nuca"
        >
          <NucaCharacter pose="happy" size={46} />
          <span className="hidden sm:inline-block text-xs font-black text-amber-900 pr-1 group-hover:text-amber-950">
            Apasă-mă! 🌰
          </span>
          <span className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white p-1 rounded-full text-[10px] shadow-xs">
            <MessageCircle className="w-3 h-3" />
          </span>
        </button>
      </div>

      {/* Footer */}
      <footer className="no-print mt-auto py-6 border-t-2 border-amber-200/80 bg-white/90 backdrop-blur-xs text-center text-xs text-slate-600 relative z-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <NucaCharacter pose="happy" size={32} animate={false} />
            <span className="font-extrabold text-slate-800">
              Veverița Nuca și Roata Fermecată a Anului
            </span>
          </div>
          <p className="flex items-center gap-1 font-semibold text-slate-600">
            Creat cu <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" /> pentru educația copiilor de 4-7 ani
          </p>
          <div className="text-[11px] text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Ciclul infinit al celor 4 anotimpuri ✨
          </div>
        </div>
      </footer>
    </div>
  );
}
