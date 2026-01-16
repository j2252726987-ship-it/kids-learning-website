'use client';

import { useEffect, useState } from 'react';
import { Level, getLevelsWithAutoGenerate } from '@/lib/level-system';
import Link from 'next/link';

export default function BaijiaxingSpellingLevelSelectorPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [progress, setProgress] = useState({ completed: 0, total: 0, stars: 0 });

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = () => {
    const allLevels = getLevelsWithAutoGenerate('spelling');
    // 过滤出百家姓相关的关卡
    const baijiaxingLevels = allLevels.filter((l: any) =>
      l.contentSource === 'baijiaxing' || (l.name && l.name.includes('百家姓'))
    );

    const progressData = {
      completed: baijiaxingLevels.filter((l: any) => l.completed).length,
      total: baijiaxingLevels.length,
      stars: baijiaxingLevels.reduce((sum: number, l: any) => sum + l.starsEarned, 0),
    };
    setLevels(baijiaxingLevels);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* 返回按钮 */}
        <Link
          href="/games/baijiaxing"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-emerald-600 shadow-lg hover:shadow-xl transition-all"
        >
          ← 返回百家姓游戏
        </Link>

        {/* 游戏标题和进度 */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 p-8 shadow-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">百家姓拼写挑战 - 关卡选择</h1>
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
              href={`/games/spelling/play?level=${level.id}`}
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
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
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

        {/* 提示 */}
        {levels.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-800">暂无百家姓关卡</h3>
            <p className="text-gray-600">请先完成其他关卡，解锁百家姓相关内容！</p>
          </div>
        )}
      </div>
    </div>
  );
}
