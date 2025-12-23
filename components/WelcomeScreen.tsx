
import React, { useState, useEffect } from 'react';
import { Grade, GameConfig, TeacherProfile, UserRole, AppState } from '../types';
import { BookOpen, FlaskConical, Trophy, BarChart3, LogOut, UserCheck, User, Play, Sparkles, Star, Lightbulb } from 'lucide-react';
import { initAudio } from '../services/soundService';
import { getBadgeDefinitions, auth, fetchTeacherInfo, signOut } from '../services/statsService';

interface WelcomeScreenProps {
  onStart: (config: GameConfig) => void;
  onQuickStart: () => void;
  onShowAnalytics: () => void;
  onShowLeaderboard: () => void;
  onShowProfile: () => void;
  onLearnMore: () => void;
  highScore: number;
  userName?: string;
  currentTotalScore?: number;
  role?: UserRole;
  teacherId?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
    onStart, 
    onShowAnalytics, 
    onShowLeaderboard, 
    onShowProfile,
    onLearnMore,
    highScore, 
    userName,
    currentTotalScore = 0,
    role = UserRole.STUDENT,
    teacherId
}) => {
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);

  useEffect(() => {
    if (role === UserRole.STUDENT && teacherId) {
        fetchTeacherInfo(teacherId).then(setTeacher);
    }
  }, [role, teacherId]);

  const handleStart = () => {
    initAudio();
    onStart({ grade: (auth.currentUser as any)?.grade || Grade.PRI_3, subject: 'العلوم' });
  };

  const badges = getBadgeDefinitions(currentTotalScore);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-emerald-50 text-slate-800 relative font-sans">
      
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

      <div className="bg-white rounded-[3rem] shadow-xl p-8 max-w-xl w-full border-4 border-white text-center animate-pop-in">
        <div className="bg-emerald-600 text-white w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
          <FlaskConical size={48} />
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 mb-2">أهلاً بك، {userName}!</h1>
        <p className="text-slate-500 font-bold mb-8">مستعد للتدريب على اختبار نافس للعلوم؟</p>

        <div className="flex items-center justify-center gap-4 mb-10">
            <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-black border border-orange-100 flex items-center gap-2">
                <Star size={16} fill="currentColor" /> {currentTotalScore} نقطة
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-black border border-emerald-100 flex items-center gap-2">
                <BookOpen size={16} /> العلوم
            </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleStart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-black py-6 rounded-[2rem] shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>ابدأ الاختبار</span>
            <Play size={28} fill="currentColor" />
          </button>

          <button
            onClick={onLearnMore}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-xl font-black py-5 rounded-[2rem] border-2 border-blue-100 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group"
          >
            <Lightbulb size={24} className="group-hover:fill-current" />
            <span>تعلم أكثر</span>
            <Sparkles size={20} className="animate-pulse" />
          </button>
        </div>

        {teacher && (
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-3 text-slate-400">
                <UserCheck size={18} />
                <span className="text-sm font-bold">بإشراف المعلم: {teacher.displayName}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
