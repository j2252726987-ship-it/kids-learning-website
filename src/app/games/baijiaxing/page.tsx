'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BaijiaxingGamesPage() {
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
      title: '百家姓发音测试',
      description: '选出正确的姓氏读音，看看你能答对几题！',
      emoji: '🎯',
      color: 'from-green-400 to-emerald-400',
      difficulty: '闯关挑战',
      levels: '5+ 无限关卡',
      link: '/games/quiz/baijiaxing',
    },
    {
      id: 'memory',
      title: '百家姓记忆翻牌',
      description: '翻开卡片，找出相同的姓氏配对！',
      emoji: '🎴',
      color: 'from-teal-400 to-cyan-400',
      difficulty: '闯关挑战',
      levels: '5+ 无限关卡',
      link: '/games/memory/baijiaxing',
    },
    {
      id: 'spelling',
      title: '百家姓拼写挑战',
      description: '看姓氏选拼音，展示你的拼写能力！',
      emoji: '✍️',
      color: 'from-lime-400 to-green-400',
      difficulty: '闯关挑战',
      levels: '5+ 无限关卡',
      link: '/games/spelling/baijiaxing',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* 顶部标题 */}
      <header className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 py-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          👥 百家姓游戏乐园 👥
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
          href="/baijiaxing"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-emerald-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
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
              href={game.link}
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
          <h2 className="mb-4 text-2xl font-bold text-emerald-700">
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
              <span className="text-3xl">👥</span>
              <div>
                <h3 className="font-bold text-gray-800">百家姓内容</h3>
                <p className="text-gray-600">涵盖常见姓氏，学习中华姓氏文化！</p>
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
      <footer className="mt-12 bg-gradient-to-r from-green-400 to-teal-400 py-6 text-center text-white">
        <p className="text-lg font-semibold">玩游戏学姓氏，快乐成长每一天！🎉</p>
      </footer>
    </div>
  );
}
