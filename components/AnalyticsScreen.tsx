
import { AlertCircle, Award, Calendar, CheckCircle2, Home, Loader2, Percent, RefreshCw, TrendingUp, Trophy, UserCog } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getLast7DaysStatsValue, loadStats, subscribeToLeaderboard } from '../services/statsService';
import { TeacherProfile, UserRole, UserStats } from '../types';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 gap-4">
      <Loader2 size={40} className="text-indigo-600 animate-spin" />
      <p className="text-indigo-900 font-bold animate-pulse text-sm">جاري مزامنة بياناتك...</p>
    </div>
  );

  if (!player) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 gap-4 p-6 text-center">
      <AlertCircle size={48} className="text-red-500" />
      <h2 className="text-xl font-bold text-slate-800">حدث خطأ في جلب البيانات</h2>
      <div className="flex gap-3">
        <button onClick={onBack} className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm">رجوع</button>
        <button onClick={fetchData} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-sm"><RefreshCw size={18} /> تحديث</button>
      </div>
    </div>
  );

  const totalCorrect = player.totalCorrect ?? 0;
  const totalIncorrect = player.totalIncorrect ?? 0;
  const streak = player.streak ?? 0;
  const accuracy = (totalCorrect + totalIncorrect) > 0 
    ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100) 
    : 0;

  const weeklyData = getLast7DaysStatsValue(player);
  const maxWeeklyValue = Math.max(...weeklyData.map(d => d.correct + d.incorrect), 5);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-3 sm:p-5 overflow-y-auto font-sans w-full pb-10">
      <div className="w-full max-w-2xl animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="bg-white p-3 rounded-2xl shadow-sm text-slate-500 active:scale-95 border border-indigo-50">
            <Home size={22} />
          </button>
          
          <div className="flex flex-col items-center text-center px-2">
            <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" size={20} />
              إحصائيات الأداء
            </h1>
          </div>

          <button onClick={fetchData} className="bg-white p-3 rounded-2xl shadow-sm text-slate-500 active:scale-95 border border-indigo-50">
            <RefreshCw size={22} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-indigo-50 flex flex-col items-center text-center">
             <div className="w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-2">
              <Trophy size={18} />
            </div>
            <div className="text-2xl font-black text-slate-800">{rank ? `#${rank}` : '-'}</div>
            <div className="text-[9px] text-slate-400 font-bold uppercase">الترتيب بالفصل</div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-indigo-50 flex flex-col items-center text-center">
            <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 size={18} />
            </div>
            <div className="text-2xl font-black text-slate-800">{totalCorrect}</div>
            <div className="text-[9px] text-slate-400 font-bold uppercase">نقاط مجمعة</div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-indigo-50 flex flex-col items-center text-center">
            <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-2">
              <Calendar size={18} />
            </div>
            <div className="text-2xl font-black text-slate-800">{streak}</div>
            <div className="text-[9px] text-slate-400 font-bold uppercase">سلسلة أيام</div>
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-sm border border-indigo-50 flex flex-col items-center text-center">
             <div className="w-9 h-9 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-2">
              <Percent size={18} />
            </div>
            <div className="text-2xl font-black text-slate-800" dir="ltr">{accuracy}%</div>
            <div className="text-[9px] text-slate-400 font-bold uppercase">دقة الإجابات</div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-6 border border-indigo-50">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600"><TrendingUp size={18} /></div>
            <h2 className="text-sm font-black text-slate-800">نشاط الأسبوع الماضي</h2>
          </div>
          <div className="flex items-end justify-between h-32 gap-2 px-1">
            {weeklyData.map((day, idx) => {
              const total = day.correct + day.incorrect;
              const barHeight = total === 0 ? 5 : (total / maxWeeklyValue) * 100;
              const correctHeight = total === 0 ? 0 : (day.correct / total) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div className="w-full max-w-[24px] bg-slate-50 rounded-t-lg overflow-hidden flex flex-col-reverse relative h-full">
                        <div className="bg-indigo-100 w-full" style={{ height: `${barHeight}%` }}>
                            {total > 0 && <div className="bg-indigo-500 w-full" style={{ height: `${correctHeight}%` }}></div>}
                        </div>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 mt-2">{day.label.substring(0, 3)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-3xl shadow-sm p-5 border border-indigo-50">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-50 p-2 rounded-xl text-yellow-600"><Award size={18} fill="currentColor" /></div>
            <h2 className="text-sm font-black text-slate-800">الأوسمة المستحقة</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {(player.badges || []).map((badge) => {
                const progress = Math.min(100, (player.totalCorrect / badge.required) * 100);
                return (
                <div key={badge.id} className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${badge.unlocked ? `bg-indigo-50 border-indigo-100 shadow-sm` : 'bg-slate-50 border-transparent opacity-60'}`}>
                  <div className={`text-3xl ${badge.unlocked ? 'scale-110' : 'grayscale'}`}>{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-black text-sm text-slate-800">{badge.name}</h3>
                    <div className="text-[9px] font-bold mt-0.5 text-slate-500">
                      {badge.unlocked ? 'بطل معتمد!' : `باقي ${Math.max(0, badge.required - player.totalCorrect)} إجابة`}
                    </div>
                    {!badge.unlocked && (
                      <div className="mt-2 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-indigo-400" style={{ width: `${progress}%` }}></div>
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
