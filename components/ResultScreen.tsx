
import { Award, Frown, Key, RefreshCcw, Sparkles, Star, Trophy } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { getAiFeedback } from '../services/geminiService';
import { GameResult, getUserDisplayName } from '../types';
// @ts-ignore
import confetti from 'canvas-confetti';

interface ResultScreenProps {
  result: GameResult;
  difficulty: string;
  onRestart: () => void;
  isNewHighScore: boolean;
  userName?: string;
  totalCumulativeScore?: number;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, difficulty, onRestart, isNewHighScore, userName, totalCumulativeScore }) => {
  const [aiMessage, setAiMessage] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const isPerfect = result.score === result.totalQuestions;
    let interval: any = null;
    
    if (isPerfect || isNewHighScore) {
       const duration = 5000;
       const animationEnd = Date.now() + duration;
       const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
       const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

       interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    } else if (result.score >= 4) {
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#10b981', '#059669', '#34d399', '#f59e0b'];
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
        if (Date.now() < end) animationFrameRef.current = requestAnimationFrame(frame);
      };
      frame();
    }

    return () => {
        if (interval) clearInterval(interval);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [result.score, result.totalQuestions, isNewHighScore]);

  let message = "";
  let icon = null;
  let colorClass = "";
  let bgClass = "bg-emerald-50";

  const displayName = userName ? getUserDisplayName(userName) : '';
  const nameSuffix = displayName ? ` يا ${displayName}` : '';

  if (result.score >= 7) {
    message = `عالمة مبدعة${nameSuffix}! 🌟`;
    icon = <Trophy size={56} className="text-yellow-400 drop-shadow-lg" />;
    colorClass = "text-emerald-700";
    bgClass = "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100 via-teal-50 to-white";
  } else if (result.score >= 4) {
    message = `نتيجة رائعة${nameSuffix} 👍`;
    icon = <Star size={56} className="text-emerald-400 drop-shadow-lg" />;
    colorClass = "text-emerald-600";
    bgClass = "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100 via-emerald-50 to-white";
  } else {
    message = `حاول مرة أخرى${nameSuffix}`;
    icon = <Frown size={56} className="text-orange-400" />;
    colorClass = "text-orange-600";
    bgClass = "bg-slate-50";
  }

  const handleAiFeedback = async () => {
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      setNeedsKey(true);
      await window.aistudio.openSelectKey();
      return;
    }
    setLoadingAi(true);
    setNeedsKey(false);
    try {
      const feedback = await getAiFeedback(result.score, result.history, difficulty);
      setAiMessage(feedback);
    } catch (err) {
      console.error(err);
      setAiMessage("أداء مذهل! استمر في التدريب لتكون الأفضل دائماً.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-y-auto relative ${bgClass} transition-colors duration-1000 w-full`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center border-4 border-white animate-pop-in relative z-10 my-4">
        
        {isNewHighScore && (
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce whitespace-nowrap border-2 border-white z-20 text-xs">
            <Award size={18} /> رقم قياسي جديد!
          </div>
        )}

        <div className="mb-4 flex justify-center">{icon}</div>
        <h2 className={`text-2xl font-black mb-2 leading-tight ${colorClass}`}>{message}</h2>

        <div className="my-6 relative">
            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">الدرجة النهائية</div>
            <div className="text-6xl font-black text-emerald-900 drop-shadow-sm flex items-center justify-center">
                {result.score}<span className="text-2xl text-emerald-200">/{result.totalQuestions}</span>
            </div>
            
            {totalCumulativeScore !== undefined && (
              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex items-center justify-center gap-2 animate-fade-in-up">
                 <div className="bg-emerald-100 p-2 rounded-full text-emerald-600"><Sparkles size={16} /></div>
                 <div className="text-xs text-emerald-800 font-bold">الرصيد الإجمالي: <span className="text-base">{totalCumulativeScore}</span> نقطة</div>
              </div>
            )}
        </div>

        <div className="space-y-3">
            {!aiMessage && !loadingAi && (
                <button 
                  onClick={handleAiFeedback} 
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-black py-4 px-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
                >
                    <Sparkles size={20} /> ماذا يقول المعلم الذكي؟
                </button>
            )}

            {loadingAi && (
                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-700 animate-pulse flex flex-col items-center justify-center gap-2 font-bold border-2 border-indigo-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="animate-spin text-indigo-500" size={18} /> 
                      جاري تحليل إجاباتك رياضياً...
                    </div>
                </div>
            )}

            {aiMessage && (
                <div className="p-5 bg-indigo-50 rounded-2xl text-indigo-900 text-right border-2 border-indigo-100 shadow-inner animate-fade-in relative">
                    <div className="flex items-center gap-2 mb-2 font-black text-indigo-700 text-xs">
                      <Sparkles size={16} className="text-indigo-500" /> 
                      تحليل الأداء الذكي:
                    </div>
                    <p className="leading-relaxed font-bold text-sm">{aiMessage}</p>
                </div>
            )}

            <button onClick={onRestart} className="w-full bg-slate-800 text-white font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95">
                <RefreshCcw size={18} /> العودة للرئيسية
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
