
import { Microscope, Trophy, BarChart3, LogOut, User, Play, Sparkles, Lightbulb, Beaker, Atom, FlaskConical } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LearningOutcomes, getOutcomesByGrade } from '../services/scienceService';
import { initAudio } from '../services/soundService';
import { auth, fetchTeacherInfo, signOut } from '../services/statsService';
import { GameConfig, Grade, TeacherProfile, UserRole } from '../types';

interface WelcomeScreenProps {
  onStart: (config: GameConfig) => void;
  onShowAnalytics: () => void;
  onShowLeaderboard: () => void;
  onShowProfile: () => void;
  onLearnMore: () => void;
  highScore: number;
  userName?: string;
  grade?: Grade;
  currentTotalScore?: number;
  role?: UserRole;
  teacherId?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
    onStart, onShowAnalytics, onShowLeaderboard, onShowProfile, onLearnMore,
    highScore, userName, grade = Grade.PRI_3, role = UserRole.STUDENT, teacherId
}) => {
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<string>(LearningOutcomes.GENERAL);
  const availableOutcomes = getOutcomesByGrade(grade);

  useEffect(() => {
    if (role === UserRole.STUDENT && teacherId) {
        fetchTeacherInfo(teacherId).then(setTeacher);
    }
  }, [role, teacherId]);

  const handleStart = () => {
    initAudio();
    onStart({ grade, subject: 'العلوم', learningOutcome: selectedOutcome });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-emerald-50 text-slate-800 font-sans pb-28 w-full overflow-x-hidden">
      
      {/* Top Bar */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 pt-2">
        <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-emerald-100 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={16} />
            <span className="text-[10px] font-bold">أفضل نتيجة: {highScore}</span>
        </div>
        <div className="flex gap-2">
            <button onClick={onShowProfile} className="bg-white p-2.5 rounded-full shadow-sm text-emerald-600 active:scale-90 transition-transform"><User size={20} /></button>
            <button onClick={() => signOut(auth)} className="bg-white p-2.5 rounded-full shadow-sm text-red-500 active:scale-90 transition-transform"><LogOut size={20} /></button>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl sm:rounded-[2.5rem] shadow-xl p-5 sm:p-8 border-2 border-white animate-pop-in">
        <div className="bg-emerald-600 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
          <Microscope size={28} />
        </div>
        
        <h1 className="text-lg sm:text-xl font-black text-slate-900 mb-1 text-center">أهلاً بالعالم {userName}!</h1>
        <p className="text-[10px] text-slate-400 text-center mb-6 font-bold">{grade}</p>

        <div className="mb-6">
          <p className="text-[11px] font-black text-slate-500 mb-3 text-right pr-1">اختر مجال البحث:</p>
          <div className="grid grid-cols-2 gap-2">
            {availableOutcomes.map((outcome) => (
              <button
                key={outcome}
                onClick={() => setSelectedOutcome(outcome)}
                className={`px-3 py-3 rounded-xl text-[10px] font-bold transition-all border-2 text-right flex items-center justify-between min-h-[50px]
                  ${selectedOutcome === outcome 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-emerald-200'}`}
              >
                <span className="leading-tight">{outcome}</span>
                {selectedOutcome === outcome && <Sparkles size={12} className="flex-shrink-0 mr-1" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
            <button
              onClick={handleStart}
              className="w-full bg-emerald-600 text-white text-lg font-black py-4 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <span>ابدأ الاختبار</span>
              <Play size={20} fill="currentColor" />
            </button>

            <button
              onClick={onLearnMore}
              className="w-full bg-white border-2 border-emerald-100 text-emerald-600 text-sm font-black py-3 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Lightbulb size={18} />
              <span>حقائق علمية</span>
            </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white p-2 flex justify-around items-center z-50">
        <button onClick={onShowAnalytics} className="flex flex-col items-center p-2 text-slate-400 hover:text-emerald-600 transition-colors">
            <BarChart3 size={22} />
            <span className="text-[8px] font-bold mt-1">الأداء</span>
        </button>
        <button onClick={onShowLeaderboard} className="flex flex-col items-center p-2 text-slate-400 hover:text-emerald-600 transition-colors">
            <Trophy size={22} />
            <span className="text-[8px] font-bold mt-1">الأبطال</span>
        </button>
        
        <div className="relative -mt-12">
            <button 
              onClick={handleStart} 
              className="bg-emerald-600 text-white p-4 rounded-full shadow-xl shadow-emerald-200 active:scale-90 transition-transform border-4 border-white"
            >
                <Play size={28} fill="currentColor" />
            </button>
        </div>

        <button onClick={onShowProfile} className="flex flex-col items-center p-2 text-slate-400 hover:text-emerald-600 transition-colors">
            <User size={22} />
            <span className="text-[8px] font-bold mt-1">حسابي</span>
        </button>
        <button onClick={onLearnMore} className="flex flex-col items-center p-2 text-slate-400 hover:text-emerald-600 transition-colors">
            <Beaker size={22} />
            <span className="text-[8px] font-bold mt-1">إثراء</span>
        </button>
      </div>

      <div className="absolute bottom-40 left-8 opacity-5 -z-10"><Atom size={80} /></div>
      <div className="absolute top-60 right-8 opacity-5 rotate-12 -z-10"><FlaskConical size={60} /></div>
    </div>
  );
};

export default WelcomeScreen;
