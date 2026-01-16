'use client';

import { useEffect, useState } from 'react';
import { Level } from '@/lib/level-system';
import { generateDynamicLevel } from '@/lib/level-generator';
import Link from 'next/link';

export default function TangshiMemoryLevelSelectorPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [progress, setProgress] = useState({ completed: 0, total: 0, stars: 0 });

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = () => {
    // 动态生成唐诗关卡，支持无限关卡
    // 初始生成50关，如果用户接近最后几关，自动生成更多
    const STORAGE_KEY = 'tangshi_memory_progress';
    const savedData = localStorage.getItem(STORAGE_KEY);
    let savedLevels: any[] = [];

    if (savedData) {
      savedLevels = JSON.parse(savedData);
    }

    // 计算当前需要的关卡数量
    // 如果有保存的进度，根据已解锁关卡数量决定需要多少关
    const maxUnlockedId = savedLevels.length > 0
      ? Math.max(...savedLevels.filter((l: any) => l.isUnlocked).map((l: any) => l.id))
      : 0;

    // 确保至少有50关，并且如果用户接近最后5关，自动生成更多
    const baseLevelCount = 50;
    const currentLevelCount = savedLevels.length || 0;
    const needMoreLevels = maxUnlockedId > 0 && maxUnlockedId >= currentLevelCount - 5;

    const totalLevelCount = needMoreLevels ? currentLevelCount + 20 : Math.max(baseLevelCount, currentLevelCount);

    const tangshiLevels: Level[] = [];
    for (let i = 1; i <= totalLevelCount; i++) {
      const level = generateDynamicLevel('memory', i, 'tangshi');
      if (level) {
        // 从保存的数据中恢复进度
        const savedLevel = savedLevels.find((l: any) => l.id === level.id);
        if (savedLevel) {
          level.completed = savedLevel.completed;
          level.starsEarned = savedLevel.starsEarned;
          level.isUnlocked = savedLevel.isUnlocked;
        }
        // 第一关默认解锁
        if (i === 1) {
          level.isUnlocked = true;
        }
        tangshiLevels.push(level);
      }
    }

    // 计算进度
    const progressData = {
      completed: tangshiLevels.filter(l => l.completed).length,
      total: tangshiLevels.length,
      stars: tangshiLevels.reduce((sum, l) => sum + l.starsEarned, 0),
    };
    setLevels(tangshiLevels);
    setProgress(progressData);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* 返回按钮 */}
        <Link
          href="/games/tangshi"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-rose-600 shadow-lg hover:shadow-xl transition-all"
        >
          ← 返回唐诗游戏
        </Link>

        {/* 游戏标题和进度 */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 p-8 shadow-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">唐诗记忆翻牌 - 关卡选择</h1>
              <p className="text-xl text-white/90">选择关卡开始挑战！</p>
            </div>
            <div className="text-right">
              <div className="mb-2 text-3xl font-bold">
                {progress.stars} ⭐
              </div>
              <div className="text-lg text-white/90">
                已完成 {progress.completed} / {progress.total}
              </div>
            </div>
          </div>
        </div>

        {/* 关卡列表 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level, index) => (
            <Link
              key={level.id}
              href={`/games/memory/play?level=${level.id}&tangshi=true`}
              className={`transform transition-all duration-300 ${
                !level.isUnlocked
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 hover:shadow-2xl'
              }`}
              onClick={(e) => {
                if (!level.isUnlocked) {
                  e.preventDefault();
                }
              }}
            >
              <div
                className={`relative overflow-hidden rounded-3xl shadow-xl ${
                  level.isUnlocked
                    ? 'bg-white cursor-pointer'
                    : 'bg-gray-300'
                }`}
              >
                {/* 关卡编号 */}
                <div
                  className={`absolute top-0 left-0 px-4 py-2 text-xl font-bold ${
                    level.isUnlocked
                      ? 'bg-gradient-to-r from-purple-400 to-fuchsia-400 text-white'
                      : 'bg-gray-400 text-gray-600'
                  }`}
                >
                  第 {level.id} 关
                </div>

                {/* 锁定图标 */}
                {!level.isUnlocked && (
                  <div className="absolute right-4 top-4 text-6xl">🔒</div>
                )}

                {/* 内容 */}
                <div className="p-6 pt-16">
                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    {level.name}
                  </h3>
                  <p className="mb-4 text-gray-600">{level.description}</p>

                  {/* 难度标签 */}
                  <div className="mb-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold border-2 ${getDifficultyColor(
                        level.difficulty
                      )}`}
                    >
                      {getDifficultyText(level.difficulty)}
                    </span>
                  </div>

                  {/* 星星奖励 */}
                  {level.isUnlocked && level.starsEarned > 0 && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array(level.starsEarned).fill('⭐').map((star, i) => (
                        <span key={i} className="text-2xl">{star}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 无限关卡提示 */}
        {levels.length > 0 && (
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-purple-100 to-fuchsia-100 p-8 shadow-xl border-2 border-purple-200">
            <div className="flex items-start gap-3">
              <span className="text-3xl">∞</span>
              <div>
                <h3 className="font-bold text-lg text-purple-800">无限关卡挑战</h3>
                <p className="text-purple-700">
                  唐诗记忆翻牌游戏支持无限动态生成关卡！每关都会从唐诗三百首中精选不同的诗句，
                  随着关卡提升，难度逐渐增加。当你接近当前关卡的最后几关时，系统会自动生成更多关卡，
                  让你可以一直挑战下去！
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
