// 动态关卡生成器
// 根据学习内容自动生成无限关卡

import { Level, ContentSource } from './level-system';
import { shengmu, dunyunmu, fuyunmu, zhengtiren, PinyinLetter, hanziData } from './pinyin-data';
import { thousandCharSections } from './thousand-character-data';
import { sanziJingSections } from './sanzi-jing-data';
import { baijiaxingSections } from './baijiaxing-data';
import { tangPoetryCollection } from './tang-poetry-data';

// 千字文数据接口（简化）
interface ThousandCharSection {
  id: number;
  characters: string;
  pinyin: string;
  translation?: string;
}

// 三字经数据接口（简化）
interface SanziJingSection {
  id: number;
  content: string;
  pinyin: string;
  translation?: string;
}

// 百家姓数据接口（简化）
interface BaijiaxingSection {
  id: number;
  surnames: any[];
}

// 唐诗数据接口（简化）
interface TangPoetrySection {
  id: string;
  title: string;
  author: string;
  content: string;
  pinyin: string;
  translation: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

// 类型守卫
function isThousandCharSection(data: any): data is ThousandCharSection[] {
  return Array.isArray(data) && data.length > 0 && 'id' in data[0] && 'characters' in data[0];
}

function isSanziJingSection(data: any): data is SanziJingSection[] {
  return Array.isArray(data) && data.length > 0 && 'id' in data[0] && 'content' in data[0];
}

function isBaijiaxingSection(data: any): data is BaijiaxingSection[] {
  return Array.isArray(data) && data.length > 0 && 'id' in data[0] && 'surnames' in data[0];
}

function isTangPoetrySection(data: any): data is TangPoetrySection[] {
  return Array.isArray(data) && data.length > 0 && 'id' in data[0] && 'title' in data[0] && 'content' in data[0];
}

/**
 * 从数据源中随机选择指定数量的元素
 */
function randomSelect<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * 根据关卡 ID 计算难度
 * 关卡越高，难度越大
 */
function calculateDifficulty(levelId: number): 'easy' | 'medium' | 'hard' {
  if (levelId <= 5) return 'easy';
  if (levelId <= 15) return 'medium';
  return 'hard';
}

/**
 * 计算目标分数（对于问答和拼写游戏）
 */
function calculateTargetScore(levelId: number, totalQuestions: number): number {
  const difficulty = calculateDifficulty(levelId);
  switch (difficulty) {
    case 'easy':
      return Math.ceil(totalQuestions * 0.6);
    case 'medium':
      return Math.ceil(totalQuestions * 0.7);
    case 'hard':
      return Math.ceil(totalQuestions * 0.8);
  }
}

/**
 * 计算步数限制（对于翻牌游戏）
 */
function calculateMaxMoves(levelId: number, pairCount: number): number {
  const difficulty = calculateDifficulty(levelId);
  const baseMoves = pairCount * 3; // 基础步数
  switch (difficulty) {
    case 'easy':
      return baseMoves + 2;
    case 'medium':
      return baseMoves + 4;
    case 'hard':
      return baseMoves + 6;
  }
}

/**
 * 计算星星奖励
 */
function calculateStarReward(levelId: number): number {
  return 2 + Math.min(Math.floor(levelId / 5), 4); // 2-6 星
}

/**
 * 生成 Quiz 游戏关卡
 */
export function generateQuizLevel(levelId: number, contentSource: ContentSource): Level {
  const difficulty = calculateDifficulty(levelId);
  const questionCount = Math.min(5 + Math.floor(levelId / 3), 15); // 5-15 题
  const targetScore = calculateTargetScore(levelId, questionCount);
  const starReward = calculateStarReward(levelId);

  // 根据内容源确定名称和描述
  let name = `第 ${levelId} 关`;
  let description = '';
  let sectionIds: number[] | undefined;

  switch (contentSource) {
    case 'pinyin-initial':
      name += ` - 声母挑战`;
      description = `从声母中选出 ${questionCount} 道题目，答对 ${targetScore} 题`;
      break;
    case 'pinyin-final':
      name += ` - 韵母挑战`;
      description = `从韵母中选出 ${questionCount} 道题目，答对 ${targetScore} 题`;
      break;
    case 'pinyin-whole':
      name += ` - 整体认读挑战`;
      description = `从整体认读音节中选出 ${questionCount} 道题目，答对 ${targetScore} 题`;
      break;
    case 'thousand-character':
      const totalSections = isThousandCharSection(thousandCharSections) ? thousandCharSections.length : 63;
      const startSection = ((levelId - 1) * 3) % totalSections;
      const endSection = Math.min(startSection + 3, totalSections);
      sectionIds = Array.from({ length: endSection - startSection }, (_, i) => startSection + i);
      name += ` - 千字文 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段`;
      description = `从千字文第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段中选出 ${questionCount} 题，答对 ${targetScore} 题`;
      break;
    case 'sanzi-jing':
      const totalSJSections = isSanziJingSection(sanziJingSections) ? sanziJingSections.length : 55;
      const startSJ = ((levelId - 1) * 2) % totalSJSections;
      const endSJ = Math.min(startSJ + 2, totalSJSections);
      sectionIds = Array.from({ length: endSJ - startSJ }, (_, i) => startSJ + i);
      name += ` - 三字经 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段`;
      description = `从三字经第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段中选出 ${questionCount} 题，答对 ${targetScore} 题`;
      break;
    case 'baijiaxing':
      const totalBJSections = isBaijiaxingSection(baijiaxingSections) ? baijiaxingSections.length : 13;
      const startBJ = ((levelId - 1) * 2) % totalBJSections;
      const endBJ = Math.min(startBJ + 2, totalBJSections);
      sectionIds = Array.from({ length: endBJ - startBJ }, (_, i) => startBJ + i);
      name += ` - 百家姓 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段`;
      description = `从百家姓第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段中选出 ${questionCount} 题，答对 ${targetScore} 题`;
      break;
    case 'tangshi':
      const totalPoems = isTangPoetrySection(tangPoetryCollection) ? tangPoetryCollection.length : 109;
      const startPoem = ((levelId - 1) * 3) % totalPoems;
      const endPoem = Math.min(startPoem + 3, totalPoems);
      sectionIds = Array.from({ length: endPoem - startPoem }, (_, i) => startPoem + i);
      name += ` - 唐诗精选 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 首`;
      description = `从唐诗第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 首中选出 ${questionCount} 题，答对 ${targetScore} 题`;
      break;
    case 'hanzi-level-1':
      name += ` - 基础汉字`;
      description = `从基础汉字中选出 ${questionCount} 道题目，答对 ${targetScore} 题`;
      break;
    case 'hanzi-level-2':
      name += ` - 进阶汉字`;
      description = `从中级汉字中选出 ${questionCount} 道题目，答对 ${targetScore} 题`;
      break;
    case 'hanzi-level-3':
      name += ` - 高级汉字`;
      description = `从高级汉字中选出 ${questionCount} 道题目，答对 ${targetScore} 题`;
      break;
    default:
      name += ` - 综合挑战`;
      description = `完成 ${questionCount} 道题目，答对 ${targetScore} 题`;
  }

  return {
    id: levelId,
    name,
    description,
    difficulty,
    targetScore,
    starReward,
    isUnlocked: false, // 动态关卡默认锁定，需要逻辑判断
    completed: false,
    starsEarned: 0,
    isDynamic: true,
    contentSource,
    sectionIds,
    questionCount,
  };
}

/**
 * 生成 Memory 翻牌游戏关卡
 */
export function generateMemoryLevel(levelId: number, contentSource: ContentSource): Level {
  const difficulty = calculateDifficulty(levelId);
  let pairCount: number;

  // 根据难度确定配对数量
  switch (difficulty) {
    case 'easy':
      pairCount = 4 + ((levelId - 1) % 3); // 4-6 对
      break;
    case 'medium':
      pairCount = 6 + ((levelId - 6) % 4); // 6-9 对
      break;
    case 'hard':
      pairCount = 8 + ((levelId - 11) % 4); // 8-12 对
      break;
  }

  const maxMoves = calculateMaxMoves(levelId, pairCount);
  const starReward = calculateStarReward(levelId);

  // 根据内容源确定名称和描述
  let name = `第 ${levelId} 关`;
  let description = '';
  let sectionIds: number[] | undefined;

  switch (contentSource) {
    case 'pinyin-initial':
      name += ` - 声母翻牌`;
      description = `找出 ${pairCount} 对声母卡片，步数不超过 ${maxMoves} 步`;
      break;
    case 'pinyin-final':
      name += ` - 韵母翻牌`;
      description = `找出 ${pairCount} 对韵母卡片，步数不超过 ${maxMoves} 步`;
      break;
    case 'pinyin-whole':
      name += ` - 整体认读翻牌`;
      description = `找出 ${pairCount} 对整体认读音节卡片，步数不超过 ${maxMoves} 步`;
      break;
    case 'thousand-character':
      const totalSections = isThousandCharSection(thousandCharSections) ? thousandCharSections.length : 63;
      const tcSection = ((levelId - 1) * 4) % totalSections;
      name += ` - 千字文 第 ${tcSection + 1} 段`;
      description = `从千字文第 ${tcSection + 1} 段中找出 ${pairCount} 对汉字，步数不超过 ${maxMoves} 步`;
      sectionIds = [tcSection];
      break;
    case 'sanzi-jing':
      const totalSJSections = isSanziJingSection(sanziJingSections) ? sanziJingSections.length : 55;
      const sjSection = ((levelId - 1) * 3) % totalSJSections;
      name += ` - 三字经 第 ${sjSection + 1} 段`;
      description = `从三字经第 ${sjSection + 1} 段中找出 ${pairCount} 对汉字，步数不超过 ${maxMoves} 步`;
      sectionIds = [sjSection];
      break;
    case 'baijiaxing':
      const totalBJSections = isBaijiaxingSection(baijiaxingSections) ? baijiaxingSections.length : 13;
      const bjSection = ((levelId - 1) * 3) % totalBJSections;
      name += ` - 百家姓 第 ${bjSection + 1} 段`;
      description = `从百家姓第 ${bjSection + 1} 段中找出 ${pairCount} 对姓氏，步数不超过 ${maxMoves} 步`;
      sectionIds = [bjSection];
      break;
    case 'tangshi':
      const totalTMSections = isTangPoetrySection(tangPoetryCollection) ? tangPoetryCollection.length : 109;
      const tmSection = ((levelId - 1) * 4) % totalTMSections;
      name += ` - 唐诗精选 第 ${tmSection + 1} 首`;
      description = `从唐诗第 ${tmSection + 1} 首中找出 ${pairCount} 对卡片，步数不超过 ${maxMoves} 步`;
      sectionIds = [tmSection];
      break;
    case 'hanzi-level-1':
      name += ` - 基础汉字翻牌`;
      description = `找出 ${pairCount} 对基础汉字，步数不超过 ${maxMoves} 步`;
      break;
    case 'hanzi-level-2':
      name += ` - 进阶汉字翻牌`;
      description = `找出 ${pairCount} 对中级汉字，步数不超过 ${maxMoves} 步`;
      break;
    case 'hanzi-level-3':
      name += ` - 高级汉字翻牌`;
      description = `找出 ${pairCount} 对高级汉字，步数不超过 ${maxMoves} 步`;
      break;
    default:
      name += ` - 翻牌挑战`;
      description = `找出 ${pairCount} 对卡片，步数不超过 ${maxMoves} 步`;
  }

  return {
    id: levelId,
    name,
    description,
    difficulty,
    starReward,
    isUnlocked: false,
    completed: false,
    starsEarned: 0,
    isDynamic: true,
    contentSource,
    sectionIds,
    pairCount,
  };
}

/**
 * 生成 Spelling 拼写游戏关卡
 */
export function generateSpellingLevel(levelId: number, contentSource: ContentSource): Level {
  const difficulty = calculateDifficulty(levelId);
  const questionCount = Math.min(5 + Math.floor(levelId / 3), 15); // 5-15 题
  const targetScore = calculateTargetScore(levelId, questionCount);
  const starReward = calculateStarReward(levelId);

  // 根据内容源确定名称和描述
  let name = `第 ${levelId} 关`;
  let description = '';
  let sectionIds: number[] | undefined;

  switch (contentSource) {
    case 'pinyin-initial':
      name += ` - 声母拼写`;
      description = `为 ${questionCount} 个声母选拼音，答对 ${targetScore} 题`;
      break;
    case 'pinyin-final':
      name += ` - 韵母拼写`;
      description = `为 ${questionCount} 个韵母选拼音，答对 ${targetScore} 题`;
      break;
    case 'pinyin-whole':
      name += ` - 整体认读拼写`;
      description = `为 ${questionCount} 个整体认读音节选拼音，答对 ${targetScore} 题`;
      break;
    case 'thousand-character':
      const totalSections = isThousandCharSection(thousandCharSections) ? thousandCharSections.length : 63;
      const tcStart = ((levelId - 1) * 3) % totalSections;
      const tcEnd = Math.min(tcStart + 3, totalSections);
      sectionIds = Array.from({ length: tcEnd - tcStart }, (_, i) => tcStart + i);
      name += ` - 千字文 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段`;
      description = `从千字文第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段中选出 ${questionCount} 题拼写，答对 ${targetScore} 题`;
      break;
    case 'sanzi-jing':
      const totalSJSections = isSanziJingSection(sanziJingSections) ? sanziJingSections.length : 55;
      const sjStart = ((levelId - 1) * 2) % totalSJSections;
      const sjEnd = Math.min(sjStart + 2, totalSJSections);
      sectionIds = Array.from({ length: sjEnd - sjStart }, (_, i) => sjStart + i);
      name += ` - 三字经 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段`;
      description = `从三字经第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段中选出 ${questionCount} 题拼写，答对 ${targetScore} 题`;
      break;
    case 'baijiaxing':
      const totalBJSections = isBaijiaxingSection(baijiaxingSections) ? baijiaxingSections.length : 13;
      const bjStart = ((levelId - 1) * 2) % totalBJSections;
      const bjEnd = Math.min(bjStart + 2, totalBJSections);
      sectionIds = Array.from({ length: bjEnd - bjStart }, (_, i) => bjStart + i);
      name += ` - 百家姓 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段`;
      description = `从百家姓第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 段中选出 ${questionCount} 题拼写，答对 ${targetScore} 题`;
      break;
    case 'tangshi':
      const totalTSSections = isTangPoetrySection(tangPoetryCollection) ? tangPoetryCollection.length : 109;
      const tsStart = ((levelId - 1) * 3) % totalTSSections;
      const tsEnd = Math.min(tsStart + 3, totalTSSections);
      sectionIds = Array.from({ length: tsEnd - tsStart }, (_, i) => tsStart + i);
      name += ` - 唐诗精选 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 首`;
      description = `从唐诗第 ${sectionIds[0] + 1}-${sectionIds[sectionIds.length - 1] + 1} 首中选出 ${questionCount} 题拼写，答对 ${targetScore} 题`;
      break;
    case 'hanzi-level-1':
      name += ` - 基础汉字拼写`;
      description = `为 ${questionCount} 个基础汉字选拼音，答对 ${targetScore} 题`;
      break;
    case 'hanzi-level-2':
      name += ` - 进阶汉字拼写`;
      description = `为 ${questionCount} 个中级汉字选拼音，答对 ${targetScore} 题`;
      break;
    case 'hanzi-level-3':
      name += ` - 高级汉字拼写`;
      description = `为 ${questionCount} 个高级汉字选拼音，答对 ${targetScore} 题`;
      break;
    default:
      name += ` - 拼写挑战`;
      description = `完成 ${questionCount} 道拼写题，答对 ${targetScore} 题`;
  }

  return {
    id: levelId,
    name,
    description,
    difficulty,
    targetScore,
    starReward,
    isUnlocked: false,
    completed: false,
    starsEarned: 0,
    isDynamic: true,
    contentSource,
    sectionIds,
    questionCount,
  };
}

/**
 * 为指定游戏类型生成动态关卡
 */
export function generateDynamicLevel(
  gameType: 'quiz' | 'memory' | 'spelling' | 'han-memory',
  levelId: number,
  contentSource?: ContentSource
): Level | null {
  // 如果没有指定内容源，根据关卡ID和游戏类型自动选择
  if (!contentSource) {
    contentSource = calculateContentSource(gameType, levelId);
  }

  switch (gameType) {
    case 'quiz':
      return generateQuizLevel(levelId, contentSource);
    case 'memory':
      return generateMemoryLevel(levelId, contentSource);
    case 'spelling':
      return generateSpellingLevel(levelId, contentSource);
    case 'han-memory':
      // han-memory 是专门针对汉字的翻牌游戏
      return generateMemoryLevel(levelId, contentSource || 'hanzi-level-1');
    default:
      return null;
  }
}

/**
 * 根据关卡ID和游戏类型自动计算内容源
 */
function calculateContentSource(gameType: string, levelId: number): ContentSource {
  const sources: ContentSource[] = [
    'pinyin-initial',
    'pinyin-final',
    'pinyin-whole',
    'thousand-character',
    'sanzi-jing',
    'baijiaxing',
    'tangshi',
    'hanzi-level-1',
    'hanzi-level-2',
    'hanzi-level-3',
  ];

  // 简单轮询选择内容源
  return sources[(levelId - 1) % sources.length];
}

/**
 * 获取内容源的数据
 * 用于生成游戏题目
 */
export function getContentData(contentSource: ContentSource, sectionIds?: number[]): any {
  switch (contentSource) {
    case 'pinyin-initial':
      return shengmu;
    case 'pinyin-final':
      return [...dunyunmu, ...fuyunmu];
    case 'pinyin-whole':
      return zhengtiren;
    case 'thousand-character':
      if (sectionIds && isThousandCharSection(thousandCharSections)) {
        return thousandCharSections.filter((s: any) => sectionIds.includes(s.id));
      }
      return thousandCharSections;
    case 'sanzi-jing':
      if (sectionIds && isSanziJingSection(sanziJingSections)) {
        return sanziJingSections.filter((s: any) => sectionIds.includes(s.id));
      }
      return sanziJingSections;
    case 'baijiaxing':
      if (sectionIds && isBaijiaxingSection(baijiaxingSections)) {
        return baijiaxingSections.filter((s: any) => sectionIds.includes(s.id));
      }
      return baijiaxingSections;
    case 'tangshi':
      if (sectionIds && sectionIds.length > 0) {
        return tangPoetryCollection.filter((p: any) => {
          const index = tangPoetryCollection.findIndex(p => p.id === p.id);
          return sectionIds.includes(index);
        });
      }
      return tangPoetryCollection;
    case 'hanzi-level-1':
      return Object.values(hanziData).flat().filter(h => h.level === 'basic');
    case 'hanzi-level-2':
      return Object.values(hanziData).flat().filter(h => h.level === 'intermediate');
    case 'hanzi-level-3':
      return Object.values(hanziData).flat().filter(h => h.level === 'advanced');
    default:
      return [];
  }
}

/**
 * 检查是否需要生成新的动态关卡
 */
export function shouldGenerateMoreLevels(currentLevels: Level[], maxBaseLevel: number): boolean {
  // 如果所有基础关卡都完成了，生成新的动态关卡
  const allBaseCompleted = currentLevels
    .filter(l => l.id <= maxBaseLevel)
    .every(l => l.completed);

  return allBaseCompleted;
}

/**
 * 生成下一批动态关卡
 */
export function generateNextBatchOfLevels(
  gameType: 'quiz' | 'memory' | 'spelling' | 'han-memory',
  currentLevels: Level[],
  maxBaseLevel: number,
  batchSize: number = 5
): Level[] {
  const maxLevelId = Math.max(...currentLevels.map(l => l.id));
  const newLevels: Level[] = [];

  for (let i = 1; i <= batchSize; i++) {
    const levelId = maxLevelId + i;
    const level = generateDynamicLevel(gameType, levelId);
    if (level) {
      newLevels.push(level);
    }
  }

  return newLevels;
}
