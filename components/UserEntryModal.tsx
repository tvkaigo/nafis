
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Loader2, AlertCircle, UserCheck, GraduationCap, Sparkles, CheckCircle2, BookOpen, Info } from 'lucide-react';
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
        
        // 1. تسجيل الدخول بكلمة المرور
        const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
        
        // 2. التحقق من أن الحساب مسجل كمعلم
        const teacherProfile = await isTeacherByEmail(cleanEmail);
        if (!teacherProfile) {
          await auth.signOut();
          throw { message: "عذراً، هذا البريد غير مسجل كمعلم معتمد في النظام." };
        }

        // 3. ربط الحساب بـ UID إذا لم يكن مرتبطاً
        if (!teacherProfile.uid) {
          await activateTeacherAccount(teacherProfile.teacherId, userCredential.user.uid);
        }

        setSuccess("تم الدخول بنجاح! جاري توجيهك...");
        setTimeout(onSuccess, 800);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-md w-full border-4 border-emerald-100 relative overflow-hidden animate-pop-in">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        
        <div className="text-center mb-6">
          <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {mode === 'teacher' ? <GraduationCap size={32} /> : <Sparkles size={32} />}
          </div>
          <h2 className="text-2xl font-black text-slate-800">
            {mode === 'teacher' ? 'دخول المعلمين' : 'منصة نافس للعلوم'}
          </h2>
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
                  <option value="">{isFetchingTeachers ? "جاري جلب قائمة المعلمين..." : "-- اختر المعلم --"}</option>
                  {teachers.map(t => <option key={t.teacherId} value={t.teacherId}>{t.displayName}</option>)}
                </select>
                {isFetchingTeachers ? <Loader2 className="absolute right-3 top-3 text-emerald-500 animate-spin" size={20} /> : <UserCheck className="absolute right-3 top-3 text-slate-400" size={20} />}
              </div>
            </>
          )}

          <div className="relative">
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="البريد الإلكتروني المعتمد" 
              className={`w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none pr-10 transition-all`} 
              dir="ltr" 
            />
            <Mail className={`absolute right-3 top-3 text-slate-400`} size={20} />
          </div>

          <div className="relative">
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="كلمة المرور" 
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none pr-10" 
              dir="ltr" 
            />
            <Lock className="absolute right-3 top-3 text-slate-400" size={20} />
          </div>

          {error && <div className="text-red-500 text-sm font-bold flex items-center gap-1 bg-red-50 p-3 rounded-lg border border-red-100"><AlertCircle size={16} className="flex-shrink-0" /> {error}</div>}
          {success && <div className="text-emerald-600 text-sm font-bold flex items-center gap-2 bg-emerald-50 p-4 rounded-xl border border-emerald-100 animate-fade-in-up"><CheckCircle2 size={18} className="flex-shrink-0" /> {success}</div>}

          <button 
            type="submit" 
            disabled={isButtonDisabled} 
            className={`w-full font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed ${mode === 'teacher' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'استمرار'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEntryModal;
