import React, { useState } from 'react';
import { PARENT_QUESTIONS } from '../data/storyData';
import { soundEngine, SpeechService } from '../utils/soundEffects';
import {
  HelpCircle,
  BookOpen,
  Compass,
  Lightbulb,
  Heart,
  Volume2,
  VolumeX,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ParentGuideView: React.FC = () => {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string>('q1');
  const [readingQuestionId, setReadingQuestionId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    soundEngine.playPop();
    setExpandedQuestionId((prev) => (prev === id ? '' : id));
  };

  const readQuestion = (text: string, qId: string) => {
    if (readingQuestionId === qId) {
      SpeechService.stop();
      setReadingQuestionId(null);
      return;
    }
    soundEngine.playPop();
    setReadingQuestionId(qId);
    SpeechService.speak(
      text,
      () => setReadingQuestionId(null),
      () => setReadingQuestionId(qId),
      `parent_${qId}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border-2 border-amber-200 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          Pedagogie & Ghidaj pentru Adulți
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">
          Ghid pentru Părinți și Educatori
        </h1>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          Cum transformi povestea și roata lui Nuca într-o experiență profundă de învățare pentru copiii de 4-7 ani.
        </p>
      </div>

      {/* 1. Pedagogical Concept: Time & Cyclicity */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 md:p-8 rounded-3xl border-2 border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-200/80 flex items-center justify-center text-amber-900 shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Legătura Poveste — Concept (Pentru tine, ca adult ghid)
            </h2>
            <span className="text-xs font-bold text-amber-800 uppercase">
              Trecerea de la timpul abstract la timpul concret
            </span>
          </div>
        </div>

        <div className="text-slate-800 text-sm md:text-base font-medium space-y-3 leading-relaxed">
          <p>
            Povestea introduce ideea centrală de <strong>ciclicitate</strong> — anotimpurile nu au un „sfârșit” definitiv,
            ci se reiau la nesfârșit, exact ca roata lui Nuca care nu se oprește niciodată din rotit.
          </p>
          <p>
            Pentru copiii de 4-7 ani, noțiunea de timp liniar („acum 6 luni”, „anul trecut”, „la anul”) este foarte abstractă.
            Manipulând <strong>o roată fizică pe care o pot roti chiar ei</strong>, copiii înțeleg organic că după Iarnă
            nu se termină totul, ci revine negreșit Primăvara cu florile ei.
          </p>
        </div>

        <div className="p-4 bg-white/90 rounded-2xl border border-amber-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-amber-950 font-semibold leading-snug">
            <strong>Efect psihologic benefic:</strong> Sentimentul de predictibilitate și siguranță emoțională — Nuca știe că,
            oricât de rece ar fi iarna, roata se va roti mereu mai departe, aducând din nou căldura și florile.
          </p>
        </div>
      </div>

      {/* 2. Guiding Questions with Child */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <span>💬 Cum ghidezi activitatea (Întrebări legate de poveste)</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            Folosește aceste întrebări deschise în timp ce construiți roata sau când citiți povestea:
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {PARENT_QUESTIONS.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="rounded-2xl border-2 border-amber-100 overflow-hidden bg-slate-50/50 transition-all"
              >
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/50 select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ?
                    </span>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                      <span className="text-[11px] font-bold text-amber-700">
                        Vârstă recomandată: {q.ageRecommendation}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        readQuestion(q.question, q.id);
                      }}
                      className={`p-1.5 rounded-lg transition-all ${
                        readingQuestionId === q.id
                          ? 'bg-rose-100 text-rose-700 animate-pulse'
                          : 'hover:bg-amber-100 text-amber-700'
                      }`}
                      title={readingQuestionId === q.id ? 'Oprește lectura' : 'Citește întrebarea'}
                    >
                      {readingQuestionId === q.id ? (
                        <VolumeX className="w-4 h-4 text-rose-700" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-amber-100/60 bg-white space-y-3 text-xs md:text-sm">
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                      <p className="font-bold text-amber-900 uppercase text-[10px] mb-0.5">
                        Scopul pedagogic:
                      </p>
                      <p className="text-slate-700 font-medium">
                        {q.purpose}
                      </p>
                    </div>

                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
                      <p className="font-bold text-emerald-900 uppercase text-[10px] mb-0.5">
                        Cum formulezi dialogul cu copilul:
                      </p>
                      <p className="text-slate-700 font-medium">
                        {q.suggestedDiscussion}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Daily Routine & Pedagogical Tips */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
          <span>📅 Cum folosim Roata lui Nuca în fiecare zi</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h3 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-700" />
              Ritualul de dimineață („Întâlnirea de dimineață”)
            </h3>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              La grădiniță sau acasă, așezați roata pe perete sau pe frigider. În fiecare dimineață, copilul verifică
              dacă Nuca se află în anotimpul potrivit și observă schimbările de afară (plouă, e soare, cad frunzele).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
            <h3 className="text-sm font-bold text-teal-950 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-700" />
              Observarea naturii la plimbare
            </h3>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Când ieșiți în parc, invitați copilul să fie „veveriță isteață”: să caute ghinde, să asculte foșnetul frunzelor,
              să observe mugurii copacilor sau să simtă apa rece a râului.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
