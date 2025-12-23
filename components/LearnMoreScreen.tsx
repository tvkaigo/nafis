
import React, { useState, useEffect } from 'react';
import { Home, Lightbulb, ChevronLeft, ChevronRight, RefreshCcw, Sparkles, BookOpen } from 'lucide-react';
import { Grade } from '../types';
import { getEnrichingFacts } from '../services/scienceService';

interface LearnMoreScreenProps {
  onBack: () => void;
  grade: Grade;
}

const LearnMoreScreen: React.FC<LearnMoreScreenProps> = ({ onBack, grade }) => {
  const [facts, setFacts] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setFacts(getEnrichingFacts(grade));
  }, [grade]);

  const handleNext = () => {
    if (currentIndex < facts.length - 1) {
      setCurrentIndex(p => p + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setFacts(getEnrichingFacts(grade));
    setCurrentIndex(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="bg-white rounded-[3rem] shadow-2xl p-10 max-w-md w-full border-4 border-blue-100">
          <div className="bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCcw size={40} className="animate-spin-slow" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">انتهت الرحلة مؤقتاً!</h2>
          <p className="text-slate-500 font-bold mb-8 leading-relaxed">
            لقد تعلمت 5 أشياء جديدة ومذهلة اليوم. هل تريد استكشاف حقائق أخرى؟
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={handleRestart} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95">
              <RefreshCcw size={20} /> تعلم أشياء جديدة
            </button>
            <button onClick={onBack} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95">
              <Home size={20} /> العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
        <Lightbulb size={200} className="text-blue-900" />
      </div>

      <div className="w-full max-w-2xl flex justify-between items-center mb-10 px-4 relative z-10">
        <button onClick={onBack} className="bg-white p-3 rounded-2xl shadow-sm text-slate-400 hover:text-blue-600 transition-all active:scale-90">
          <Home size={24} />
        </button>
        
        <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">معلومة</span>
          <span className="text-lg font-black text-blue-600">{currentIndex + 1}</span>
          <span className="text-xs font-bold text-slate-300">/ {facts.length}</span>
        </div>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-8 md:p-12 relative border-b-8 border-blue-100 animate-pop-in min-h-[400px] flex flex-col justify-center text-center">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
          <Sparkles size={32} />
        </div>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-blue-100 uppercase tracking-widest">
            <BookOpen size={14} /> هل كنت تعلم؟
          </div>
          <p className="text-2xl md:text-3xl font-black text-slate-800 leading-relaxed animate-fade-in-up" key={currentIndex}>
            {facts[currentIndex]}
          </p>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-black py-5 rounded-[2rem] shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group"
        >
          <span>{currentIndex === facts.length - 1 ? 'إنهاء الجولة' : 'المعلومة التالية'}</span>
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="mt-8 text-blue-400 font-bold text-sm animate-pulse">
        اضغط على الزر لاكتشاف المزيد من أسرار العلم 🔬
      </div>
    </div>
  );
};

export default LearnMoreScreen;
