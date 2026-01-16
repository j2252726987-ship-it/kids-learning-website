'use client';

import { PinyinLetter } from '@/lib/pinyin-data';
import { stopSpeaking } from '@/lib/speech-utils';
import { useState } from 'react';

interface PinyinCardProps {
  letter: PinyinLetter;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function PinyinCard({ letter, onClick, size = 'medium' }: PinyinCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    setIsSpeaking(true);
    stopSpeaking(); // 停止之前的朗读

    // 直接朗读拼音，使用女声
    if ('speechSynthesis' in window) {
      // 在拼音前加上顿号，让浏览器识别为中文环境
      const textToSpeak = '、' + letter.pinyin;

      console.log('朗读内容:', textToSpeak, '类型:', letter.category);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.95; // 适中语速
      utterance.pitch = 1.1; // 女主播播音音调（清亮温柔）

      // 选择女声
      const voices = window.speechSynthesis.getVoices();
      const femaleVoices = voices.filter(v =>
        v.lang === 'zh-CN' &&
        (v.name.includes('xiaoxi') || v.name.includes('huihui') || v.name.includes('lili') || v.name.toLowerCase().includes('female'))
      );
      if (femaleVoices.length > 0) {
        utterance.voice = femaleVoices[0];
        console.log('使用语音:', femaleVoices[0].name);
      }

      utterance.onend = () => {
        console.log('朗读结束:', textToSpeak);
        setIsSpeaking(false);
      };
      utterance.onerror = (e) => {
        console.error('朗读错误:', e, textToSpeak);
        setIsSpeaking(false);
      };
      speechSynthesis.speak(utterance);
    }
  };

  const sizeClasses = {
    small: 'w-24 h-24 text-lg',
    medium: 'w-32 h-32 text-2xl',
    large: 'w-40 h-40 text-3xl',
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
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
              speak();
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
