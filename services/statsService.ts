
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, query, orderBy, increment, onSnapshot, where, getDocs, limit, serverTimestamp, DocumentReference, Unsubscribe, FirestoreError, arrayUnion } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, User, setPersistence, browserLocalPersistence, updateProfile, signInAnonymously, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { UserStats, GameResult, LeaderboardEntry, Badge, UserRole, TeacherProfile, Grade } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyDC4eH4DQRNlTWq8WCvyf-ZgfFoNlLDnhk",
  authDomain: "nafis-5cb06.firebaseapp.com",
  projectId: "nafis-5cb06",
  storageBucket: "nafis-5cb06.firebasestorage.app",
  messagingSenderId: "804205585232",
  appId: "1:804205585232:web:87beb9beb6e75687a80255"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

export const loadStats = async (uid: string): Promise<UserStats | TeacherProfile | null> => {
    const studentDoc = await getDoc(doc(db, 'Users', uid));
    if (studentDoc.exists()) {
        const data = studentDoc.data();
        return { ...data, uid: studentDoc.id, badges: getBadgeDefinitions(data.totalCorrect || 0) } as UserStats;
    }
    const teacherDoc = await getDoc(doc(db, 'Teachers', uid));
    if (teacherDoc.exists()) {
        return { ...teacherDoc.data(), teacherId: teacherDoc.id, role: UserRole.TEACHER } as TeacherProfile;
    }
    const q = query(collection(db, 'Teachers'), where('uid', '==', uid));
    const snap = await getDocs(q);
    if (!snap.empty) {
        const d = snap.docs[0];
        return { ...d.data(), teacherId: d.id, role: UserRole.TEACHER } as TeacherProfile;
    }
    return null;
};

export const createOrUpdatePlayerProfile = async (uid: string, email: string, displayName: string, teacherId: string, grade: Grade) => {
    const studentRef = doc(db, 'Users', uid);
    const profileData = {
        uid, email, displayName, grade,
        role: UserRole.STUDENT, 
        teacherId,
        totalCorrect: 0, 
        totalIncorrect: 0, 
        streak: 1, 
        bestSession: 0,
        lastActive: new Date().toISOString(), 
        dailyHistory: {},
        badgesCount: 0
    };
    try {
        await setDoc(studentRef, profileData, { merge: true });
        return true;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, type User };

export const fetchAllTeachers = async (): Promise<TeacherProfile[]> => {
  const q = query(collection(db, 'Teachers'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ ...d.data(), teacherId: d.id })) as any;
};

export const fetchTeacherInfo = async (id: string) => {
  const d = await getDoc(doc(db, 'Teachers', id));
  return d.exists() ? { ...d.data(), teacherId: d.id } as TeacherProfile : null;
};

export const subscribeToUserStats = (uid: string, callback: (stats: any) => void) => {
  return onSnapshot(doc(db, 'Users', uid), (snap) => {
    if (snap.exists()) callback({ ...snap.data(), uid: snap.id, badges: getBadgeDefinitions(snap.data().totalCorrect || 0) });
    else callback(null);
  });
};

export const updateUserStats = async (res: GameResult, uid: string, role: string) => {
  const col = role === UserRole.TEACHER ? 'Teachers' : 'Users';
  const ref = doc(db, col, uid);
  const today = new Date().toISOString().split('T')[0];
  
  await updateDoc(ref, {
    totalCorrect: increment(res.score),
    totalIncorrect: increment(res.totalQuestions - res.score),
    lastActive: new Date().toISOString(),
    [`dailyHistory.${today}.correct`]: increment(res.score),
    [`dailyHistory.${today}.incorrect`]: increment(res.totalQuestions - res.score)
  });
};

export const getBadgeDefinitions = (total: number): Badge[] => [
    { id: 1, name: 'مكتشف مختبر', required: 10, icon: '🔍', unlocked: total >= 10, color: 'text-emerald-600 bg-emerald-100 border-emerald-200' },
    { id: 2, name: 'باحث عبقري', required: 50, icon: '🧪', unlocked: total >= 50, color: 'text-blue-600 bg-blue-100 border-blue-200' },
    { id: 3, name: 'رائد فضاء', required: 100, icon: '🚀', unlocked: total >= 100, color: 'text-purple-600 bg-purple-100 border-purple-200' }
];

export const isTeacherByEmail = async (email: string) => {
    const q = query(collection(db, 'Teachers'), where('email', '==', email.toLowerCase()));
    const snap = await getDocs(q);
    return snap.empty ? null : { ...snap.docs[0].data(), teacherId: snap.docs[0].id } as TeacherProfile;
};

export const activateTeacherAccount = async (tid: string, uid: string) => {
    await updateDoc(doc(db, 'Teachers', tid), { uid, active: true });
};

export const subscribeToLeaderboard = (callback: (data: LeaderboardEntry[]) => void, tid: string) => {
    const q = query(collection(db, 'Users'), where('teacherId', '==', tid));
    return onSnapshot(q, (snap) => {
        const list = snap.docs.map(d => ({ ...d.data(), uid: d.id })) as any;
        callback(list.sort((a: any, b: any) => b.totalCorrect - a.totalCorrect));
    });
};

export const getLast7DaysStatsValue = (p: any) => {
  if (!p || !p.dailyHistory) return [];
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const result = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];
    const stat = p.dailyHistory[dateStr] || { correct: 0, incorrect: 0 };
    result.push({ label: dayName, ...stat });
  }
  return result;
};

export const isCloudEnabledValue = () => true;

export const fetchStudentsByTeacherId = async (tid: string) => {
    const q = query(collection(db, 'Users'), where('teacherId', '==', tid));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ ...d.data(), uid: d.id })) as UserStats[];
};

export const updateUserProfileName = async (uid: string, name: string, role: string, tid?: string) => {
    const col = role === UserRole.TEACHER ? 'Teachers' : 'Users';
    await updateDoc(doc(db, col, uid), { displayName: name });
};
