// 关卡系统数据管理

export type ContentSource = 'pinyin-initial' | 'pinyin-final' | 'pinyin-whole' | 'thousand-character' | 'sanzi-jing' | 'tangshi' | 'hanzi-level-1' | 'hanzi-level-2' | 'hanzi-level-3' | 'baijiaxing';

export interface Level {
  id: number;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  targetScore?: number;
  timeLimit?: number;
  starReward: number;
  isUnlocked: boolean;
  completed: boolean;
  starsEarned: number;
  // 动态生成相关字段
  isDynamic?: boolean; // 是否为动态生成的关卡
  contentSource?: ContentSource; // 内容来源
  sectionIds?: number[]; // 对于经典篇章，指定使用的段落ID
  pairCount?: number; // 对于翻牌游戏，指定配对数量
  questionCount?: number; // 对于问答游戏，指定题目数量
}

export interface GameLevels {
  quiz: Level[];
  memory: Level[];
  spelling: Level[];
  'han-memory': Level[];
}

// 默认关卡配置
const defaultLevels: GameLevels = {
  quiz: [
    {
      id: 1,
      name: '第一关：初试牛刀',
      description: '完成 5 道简单题目',
      difficulty: 'easy',
      targetScore: 3,
      starReward: 2,
      isUnlocked: true,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 2,
      name: '第二关：小有成就',
      description: '完成 7 道题目，答对 5 题',
      difficulty: 'medium',
      targetScore: 5,
      starReward: 3,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 3,
      name: '第三关：勇攀高峰',
      description: '完成 10 道题目，答对 7 题',
      difficulty: 'medium',
      targetScore: 7,
      starReward: 4,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 4,
      name: '第四关：挑战极限',
      description: '完成 10 道题目，答对 8 题',
      difficulty: 'hard',
      targetScore: 8,
      starReward: 5,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 5,
      name: '第五关：拼音大师',
      description: '完成 10 道题目，答对 9 题',
      difficulty: 'hard',
      targetScore: 9,
      starReward: 5,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
  ],
  memory: [
    {
      id: 1,
      name: '第一关：入门挑战',
      description: '找出 4 对卡片',
      difficulty: 'easy',
      starReward: 2,
      isUnlocked: true,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 2,
      name: '第二关：进阶测试',
      description: '找出 6 对卡片，步数不超过 12 步',
      difficulty: 'medium',
      starReward: 3,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 3,
      name: '第三关：高手对决',
      description: '找出 8 对卡片，步数不超过 16 步',
      difficulty: 'medium',
      starReward: 4,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 4,
      name: '第四关：记忆挑战',
      description: '找出 10 对卡片，步数不超过 22 步',
      difficulty: 'hard',
      starReward: 5,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 5,
      name: '第五关：超级记忆',
      description: '找出 12 对卡片，步数不超过 30 步',
      difficulty: 'hard',
      starReward: 6,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
  ],
  spelling: [
    {
      id: 1,
      name: '第一关：拼音入门',
      description: '完成 5 道简单拼写题',
      difficulty: 'easy',
      targetScore: 3,
      starReward: 2,
      isUnlocked: true,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 2,
      name: '第二关：声母练习',
      description: '完成 7 道题目，答对 5 题',
      difficulty: 'medium',
      targetScore: 5,
      starReward: 3,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 3,
      name: '第三关：韵母挑战',
      description: '完成 10 道题目，答对 7 题',
      difficulty: 'medium',
      targetScore: 7,
      starReward: 4,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 4,
      name: '第四关：组合拼写',
      description: '完成 10 道题目，答对 8 题',
      difficulty: 'hard',
      targetScore: 8,
      starReward: 5,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 5,
      name: '第五关：拼写大师',
      description: '完成 10 道题目，答对 9 题',
      difficulty: 'hard',
      targetScore: 9,
      starReward: 5,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
  ],
  'han-memory': [
    {
      id: 1,
      name: '第一关：汉字入门',
      description: '找出 4 对基础汉字',
      difficulty: 'easy',
      starReward: 2,
      isUnlocked: true,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 2,
      name: '第二关：汉字进阶',
      description: '找出 6 对汉字，步数不超过 12 步',
      difficulty: 'medium',
      starReward: 3,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 3,
      name: '第三关：汉字高手',
      description: '找出 8 对汉字，步数不超过 16 步',
      difficulty: 'medium',
      starReward: 4,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 4,
      name: '第四关：汉字挑战',
      description: '找出 10 对汉字，步数不超过 22 步',
      difficulty: 'hard',
      starReward: 5,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
    {
      id: 5,
      name: '第五关：汉字大师',
      description: '找出 12 对汉字，步数不超过 30 步',
      difficulty: 'hard',
      starReward: 6,
      isUnlocked: false,
      completed: false,
      starsEarned: 0,
    },
  ],
};

// 获取关卡配置
export function getLevels(gameType: keyof GameLevels): Level[] {
  try {
    const savedData = localStorage.getItem(`gameLevels_${gameType}`);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return defaultLevels[gameType];
  } catch {
    return defaultLevels[gameType];
  }
}

// 保存关卡进度
export function saveLevels(gameType: keyof GameLevels, levels: Level[]): void {
  localStorage.setItem(`gameLevels_${gameType}`, JSON.stringify(levels));
}

// 更新关卡进度
export function updateLevelProgress(
  gameType: keyof GameLevels,
  levelId: number,
  starsEarned: number
): void {
  const levels = getLevels(gameType);
  const levelIndex = levels.findIndex((l) => l.id === levelId);

  if (levelIndex === -1) return;

  // 更新当前关卡
  levels[levelIndex].completed = true;
  levels[levelIndex].starsEarned = Math.max(levels[levelIndex].starsEarned, starsEarned);

  // 解锁下一关
  if (levelIndex < levels.length - 1) {
    levels[levelIndex + 1].isUnlocked = true;
  }

  // 保存进度
  saveLevels(gameType, levels);

  // 更新总星星数
  const totalStars = parseInt(localStorage.getItem('gameStars') || '0');
  localStorage.setItem('gameStars', (totalStars + starsEarned).toString());
}

// 获取总进度
export function getGameProgress(gameType: keyof GameLevels): {
  completed: number;
  total: number;
  stars: number;
} {
  const levels = getLevels(gameType);
  return {
    completed: levels.filter((l) => l.completed).length,
    total: levels.length,
    stars: levels.reduce((sum, l) => sum + l.starsEarned, 0),
  };
}

// 重置所有关卡
export function resetAllLevels(): void {
  localStorage.removeItem('gameLevels_quiz');
  localStorage.removeItem('gameLevels_memory');
  localStorage.removeItem('gameLevels_spelling');
  localStorage.removeItem('gameLevels_han-memory');
}

// ============ 动态关卡管理 ============

import {
  generateDynamicLevel,
  generateNextBatchOfLevels,
  shouldGenerateMoreLevels,
} from './level-generator';

// 获取基础关卡数量（每个游戏类型默认5关）
const BASE_LEVEL_COUNT = 5;

/**
 * 获取关卡（包含动态关卡生成逻辑）
 */
export function getLevelsWithAutoGenerate(gameType: keyof GameLevels): Level[] {
  let levels = getLevels(gameType);

  // 检查是否需要生成新的动态关卡
  if (shouldGenerateMoreLevels(levels, BASE_LEVEL_COUNT)) {
    const newLevels = generateNextBatchOfLevels(
      gameType,
      levels,
      BASE_LEVEL_COUNT,
      5 // 每次生成5关
    );

    // 添加新关卡到列表
    levels = [...levels, ...newLevels];

    // 自动解锁第一个动态关卡
    if (levels.length > BASE_LEVEL_COUNT) {
      levels[BASE_LEVEL_COUNT].isUnlocked = true;
    }

    // 保存更新后的关卡列表
    saveLevels(gameType, levels);
  }

  return levels;
}

/**
 * 更新关卡进度（增强版，支持动态关卡）
 */
export function updateLevelProgressWithAutoGenerate(
  gameType: keyof GameLevels,
  levelId: number,
  starsEarned: number
): void {
  let levels = getLevels(gameType);
  const levelIndex = levels.findIndex((l) => l.id === levelId);

  if (levelIndex === -1) return;

  // 更新当前关卡
  levels[levelIndex].completed = true;
  levels[levelIndex].starsEarned = Math.max(levels[levelIndex].starsEarned, starsEarned);

  // 解锁下一关
  if (levelIndex < levels.length - 1) {
    levels[levelIndex + 1].isUnlocked = true;
  }

  // 检查是否需要生成新的动态关卡
  if (shouldGenerateMoreLevels(levels, BASE_LEVEL_COUNT)) {
    const newLevels = generateNextBatchOfLevels(
      gameType,
      levels,
      BASE_LEVEL_COUNT,
      5
    );

    // 添加新关卡并自动解锁第一个新关卡
    if (newLevels.length > 0) {
      levels = [...levels, ...newLevels];
      levels[levels.length - newLevels.length].isUnlocked = true;
    }
  }

  // 保存进度
  saveLevels(gameType, levels);

  // 更新总星星数
  const totalStars = parseInt(localStorage.getItem('gameStars') || '0');
  localStorage.setItem('gameStars', (totalStars + starsEarned).toString());
}

/**
 * 获取关卡信息（包含动态生成）
 */
export function getLevelInfo(
  gameType: keyof GameLevels,
  levelId: number
): Level | null {
  const levels = getLevelsWithAutoGenerate(gameType);
  return levels.find((l) => l.id === levelId) || null;
}

/**
 * 获取游戏类型的基础关卡数量
 */
export function getBaseLevelCount(): number {
  return BASE_LEVEL_COUNT;
}

/**
 * 检查是否进入动态关卡阶段
 */
export function isInDynamicLevels(gameType: keyof GameLevels): boolean {
  const levels = getLevels(gameType);
  const completedBaseLevels = levels
    .filter(l => l.id <= BASE_LEVEL_COUNT)
    .filter(l => l.completed).length;

  return completedBaseLevels >= BASE_LEVEL_COUNT;
}
