import React, { useState } from 'react';
import { QUIZ_QUESTIONS, SEASONS } from '../data/storyData';
import { NucaCharacter } from './NucaCharacter';
import { soundEngine, SpeechService } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Trophy,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
} from 'lucide-react';

export const GamesView: React.FC = () => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, { selectedId: string; isCorrect: boolean }>>({});
  const [gameFinished, setGameFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[activeQuestionIdx];
  const currentAnswer = answeredMap[currentQuestion?.id];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (answeredMap[currentQuestion.id]) return; // already answered

    soundEngine.playPop();
    setSelectedOptionId(optionId);

    setAnsweredMap((prev) => ({
      ...prev,
      [currentQuestion.id]: { selectedId: optionId, isCorrect },
    }));

    if (isCorrect) {
      setScore((s) => s + 1);
      soundEngine.playSuccessFanfare();
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      soundEngine.playAutumnLeaves();
    }
  };

  const handleNextQuestion = () => {
    soundEngine.playPop();
    SpeechService.stop();
    setSelectedOptionId(null);
    if (activeQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setActiveQuestionIdx((i) => i + 1);
    } else {
      setGameFinished(true);
      soundEngine.playSuccessFanfare();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    soundEngine.playChime();
    SpeechService.stop();
    setActiveQuestionIdx(0);
    setSelectedOptionId(null);
    setScore(0);
    setAnsweredMap({});
    setGameFinished(false);
  };

  const readQuestionAudio = () => {
    if (!currentQuestion) return;
    soundEngine.playPop();
    const promptText = currentQuestion.questionAudioText || currentQuestion.prompt;
    SpeechService.speak(promptText);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <div className="bg-white/95 backdrop-blur-sm p-5 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center border border-amber-300">
            <NucaCharacter pose="happy" size={48} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
              Jocul Anotimpurilor cu Nuca
            </h1>
            <p className="text-xs md:text-sm text-amber-800 font-medium">
              Răspunde la ghicitori și adună ghinde de aur pentru cămara veveriței!
            </p>
          </div>
        </div>

        {/* Acorns Score Badge */}
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-300 shadow-xs">
          <span className="text-2xl">🌰</span>
          <div>
            <p className="text-[10px] font-bold text-amber-700 uppercase">Ghinde de aur:</p>
            <p className="text-lg font-black text-amber-950 leading-tight">
              {score} / {QUIZ_QUESTIONS.length}
            </p>
          </div>
        </div>
      </div>

      {!gameFinished ? (
        /* Quiz Card */
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-md space-y-6">
          {/* Question Progress and Audio Prompt */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Întrebarea {activeQuestionIdx + 1} din {QUIZ_QUESTIONS.length}
            </span>

            <button
              id="read-quiz-question-btn"
              onClick={readQuestionAudio}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-lg border border-amber-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              Citește întrebarea
            </button>
          </div>

          {/* Question Text */}
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-display leading-snug">
            {currentQuestion.prompt}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            {currentQuestion.options.map((opt) => {
              const hasAnswered = !!currentAnswer;
              const isSelected = currentAnswer?.selectedId === opt.id;
              const isCorrectOption = opt.isCorrect;

              let btnStyle = 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 text-slate-800';

              if (hasAnswered) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold shadow-xs';
                } else if (isSelected && !isCorrectOption) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-950 opacity-75';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  id={`quiz-opt-${opt.id}`}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between min-h-[140px] select-none ${btnStyle} ${
                    !hasAnswered ? 'cursor-pointer active:scale-95' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-3xl">{opt.icon}</span>
                    {hasAnswered && isCorrectOption && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    )}
                    {hasAnswered && isSelected && !isCorrectOption && (
                      <XCircle className="w-6 h-6 text-rose-500" />
                    )}
                  </div>
                  <span className="text-base font-bold leading-tight">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback section when answered */}
          {currentAnswer && (
            <div
              className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                currentAnswer.isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {currentAnswer.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold">
                  {currentAnswer.isCorrect ? '🎉 Foarte bine!' : '💡 Învață din poveste:'}
                </p>
                <p className="text-xs md:text-sm font-medium leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Next Button */}
          {currentAnswer && (
            <div className="flex justify-end pt-2">
              <button
                id="quiz-next-btn"
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-transform active:scale-95"
              >
                <span>{activeQuestionIdx < QUIZ_QUESTIONS.length - 1 ? 'Următoarea ghicitoare →' : 'Vezi rezultatul! 🏆'}</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Game Completion Card */
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 shadow-xl text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center border-2 border-amber-300 shadow-md">
            <NucaCharacter pose="happy" size={80} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">
              Felicitări, micuț explorator! 🌰
            </h2>
            <p className="text-sm md:text-base text-slate-600 font-medium max-w-md mx-auto">
              Ai adunat <strong>{score} din {QUIZ_QUESTIONS.length}</strong> ghinde de aur! Nuca este foarte mândră de tine și are provizii bogate pentru tot anul!
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-amber-50 px-6 py-3 rounded-2xl border border-amber-200">
            <Trophy className="w-6 h-6 text-amber-600" />
            <span className="text-sm font-bold text-amber-900">
              Diplomă de „Ajutor de nădejde al lui Nuca”
            </span>
          </div>

          <div>
            <button
              id="quiz-restart-btn"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Joacă din nou!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
