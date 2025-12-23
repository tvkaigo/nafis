
import React, { useState, useEffect } from 'react';
import { Question, GameResult } from '../types';
import { Timer, Home, Loader2, CheckCircle2, XCircle, FlaskConical } from 'lucide-react';
import { playCorrect, playIncorrect, playTick, playCompletion, playButtonTap, playTransition } from '../services/soundService';

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
        if (p <= 1) { 
          clearInterval(timer); 
          return 0; 
        }
        playTick(p <= 11); 
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
    
    if (isCorrect) {
      setFeedback('correct');
      playCorrect();
    } else {
      setFeedback('incorrect');
      playIncorrect();
    }

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
    }, 1200);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">
      
      {isSaving && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in">
            <Loader2 size={64} className="text-emerald-600 animate-spin" />
            <h2 className="text-2xl font-black text-emerald-900 mt-6">جاري معالجة إجاباتك...</h2>
        </div>
      )}

      {/* Header Info */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6 px-4">
        <button onClick={onExit} className="bg-white p-3 rounded-2xl shadow-sm text-slate-400 hover:text-red-500 transition-all active:scale-90 border border-emerald-50">
          <Home size={24} />
        </button>
        
        <div className="flex flex-col items-center">
            <div className={`text-3xl font-black transition-colors ${timeLeft <= 10 ? 'text-red-600 animate-pulse scale-110' : 'text-emerald-600'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">الوقت المتبقي</div>
        </div>

        <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">سؤال</span>
          <span className="text-lg font-black text-emerald-600">{currentIndex + 1}</span>
          <span className="text-xs font-bold text-slate-300">/ {questions.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-3 bg-emerald-100 rounded-full mb-8 overflow-hidden shadow-inner border border-white">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
      </div>

      {/* Main Question Card */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-6 md:p-10 relative border-b-8 border-emerald-100 animate-pop-in">
        <div className="absolute -top-6 right-10 bg-emerald-600 text-white p-3 rounded-2xl shadow-lg rotate-3">
          <FlaskConical size={24} />
        </div>

        <div className="mb-8">
          <div className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black mb-3 uppercase tracking-widest border border-emerald-100">
            {currentQuestion.category || 'علوم عامة'}
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-relaxed text-right">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options?.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            
            let btnStyle = "border-slate-100 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/30";
            
            if (feedback !== 'none') {
                if (isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-700 ring-4 ring-emerald-100 z-10 scale-[1.02]";
                } else if (isSelected) {
                  btnStyle = "border-red-400 bg-red-50 text-red-700 ring-4 ring-red-100 z-10 animate-shake";
                } else {
                  btnStyle = "opacity-30 border-slate-100 bg-slate-50 pointer-events-none";
                }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                disabled={feedback !== 'none'}
                className={`w-full p-4 md:p-5 rounded-2xl border-2 text-right font-bold text-base md:text-lg transition-all duration-300 flex items-center gap-4 ${btnStyle}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 flex-shrink-0 font-black text-lg transition-colors
                  ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                    {optionLabels[idx]}
                </div>
                <span className="flex-1">{option}</span>
                {feedback !== 'none' && isCorrect && <CheckCircle2 className="text-emerald-500" size={24} />}
                {feedback !== 'none' && isSelected && !isCorrect && <XCircle className="text-red-500" size={24} />}
              </button>
            );
          })}
        </div>

        {/* Floating Feedback */}
        <div className="mt-8 flex justify-center h-6">
            {feedback === 'correct' && (
              <div className="text-emerald-600 font-black flex items-center gap-2 animate-bounce">
                أحسنت! إجابة علمية دقيقة ✨
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="text-red-500 font-black flex items-center gap-2">
                ركز يا بطل، حاول مجدداً في السؤال القادم 💡
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
