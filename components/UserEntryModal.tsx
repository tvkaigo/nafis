
import { AlertCircle, BookOpen, CheckCircle2, GraduationCap, Loader2, Lock, Mail, Sparkles, User, UserCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { 
    activateTeacherAccount, 
    auth, 
    createOrUpdatePlayerProfile, 
    createUserWithEmailAndPassword, 
    fetchAllTeachers, 
    isTeacherByEmail, 
    signInWithEmailAndPassword,
    updateProfile
} from '../services/statsService';
import { Grade, TeacherProfile } from '../types';

interface UserEntryModalProps {
  onSuccess: () => void;
}

const UserEntryModal: React.FC<UserEntryModalProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'teacher'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [grade, setGrade] = useState<Grade>(Grade.PRI_3);
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTeachers, setIsFetchingTeachers] = useState(false);

  const isEmailValid = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const loadTeachersList = async () => {
    setIsFetchingTeachers(true);
    try {
        const list = await fetchAllTeachers();
        setTeachers(list.filter(t => t.displayName).sort((a, b) => a.displayName.localeCompare(b.displayName, 'ar')));
    } catch (err) {
        console.error(err);
    } finally {
        setIsFetchingTeachers(false);
    }
  };

  useEffect(() => {
    setError('');
    setSuccess('');
    if (mode === 'signup') loadTeachersList();
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    setSuccess('');

    setIsLoading(true);
    try {
      if (mode === 'teacher') {
        const cleanEmail = email.trim().toLowerCase();
        const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
        const teacherProfile = await isTeacherByEmail(cleanEmail);
        if (!teacherProfile) {
          await auth.signOut();
          throw { message: "عذراً، هذا البريد غير مسجل كمعلم معتمد." };
        }
        if (!teacherProfile.uid) {
          await activateTeacherAccount(teacherProfile.teacherId, userCredential.user.uid);
        }
        setSuccess("تم الدخول بنجاح!");
        setTimeout(onSuccess, 500);
      } else if (mode === 'signup') {
        if (!displayName || !teacherId) throw { message: "يرجى ملء جميع الحقول." };
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        await createOrUpdatePlayerProfile(userCredential.user.uid, email, displayName, teacherId, grade);
        setSuccess("أهلاً بك يا بطل الرياضيات!");
        setTimeout(onSuccess, 800);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("أهلاً بعودتك!");
        setTimeout(onSuccess, 800);
      }
    } catch (err: any) {
      let msg = "حدث خطأ ما";
      if (err.code === 'auth/wrong-password') msg = "كلمة المرور غير صحيحة";
      if (err.code === 'auth/user-not-found') msg = "البريد الإلكتروني غير مسجل";
      if (err.code === 'auth/invalid-credential') msg = "بيانات الاعتماد غير صالحة";
      setError(err.message || msg);
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || !isEmailValid(email) || !password;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full border-4 border-indigo-50 relative overflow-hidden animate-pop-in my-auto">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        
        <div className="text-center mb-6">
          <div className="bg-indigo-100 text-indigo-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            {mode === 'teacher' ? <GraduationCap size={28} /> : <Sparkles size={28} />}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            {mode === 'teacher' ? 'بوابة المعلمين' : 'نافس الأقوى'}
          </h2>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6 shadow-inner">
          <button onClick={() => setMode('login')} className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${mode === 'login' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-indigo-400'}`}>دخول</button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${mode === 'signup' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-indigo-400'}`}>تسجيل</button>
          <button onClick={() => setMode('teacher')} className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${mode === 'teacher' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-indigo-400'}`}>معلم</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div className="relative">
                <input type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="اسم الطالب الثلاثي" className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none pr-11 text-sm font-bold" />
                <User className="absolute right-3.5 top-3.5 text-slate-400" size={20} />
              </div>
              <div className="relative">
                <select value={grade} onChange={(e) => setGrade(e.target.value as Grade)} className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none pr-11 appearance-none bg-white font-bold text-sm">
                  {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <BookOpen className="absolute right-3.5 top-3.5 text-slate-400" size={20} />
              </div>
              <div className="relative">
                <select required value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none pr-11 appearance-none bg-white text-sm">
                  <option value="">{isFetchingTeachers ? "جاري التحميل..." : "-- اختر معلم الفصل --"}</option>
                  {teachers.map(t => <option key={t.teacherId} value={t.teacherId}>{t.displayName}</option>)}
                </select>
                {isFetchingTeachers ? <Loader2 className="absolute right-3.5 top-3.5 text-indigo-500 animate-spin" size={20} /> : <UserCheck className="absolute right-3.5 top-3.5 text-slate-400" size={20} />}
              </div>
            </>
          )}

          <div className="relative">
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="البريد الإلكتروني" 
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none pr-11 text-sm" 
              dir="ltr" 
            />
            <Mail className="absolute right-3.5 top-3.5 text-slate-400" size={20} />
          </div>

          <div className="relative">
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
              placeholder="كلمة المرور" 
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none pr-11 text-sm" 
              dir="ltr" 
            />
            <Lock className="absolute right-3.5 top-3.5 text-slate-400" size={20} />
          </div>

          {error && <div className="text-red-600 text-[11px] font-bold flex items-center gap-2 bg-red-50 p-3 rounded-xl border border-red-100"><AlertCircle size={16} className="flex-shrink-0" /> {error}</div>}
          {success && <div className="text-emerald-600 text-[11px] font-bold flex items-center gap-2 bg-emerald-50 p-3 rounded-xl border border-emerald-100"><CheckCircle2 size={16} className="flex-shrink-0" /> {success}</div>}

          <button 
            type="submit" disabled={isButtonDisabled} 
            className={`w-full font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale ${mode === 'teacher' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-base`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'انطلق الآن'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEntryModal;
