
import React, { useEffect, useState } from 'react';
import { Home, Trophy, Medal, Crown, Sparkles, Loader2, Globe2, CloudOff, Users, Award } from 'lucide-react';
import { subscribeToLeaderboard, getBadgeDefinitions, isCloudEnabledValue, loadStats, fetchTeacherInfo } from '../services/statsService';
import { LeaderboardEntry, UserRole, UserStats } from '../types';

interface LeaderboardScreenProps {
  onBack: () => void;
  currentUser?: string; 
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack, currentUser }) => {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isResolvingContext, setIsResolvingContext] = useState(true);
  const [offline, setOffline] = useState(false);
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
      setOffline(!isCloudEnabledValue());
    }, teacherId);
    return () => unsubscribe();
  }, [teacherId, isResolvingContext]);

  return (
    <div className="min-h-screen bg-emerald-50/50 flex flex-col items-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-12">
          <button onClick={onBack} className="bg-white p-4 rounded-3xl shadow-sm text-slate-400 hover:text-emerald-600 transition-all"><Home size={24} /></button>
          <div className="text-center">
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-xl"><Trophy size={32} /></div>
              {teacherName ? `أبطال فصل ${teacherName}` : 'لوحة الأبطال'}
            </h1>
          </div>
          <div className="w-14 h-14"></div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 size={64} className="text-emerald-600 animate-spin" />
            <p className="mt-4 font-black text-emerald-900">جاري البحث عن العباقرة...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaders.map((player, index) => {
              const isCurrentUser = player.uid === currentUser;
              return (
                <div key={player.uid} className={`flex items-center gap-4 p-5 rounded-[2rem] border-2 transition-all ${isCurrentUser ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl scale-[1.02]' : 'bg-white border-white text-slate-700 shadow-sm'}`}>
                  <div className="w-12 h-12 flex items-center justify-center font-black text-xl">
                    {index === 0 ? <Crown className="text-yellow-400" /> : index + 1}
                  </div>
                  <div className="flex-1 font-black text-lg">{player.displayName}</div>
                  <div className="text-left">
                    <div className="text-2xl font-black">{player.totalCorrect}</div>
                    <div className="text-[10px] font-bold opacity-60">نقطة</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardScreen;