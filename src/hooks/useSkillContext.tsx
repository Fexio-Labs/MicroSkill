import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { MOCK_MICRO_SKILLS } from '../data/microSkills';

type SkillState = {
  score: number;
  level: number;
  isLoading: boolean;
  completedSkills: string[];
  dailySkillId: string;
  streak: number; // Kaç gün üst üste öğrenme yapıldı
  lastAccessDate: string; // Son erişim tarihi
  isPremium: boolean; // Premium kullanıcı mı?
};

type SkillContextValue = SkillState & {
  addScore: (points: number, skillId?: string) => void;
  getTodaysSkill: () => typeof MOCK_MICRO_SKILLS[number];
  upgradeToPremium: () => void; // Premium'a yükselt
  canAccessPremium: (skillId: string) => boolean; // Premium içeriğe erişim kontrolü
};

const SkillContext = React.createContext<SkillContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  SCORE: '@microskill_score',
  LEVEL: '@microskill_level',
  COMPLETED: '@microskill_completed',
  DAILY_SKILL: '@microskill_daily',
  STREAK: '@microskill_streak',
  LAST_ACCESS: '@microskill_last_access',
  IS_PREMIUM: '@microskill_premium',
};

// Günlük skill seçme fonksiyonu (tarihe göre)
function getDailySkillId(dateString: string): string {
  const freeSkills = MOCK_MICRO_SKILLS.filter(s => !s.isPremium);
  if (freeSkills.length === 0) return MOCK_MICRO_SKILLS[0].id;
  
  // Tarihe göre deterministik seçim (her gün aynı skill)
  const date = new Date(dateString);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % freeSkills.length;
  return freeSkills[index].id;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

export function SkillProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SkillState>({
    score: 0,
    level: 1,
    isLoading: true,
    completedSkills: [],
    dailySkillId: '',
    streak: 0,
    lastAccessDate: '',
    isPremium: false,
  });

  React.useEffect(() => {
    // AsyncStorage'dan verileri yükle
    async function loadData() {
      try {
        const [score, level, completed, dailySkill, streak, lastAccess, isPremium] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.SCORE),
          AsyncStorage.getItem(STORAGE_KEYS.LEVEL),
          AsyncStorage.getItem(STORAGE_KEYS.COMPLETED),
          AsyncStorage.getItem(STORAGE_KEYS.DAILY_SKILL),
          AsyncStorage.getItem(STORAGE_KEYS.STREAK),
          AsyncStorage.getItem(STORAGE_KEYS.LAST_ACCESS),
          AsyncStorage.getItem(STORAGE_KEYS.IS_PREMIUM),
        ]);

        const today = getTodayString();
        const todaySkillId = getDailySkillId(today);
        
        // Streak hesapla
        let currentStreak = streak ? parseInt(streak, 10) : 0;
        const lastAccessDate = lastAccess || today;
        
        if (lastAccessDate !== today) {
          // Yeni gün - streak kontrolü
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayString = yesterday.toISOString().split('T')[0];
          
          if (lastAccessDate === yesterdayString) {
            currentStreak += 1; // Streak devam ediyor
          } else {
            currentStreak = 1; // Streak sıfırlandı
          }
        }

        setState({
          score: score ? parseInt(score, 10) : 0,
          level: level ? parseInt(level, 10) : 1,
          completedSkills: completed ? JSON.parse(completed) : [],
          dailySkillId: todaySkillId,
          streak: currentStreak,
          lastAccessDate: today,
          isPremium: isPremium === 'true',
          isLoading: false,
        });

        // Güncellenmiş verileri kaydet
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_ACCESS, today);
        await AsyncStorage.setItem(STORAGE_KEYS.STREAK, currentStreak.toString());
        await AsyncStorage.setItem(STORAGE_KEYS.DAILY_SKILL, todaySkillId);
      } catch (error) {
        console.error('Error loading data:', error);
        setState((prev) => ({ ...prev, isLoading: false, dailySkillId: getDailySkillId(getTodayString()) }));
      }
    }

    loadData();
  }, []);

  const addScore = React.useCallback((points: number, skillId?: string) => {
    setState((prev) => {
      const nextScore = prev.score + points;
      const nextCompleted = skillId && !prev.completedSkills.includes(skillId)
        ? [...prev.completedSkills, skillId]
        : prev.completedSkills;
      // Simple leveling: +1 level per 20 points
      const nextLevel = Math.floor(nextScore / 20) + 1;
      
      const newState = { ...prev, score: nextScore, level: nextLevel, completedSkills: nextCompleted };
      
      // AsyncStorage'a kaydet
      AsyncStorage.setItem(STORAGE_KEYS.SCORE, nextScore.toString());
      AsyncStorage.setItem(STORAGE_KEYS.LEVEL, nextLevel.toString());
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(nextCompleted));
      
      return newState;
    });
  }, []);

  const getTodaysSkill = React.useCallback(() => {
    const skill = MOCK_MICRO_SKILLS.find(s => s.id === state.dailySkillId);
    return skill || MOCK_MICRO_SKILLS[0];
  }, [state.dailySkillId]);

  const upgradeToPremium = React.useCallback(async () => {
    setState(prev => ({ ...prev, isPremium: true }));
    await AsyncStorage.setItem(STORAGE_KEYS.IS_PREMIUM, 'true');
  }, []);

  const canAccessPremium = React.useCallback((skillId: string) => {
    const skill = MOCK_MICRO_SKILLS.find(s => s.id === skillId);
    if (!skill) return false;
    return !skill.isPremium || state.isPremium;
  }, [state.isPremium]);

  const value = React.useMemo<SkillContextValue>(
    () => ({ ...state, addScore, getTodaysSkill, upgradeToPremium, canAccessPremium }),
    [state, addScore, getTodaysSkill, upgradeToPremium, canAccessPremium]
  );

  return <SkillContext.Provider value={value}>{children}</SkillContext.Provider>;
}

export function useSkillContext() {
  const ctx = React.useContext(SkillContext);
  if (!ctx) {
    throw new Error('useSkillContext must be used within a SkillProvider');
  }
  return ctx;
}


