
import React, { useState, useEffect } from 'react';
import { UserStats, TeacherProfile, UserRole, Grade } from '../types';
import { 
  Home, User, Mail, UserCheck, Shield, Edit3, Save, 
  Loader2, Award, X, RefreshCw, Users, ChevronLeft, 
  BarChart3, CheckCircle2, TrendingUp, Percent, ArrowRight
} from 'lucide-react';
import { 
  updateUserProfileName, fetchTeacherInfo, getBadgeDefinitions, 
  fetchStudentsByTeacherId, getLast7DaysStatsValue 
} from '../services/statsService';

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
  const [students, setStudents] = useState<UserStats[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<UserStats | null>(null);

  useEffect(() => {
    if (playerData?.role === UserRole.STUDENT && (playerData as UserStats).teacherId) {
        fetchTeacherInfo((playerData as UserStats).teacherId!).then(setTeacher);
    } else if (playerData?.role === UserRole.TEACHER) {
        loadStudents();
    }
  }, [playerData]);

  const loadStudents = async () => {
    if (playerData?.role !== UserRole.TEACHER) return;
    setIsLoadingStudents(true);
    try {
      const list = await fetchStudentsByTeacherId((playerData as TeacherProfile).teacherId);
      setStudents(list.sort((a, b) => b.totalCorrect - a.totalCorrect));
    } catch (err) {
      console.error("Error loading students:", err);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const handleSave = async () => {
    if (!displayName.trim()) return;
    setIsLoading(true);
    try {
        await updateUserProfileName(userId, displayName.trim(), playerData!.role);
        setIsEditing(false);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  if (!playerData) return <div className="min-h-screen flex items-center justify-center"><Loader2 size={48} className="text-emerald-600 animate-spin" /></div>;

  // واجهة عرض تحليلات الطالب المختارة (للمعلم)
  if (viewingStudent) {
    const weeklyData = getLast7DaysStatsValue(viewingStudent);
    const totalAttempts = viewingStudent.totalCorrect + viewingStudent.totalIncorrect;
    const accuracy = totalAttempts > 0 ? Math.round((viewingStudent.totalCorrect / totalAttempts) * 100) : 0;

    return (
      <div className="min-h-screen bg-emerald-50/50 flex flex-col items-center p-4 sm:p-8 font-sans animate-fade-in">
        <div className="w-full max-w-3xl">
          <button 
            onClick={() => setViewingStudent(null)} 
            className="flex items-center gap-2 text-emerald-600 font-bold mb-6 hover:gap-3 transition-all"
          >
            <ArrowRight size={20} /> العودة لقائمة الفصل
          </button>

          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border-t-8 border-emerald-600">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 text-center md:text-right">
              <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-3xl font-black text-emerald-600 border-4 border-white shadow-sm">
                {viewingStudent.displayName.substring(0, 1).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-slate-800">{viewingStudent.displayName}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{viewingStudent.grade}</span>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">بطل نافس</span>
                </div>
              </div>
              <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-center">
                <div className="text-2xl font-black">{viewingStudent.totalCorrect}</div>
                <div className="text-[10px] font-bold uppercase opacity-80">إجمالي النقاط</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100">
                <Percent size={20} className="text-emerald-600 mb-1" />
                <div className="text-xl font-black text-emerald-900">{accuracy}%</div>
                <div className="text-xs text-slate-500 font-bold">دقة الإجابات</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100">
                <TrendingUp size={20} className="text-orange-600 mb-1" />
                <div className="text-xl font-black text-orange-900">{viewingStudent.streak}</div>
                <div className="text-xs text-slate-500 font-bold">سلسلة النشاط</div>
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 className="text-emerald-600" size={20} /> نشاط الطالب (7 أيام)
            </h3>
            <div className="bg-slate-50 rounded-3xl p-6 h-32 flex items-end gap-2 mb-8 border border-slate-100">
              {weeklyData.map((d, i) => {
                const total = d.correct + d.incorrect;
                const h = total === 0 ? '4px' : `${(total / 15) * 100}%`;
                return (
                  <div key={i} className="flex-1 bg-emerald-200 rounded-t-lg relative group" style={{ height: h }}>
                     <div className="absolute inset-0 bg-emerald-500 rounded-t-lg transition-all" style={{ height: total === 0 ? '0%' : `${(d.correct / total) * 100}%` }}></div>
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                       {total}
                     </div>
                  </div>
                );
              })}
            </div>

            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <Award className="text-emerald-600" size={20} /> الأوسمة المفتوحة
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {viewingStudent.badges.map(b => (
                <div key={b.id} className={`p-3 rounded-2xl border flex flex-col items-center text-center ${b.unlocked ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-transparent opacity-40 grayscale'}`}>
                  <span className="text-2xl mb-1">{b.icon}</span>
                  <span className="text-[10px] font-black leading-tight">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50/50 flex flex-col items-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="bg-white p-4 rounded-3xl shadow-sm text-slate-400 hover:text-emerald-600 transition-all active:scale-95"><Home size={24} /></button>
          <h1 className="text-2xl font-black text-slate-800">الملف الشخصي</h1>
          <div className="w-14 h-14"></div>
        </div>

        {/* معلومات المعلم/الطالب الأساسية */}
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
                  <button onClick={() => setIsEditing(true)} className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 hover:bg-emerald-100 transition-colors"><Edit3 size={24} /></button>
                ) : (
                  <button onClick={handleSave} className="bg-emerald-600 p-4 rounded-2xl text-white hover:bg-emerald-700 transition-colors">{isLoading ? <Loader2 className="animate-spin" /> : <Save size={24} />}</button>
                )}
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-widest">البريد الإلكتروني</label>
              <div className="px-6 py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold" dir="ltr">{playerData.email}</div>
            </div>

            {teacher && (
              <div className="p-5 bg-emerald-50 rounded-3xl flex items-center gap-4 border border-emerald-100 shadow-sm">
                <div className="bg-white p-3 rounded-2xl text-emerald-600 shadow-inner">
                  <UserCheck size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">المعلم المشرف</div>
                  <div className="font-black text-slate-800">{teacher.displayName}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* عرض قائمة الطلاب للمعلمين فقط */}
        {playerData.role === UserRole.TEACHER && (
          <div className="w-full">
             <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Users className="text-emerald-600" size={24} /> إدارة طلاب فصلي
                </h2>
                <button 
                  onClick={loadStudents} 
                  disabled={isLoadingStudents}
                  className="bg-white p-2 rounded-xl shadow-sm text-slate-400 hover:text-emerald-600 transition-all border border-emerald-50"
                >
                  <RefreshCw size={18} className={isLoadingStudents ? 'animate-spin' : ''} />
                </button>
             </div>

             <div className="space-y-3">
                {isLoadingStudents && students.length === 0 ? (
                  <div className="bg-white p-10 rounded-[2rem] shadow-sm flex flex-col items-center justify-center gap-3 border border-emerald-50">
                    <Loader2 className="animate-spin text-emerald-400" size={32} />
                    <p className="text-slate-400 font-bold">جاري استرجاع قائمة العباقرة...</p>
                  </div>
                ) : students.length > 0 ? (
                  students.map(student => (
                    <button 
                      key={student.uid}
                      onClick={() => setViewingStudent(student)}
                      className="w-full bg-white p-4 rounded-3xl shadow-sm border border-emerald-50 flex items-center justify-between hover:shadow-md hover:border-emerald-200 transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          {student.displayName.substring(0,1).toUpperCase()}
                        </div>
                        <div className="text-right">
                          <div className="font-black text-slate-800">{student.displayName}</div>
                          <div className="text-[10px] font-bold text-slate-400">{student.grade}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-left">
                          <div className="text-lg font-black text-emerald-600">{student.totalCorrect}</div>
                          <div className="text-[8px] font-black text-slate-400 uppercase">نقطة</div>
                        </div>
                        <ChevronLeft size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="bg-white p-10 rounded-[2rem] shadow-sm text-center border border-emerald-50">
                    <p className="text-slate-400 font-bold">لا يوجد طلاب مسجلون تحت إشرافك حالياً.</p>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
