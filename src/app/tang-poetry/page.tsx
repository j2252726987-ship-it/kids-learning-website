'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tangPoetryCollection, getAllTangPoetry } from '@/lib/tang-poetry-data';
import { TangPoetry } from '@/lib/tang-poetry-data';
import { speakPoem as optimizedSpeakPoem, stopSpeaking } from '@/lib/speech-utils';

export default function TangPoetryPage() {
  const [selectedPoemId, setSelectedPoemId] = useState<string>('poem-1');
  const [isReading, setIsReading] = useState(false);

  const currentPoem = tangPoetryCollection.find(p => p.id === selectedPoemId)!;
  const totalPoems = getAllTangPoetry().length;
  const currentPoemIndex = tangPoetryCollection.findIndex(p => p.id === selectedPoemId);

  const speakPoem = () => {
    setIsReading(true);
    stopSpeaking(); // 停止之前的朗读

    if ('speechSynthesis' in window) {
      // 使用优化的朗读函数
      const utterance = new SpeechSynthesisUtterance(currentPoem.content.replace(/\n/g, '，'));
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85; // 诗词朗读稍慢，更有韵律感
      utterance.pitch = 1.0; // 正常音调

      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'advanced': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getDifficultyText = (level: string) => {
    switch (level) {
      case 'basic': return '简单';
      case 'intermediate': return '中等';
      case 'advanced': return '困难';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <header className="bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 py-8 text-center shadow-lg relative">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          🎭 唐诗三百首 🎭
        </h1>
        <p className="mt-2 text-lg text-white/90">经典诗词，传承文化</p>

        <div className="absolute top-4 left-4 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
          >
            ← 返回
          </Link>
          <Link
            href="/games/tangshi"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-yellow-500 transition-all shadow-lg"
          >
            🎮 闯关游戏
          </Link>
        </div>

        <div className="absolute top-20 right-4 flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
          <span className="text-2xl">🎭</span>
          <span className="text-xl font-bold text-white">{totalPoems}</span>
          <span className="text-white/90">首唐诗</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span> 诗词目录
              </h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {tangPoetryCollection.map((poem, index) => (
                  <button
                    key={poem.id}
                    onClick={() => setSelectedPoemId(poem.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedPoemId === poem.id
                        ? 'bg-gradient-to-r from-red-400 to-rose-400 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{index + 1}. {poem.title}</div>
                    <div className={`text-sm mt-1 ${
                      selectedPoemId === poem.id ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {poem.author}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-4xl">✨</span>
                    {currentPoem.title}
                  </h2>
                  <p className="text-gray-500 mt-2">{currentPoem.author} · {currentPoem.dynasty}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getDifficultyColor(currentPoem.difficulty)}`}>
                  {getDifficultyText(currentPoem.difficulty)}
                </span>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 mb-6 border-4 border-red-200">
                <div className="text-center">
                  <pre className="text-3xl font-bold text-gray-800 mb-6 whitespace-pre-wrap leading-relaxed">
                    {currentPoem.content}
                  </pre>

                  <button
                    onClick={speakPoem}
                    disabled={isReading}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-400 to-rose-400 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 hover:scale-105"
                  >
                    <span className="text-3xl">🔊</span>
                    {isReading ? '朗读中...' : '朗读古诗'}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-4 border-rose-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📖</span> 译文
                </h3>
                <p className="text-gray-700 leading-relaxed">{currentPoem.translation}</p>
              </div>

              <div className="mt-8 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-400 to-rose-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((currentPoemIndex + 1) / tangPoetryCollection.length) * 100}%` }}
                />
              </div>
              <p className="text-center text-gray-500 mt-2">
                学习进度：{currentPoemIndex + 1} / {tangPoetryCollection.length} 首
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
