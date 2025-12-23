
import React, { useState, useEffect } from 'react';
import { Grade, GameConfig, TeacherProfile, UserRole } from '../types';
import { BookOpen, FlaskConical, Trophy, BarChart3, LogOut, UserCheck, User, Play, Sparkles, Star } from 'lucide-react';
import { initAudio } from '../services/soundService';
import { getBadgeDefinitions, auth, fetchTeacherInfo, signOut } from '../services/statsService';

interface WelcomeScreenProps {
  onStart: (config: GameConfig) => void;
  onQuickStart: () => void;
  onShowAnalytics: () => void;
  onShowLeaderboard: () => void;
  onShowProfile: () => void;
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
    // Fetch grade from parent or auth context logic
    onStart({ grade: (auth.currentUser as any)?.grade || Grade.PRI_3, subject: 'العلوم' });
  };

  const badges = getBadgeDefinitions(currentTotalScore);
  const currentBadge = [...badges].reverse().find(b => b.unlocked) || badges[0];
  
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
        <button onClick={onShowProfile} className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-100 text-emerald-600 hover:scale-105 transition-all"><User size={20} /></button>
        <button onClick={onShowLeaderboard} className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-100 text-emerald-600 hover:scale-105 transition-all"><Trophy size={20} /></button>
        <button onClick={onShowAnalytics} className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-100 text-emerald-600 hover:scale-105 transition-all"><BarChart3 size={20} /></button>
        <button onClick={() => signOut(auth)} className="bg-white p-3 rounded-2xl shadow-sm border border-red-100 text-red-600 hover:scale-105 transition-all"><LogOut size={20} /></button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-xl p-8 max-w-xl w-full border-4 border-white text-center">
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

        <button
          onClick={handleStart}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-black py-6 rounded-[2rem] shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
        >
          <span>ابدأ الاختبار</span>
          <Play size={28} fill="currentColor" />
        </button>

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
