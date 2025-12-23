
import React, { useState, useEffect, useRef } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import ProfileScreen from './components/ProfileScreen';
import LearnMoreScreen from './components/LearnMoreScreen';
import UserEntryModal from './components/UserEntryModal';
import { AppState, GameConfig, GameResult, Question, Grade, UserStats, UserRole, TeacherProfile } from './types';
import { generateScienceQuestions } from './services/scienceService';
import { updateUserStats, auth, subscribeToUserStats, onAuthStateChanged, type User } from './services/statsService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [currentConfig, setCurrentConfig] = useState<GameConfig | null>(null);
  const [highScore, setHighScore] = useState<number>(0);
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<UserStats | TeacherProfile | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  
  const userSubRef = useRef<null | (() => void)>(null);
  
  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (userSubRef.current) { userSubRef.current(); userSubRef.current = null; }

      if (user && !user.isAnonymous) {
        userSubRef.current = subscribeToUserStats(user.uid, (data) => {
          setCurrentUserData(data);
          if (data) setHighScore(data.bestSession || 0);
          setIsAuthChecking(false);
        });
      } else {
        setCurrentUserData(null);
        setIsAuthChecking(false);
      }
    });
    return () => { authUnsubscribe(); if (userSubRef.current) userSubRef.current(); };
  }, []);

  const handleStartGame = (config: GameConfig) => {
    setCurrentConfig(config);
    const userGrade = (currentUserData as UserStats)?.grade || Grade.PRI_3;
    // توليد الأسئلة مع مراعاة ناتج التعلم المختار
    const gameQuestions = generateScienceQuestions(userGrade, 10, config.learningOutcome);
    setQuestions(gameQuestions);
    setAppState(AppState.PLAYING);
  };

  const handleEndGame = async (result: GameResult) => {
    setIsSaving(true);
    setGameResult(result);
    
    const currentScore = result.score;
    const newRecordAchieved = currentScore > highScore;
    
    setIsNewHighScore(newRecordAchieved);
    if (newRecordAchieved) {
      setHighScore(currentScore);
    }

    if (currentUser && currentUserData) {
        try { 
          await updateUserStats(result, currentUser.uid, currentUserData.role, newRecordAchieved); 
        } 
        catch (e) { 
          console.error("Error updating user stats in Firestore:", e); 
        }
    }
    
    setIsSaving(false);
    setAppState(AppState.RESULTS);
  };

  if (isAuthChecking) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 gap-4">
      <Loader2 className="animate-spin text-emerald-600" size={48} />
      <p className="text-emerald-900 font-bold animate-pulse text-lg">جاري تحضير معمل العلوم...</p>
    </div>
  );

  return (
    <div className="min-h-screen text-slate-800 font-sans">
      {(!currentUser || !currentUserData) && <UserEntryModal onSuccess={() => {}} />}
      
      {currentUserData && (
        <>
            {appState === AppState.WELCOME && (
                <WelcomeScreen 
                    onStart={handleStartGame} 
                    onShowAnalytics={() => setAppState(AppState.ANALYTICS)}
                    onShowLeaderboard={() => setAppState(AppState.LEADERBOARD)}
                    onShowProfile={() => setAppState(AppState.PROFILE)}
                    onLearnMore={() => setAppState(AppState.LEARN_MORE)}
                    highScore={highScore}
                    userName={currentUserData?.displayName || ''}
                    currentTotalScore={currentUserData?.totalCorrect || 0}
                    role={currentUserData?.role}
                    teacherId={(currentUserData as any).teacherId}
                />
            )}
            {appState === AppState.PROFILE && <ProfileScreen onBack={() => setAppState(AppState.WELCOME)} playerData={currentUserData} userId={currentUser!.uid} />}
            {appState === AppState.LEADERBOARD && <LeaderboardScreen onBack={() => setAppState(AppState.WELCOME)} currentUser={currentUser!.uid} />}
            {appState === AppState.ANALYTICS && <AnalyticsScreen onBack={() => setAppState(AppState.WELCOME)} playerData={currentUserData} userId={currentUser!.uid} />}
            {appState === AppState.PLAYING && <GameScreen questions={questions} onEndGame={handleEndGame} onExit={() => setAppState(AppState.WELCOME)} isSaving={isSaving} />}
            {appState === AppState.RESULTS && gameResult && (
                <ResultScreen 
                    result={gameResult} 
                    difficulty={currentConfig?.learningOutcome || (currentUserData as any).grade}
                    onRestart={() => setAppState(AppState.WELCOME)} 
                    isNewHighScore={isNewHighScore}
                    userName={currentUserData?.displayName || ''}
                    totalCumulativeScore={currentUserData?.totalCorrect || 0}
                />
            )}
            {appState === AppState.LEARN_MORE && (
              <LearnMoreScreen 
                onBack={() => setAppState(AppState.WELCOME)} 
                grade={(currentUserData as any).grade || Grade.PRI_3} 
              />
            )}
        </>
      )}
    </div>
  );
};

export default App;
