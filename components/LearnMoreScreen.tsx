
import React, { useState, useEffect } from 'react';
import { Home, Lightbulb, ChevronLeft, RefreshCcw, Sparkles, BookOpen, Microscope, Atom, Globe, Rocket, Zap } from 'lucide-react';
import { Grade } from '../types';
import { getEnrichingFacts, ScienceFact } from '../services/scienceService';

interface LearnMoreScreenProps {
  onBack: () => void;
  grade: Grade;
}

const CategoryIcon: React.FC<{ category: ScienceFact['category'] }> = ({ category }) => {
  switch (category) {
    case 'biology': return <Microscope size={28} className="text-emerald-500" />;
    case 'physics': return <Zap size={28} className="text-orange-500" />;
    case 'chemistry': return <Atom size={28} className="text-blue-500" />;
    case 'earth': return <Globe size={28} className="text-emerald-700" />;
    case 'space': return <Rocket size={28} className="text-purple-500" />;
    default: return <Sparkles size={28} className="text-emerald-500" />;
  }
};

const LearnMoreScreen: React.FC<LearnMoreScreenProps> = ({ onBack, grade }) => {
  const [facts, setFacts] = useState<ScienceFact[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setFacts(getEnrichingFacts(grade, 6));
  }, [grade]);

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      if (currentIndex < facts.length - 1) {
        setCurrentIndex(p => p + 1);
        setAnimating(false);
      } else {
        setIsFinished(true);
      }
    }, 300);
  };

  const handleRestart = () => {
    setFacts(getEnrichingFacts(grade, 6));
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const progress = ((currentIndex + 1) / facts.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="bg-white rounded-[3rem] shadow-2xl p-10 max-w-md w-full border-4 border-emerald-100 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg border-4 border-emerald-50">
            <Sparkles size={48} className="text-emerald-600 animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 mb-4 mt-4">عالم متمكن!</h2>
          <p className="text-slate-500 font-bold mb-8 leading-relaxed">
            لقد أنهيت جولتك المعرفية اليوم. تذكر أن العلم هو مفتاح مستقبلك العبقري.
          </p>
          
          <div className="flex flex-col gap-3">
            <button onClick={handleRestart} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95">
              <RefreshCcw size={20} /> استكشاف حقائق جديدة
            </button>
            <button onClick={onBack} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95">
              <Home size={20} /> العودة للمعمل
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (facts.length === 0) return null;

  const currentFact = facts[currentIndex];

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center p-4 relative font-sans overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="absolute -bottom-20 -right-20 p-10 opacity-5 rotate-12">
        <Microscope size={400} className="text-emerald-900" />
      </div>

      {/* Header Bar */}
      <div className="w-full max-w-2xl mt-6 flex justify-between items-center mb-8 px-4 relative z-10">
        <button onClick={onBack} className="bg-white p-3 rounded-2xl shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-90 border border-emerald-50">
          <Home size={24} />
        </button>
        
        <div className="flex flex-col items-center flex-1 mx-4">
            <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden shadow-inner border border-white">
                <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-[10px] font-black text-emerald-600 mt-2 uppercase tracking-widest">
              تقدم الرحلة المعرفية {Math.round(progress)}%
            </span>
        </div>

        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2">
          <span className="text-lg font-black text-emerald-600">{currentIndex + 1}</span>
          <span className="text-xs font-bold text-slate-300">/ {facts.length}</span>
        </div>
      </div>

      {/* Main Fact Card */}
      <div className={`bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-8 md:p-12 relative border-b-8 border-emerald-100 transition-all duration-300 flex flex-col min-h-[500px]
        ${animating ? 'opacity-0 translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100 animate-pop-in'}`}>
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-lg border-2 border-emerald-50">
          <CategoryIcon category={currentFact.category} />
        </div>

        <div className="flex-1 mt-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black mb-4 border border-emerald-100 uppercase tracking-widest">
              <Sparkles size={14} /> هل كنت تعلم؟
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight">
              {currentFact.title}
            </h2>
          </div>

          <div className="bg-emerald-50/50 rounded-[2rem] p-6 md:p-8 border-2 border-dashed border-emerald-100 relative group">
            <BookOpen size={24} className="text-emerald-200 absolute top-4 right-4 group-hover:text-emerald-400 transition-colors" />
            <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed text-right indent-4">
              {currentFact.description}
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button
            onClick={handleNext}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group"
          >
            <span>{currentIndex === facts.length - 1 ? 'أكملت الرحلة' : 'اكتشف المزيد'}</span>
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-40">
        <div className="flex items-center gap-2 text-xs font-black text-emerald-800"><Microscope size={16}/> أحياء</div>
        <div className="flex items-center gap-2 text-xs font-black text-emerald-800"><Zap size={16}/> فيزياء</div>
        <div className="flex items-center gap-2 text-xs font-black text-emerald-800"><Atom size={16}/> كيمياء</div>
        <div className="flex items-center gap-2 text-xs font-black text-emerald-800"><Rocket size={16}/> فضاء</div>
      </div>
    </div>
  );
};

export default LearnMoreScreen;
