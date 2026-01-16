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

    if ('speechSynthesis' in window) {
      // 拼音到汉字的映射（使用汉字确保 TTS 正确识别为中文）
      const pinyinToHanzi: Record<string, string> = {
        // 声母
        'b': '玻', 'p': '坡', 'm': '摸', 'f': '佛',
        'd': '得', 't': '特', 'n': '讷', 'l': '勒',
        'g': '哥', 'k': '科', 'h': '喝',
        'j': '基', 'q': '期', 'x': '希',
        'zh': '知', 'ch': '吃', 'sh': '诗', 'r': '日',
        'z': '资', 'c': '刺', 's': '思',
        'y': '衣', 'w': '乌',

        // 单韵母
        'a': '阿', 'o': '喔', 'e': '鹅',
        'i': '衣', 'u': '乌',
        'v': '迂', 'ü': '迂',

        // 复韵母
        'ai': '哀', 'ei': '诶', 'ui': '威',
        'ao': '奥', 'ou': '欧', 'iu': '优',
        'ie': '耶',
        'er': '儿',
        'an': '安', 'en': '恩', 'in': '音',
        'wen': '温',
        'ang': '昂', 'eng': '亨', 'ing': '英', 'ong': '轰',

        // 鼻韵母组合
        'un': '温', 'ün': '晕',
        'iao': '腰', 'ian': '烟', 'iang': '扬',
        'ua': '娃', 'uo': '沃', 'uai': '歪', 'uan': '弯', 'uang': '汪',
        'üan': '冤', 'üe': '约',

        // 整体认读音节
        'zhi': '知', 'chi': '吃', 'shi': '诗', 'ri': '日',
        'zi': '资', 'ci': '刺', 'si': '思',
        'yi': '衣', 'wu': '乌', 'yu': '迂',
        'ye': '耶', 'yue': '约',
        'yuan': '冤', 'yin': '音', 'yun': '晕', 'ying': '英',
      };

      // 获取对应的汉字
      const textToSpeak = pinyinToHanzi[letter.pinyin] || letter.examples?.[0] || letter.pinyin;

      console.log('拼音朗读:', letter.pinyin, '->', textToSpeak, '类型:', letter.category);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.95; // 稍慢语速
      utterance.pitch = 1.1; // 女主播播音音调

      // 选择中文语音
      const voices = window.speechSynthesis.getVoices();
      const zhCNVoices = voices.filter(v => v.lang === 'zh-CN');

      // 优先选择女声
      const femaleVoice = zhCNVoices.find(v =>
        v.name.toLowerCase().includes('xiaoxi') ||
        v.name.toLowerCase().includes('huihui') ||
        v.name.toLowerCase().includes('lili') ||
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('女')
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
        console.log('使用女声:', femaleVoice.name);
      } else if (zhCNVoices.length > 0) {
        utterance.voice = zhCNVoices[0];
        console.log('使用中文语音:', zhCNVoices[0].name);
      } else {
        console.log('未找到zh-CN语音');
      }

      utterance.onend = () => {
        console.log('朗读成功:', textToSpeak);
        setIsSpeaking(false);
      };
      utterance.onerror = (e) => {
        console.error('朗读错误:', e);
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
