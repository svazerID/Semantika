import React, { useState, useEffect } from 'react';
import { QuizQuestion, Language } from '../types';
import { translations } from '../data/translations';
import { quizQuestions } from '../data/quizData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Trophy,
  Award,
  Sparkles
} from 'lucide-react';

interface QuizViewProps {
  lang: Language;
}

const LOCAL_STORAGE_KEY = 'semantika_quiz_progress';

export const QuizView: React.FC<QuizViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
        if (typeof parsed.score === 'number') setScore(parsed.score);
      }
    } catch {
      // ignore
    }
  }, []);

  const currentQuestion: QuizQuestion = quizQuestions[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptionId) return;

    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    const newScore = isCorrect ? score + 1 : score;
    const updatedAnswers = { ...userAnswers, [currentQuestion.id]: selectedOptionId };

    setScore(newScore);
    setUserAnswers(updatedAnswers);
    setIsSubmitted(true);

    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ score: newScore, userAnswers: updatedAnswers })
      );
    } catch {
      // ignore
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setUserAnswers({});
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header section */}
      <section className="text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          {t.quizTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.quizDesc}
        </p>
      </section>

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6 space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span>
              {lang === 'id' ? `Pertanyaan ${currentIndex + 1} dari ${quizQuestions.length}` : `Question ${currentIndex + 1} of ${quizQuestions.length}`}
            </span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {score} {lang === 'id' ? 'jawaban benar' : 'correct answers'}
            </span>
          </div>

          {/* Scenario box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {t.scenarioLabel}:
            </span>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {currentQuestion.scenario[lang]}
            </p>
          </div>

          {/* Question title */}
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              {currentQuestion.question[lang]}
            </h2>

            {currentQuestion.codeSnippet && (
              <pre className="p-3 bg-slate-950 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto mb-4 border border-slate-800">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.id === currentQuestion.correctOptionId;

              let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 text-slate-800 dark:text-slate-200';

              if (isSelected && !isSubmitted) {
                optionStyle = 'border-blue-500 ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-white font-semibold';
              }

              if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 font-semibold';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-800 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-3.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <span className="font-mono">{opt.text[lang]}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Submission */}
          {isSubmitted && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              selectedOptionId === currentQuestion.correctOptionId
                ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                {selectedOptionId === currentQuestion.correctOptionId ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.correct}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>{t.incorrect}</span>
                  </>
                )}
              </div>
              <p className="mt-1">{currentQuestion.explanation[lang]}</p>
            </div>
          )}

          {/* Controls Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            {!isSubmitted ? (
              <button
                disabled={!selectedOptionId}
                onClick={handleConfirmAnswer}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                Kirim Jawaban
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>{currentIndex + 1 === quizQuestions.length ? t.finishQuiz : t.nextQuestion}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Score Card */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {lang === 'id' ? 'Selamat! Anda Telah Menyelesaikan Kuis' : 'Congratulations! Quiz Completed'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'id' ? 'Hasil pemahaman semantic HTML Anda tercatat di bawah ini:' : 'Your semantic HTML evaluation breakdown:'}
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 max-w-sm mx-auto">
            <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
              {t.quizScore}
            </span>
            <div className="text-4xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
              {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">
              {score} dari {quizQuestions.length} soal terjawab dengan tepat.
            </p>
          </div>

          <button
            onClick={handleRetake}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.retakeQuiz}</span>
          </button>
        </div>
      )}
    </div>
  );
};
