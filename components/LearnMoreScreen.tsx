
import React, { useState, useEffect } from 'react';
import { Home, Lightbulb, ChevronLeft, RefreshCcw, Sparkles, BookOpen, Microscope, Atom, Globe, Rocket, Zap } from 'lucide-react';
import { Grade } from '../types';
import { getEnrichingFacts, ScienceFact } from '../services/scienceService';

interface LearnMoreScreenProps {
  onBack: () => void;
  grade: Grade;
}

const CategoryIcon: React.FC<{ category: ScienceFact['category'], isChanging: boolean }> = ({ category, isChanging }) => {
  const iconProps = { 
    size: 32, 
    className: `transition-all duration-500 ${isChanging ? 'scale-0 rotate-180' : 'scale-110 rotate-0'}` 
  };

  const getIcon = () => {
    switch (category) {
      case 'biology': return <Microscope {...iconProps} className={`${iconProps.className} text-emerald-500`} />;
      case 'physics': return <Zap {...iconProps} className={`${iconProps.className} text-orange-500`} />;
      case 'chemistry': return <Atom {...iconProps} className={`${iconProps.className} text-blue-500`} />;
      case 'earth': return <Globe {...iconProps} className={`${iconProps.className} text-emerald-700`} />;
      case 'space': return <Rocket {...iconProps} className={`${iconProps.className} text-purple-500`} />;
      default: return <Sparkles {...iconProps} className={`${iconProps.className} text-emerald-500`} />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-emerald-50 flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

const LearnMoreScreen: React.FC<LearnMoreScreenProps> = ({ onBack, grade }) => {
  const [facts, setFacts] = useState<ScienceFact[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'in' | 'out'>('in');

  useEffect(() => {
    setFacts(getEnrichingFacts(grade, 10));
  }, [grade]);

  const handleNext = () => {
    if (animating) return;
    
    setDirection('out');
    setAnimating(true);
    
    setTimeout(() => {
      if (currentIndex < facts.length - 1) {
        setCurrentIndex(p => p + 1);
        setDirection('in');
        setAnimating(false);
      } else {
        setIsFinished(true);
      }
    }, 400);
  };

  const handleRestart = () => {
    setFacts(getEnrichingFacts(grade, 10));
    setCurrentIndex(0);
    setIsFinished(false);
    setDirection('in');
  };

  const progress = ((currentIndex + 1) / facts.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6 text-center animate-pop-in">
        <div className="bg-white rounded-[3rem] shadow-2xl p-10 max-w-md w-full border-4 border-emerald-100 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg border-4 border-emerald-50">
            <TrophyIcon />
          </div>
          
          <h2 className="text-3xl font-black text-slate-800 mb-4 mt-4">عالم متمكن!</h2>
          <p className="text-slate-500 font-bold mb-8 leading-relaxed">
            لقد أنهيت جولتك المعرفية اليوم. تذكر أن العلم هو مفتاح مستقبلك العبقري.
          </p>
          
          <div className="flex flex-col gap-3">
            <button onClick={handleRestart} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 group">
              <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" /> استكشاف حقائق جديدة
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
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center p-4 relative font-sans overflow-hidden">
      
      {/* Dynamic Background Decor */}
      <div className="absolute top-20 left-10 opacity-10 animate-pulse pointer-events-none">
        <Atom size={120} className="text-emerald-900 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 animate-bounce pointer-events-none" style={{ animationDuration: '4s' }}>
        <Rocket size={100} className="text-emerald-900 -rotate-12" />
      </div>

      {/* Header Bar */}
      <div className="w-full max-w-2xl mt-6 flex justify-between items-center mb-8 px-4 relative z-10">
        <button onClick={onBack} className="bg-white p-3 rounded-2xl shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-90 border border-emerald-50">
          <Home size={24} />
        </button>
        
        <div className="flex flex-col items-center flex-1 mx-4">
            <div className="w-full h-2.5 bg-emerald-100 rounded-full overflow-hidden shadow-inner border border-white">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
            </div>
            <span className="text-[10px] font-black text-emerald-600 mt-2 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={12} className="animate-pulse" />
              تقدم الرحلة المعرفية {Math.round(progress)}%
            </span>
        </div>

        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2 min-w-[80px] justify-center">
          <span className="text-lg font-black text-emerald-600">{currentIndex + 1}</span>
          <span className="text-xs font-bold text-slate-300">/ {facts.length}</span>
        </div>
      </div>

      {/* Fact Card Container with Transition */}
      <div className="w-full max-w-2xl relative">
        <div 
          className={`bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 relative border-b-8 border-emerald-100 transition-all duration-500 ease-in-out flex flex-col min-h-[520px] transform
            ${direction === 'out' ? 'opacity-0 -translate-x-full scale-90' : 'opacity-100 translate-x-0 scale-100'}
            ${animating && direction === 'in' ? 'translate-x-full opacity-0' : ''}
          `}
        >
          {/* Floating Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 transition-transform duration-500 hover:rotate-12">
            <CategoryIcon category={currentFact.category} isChanging={direction === 'out'} />
          </div>

          <div className="flex-1 mt-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-xs font-black mb-6 border border-emerald-100 uppercase tracking-widest animate-fade-in-up">
                <Lightbulb size={16} className="text-orange-400" /> هل كنت تعلم؟
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
                {currentFact.title}
              </h2>
              <div className="w-20 h-1.5 bg-emerald-100 mx-auto rounded-full mb-8"></div>
            </div>

            <div className="bg-emerald-50/40 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 border-2 border-dashed border-emerald-100 relative group transition-all hover:bg-emerald-50/60">
              <BookOpen size={28} className="text-emerald-200 absolute -top-4 -right-2 bg-white p-1 rounded-lg shadow-sm group-hover:text-emerald-500 transition-colors" />
              <p className="text-lg md:text-2xl font-bold text-slate-700 leading-relaxed text-right indent-4">
                {currentFact.description}
              </p>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <button
              onClick={handleNext}
              disabled={animating}
              className={`flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all transform active:scale-95 group relative overflow-hidden
                ${animating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.03]'}
              `}
            >
              <span className="relative z-10">
                {currentIndex === facts.length - 1 ? 'إنهاء الرحلة' : 'الحقيقة التالية'}
              </span>
              <ChevronLeft size={24} className="group-hover:-translate-x-2 transition-transform relative z-10" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Labels */}
      <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-60">
        <div className={`flex items-center gap-2 text-xs font-black transition-all ${currentFact.category === 'biology' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}>
          <Microscope size={18}/> أحياء
        </div>
        <div className={`flex items-center gap-2 text-xs font-black transition-all ${currentFact.category === 'physics' ? 'text-orange-500 scale-110' : 'text-slate-400'}`}>
          <Zap size={18}/> فيزياء
        </div>
        <div className={`flex items-center gap-2 text-xs font-black transition-all ${currentFact.category === 'chemistry' ? 'text-blue-500 scale-110' : 'text-slate-400'}`}>
          <Atom size={18}/> كيمياء
        </div>
        <div className={`flex items-center gap-2 text-xs font-black transition-all ${currentFact.category === 'earth' ? 'text-emerald-800 scale-110' : 'text-slate-400'}`}>
          <Globe size={18}/> أرض
        </div>
        <div className={`flex items-center gap-2 text-xs font-black transition-all ${currentFact.category === 'space' ? 'text-purple-600 scale-110' : 'text-slate-400'}`}>
          <Rocket size={18}/> فضاء
        </div>
      </div>
    </div>
  );
};

const TrophyIcon = () => (
  <div className="relative">
    <Sparkles size={48} className="text-emerald-600 animate-pulse" />
    <div className="absolute inset-0 animate-ping opacity-25">
       <Sparkles size={48} className="text-emerald-400" />
    </div>
  </div>
);

export default LearnMoreScreen;
