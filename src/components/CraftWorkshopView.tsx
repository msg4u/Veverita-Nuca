import React, { useState } from 'react';
import { CRAFT_MATERIALS, CRAFT_STEPS } from '../data/storyData';
import { BaseDiscSVG, SmallTopDiscSVG } from './SeasonWheelArt';
import { NucaCharacter } from './NucaCharacter';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Printer,
  CheckCircle2,
  Circle,
  Sparkles,
  Scissors,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  Eye,
  Compass,
} from 'lucide-react';

export const CraftWorkshopView: React.FC = () => {
  const [materials, setMaterials] = useState(CRAFT_MATERIALS);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStepTab, setActiveStepTab] = useState(1);
  const [showPrintPreviewModal, setShowPrintPreviewModal] = useState(false);

  const toggleMaterial = (id: string) => {
    soundEngine.playPop();
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ready: !m.ready } : m))
    );
  };

  const allMaterialsReady = materials.every((m) => m.ready);

  const toggleStepCompleted = (stepNum: number) => {
    soundEngine.playPop();
    setCompletedSteps((prev) => {
      const exists = prev.includes(stepNum);
      const updated = exists ? prev.filter((s) => s !== stepNum) : [...prev, stepNum];
      if (!exists && updated.length === CRAFT_STEPS.length) {
        soundEngine.playSuccessFanfare();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
      return updated;
    });
  };

  const handlePrint = () => {
    soundEngine.playPop();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Workshop Header Card */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border-2 border-amber-200 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center border-2 border-amber-300 shrink-0">
              <NucaCharacter pose="happy" size={56} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Atelierul practic DIY
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">
                Construiește Roata Fermecată a lui Nuca!
              </h1>
              <p className="text-sm text-slate-600 font-medium max-w-xl mt-1">
                Copilul devine „ajutorul lui Nuca”, construiește chiar el roata magică,
                apoi o folosește zilnic pentru a urmări unde se află Nuca în povestea anului.
              </p>
            </div>
          </div>

          {/* Quick Print Button */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              id="open-print-preview-btn"
              onClick={() => {
                soundEngine.playPop();
                setShowPrintPreviewModal(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors shadow-xs"
            >
              <Eye className="w-4 h-4 text-amber-700" />
              <span>Vezi Șabloanele</span>
            </button>

            <button
              id="print-templates-btn"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Printează Șabloanele A4</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Materials Checklist */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <span>✂️ Materiale Necesare</span>
              {allMaterialsReady && (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-300">
                  Toate pregătite! 🎉
                </span>
              )}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Bifați materialele pe măsură ce le adunați pe masa de lucru:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {materials.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMaterial(item.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                item.ready
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                  : 'bg-slate-50/60 hover:bg-amber-50/50 border-slate-200'
              }`}
            >
              <button
                id={`material-check-${item.id}`}
                aria-label={`Bifează ${item.name}`}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  item.ready ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-slate-300 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <div>
                <h3 className={`text-sm font-bold ${item.ready ? 'text-emerald-900' : 'text-slate-800'}`}>
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Note for Adults */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3 mt-4">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-amber-950">
            <strong>Pentru adult:</strong> Decuparea ferestrei din cartonul mic și realizarea găurii centrale cu brida se fac cu sprijinul unui adult pentru siguranță.
          </p>
        </div>
      </div>

      {/* 2. Step-by-Step Construction Guide */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              🛠️ Pași de Construcție (Ghid Pas cu Pas)
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Urmați cei 6 pași simpli pentru a asambla roata fermecată:
            </p>
          </div>
          <div className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-auto">
            {completedSteps.length} din {CRAFT_STEPS.length} pași finalizați
          </div>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CRAFT_STEPS.map((step) => {
            const isCompleted = completedSteps.includes(step.stepNumber);
            const isActive = activeStepTab === step.stepNumber;
            return (
              <button
                key={step.stepNumber}
                id={`step-tab-${step.stepNumber}`}
                onClick={() => {
                  soundEngine.playPop();
                  setActiveStepTab(step.stepNumber);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-slate-300 text-slate-700 text-[10px] flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                )}
                <span>Pasul {step.stepNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Card */}
        {(() => {
          const step = CRAFT_STEPS.find((s) => s.stepNumber === activeStepTab) || CRAFT_STEPS[0];
          const isDone = completedSteps.includes(step.stepNumber);

          return (
            <div className="p-6 bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-2xl border-2 border-amber-200/80 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Pasul {step.stepNumber} din {CRAFT_STEPS.length}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display mt-0.5">
                    {step.title}
                  </h3>
                </div>

                <button
                  id={`mark-step-done-${step.stepNumber}`}
                  onClick={() => toggleStepCompleted(step.stepNumber)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-xs shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Pas Finalizat! ✔️' : 'Marchează ca gata'}</span>
                </button>
              </div>

              <p className="text-base text-slate-800 font-medium leading-relaxed">
                {step.instruction}
              </p>

              {step.subInstructions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {step.subInstructions.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white/90 rounded-xl border border-amber-100 text-xs md:text-sm font-semibold text-slate-800 flex items-center gap-2 shadow-2xs"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}

              {step.tip && (
                <div className="p-3.5 bg-yellow-50/90 rounded-xl border border-yellow-200 flex items-start gap-2.5 text-xs md:text-sm font-medium text-yellow-950">
                  <Lightbulb className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <span><strong>Sfat util:</strong> {step.tip}</span>
                </div>
              )}

              {/* Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-amber-200/50">
                <button
                  onClick={() => {
                    if (activeStepTab > 1) {
                      soundEngine.playPop();
                      setActiveStepTab(activeStepTab - 1);
                    }
                  }}
                  disabled={activeStepTab === 1}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                    activeStepTab === 1 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  ← Pasul anterior
                </button>

                <button
                  onClick={() => {
                    if (activeStepTab < CRAFT_STEPS.length) {
                      soundEngine.playPop();
                      setActiveStepTab(activeStepTab + 1);
                    }
                  }}
                  disabled={activeStepTab === CRAFT_STEPS.length}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                    activeStepTab === CRAFT_STEPS.length ? 'opacity-40 cursor-not-allowed text-slate-400' : 'bg-amber-500 text-white hover:bg-amber-600'
                  }`}
                >
                  Următorul pas →
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 3. Practical Tips & Extensions (From the user story) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-300">
            <Lightbulb className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="text-lg font-bold text-amber-950 font-display">
            Sfat Practic de Durabilitate
          </h3>
          <p className="text-xs md:text-sm text-amber-900 font-medium leading-relaxed">
            Dacă vreți ca roata să reziste mai mult timp la manipularea frecventă a copiilor mici (4-7 ani),
            <strong> laminează ambele discuri</strong> înainte de a le prinde cu brida metalică sau acoperă-le
            cu bandă adezivă transparentă lată!
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl border border-teal-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center border border-teal-300">
            <Compass className="w-5 h-5 text-teal-700" />
          </div>
          <h3 className="text-lg font-bold text-teal-950 font-display">
            Extensie: Silueta lui Nuca pe Margine
          </h3>
          <p className="text-xs md:text-sm text-teal-900 font-medium leading-relaxed">
            Adaugă o mică siluetă a lui Nuca, fixă, pe marginea discului mare (ca un ac de ceasornic),
            care arată „unde suntem acum” în povestea anului — întărește ideea de ciclu care se repetă,
            cu Nuca mereu prezentă, doar mediul din jurul ei schimbându-se!
          </p>
        </div>
      </div>

      {/* Print Preview Modal */}
      {showPrintPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Șabloane de Decupat (A4)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Printează aceste 2 discuri pe o coală groasă sau carton.
                </p>
              </div>
              <button
                id="close-print-preview-modal-btn"
                onClick={() => setShowPrintPreviewModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center">
              {/* Disc 1: Baza cu cele 4 anotimpuri */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 flex flex-col items-center">
                <span className="text-xs font-bold text-amber-800 mb-2">
                  Discul 1: Baza (Pădurea cu cele 4 anotimpuri)
                </span>
                <BaseDiscSVG size={220} className="w-52 h-52" />
                <p className="text-[11px] text-slate-500 mt-2 font-medium">
                  Decupează cercul exterior pe linia punctată.
                </p>
              </div>

              {/* Disc 2: Capacul cu fereastra decupabilă */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 flex flex-col items-center">
                <span className="text-xs font-bold text-amber-800 mb-2">
                  Discul 2: Roata fermecată cu fereastra
                </span>
                <SmallTopDiscSVG size={200} className="w-48 h-48" />
                <p className="text-[11px] text-slate-500 mt-2 font-medium">
                  Decupează fereastra marcată pentru a lăsa să se vadă câte un sfert.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                id="modal-cancel-btn"
                onClick={() => setShowPrintPreviewModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Închide
              </button>
              <button
                id="modal-print-btn"
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md"
              >
                <Printer className="w-4 h-4" />
                Printează acum pe hârtie A4
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Printable Sheet for window.print() */}
      <div className="hidden print-only printable-sheet">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 font-display">
            Veverița Nuca și Roata Fermecată a Anului — Șablon de decupat
          </h1>
          <p className="text-xs text-slate-600 mb-6">
            Instrucțiuni: Decupați cele două discuri de-a lungul conturului. Pe discul mic, decupați fereastra liberă. Perforați ambele discuri în centrul marcat și fixați-le cu o agrafă fluture.
          </p>

          <div className="flex justify-center items-center gap-12 mt-6">
            <div>
              <p className="text-xs font-bold mb-2">DISCUL 1 (BAZA - PĂDUREA)</p>
              <BaseDiscSVG size={320} />
            </div>
            <div>
              <p className="text-xs font-bold mb-2">DISCUL 2 (FEREASTRA CU NUCA)</p>
              <SmallTopDiscSVG size={260} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
