'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sanziJingSections, getAllSanziJingCharacters } from '@/lib/sanzi-jing-data';
import { SanziJingCharacter } from '@/lib/sanzi-jing-data';

export default function SanziJingPage() {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section-1');
  const [selectedChar, setSelectedChar] = useState<SanziJingCharacter | null>(null);
  const [isReading, setIsReading] = useState(false);

  const currentSection = sanziJingSections.find(s => s.id === selectedSectionId)!;
  const totalChars = getAllSanziJingCharacters().length;
  const currentSectionIndex = sanziJingSections.findIndex(s => s.id === selectedSectionId);

  const speakSection = () => {
    setIsReading(true);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentSection.content);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9; // 使用优化的语速
      utterance.pitch = 1.0; // 正常音调

      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const speakChar = (char: SanziJingCharacter) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // 停止当前朗读

      const utterance = new SpeechSynthesisUtterance(`${char.char}，${char.pinyin}，${char.words.join('、')}`);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9; // 使用优化的语速
      utterance.pitch = 1.0; // 正常音调

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
      case 'basic': return '基础';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '';
    }
  };

  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      setSelectedSectionId(sanziJingSections[currentSectionIndex - 1].id);
      setSelectedChar(null);
    }
  };

  const goToNextSection = () => {
    if (currentSectionIndex < sanziJingSections.length - 1) {
      setSelectedSectionId(sanziJingSections[currentSectionIndex + 1].id);
      setSelectedChar(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 py-8 text-center shadow-lg relative">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          📖 三字经 📖
        </h1>
        <p className="mt-2 text-lg text-white/90">蒙学经典，启蒙必读</p>

        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          ← 返回
        </Link>

        <Link
          href="/sanzi-jing-game"
          className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          🎮 闯关游戏
        </Link>

        <div className="absolute top-20 right-4 flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
          <span className="text-2xl">📖</span>
          <span className="text-xl font-bold text-white">{totalChars}</span>
          <span className="text-white/90">个汉字</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📚</span> 章节选择
              </h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {sanziJingSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setSelectedSectionId(section.id);
                      setSelectedChar(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                      selectedSectionId === section.id
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{index + 1}. {section.title}</div>
                    <div className={`text-sm mt-1 ${
                      selectedSectionId === section.id ? 'text-white/90' : 'text-gray-500'
                    }`}>
                      {section.content.substring(0, 12)}...
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
                    {currentSection.title}
                  </h2>
                  <p className="text-gray-500 mt-2">第 {currentSectionIndex + 1} / {sanziJingSections.length} 段</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={goToPrevSection}
                    disabled={currentSectionIndex === 0}
                    className="px-6 py-3 bg-blue-400 text-white rounded-full font-bold shadow-lg hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    ← 上一段
                  </button>
                  <button
                    onClick={goToNextSection}
                    disabled={currentSectionIndex === sanziJingSections.length - 1}
                    className="px-6 py-3 bg-pink-400 text-white rounded-full font-bold shadow-lg hover:bg-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    下一段 →
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6 border-4 border-blue-200">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-gray-800 mb-6 leading-relaxed">
                    {currentSection.content}
                  </h3>
                  <p className="text-2xl text-gray-600 mb-6">
                    {currentSection.pinyin}
                  </p>

                  {/* 白话翻译 */}
                  {currentSection.translation && (
                    <div className="bg-white/80 rounded-xl p-6 mb-6 border-2 border-blue-300">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-2xl">💬</span>
                        <span className="text-xl font-bold text-blue-600">白话翻译</span>
                      </div>
                      <p className="text-xl text-gray-700 leading-relaxed">
                        {currentSection.translation}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={speakSection}
                    disabled={isReading}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 hover:scale-105"
                  >
                    <span className="text-3xl">🔊</span>
                    {isReading ? '朗读中...' : '朗读整段'}
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📝</span> 逐字学习
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
                {currentSection.characters.map((char, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedChar(char);
                      speakChar(char);
                    }}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all transform hover:scale-110 hover:shadow-lg ${
                      selectedChar === char
                        ? 'bg-gradient-to-br from-blue-400 to-purple-400 text-white shadow-xl scale-110'
                        : 'bg-gray-50 text-gray-800 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-3xl font-bold">{char.char}</span>
                    <span className="text-xs mt-1">{char.pinyin}</span>
                  </button>
                ))}
              </div>

              {selectedChar && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-4 border-purple-200 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                        <span className="text-7xl font-bold text-gray-800">{selectedChar.char}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getDifficultyColor(selectedChar.level)}`}>
                          {getDifficultyText(selectedChar.level)}
                        </span>
                        <button
                          onClick={() => speakChar(selectedChar)}
                          className="px-4 py-2 bg-blue-400 text-white rounded-full text-sm font-bold hover:bg-blue-500 transition-all hover:scale-105"
                        >
                          🔊 朗读
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-600 font-medium">拼音：</span>
                          <span className="text-2xl font-bold text-blue-600">{selectedChar.pinyin}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">组词：</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedChar.words.map((word, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                              >
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">释义：</span>
                          <span className="text-gray-800">{selectedChar.meaning}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((currentSectionIndex + 1) / sanziJingSections.length) * 100}%` }}
                />
              </div>
              <p className="text-center text-gray-500 mt-2">
                学习进度：{currentSectionIndex + 1} / {sanziJingSections.length} 段
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
