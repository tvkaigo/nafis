
import React, { useEffect, useState } from 'react';
import { Home, TrendingUp, Calendar, Award, CheckCircle2, Percent, Loader2, RefreshCw, Trophy, UserCog, AlertCircle } from 'lucide-react';
import { loadStats, getLast7DaysStatsValue, subscribeToLeaderboard } from '../services/statsService';
import { UserStats, LeaderboardEntry, UserRole, TeacherProfile } from '../types';

interface AnalyticsScreenProps {
  onBack: () => void;
  playerData: UserStats | TeacherProfile | null;
  userId: string;
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onBack, playerData, userId }) => {
  const [player, setPlayer] = useState<UserStats | TeacherProfile | null>(playerData);
  const [rank, setRank] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(!playerData);

  useEffect(() => {
    if (playerData) {
      setPlayer(playerData);
      setIsLoading(false);
    }
  }, [playerData]);

  const fetchData = async () => {
    if (userId) {
      setIsLoading(true);
      try {
        const userData = await loadStats(userId);
        if (userData) {
            setPlayer(userData);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!player) {
      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    if (!player) return;
    
    const tid = player.role === UserRole.STUDENT 
      ? (player as UserStats).teacherId 
      : (player as TeacherProfile).teacherId;
    
    if (tid && tid !== 'none') {
        const unsub = subscribeToLeaderboard((leaders) => {
            const userRank = leaders.findIndex(u => u.uid === userId) + 1;
            setRank(userRank > 0 ? userRank : null);
        }, tid);
        return () => unsub();
    }
  }, [userId, player]);

  if (isLoading && !player) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 gap-4">
      <Loader2 size={48} className="text-emerald-600 animate-spin" />
      <p className="text-emerald-900 font-bold animate-pulse">جاري مزامنة بيانات البطل...</p>
    </div>
  );

  if (!player) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 gap-4 p-6 text-center">
      <AlertCircle size={48} className="text-red-500" />
      <h2 className="text-xl font-bold text-slate-800">عذراً، لم نتمكن من العثور على بياناتك</h2>
      <p className="text-slate-500">يرجى محاولة تسجيل الدخول مرة أخرى أو التحقق من اتصالك.</p>
      <div className="flex gap-3">
        <button onClick={onBack} className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold">العودة للرئيسية</button>
        <button onClick={fetchData} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95">
            <RefreshCw size={20} /> إعادة المحاولة
        </button>
      </div>
    </div>
  );

  const totalCorrect = player.totalCorrect ?? 0;
  const totalIncorrect = player.totalIncorrect ?? 0;
  const streak = player.streak ?? 0;
  const totalAttempts = totalCorrect + totalIncorrect;
  const accuracy = totalAttempts > 0 
    ? Math.round((totalCorrect / totalAttempts) * 100) 
    : 0;

  const weeklyData = getLast7DaysStatsValue(player);
  const maxWeeklyValue = Math.max(...weeklyData.map(d => d.correct + d.incorrect), 5);

  return (
    <div className="min-h-screen bg-emerald-50/30 flex flex-col items-center p-4 overflow-y-auto font-sans">
      <div className="w-full max-w-3xl animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="bg-white p-3 rounded-2xl shadow-sm text-slate-500 hover:text-emerald-600 hover:shadow-md transition-all active:scale-95 border border-emerald-50"
          >
            <Home size={24} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-emerald-600" />
              ملف الأداء المتقدم
            </h1>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-emerald-700 font-bold bg-emerald-100 px-4 py-1 rounded-full text-sm truncate max-w-[200px] border border-emerald-200">
                  {player.displayName}
                </span>
                <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${
                    player.role === UserRole.TEACHER 
                    ? 'bg-emerald-600 text-white border-emerald-700' 
                    : 'bg-teal-50 text-teal-600 border-teal-100'
                }`}>
                    <UserCog size={10} />
                    {player.role === UserRole.TEACHER ? 'معلم' : 'طالب'}
                </span>
            </div>
          </div>

          <button 
            onClick={fetchData}
            className="bg-white p-3 rounded-2xl shadow-sm text-slate-500 hover:text-emerald-600 hover:shadow-md transition-all active:scale-95 border border-emerald-50"
          >
            <RefreshCw size={24} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center relative overflow-hidden group hover:border-emerald-300 transition-colors">
             <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Trophy size={20} />
            </div>
            <div className="text-3xl font-black text-slate-800 z-10 flex items-baseline">
                {rank ? <><span className="text-lg text-slate-400 mr-1">#</span>{rank}</> : '-'}
            </div>
            <div className="text-xs text-slate-400 font-bold">الترتيب</div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center group hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <CheckCircle2 size={20} />
            </div>
            <div className="text-3xl font-black text-slate-800">{totalCorrect}</div>
            <div className="text-xs text-slate-400 font-bold">إجابة صحيحة</div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center group hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Calendar size={20} />
            </div>
            <div className="text-3xl font-black text-slate-800">{streak}</div>
            <div className="text-xs text-slate-400 font-bold">أيام متتالية</div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center group hover:border-emerald-300 transition-colors">
             <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Percent size={20} />
            </div>
            <div className="text-3xl font-black text-slate-800" dir="ltr">{accuracy}%</div>
            <div className="text-xs text-slate-400 font-bold">دقة الإجابات</div>
          </div>
        </div>

        {/* Weekly Activity Placeholder / Chart */}
        <div className="bg-white rounded-[2.5rem] shadow-sm p-6 mb-8 border border-emerald-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                <TrendingUp size={20} />
            </div>
            <h2 className="text-lg font-black text-slate-800">النشاط العلمي الأسبوعي</h2>
          </div>

          <div className="flex items-end justify-between h-40 gap-3 px-2">
            {weeklyData.length > 0 ? weeklyData.map((day, idx) => {
              const total = day.correct + day.incorrect;
              const barHeight = total === 0 ? 8 : (total / maxWeeklyValue) * 100;
              const correctHeight = total === 0 ? 0 : (day.correct / total) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                    <div 
                      className="w-full max-w-[32px] bg-emerald-50 rounded-t-xl overflow-hidden flex flex-col-reverse relative transition-all duration-500 group-hover:bg-emerald-100"
                      style={{ height: `${Math.min(100, barHeight)}%` }}
                    >
                      {total > 0 && (
                            <div className="bg-emerald-500 w-full transition-all duration-700" style={{ height: `${correctHeight}%` }}></div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-2 truncate w-full text-center">
                      {day.label}
                    </span>
                </div>
              );
            }) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold italic">
                بانتظار خوض اختبارك الأول هذا الأسبوع...
              </div>
            )}
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-[2.5rem] shadow-sm p-6 border border-emerald-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                <Award size={20} fill="currentColor" />
            </div>
            <h2 className="text-lg font-black text-slate-800">أوسمتك العلمية</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(player.badges || []).map((badge) => {
                const progress = Math.min(100, (player.totalCorrect / badge.required) * 100);
                return (
                <div 
                  key={badge.id} 
                  className={`relative p-5 rounded-3xl border-2 transition-all duration-300 flex items-center gap-4
                    ${badge.unlocked ? `bg-emerald-50 border-emerald-200 shadow-sm` : 'bg-slate-50 border-slate-100 text-slate-400 opacity-60'}`}
                >
                  <div className={`text-4xl filter ${badge.unlocked ? 'drop-shadow-sm scale-110' : 'grayscale opacity-30'}`}>
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-black text-lg ${badge.unlocked ? 'text-emerald-900' : 'text-slate-400'}`}>{badge.name}</h3>
                    <div className="text-xs font-bold mt-1 opacity-90">
                      {badge.unlocked ? 'بطل معتمد!' : `باقي ${Math.max(0, badge.required - player.totalCorrect)} إجابة`}
                    </div>
                    {!badge.unlocked && (
                      <div className="mt-3 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
                );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsScreen;
