
import { Calculator, CheckCircle2, Home, Loader2, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { playButtonTap, playCompletion, playCorrect, playIncorrect, playTick, playTransition } from '../services/soundService';
import { GameResult, Question } from '../types';

interface GameScreenProps {
  questions: Question[];
  onEndGame: (result: GameResult) => void;
  onExit: () => void;
  initialTime?: number;
  isSaving?: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ questions, onEndGame, onExit, initialTime = 300, isSaving = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [history, setHistory] = useState<Question[]>([]);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const currentQuestion = questions[currentIndex];
  const optionLabels = ['أ', 'ب', 'ج', 'د'];

  useEffect(() => {
    if (isSaving || isTimeUp) return;
    const timer = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(timer); return 0; }
        if (p <= 11) playTick(true); 
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSaving, isTimeUp]);

  useEffect(() => {
    if (timeLeft === 0 && !isTimeUp) { 
      setIsTimeUp(true); 
      playCompletion(false);
      const score = history.filter(q => q.isCorrect).length;
      onEndGame({ score, totalQuestions: questions.length, history });
    }
  }, [timeLeft]);

  const handleOptionSelect = (option: string) => {
    if (feedback !== 'none' || isSaving || isTimeUp) return;
    
    playButtonTap();
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    isCorrect ? playCorrect() : playIncorrect();

    const newHistory = [...history, { ...currentQuestion, userAnswer: option, isCorrect }];
    setHistory(newHistory);

    setTimeout(() => {
      if (currentIndex >= questions.length - 1) {
        const score = newHistory.filter(q => q.isCorrect).length;
        playCompletion(score >= questions.length * 0.6);
        onEndGame({ score, totalQuestions: questions.length, history: newHistory });
      } else {
        playTransition();
        setCurrentIndex(p => p + 1);
        setSelectedOption(null);
        setFeedback('none');
      }
    }, 800);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center p-3 sm:p-4 relative font-sans overflow-y-auto w-full">
      
      {isSaving && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-6 text-center">
            <Loader2 size={48} className="text-indigo-600 animate-spin" />
            <p className="text-lg font-black text-indigo-900 mt-4">جاري حفظ نتيجتك وحساب الأوسمة...</p>
        </div>
      )}

      <div className="w-full max-w-md flex flex-col gap-4">
          {/* Header */}
          <div className="w-full flex justify-between items-center bg-white/50 p-2 rounded-2xl border border-white">
            <button onClick={onExit} className="bg-white p-2.5 rounded-xl shadow-sm text-slate-400 active:scale-90 border border-indigo-50">
              <Home size={22} />
            </button>
            
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-indigo-50 font-black ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}>
              <Timer size={18} />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm border border-indigo-100 flex flex-col items-center">
              <span className="text-[8px] font-bold text-slate-400 uppercase">السؤال</span>
              <span className="text-sm font-black text-indigo-600 leading-none">{currentIndex + 1}/{questions.length}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden border-2 border-white shadow-inner">
            <div className="h-full bg-indigo-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>

          {/* Question Card */}
          <div className="bg-white w-full rounded-3xl shadow-xl p-5 sm:p-7 relative border-b-4 border-indigo-100 animate-pop-in">
            <div className="absolute -top-4 right-6 bg-indigo-600 text-white p-2 rounded-xl shadow-md">
              <Calculator size={20} />
            </div>

            <div className="mb-6 mt-2">
              <span className="text-[9px] font-black text-indigo-400 uppercase bg-indigo-50 px-3 py-1 rounded-full mb-3 inline-block border border-indigo-100">
                {currentQuestion.category}
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-800 leading-relaxed text-right">
                {currentQuestion.text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options?.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                
                let btnStyle = "border-slate-100 bg-slate-50 text-slate-700 hover:border-indigo-200";
                if (feedback !== 'none') {
                    if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 scale-[1.02] shadow-sm";
                    else if (isSelected) btnStyle = "border-red-400 bg-red-50 text-red-800 animate-shake";
                    else btnStyle = "opacity-40 border-slate-50 bg-slate-50 grayscale";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    disabled={feedback !== 'none'}
                    className={`w-full p-4 rounded-2xl border-2 text-right font-bold transition-all flex items-center gap-4 active:scale-[0.98] min-h-[64px] ${btnStyle}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 flex-shrink-0 font-black text-sm transition-colors
                      ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400'}`}>
                        {optionLabels[idx]}
                    </div>
                    <span className="flex-1 text-sm sm:text-base">{option}</span>
                    {feedback !== 'none' && isCorrect && <CheckCircle2 className="text-emerald-500" size={24} />}
                  </button>
                );
              })}
            </div>
          </div>
      </div>
    </div>
  );
};

export default GameScreen;
