'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HanziCard } from '@/components/hanzi-card';
import { hanziCategories, hanziData } from '@/lib/pinyin-data';
import { HanziCharacter } from '@/lib/pinyin-data';

export default function CharactersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('family');
  const [selectedLevel, setSelectedLevel] = useState<'basic' | 'intermediate' | 'advanced' | 'all'>('all');

  const currentCategory = hanziCategories.find((cat) => cat.id === selectedCategory)!;
  const currentCharacters = hanziData[selectedCategory] || [];

  // 根据难度筛选
  const filteredCharacters = selectedLevel === 'all'
    ? currentCharacters
    : currentCharacters.filter((c: HanziCharacter) => c.level === selectedLevel);

  const totalCharacters = hanziCategories.reduce(
    (sum, cat) => sum + hanziData[cat.id].length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* 顶部标题 */}
      <header className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 py-8 text-center shadow-lg relative">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          📚 宝宝学汉字 📚
        </h1>
        <p className="mt-2 text-lg text-white/90">认识汉字，快乐学习！</p>

        {/* 功能入口按钮 */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/games/han-memory"
            className="inline-flex items-center gap-2 transform rounded-full bg-yellow-400 px-6 py-2 text-lg font-bold text-purple-700 shadow-xl transition-all hover:scale-110 hover:bg-yellow-300 hover:shadow-2xl"
          >
            <span className="text-2xl">🎮</span>
            <span>去玩汉字游戏</span>
            <span className="text-2xl">🚀</span>
          </Link>
        </div>

        {/* 返回按钮 */}
        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          ← 返回
        </Link>

        {/* 总数展示 */}
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
          <span className="text-2xl">📖</span>
          <span className="text-xl font-bold text-white">{totalCharacters}</span>
          <span className="text-white/90">个汉字</span>
        </div>
      </header>

      {/* 分类导航 */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {hanziCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-full font-medium text-sm transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg'
                    : 'bg-white text-gray-600 shadow-md hover:shadow-xl'
                }`}
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name}
                <span className="ml-1 text-xs opacity-75">
                  ({hanziData[category.id].length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8">
        {/* 分类标题和难度筛选 */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentCategory.emoji}</span>
            <div>
              <h2 className="text-3xl font-bold text-purple-700">
                学习 {currentCategory.name}
              </h2>
              <div className="text-sm text-gray-600 mt-1">
                显示 {filteredCharacters.length} / {currentCharacters.length} 个汉字
              </div>
            </div>
          </div>

          {/* 难度筛选 */}
          <div className="flex items-center gap-2">
            {[
              { value: 'all' as const, label: '全部', color: 'bg-gray-500' },
              { value: 'basic' as const, label: '基础', color: 'bg-green-500' },
              { value: 'intermediate' as const, label: '中级', color: 'bg-yellow-500' },
              { value: 'advanced' as const, label: '高级', color: 'bg-red-500' },
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => setSelectedLevel(level.value)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all transform hover:scale-105 ${
                  selectedLevel === level.value
                    ? `${level.color} text-white shadow-lg`
                    : 'bg-white text-gray-600 shadow-md hover:shadow-xl'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* 汉字卡片网格 */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredCharacters.map((character, index) => (
            <HanziCard key={index} character={character} size="medium" />
          ))}
        </div>

        {/* 没有汉字时的提示 */}
        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600">该难度下暂无汉字</p>
            <p className="text-gray-500 mt-2">请选择其他难度或切换分类</p>
          </div>
        )}

        {/* 学习提示 */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 p-6 shadow-md">
          <h3 className="mb-3 text-xl font-bold text-orange-700">💡 学习小贴士</h3>
          <ul className="space-y-2 text-gray-700">
            <li>👆 点击卡片可以翻转，查看笔画数和组词</li>
            <li>🎤 点击"读一读"按钮可以听汉字发音</li>
            <li>🗣️ 点击组词可以听词语发音</li>
            <li>📚 不同分类可以学习不同主题的汉字</li>
            <li>✨ 结合拼音学习，更容易记住汉字！</li>
            <li>🔄 随时可以切换分类，选择感兴趣的汉字学习</li>
            <li>🎯 按难度筛选：基础（初学）→ 中级（进阶）→ 高级（挑战）</li>
            <li>🎮 点击顶部的"去玩汉字游戏"按钮，开始闯关挑战！</li>
          </ul>
        </div>

        {/* 进度统计 */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-purple-700">
            📊 分类统计
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hanziCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-xl bg-gradient-to-br from-orange-50 to-pink-50 p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="font-semibold text-gray-700 text-sm">
                    {category.name}
                  </span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {hanziData[category.id].length}
                </div>
                <div className="text-xs text-gray-500 mt-1">个汉字</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center p-4 rounded-xl bg-gradient-to-r from-orange-100 to-pink-100">
            <div className="text-4xl font-bold text-purple-600">
              {totalCharacters}
            </div>
            <div className="text-gray-600 mt-1">总计 {hanziCategories.length} 个分类</div>
          </div>
        </div>
      </main>

      {/* 底部装饰 */}
      <footer className="mt-12 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 py-6 text-center text-white">
        <p className="text-lg font-semibold">加油，宝宝是最棒的！🎉</p>
        <p className="mt-2 text-white/80">每天学汉字，进步看得见</p>
      </footer>
    </div>
  );
}
