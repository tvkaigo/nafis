
import React, { useState, useEffect } from 'react';
import { UserStats, TeacherProfile, UserRole } from '../types';
import { Home, User, Mail, UserCheck, Shield, Edit3, Save, Loader2, Award, X, RefreshCw } from 'lucide-react';
import { updateUserProfileName, fetchTeacherInfo, getBadgeDefinitions, fetchStudentsByTeacherId } from '../services/statsService';

interface ProfileScreenProps {
  onBack: () => void;
  playerData: UserStats | TeacherProfile | null;
  userId: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, playerData, userId }) => {
  const [displayName, setDisplayName] = useState(playerData?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);

  useEffect(() => {
    if (playerData?.role === UserRole.STUDENT && (playerData as UserStats).teacherId) {
        fetchTeacherInfo((playerData as UserStats).teacherId!).then(setTeacher);
    }
  }, [playerData]);

  const handleSave = async () => {
    if (!displayName.trim()) return;
    setIsLoading(true);
    try {
        await updateUserProfileName(userId, displayName.trim(), playerData!.role);
        setIsEditing(false);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  if (!playerData) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={48} className="text-emerald-600 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-emerald-50/50 flex flex-col items-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="bg-white p-4 rounded-3xl shadow-sm text-slate-400 hover:text-emerald-600 transition-all"><Home size={24} /></button>
          <h1 className="text-2xl font-black text-slate-800">الملف الشخصي</h1>
          <div className="w-14 h-14"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 relative overflow-hidden mb-8 border-t-8 border-emerald-600">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center text-4xl font-black text-white shadow-lg mb-4">
              {displayName.substring(0, 1).toUpperCase()}
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {playerData.role === UserRole.TEACHER ? 'معلم' : 'طالب'}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">الاسم المعروض</label>
              <div className="flex gap-2">
                <input 
                  type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={!isEditing}
                  className={`flex-1 px-6 py-4 rounded-2xl border-2 font-bold ${isEditing ? 'border-emerald-500 bg-white' : 'border-transparent bg-slate-50'}`}
                />
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="bg-emerald-50 p-4 rounded-2xl text-emerald-600"><Edit3 size={24} /></button>
                ) : (
                  <button onClick={handleSave} className="bg-emerald-600 p-4 rounded-2xl text-white">{isLoading ? <Loader2 className="animate-spin" /> : <Save size={24} />}</button>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">البريد الإلكتروني</label>
              <div className="px-6 py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold" dir="ltr">{playerData.email}</div>
            </div>

            {teacher && (
              <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
                <UserCheck className="text-emerald-600" />
                <div className="font-bold text-emerald-900 text-sm">بإشراف المعلم: {teacher.displayName}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;