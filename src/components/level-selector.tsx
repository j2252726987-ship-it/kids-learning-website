'use client';

import { useEffect, useState } from 'react';
import { Level, getLevels, resetAllLevels } from '@/lib/level-system';
import Link from 'next/link';

interface LevelSelectorProps {
  gameType: 'quiz' | 'memory' | 'spelling' | 'han-memory';
  gameTitle: string;
  gameColor: string;
}

export function LevelSelector({ gameType, gameTitle, gameColor }: LevelSelectorProps) {
  const [levels, setLevels] = useState<Level[]>([]);
  const [progress, setProgress] = useState({ completed: 0, total: 0, stars: 0 });

  useEffect(() => {
    loadLevels();
  }, [gameType]);

  const loadLevels = () => {
    // 导入动态关卡函数
    const { getLevelsWithAutoGenerate } = require('@/lib/level-system');
    const levelsData = getLevelsWithAutoGenerate(gameType);
    const progressData = {
      completed: levelsData.filter((l: any) => l.completed).length,
      total: levelsData.length,
      stars: levelsData.reduce((sum: number, l: any) => sum + l.starsEarned, 0),
    };
    setLevels(levelsData);
    setProgress(progressData);
  };

  const handleReset = () => {
    if (confirm('确定要重置所有关卡进度吗？这将清除所有解锁状态和星星！')) {
      resetAllLevels();
      loadLevels();
    }
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* 返回按钮 */}
        <Link
          href="/games"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-purple-600 shadow-lg hover:shadow-xl transition-all"
        >
          ← 返回游戏
        </Link>

        {/* 游戏标题和进度 */}
        <div className={`mb-8 rounded-3xl ${gameColor} p-8 shadow-2xl text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{gameTitle} - 关卡选择</h1>
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
              href={`/games/${gameType}/play?level=${level.id}`}
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
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
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

                  {/* 星星奖励和状态 */}
                  {level.isUnlocked && (
                    <div className="flex items-center justify-between">
                      <div className="text-lg text-gray-700">
                        奖励: {level.starReward} ⭐
                      </div>
                      <div>
                        {level.completed ? (
                          <div className="flex gap-1 text-2xl">
                            {'⭐'.repeat(level.starsEarned)}
                          </div>
                        ) : (
                          <div className="text-lg font-bold text-purple-600">
                            未完成
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {!level.isUnlocked && (
                    <div className="text-center text-gray-500">
                      完成上一关解锁
                    </div>
                  )}
                </div>

                {/* 完成标记 */}
                {level.completed && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-400 to-emerald-400 p-3 text-center">
                    <span className="text-lg font-bold text-white">✓ 已完成</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* 重置按钮 */}
        <div className="mt-12 text-center">
          <button
            onClick={handleReset}
            className="rounded-full border-2 border-red-400 px-8 py-3 text-lg font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            重置所有关卡
          </button>
        </div>

        {/* 进度条 */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">总进度</h3>
            <span className="text-lg font-bold text-purple-600">
              {Math.round((progress.completed / progress.total) * 100)}%
            </span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-center text-gray-600">
            已获得 {progress.stars} 颗星星
          </div>
        </div>
      </div>
    </div>
  );
}
