'use client';

import { PinyinLetter } from '@/lib/pinyin-data';
import { speakPinyin, speakText, stopSpeaking } from '@/lib/speech-utils';
import { useState } from 'react';

interface PinyinCardProps {
  letter: PinyinLetter;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function PinyinCard({ letter, onClick, size = 'medium' }: PinyinCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 朗读拼音（使用统一的 speech-utils）
  const handleSpeakPinyin = () => {
    setIsSpeaking(true);
    console.log('===== 开始拼音朗读 =====');
    console.log('拼音:', letter.pinyin);
    console.log('类型:', letter.category);
    speakPinyin(letter.pinyin);
    setTimeout(() => setIsSpeaking(false), 1000);
  };

  // 朗读所有示例词
  const speakExamples = () => {
    setIsSpeaking(true);
    stopSpeaking();

    console.log('===== 开始朗读例词 =====');
    console.log('例词列表:', letter.examples);

    let index = 0;
    const speakNext = () => {
      if (index >= letter.examples.length) {
        console.log('✅ 所有例词朗读完成');
        setIsSpeaking(false);
        return;
      }

      const example = letter.examples[index];
      console.log(`朗读例词 [${index + 1}/${letter.examples.length}]:`, example);

      speakText(example, { rate: 0.9, pitch: 1.1 });

      index++;
      setTimeout(speakNext, 1000); // 每个词之间停顿 1 秒
    };

    speakNext();
  };

  const handleClick = () => {
    // 点击正面时朗读拼音
    if (!isFlipped) {
      handleSpeakPinyin();
    }
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
  };

  const sizeClasses = {
    small: 'w-24 h-24 text-lg',
    medium: 'w-32 h-32 text-2xl',
    large: 'w-40 h-40 text-3xl',
  };

  return (
    <div
      onClick={handleClick}
      className={`${sizeClasses[size]} cursor-pointer group relative`}
    >
      <div
        className={`w-full h-full rounded-3xl shadow-xl transform transition-all duration-500 preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 正面 */}
        <div
          className={`absolute inset-0 backface-hidden rounded-3xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 border-4 border-white shadow-lg hover:scale-105 transition-transform ${
            isFlipped ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <div className="text-5xl mb-2">{letter.emoji}</div>
          <div className="font-bold text-purple-600 mb-1">{letter.letter}</div>
          <div className="text-sm text-gray-600">{letter.pinyin}</div>
        </div>

        {/* 背面 - 示例词 */}
        <div
          className={`absolute inset-0 backface-hidden rounded-3xl flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 border-4 border-white shadow-lg ${
            !isFlipped ? 'opacity-0 pointer-events-none rotate-y-180' : 'rotate-y-180'
          }`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="font-bold text-orange-600 mb-2">例词</div>
          <div className="flex flex-col gap-1 text-sm">
            {letter.examples.map((example, index) => (
              <div key={index} className="text-gray-700 px-2 py-1 bg-white/50 rounded-lg">
                {example}
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              speakExamples();
            }}
            disabled={isSpeaking}
            className={`mt-3 px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all ${
              isSpeaking ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSpeaking ? '🔊 朗读中...' : '🎤 读一读'}
          </button>
        </div>
      </div>
    </div>
  );
}
