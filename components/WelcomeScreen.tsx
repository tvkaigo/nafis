
import React, { useState, useEffect } from 'react';
import { Grade, GameConfig, TeacherProfile, UserRole } from '../types';
import { FlaskConical, Trophy, BarChart3, LogOut, UserCheck, User, Play, Sparkles, Lightbulb, LayoutGrid, Microscope, Zap, Globe, Atom, ClipboardCheck, Activity, GraduationCap } from 'lucide-react';
import { initAudio } from '../services/soundService';
import { auth, fetchTeacherInfo, signOut } from '../services/statsService';
import { getOutcomesByGrade, LearningOutcomes } from '../services/scienceService';

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

const OutcomeIcon = ({ outcome }: { outcome: string }) => {
  switch (outcome) {
    case LearningOutcomes.LIFE: return <Microscope size={18} />;
    case LearningOutcomes.PHYSICAL: return <Zap size={18} />;
    case LearningOutcomes.EARTH_SPACE: return <Globe size={18} />;
    case LearningOutcomes.THINKING_SKILLS: return <ClipboardCheck size={18} />;
    default: return <LayoutGrid size={18} />;
  }
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
    onStart, 
    onShowAnalytics, 
    onShowLeaderboard, 
    onShowProfile,
    onLearnMore,
    highScore, 
    userName,
    grade = Grade.PRI_3,
    currentTotalScore = 0,
    role = UserRole.STUDENT,
    teacherId
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
    onStart({ 
      grade: grade, 
      subject: 'العلوم',
      learningOutcome: selectedOutcome 
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-emerald-50 text-slate-800 relative font-sans overflow-x-hidden">
      
      {/* Top Bar Stats */}
      <div className="absolute top-6 left-6 flex gap-4">
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2 text-emerald-900 font-bold">
            <Trophy className="text-yellow-500" size={20} />
            <span className="text-sm">أفضل نتيجة: {highScore}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-6 right-6 flex gap-2">
        <button onClick={onShowProfile} className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-100 text-emerald-600 hover:scale-105 transition-all" title="الملف الشخصي"><User size={20} /></button>
        <button onClick={onShowLeaderboard} className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-100 text-emerald-600 hover:scale-105 transition-all" title="لوحة الصدارة"><Trophy size={20} /></button>
        <button onClick={onShowAnalytics} className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-100 text-emerald-600 hover:scale-105 transition-all" title="الإحصائيات"><BarChart3 size={20} /></button>
        <button onClick={() => signOut(auth)} className="bg-white p-3 rounded-2xl shadow-sm border border-red-100 text-red-600 hover:scale-105 transition-all" title="خروج"><LogOut size={20} /></button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl p-8 max-w-xl w-full border-4 border-white text-center animate-pop-in relative z-10">
        <div className="bg-emerald-600 text-white w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
          <FlaskConical size={40} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">أهلاً بك، {userName}!</h1>
        
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-5 py-2 rounded-2xl text-sm font-black mb-6 border border-slate-200">
          <GraduationCap size={18} className="text-emerald-600" />
          <span>{grade}</span>
        </div>

        <div className="mb-8 text-right">
          <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest mb-3 block">اختر ناتج التعلم للتركيز عليه:</label>
          <div className="flex flex-wrap justify-end gap-2">
            {availableOutcomes.map((outcome) => (
              <button
                key={outcome}
                onClick={() => setSelectedOutcome(outcome)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all border-2
                  ${selectedOutcome === outcome 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105' 
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-emerald-200'}`}
              >
                <OutcomeIcon outcome={outcome} />
                {outcome}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleStart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>ابدأ التحدي</span>
            <Play size={24} fill="currentColor" />
          </button>

          <button
            onClick={onLearnMore}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-lg font-black py-4 rounded-[2rem] border-2 border-blue-100 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group"
          >
            <Lightbulb size={20} className="group-hover:fill-current" />
            <span>تعلم أكثر</span>
            <Sparkles size={16} className="animate-pulse" />
          </button>
        </div>

        {teacher && (
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-3 text-slate-400">
                <UserCheck size={16} />
                <span className="text-xs font-bold">بإشراف المعلم: {teacher.displayName}</span>
            </div>
        )}
      </div>

      <div className="absolute bottom-10 left-10 opacity-5 animate-pulse"><Microscope size={120} /></div>
      <div className="absolute top-40 right-10 opacity-5 rotate-12"><Atom size={100} /></div>
    </div>
  );
};

export default WelcomeScreen;
