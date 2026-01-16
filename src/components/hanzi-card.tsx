'use client';

import { useState } from 'react';
import { HanziCharacter } from '@/lib/pinyin-data';
import { speakHanzi, stopSpeaking } from '@/lib/speech-utils';

interface HanziCardProps {
  character: HanziCharacter;
  size?: 'small' | 'medium' | 'large';
}

export function HanziCard({ character, size = 'medium' }: HanziCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const speak = () => {
    stopSpeaking(); // 停止之前的朗读
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(character.character);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9; // 使用优化的语速
      speechSynthesis.speak(utterance);
    }
  };

  const speakWord = (word: string) => {
    stopSpeaking(); // 停止之前的朗读
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9; // 使用优化的语速
      speechSynthesis.speak(utterance);
    }
  };

  const getLevelBadge = () => {
    switch (character.level) {
      case 'basic':
        return { label: '基础', color: 'bg-green-100 text-green-700' };
      case 'intermediate':
        return { label: '中级', color: 'bg-yellow-100 text-yellow-700' };
      case 'advanced':
        return { label: '高级', color: 'bg-red-100 text-red-700' };
      default:
        return { label: '', color: '' };
    }
  };

  const levelBadge = getLevelBadge();

  const sizeClasses = {
    small: 'w-32 h-32 text-4xl',
    medium: 'w-48 h-48 text-5xl',
    large: 'w-64 h-64 text-6xl',
  };

  return (
    <div
      className={`transform transition-all duration-300 cursor-pointer hover:scale-105`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`${sizeClasses[size]} relative perspective-1000`}
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 正面 - 汉字展示 */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400 rounded-3xl shadow-xl flex flex-col items-center justify-center text-white backface-hidden`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* 难度标签 */}
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${levelBadge.color}`}>
              {levelBadge.label}
            </div>

            <div className="text-6xl font-bold mb-2">{character.character}</div>
            <div className="text-2xl font-medium">{character.pinyin}</div>
            <div className="mt-4 text-4xl">{character.emoji}</div>

            {/* 朗读按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak();
              }}
              className="mt-2 px-4 py-2 bg-white/30 rounded-full text-sm font-semibold hover:bg-white/50 transition-colors"
            >
              🎤 读一读
            </button>
          </div>

          {/* 背面 - 详细信息 */}
          <div
            className={`absolute inset-0 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-4 text-gray-800 rotate-y-180 backface-hidden`}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-center">
              {/* 汉字和拼音 */}
              <div className="mb-3">
                <div className="text-5xl font-bold text-purple-600">
                  {character.character}
                </div>
                <div className="text-xl text-gray-600 mt-1">{character.pinyin}</div>
              </div>

              {/* 笔画数 */}
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="text-lg text-gray-500">笔画:</span>
                <span className="text-2xl font-bold text-orange-500">
                  {character.strokes}画
                </span>
              </div>

              {/* 难度 */}
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="text-lg text-gray-500">难度:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${levelBadge.color}`}>
                  {levelBadge.label}
                </span>
              </div>

              {/* 组词 */}
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">组词:</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {character.words.map((word, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(word);
                      }}
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-semibold text-purple-700 hover:from-purple-200 hover:to-pink-200 transition-colors"
                    >
                      🗣️ {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* 提示 */}
              <div className="text-xs text-gray-400 mt-2">
                点击卡片翻转
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
