'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function GamesPage() {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const savedStars = localStorage.getItem('gameStars');
    if (savedStars) {
      setStars(parseInt(savedStars));
    }
  }, []);

  const games = [
    {
      id: 'quiz',
      title: '拼音发音测试',
      description: '选出正确的发音，看看你能答对几题！',
      emoji: '🎯',
      color: 'from-pink-400 to-red-400',
      difficulty: '闯关挑战',
      levels: '5+ 无限关卡',
      dynamic: true,
    },
    {
      id: 'memory',
      title: '拼音记忆翻牌',
      description: '翻开卡片，找出相同的拼音配对！',
      emoji: '🎴',
      color: 'from-purple-400 to-indigo-400',
      difficulty: '闯关挑战',
      levels: '5+ 无限关卡',
      dynamic: true,
    },
    {
      id: 'spelling',
      title: '拼音拼写挑战',
      description: '看汉字选拼音，展示你的拼写能力！',
      emoji: '✍️',
      color: 'from-blue-400 to-cyan-400',
      difficulty: '闯关挑战',
      levels: '5+ 无限关卡',
      dynamic: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      {/* 顶部标题 */}
      <header className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 py-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          🎮 拼音游戏乐园 🎮
        </h1>
        <p className="mt-2 text-lg text-white/90">边玩边学，快乐成长！</p>

        {/* 星星展示 */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm">
          <span className="text-2xl">⭐</span>
          <span className="text-2xl font-bold text-white">{stars}</span>
          <span className="text-white/90">颗星星</span>
        </div>
      </header>

      {/* 返回按钮 */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-purple-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          ← 返回学习
        </Link>
      </div>

      {/* 游戏列表 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <div
                className={`h-full rounded-3xl bg-gradient-to-br ${game.color} p-6 shadow-xl hover:shadow-2xl transition-shadow`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-center">
                    <span className="text-7xl group-hover:scale-110 transition-transform inline-block">
                      {game.emoji}
                    </span>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {game.title}
                  </h3>

                  <p className="mb-4 flex-1 text-white/90">
                    {game.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/30 px-4 py-1 text-sm font-semibold text-white">
                      {game.levels}
                    </span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">
                      🚀
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 游戏说明 */}
        <div className="mt-12 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold text-purple-700">
            🎪 关卡系统说明
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="font-bold text-gray-800">基础 5 关挑战</h3>
                <p className="text-gray-600">从简单到困难，逐步提升难度！</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-3xl">♾️</span>
              <div>
                <h3 className="font-bold text-gray-800">无限动态关卡</h3>
                <p className="text-gray-600">完成 5 关后自动生成新关卡，永远有新挑战！</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-3xl">🔓</span>
              <div>
                <h3 className="font-bold text-gray-800">解锁机制</h3>
                <p className="text-gray-600">完成当前关卡解锁下一关！</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-3xl">📚</span>
              <div>
                <h3 className="font-bold text-gray-800">丰富内容源</h3>
                <p className="text-gray-600">涵盖拼音、千字文、三字经、分级汉字等内容！</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-3xl">⭐</span>
              <div>
                <h3 className="font-bold text-gray-800">星星奖励</h3>
                <p className="text-gray-600">每个关卡可获得不同数量的星星！</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-3xl">🚀</span>
              <div>
                <h3 className="font-bold text-gray-800">持续成长</h3>
                <p className="text-gray-600">随着进度提升，挑战内容会越来越丰富！</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="mt-12 bg-gradient-to-r from-purple-400 to-pink-400 py-6 text-center text-white">
        <p className="text-lg font-semibold">玩游戏学拼音，快乐成长每一天！🎉</p>
      </footer>
    </div>
  );
}
