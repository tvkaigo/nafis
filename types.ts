
export enum Grade {
  PRI_3 = 'الصف الثالث الابتدائي',
  PRI_6 = 'الصف السادس الابتدائي',
  INT_3 = 'الصف الثالث المتوسط'
}

export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher'
}

/**
 * Added Difficulty enum to resolve errors in mathService.ts
 */
export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert'
}

/**
 * Added Operation enum to resolve errors in mathService.ts
 */
export enum Operation {
  ADDITION = 'Addition',
  SUBTRACTION = 'Subtraction',
  MULTIPLICATION = 'Multiplication',
  DIVISION = 'Division',
  MIXED = 'Mixed'
}

export interface Question {
  id: number;
  text?: string;
  options?: string[];
  correctAnswer: string;
  category?: string;
  userAnswer?: string;
  isCorrect?: boolean;
  /**
   * Added num1, num2, and operation as optional properties to fix type errors in mathService.ts
   */
  num1?: number;
  num2?: number;
  operation?: Operation;
}

export interface GameConfig {
  grade: Grade;
  subject: string;
}

export interface GameResult {
  score: number;
  totalQuestions: number;
  history: Question[];
}

export enum AppState {
  WELCOME = 'WELCOME',
  PLAYING = 'PLAYING',
  RESULTS = 'RESULTS',
  ANALYTICS = 'ANALYTICS',
  LEADERBOARD = 'LEADERBOARD',
  PROFILE = 'PROFILE'
}

export interface DailyStat {
  date: string;
  correct: number;
  incorrect: number;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  unlocked: boolean;
  required: number;
  color: string;
}

export interface UserStats {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole.STUDENT;
  grade: Grade;
  teacherId?: string;
  totalCorrect: number;
  totalIncorrect: number;
  streak: number;
  bestSession: number;
  lastPlayedDate: string | null;
  lastActive: string | null;
  dailyHistory: Record<string, DailyStat>;
  badges: Badge[];
  badgesCount: number;
}

export interface TeacherProfile {
  teacherId: string;
  uid?: string;
  email: string;
  displayName: string;
  role: UserRole.TEACHER;
  active: boolean;
  totalCorrect: number;
  totalIncorrect: number;
  streak: number;
  bestSession: number;
  lastPlayedDate: string | null;
  lastActive: string | null;
  dailyHistory: Record<string, DailyStat>;
  badges: Badge[];
  badgesCount: number;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  role: UserRole;
  totalCorrect: number;
  badgesCount: number;
  lastActive: string;
  teacherId?: string;
}

export const getUserDisplayName = (userName: string): string => {
  if (!userName) return '';
  if (userName.includes('@')) {
    return userName.split('@')[0];
  }
  return userName;
};