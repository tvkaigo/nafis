
import React, { useEffect, useState } from 'react';
import { Home, Trophy, Medal, Crown, Loader2, Star, Award } from 'lucide-react';
import { subscribeToLeaderboard, isCloudEnabledValue, loadStats, fetchTeacherInfo } from '../services/statsService';
import { LeaderboardEntry, UserRole, UserStats } from '../types';

interface LeaderboardScreenProps {
  onBack: () => void;
  currentUser?: string; 
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack, currentUser }) => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isResolvingContext, setIsResolvingContext] = useState(true);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState<string>('');

  useEffect(() => {
    const checkUserContext = async () => {
        if (!currentUser) { setIsResolvingContext(false); setIsLoading(false); return; }
        try {
            const data = await loadStats(currentUser);
            if (data) {
                const tid = data.role === UserRole.STUDENT ? (data as UserStats).teacherId || 'none' : (data as any).teacherId;
                setTeacherId(tid);
                if (tid !== 'none') {
                    const tData = await fetchTeacherInfo(tid);
                    if (tData) setTeacherName(tData.displayName);
                }
            }
        } catch (err) { console.error(err); } finally { setIsResolvingContext(false); }
    };
    checkUserContext();
  }, [currentUser]);

  useEffect(() => {
    if (isResolvingContext || !teacherId || teacherId === 'none') {
      if (!isResolvingContext) setIsLoading(false);
      return;
    }
    const unsubscribe = subscribeToLeaderboard((data) => {
      setLeaders(data);
      setIsLoading(false);
    }, teacherId);
    return () => unsubscribe();
  }, [teacherId, isResolvingContext]);

  const topThree = leaders.slice(0, 3);
  const restOfLeaders = leaders.slice(3);

  return (
    <div className="min-h-screen bg-emerald-50/50 flex flex-col items-center p-4 sm:p-6 font-sans pb-10">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="bg-white p-3 rounded-2xl shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-90"><Home size={22} /></button>
          <div className="text-center">
            <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Trophy className="text-emerald-600" size={24} />
              {teacherName ? `أبطال فصل ${teacherName}` : 'لوحة الأبطال'}
            </h1>
          </div>
          <div className="w-10 h-10"></div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-emerald-600 animate-spin" />
            <p className="mt-4 font-black text-emerald-900 text-sm">جاري البحث عن العباقرة...</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Podium for Top 3 */}
            {topThree.length > 0 && (
              <div className="flex justify-center items-end gap-2 mb-10 pt-10 px-2 h-48">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div className="flex-1 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="relative mb-2">
                      <div className="w-14 h-14 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                        <span className="text-xl font-black text-slate-400">{topThree[1].displayName[0]}</span>
                      </div>
                      <div className="absolute -top-3 -right-2 bg-slate-300 text-white p-1 rounded-full shadow-sm"><Medal size={14} /></div>
                    </div>
                    <div className="bg-white w-full h-24 rounded-t-3xl shadow-lg border-t-4 border-slate-200 flex flex-col items-center pt-3 text-center px-1">
                      <span className="text-[10px] font-black text-slate-600 truncate w-full">{topThree[1].displayName.split(' ')[0]}</span>
                      <span className="text-sm font-black text-emerald-600">{topThree[1].totalCorrect}</span>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <div className="flex-1 flex flex-col items-center animate-fade-in-up">
                    <div className="relative mb-3 animate-float">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-yellow-50 border-4 border-yellow-400 shadow-xl flex items-center justify-center overflow-hidden">
                        <span className="text-2xl font-black text-yellow-600">{topThree[0].displayName[0]}</span>
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 drop-shadow-md"><Crown size={32} /></div>
                    </div>
                    <div className="bg-emerald-600 w-full h-32 rounded-t-3xl shadow-xl border-t-4 border-emerald-400 flex flex-col items-center pt-4 text-center px-1">
                      <span className="text-xs font-black text-white truncate w-full">{topThree[0].displayName.split(' ')[0]}</span>
                      <span className="text-lg font-black text-yellow-300">{topThree[0].totalCorrect}</span>
                      <div className="flex gap-1 mt-1"><Star size={10} className="text-yellow-300 fill-current" /><Star size={10} className="text-yellow-300 fill-current" /><Star size={10} className="text-yellow-300 fill-current" /></div>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div className="flex-1 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <div className="relative mb-2">
                      <div className="w-14 h-14 rounded-full bg-orange-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                        <span className="text-xl font-black text-orange-400">{topThree[2].displayName[0]}</span>
                      </div>
                      <div className="absolute -top-3 -right-2 bg-orange-300 text-white p-1 rounded-full shadow-sm"><Medal size={14} /></div>
                    </div>
                    <div className="bg-white w-full h-18 rounded-t-3xl shadow-lg border-t-4 border-orange-100 flex flex-col items-center pt-3 text-center px-1">
                      <span className="text-[10px] font-black text-slate-600 truncate w-full">{topThree[2].displayName.split(' ')[0]}</span>
                      <span className="text-sm font-black text-emerald-600">{topThree[2].totalCorrect}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* List for the rest */}
            <div className="space-y-3">
              {restOfLeaders.map((player, index) => {
                const isCurrentUser = player.uid === currentUser;
                return (
                  <div 
                    key={player.uid} 
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all animate-stagger-in
                      ${isCurrentUser ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg animate-glow' : 'bg-white border-white text-slate-700 shadow-sm'}
                    `}
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center font-black text-sm rounded-lg ${isCurrentUser ? 'bg-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                      {index + 4}
                    </div>
                    <div className="flex-1 font-black text-sm truncate">{player.displayName}</div>
                    <div className="text-left flex items-center gap-2">
                      <div className="text-base font-black">{player.totalCorrect}</div>
                      <div className="text-[8px] font-bold opacity-60 uppercase">نقطة</div>
                    </div>
                  </div>
                );
              })}
              
              {leaders.length === 0 && (
                <div className="bg-white p-10 rounded-[2rem] text-center border-2 border-dashed border-emerald-100">
                  <Award size={48} className="mx-auto text-emerald-200 mb-3" />
                  <p className="text-slate-400 font-bold">لا توجد بيانات متاحة لهذا الفصل حالياً</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardScreen;
