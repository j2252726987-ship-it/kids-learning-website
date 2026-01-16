'use client';

import { useState } from 'react';
import Link from 'next/link';
import { baijiaxingSections, getAllBaijiaxingSurnames } from '@/lib/baijiaxing-data';
import { BaijiaxingSurname } from '@/lib/baijiaxing-data';

export default function BaijiaxingPage() {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section-1');
  const [selectedSurname, setSelectedSurname] = useState<BaijiaxingSurname | null>(null);

  const currentSection = baijiaxingSections.find(s => s.id === selectedSectionId)!;
  const totalSurnames = getAllBaijiaxingSurnames().length;
  const currentSectionIndex = baijiaxingSections.findIndex(s => s.id === selectedSectionId);

  const speakSurname = (surname: BaijiaxingSurname) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // 停止当前朗读

      const utterance = new SpeechSynthesisUtterance(`${surname.surname}，${surname.notable.join('、')}`);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9; // 使用优化的语速
      utterance.pitch = 1.0; // 正常音调

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 py-8 text-center shadow-lg relative">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          👥 百家姓 👥
        </h1>
        <p className="mt-2 text-lg text-white/90">中华姓氏，文化传承</p>

        <Link
          href="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          ← 返回
        </Link>

        <Link
          href="/games/baijiaxing"
          className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          🎮 闯关游戏
        </Link>

        <div className="absolute top-20 right-4 flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
          <span className="text-2xl">👥</span>
          <span className="text-xl font-bold text-white">{totalSurnames}</span>
          <span className="text-white/90">个姓氏</span>
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
                {baijiaxingSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setSelectedSectionId(section.id);
                      setSelectedSurname(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedSectionId === section.id
                        ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{index + 1}. {section.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-4xl">✨</span>
                {currentSection.title}
              </h2>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📝</span> 姓氏学习
              </h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {currentSection.surnames.map((surname, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSurname(surname);
                      speakSurname(surname);
                    }}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all transform hover:scale-110 hover:shadow-lg ${
                      selectedSurname === surname
                        ? 'bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-xl scale-110'
                        : 'bg-gray-50 text-gray-800 hover:bg-green-50'
                    }`}
                  >
                    <span className="text-4xl font-bold">{surname.surname}</span>
                    <span className="text-sm mt-1">{surname.pinyin}</span>
                  </button>
                ))}
              </div>

              {selectedSurname && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-4 border-emerald-200">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                        <span className="text-7xl font-bold text-gray-800">{selectedSurname.surname}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <button
                          onClick={() => speakSurname(selectedSurname)}
                          className="px-4 py-2 bg-green-400 text-white rounded-full text-sm font-bold hover:bg-green-500 transition-all hover:scale-105"
                        >
                          🔊 朗读
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-600 font-medium">拼音：</span>
                          <span className="text-2xl font-bold text-green-600">{selectedSurname.pinyin}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">历史名人：</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedSurname.notable.map((person, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                              >
                                {person}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">含义：</span>
                          <span className="text-gray-800">{selectedSurname.meaning}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((currentSectionIndex + 1) / baijiaxingSections.length) * 100}%` }}
                />
              </div>
              <p className="text-center text-gray-500 mt-2">
                学习进度：{currentSectionIndex + 1} / {baijiaxingSections.length} 段
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
