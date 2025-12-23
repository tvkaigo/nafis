
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Loader2, AlertCircle, UserCheck, ChevronDown, GraduationCap, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { 
    auth, 
    createOrUpdatePlayerProfile, 
    fetchAllTeachers, 
    isTeacherByEmail, 
    activateTeacherAccount, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from '../services/statsService';
import { TeacherProfile, Grade } from '../types';

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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const profile = await isTeacherByEmail(email);
        if (!profile) throw { message: "عذراً، هذا الحساب ليس لمعلم معتمد." };
        if (!profile.uid) await activateTeacherAccount(profile.teacherId, userCredential.user.uid);
        setSuccess("تم الدخول بنجاح!");
        setTimeout(onSuccess, 1000);
      } else if (mode === 'signup') {
        if (!displayName || !teacherId) throw { message: "يرجى ملء جميع الحقول." };
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        await createOrUpdatePlayerProfile(userCredential.user.uid, email, displayName, teacherId, grade);
        setSuccess("أهلاً بك يا بطل العلوم!");
        setTimeout(onSuccess, 1000);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("أهلاً بعودتك!");
        setTimeout(onSuccess, 1000);
      }
    } catch (err: any) {
      setError(err.message || "حدث خطأ ما");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-md w-full border-4 border-emerald-100 relative overflow-hidden animate-pop-in">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        
        <div className="text-center mb-6">
          <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {mode === 'teacher' ? <GraduationCap size={32} /> : <Sparkles size={32} />}
          </div>
          <h2 className="text-2xl font-black text-slate-800">منصة نافس للعلوم</h2>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'login' ? 'bg-white text-emerald-600 shadow' : 'text-slate-500'}`}>دخول</button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'signup' ? 'bg-white text-emerald-600 shadow' : 'text-slate-500'}`}>تسجيل</button>
          <button onClick={() => setMode('teacher')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'teacher' ? 'bg-white text-emerald-600 shadow' : 'text-slate-500'}`}>معلم</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div className="relative">
                <input type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="اسمك الكامل" className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none pr-10" />
                <User className="absolute right-3 top-3 text-slate-400" size={20} />
              </div>
              <div className="relative">
                <select value={grade} onChange={(e) => setGrade(e.target.value as Grade)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none pr-10 appearance-none bg-white font-bold">
                  {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <BookOpen className="absolute right-3 top-3 text-slate-400" size={20} />
              </div>
              <div className="relative">
                <select required value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none pr-10 appearance-none bg-white">
                  <option value="">-- اختر المعلم --</option>
                  {teachers.map(t => <option key={t.teacherId} value={t.teacherId}>{t.displayName}</option>)}
                </select>
                <UserCheck className="absolute right-3 top-3 text-slate-400" size={20} />
              </div>
            </>
          )}

          <div className="relative">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none pr-10" dir="ltr" />
            <Mail className="absolute right-3 top-3 text-slate-400" size={20} />
          </div>

          <div className="relative">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none pr-10" dir="ltr" />
            <Lock className="absolute right-3 top-3 text-slate-400" size={20} />
          </div>

          {error && <div className="text-red-500 text-sm font-bold flex items-center gap-1"><AlertCircle size={16} /> {error}</div>}
          {success && <div className="text-emerald-500 text-sm font-bold flex items-center gap-1"><CheckCircle2 size={16} /> {success}</div>}

          <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" /> : 'استمرار'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEntryModal;
