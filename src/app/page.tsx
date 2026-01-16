'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PinyinCard } from '@/components/pinyin-card';
import {
  shengmu,
  dunyunmu,
  fuyunmu,
  zhengtiren,
  categoryNames,
  subCategoryNames,
} from '@/lib/pinyin-data';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('shengmu');
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const savedStars = localStorage.getItem('gameStars');
    if (savedStars) {
      setStars(parseInt(savedStars));
    }
  }, []);

  const categories = [
    { id: 'shengmu', name: categoryNames.shengmu, data: shengmu },
    { id: 'dunyunmu', name: subCategoryNames.dunyunmu, data: dunyunmu },
    { id: 'fuyunmu', name: subCategoryNames.fuyunmu, data: fuyunmu },
    { id: 'zhengtiren', name: categoryNames.zhengtiren, data: zhengtiren },
  ];

  const currentCategory = categories.find((cat) => cat.id === selectedCategory)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* 顶部标题区 */}
      <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 py-8 text-center shadow-lg relative">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          🌟 宝宝学拼音 🌟
        </h1>
        <p className="mt-2 text-lg text-white/90">快乐学习，轻松掌握</p>

        {/* 功能入口按钮组 */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 transform rounded-full bg-yellow-400 px-6 py-2 text-base font-bold text-purple-700 shadow-xl transition-all hover:scale-110 hover:bg-yellow-300 hover:shadow-2xl"
          >
            <span className="text-xl">🎮</span>
            <span>去玩游戏</span>
          </Link>

          <Link
            href="/characters"
            className="inline-flex items-center gap-2 transform rounded-full bg-orange-400 px-6 py-2 text-base font-bold text-white shadow-xl transition-all hover:scale-110 hover:bg-orange-300 hover:shadow-2xl"
          >
            <span className="text-xl">📚</span>
            <span>学汉字</span>
          </Link>

          <Link
            href="/thousand-character"
            className="inline-flex items-center gap-2 transform rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-2 text-base font-bold text-white shadow-xl transition-all hover:scale-110 hover:from-pink-300 hover:to-purple-300 hover:shadow-2xl"
          >
            <span className="text-xl">📜</span>
            <span>千字文</span>
          </Link>

          <Link
            href="/sanzi-jing"
            className="inline-flex items-center gap-2 transform rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 px-6 py-2 text-base font-bold text-white shadow-xl transition-all hover:scale-110 hover:from-blue-300 hover:to-cyan-300 hover:shadow-2xl"
          >
            <span className="text-xl">📖</span>
            <span>三字经</span>
          </Link>

          <Link
            href="/baijiaxing"
            className="inline-flex items-center gap-2 transform rounded-full bg-gradient-to-r from-green-400 to-emerald-400 px-6 py-2 text-base font-bold text-white shadow-xl transition-all hover:scale-110 hover:from-green-300 hover:to-emerald-300 hover:shadow-2xl"
          >
            <span className="text-xl">👥</span>
            <span>百家姓</span>
          </Link>

          <Link
            href="/tang-poetry"
            className="inline-flex items-center gap-2 transform rounded-full bg-gradient-to-r from-red-400 to-rose-400 px-6 py-2 text-base font-bold text-white shadow-xl transition-all hover:scale-110 hover:from-red-300 hover:to-rose-300 hover:shadow-2xl"
          >
            <span className="text-xl">🎭</span>
            <span>唐诗</span>
          </Link>
        </div>

        {/* 星星展示 */}
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
          <span className="text-xl">⭐</span>
          <span className="text-xl font-bold text-white">{stars}</span>
        </div>
      </header>

      {/* 分类导航 */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 shadow-md hover:shadow-xl'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8">
        {/* 功能推荐横幅 */}
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Link
            href="/games"
            className="block transform rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-6 shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-6xl">🎮</span>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">拼音游戏乐园</h2>
                  <p className="text-white/90">边玩边学，赢取星星！</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/30 px-4 py-2 backdrop-blur-sm">
                <span className="text-2xl">⭐</span>
                <span className="text-xl font-bold text-white">{stars}</span>
              </div>
            </div>
          </Link>

          <Link
            href="/characters"
            className="block transform rounded-3xl bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 p-6 shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-6xl">📚</span>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">汉字学习天地</h2>
                  <p className="text-white/90">认识汉字，快乐成长！</p>
                </div>
              </div>
              <span className="text-4xl transform group-hover:translate-x-2 transition-transform">
                ✨
              </span>
            </div>
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-purple-700">
            学习 {currentCategory.name}
          </h2>
          <div className="text-lg text-gray-600">
            共 {currentCategory.data.length} 个
          </div>
        </div>

        {/* 拼音字母卡片网格 */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {currentCategory.data.map((letter, index) => (
            <PinyinCard key={index} letter={letter} size="medium" />
          ))}
        </div>

        {/* 学习提示 */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 p-6 shadow-md">
          <h3 className="mb-3 text-xl font-bold text-orange-700">💡 学习小贴士</h3>
          <ul className="space-y-2 text-gray-700">
            <li>👆 点击卡片可以翻转，查看更多例词</li>
            <li>🎤 点击"读一读"按钮可以听发音</li>
            <li>🔄 切换不同的类别来学习声母、韵母和整体认读音节</li>
            <li>🎮 学习累了就点击"去玩游戏"，边玩边学更有趣！</li>
            <li>⭐ 完成游戏可以赢取星星，成为拼音小达人！</li>
          </ul>
        </div>
      </main>

      {/* 底部装饰 */}
      <footer className="mt-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-6 text-center text-white">
        <p className="text-lg font-semibold">加油，宝宝是最棒的！🎉</p>
        <p className="mt-2 text-white/80">每天学习一点点，进步看得见</p>
      </footer>
    </div>
  );
}
