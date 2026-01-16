'use client';

import { useState, useEffect, Suspense } from 'react';
import { shengmu, dunyunmu, fuyunmu, zhengtiren, hanziData } from '@/lib/pinyin-data';
import { getLevelsWithAutoGenerate, updateLevelProgressWithAutoGenerate, Level } from '@/lib/level-system';
import { getContentData, generateDynamicLevel } from '@/lib/level-generator';
import { thousandCharSections } from '@/lib/thousand-character-data';
import { sanziJingSections } from '@/lib/sanzi-jing-data';
import { baijiaxingSections } from '@/lib/baijiaxing-data';
import { tangPoetryCollection } from '@/lib/tang-poetry-data';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Card {
  id: number;
  pinyin: string;
  letter: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  contentSource?: string;
}

function MemoryPlayContent() {
  const searchParams = useSearchParams();
  const levelId = parseInt(searchParams.get('level') || '1');

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [level, setLevel] = useState<Level | null>(null);

  const allPinyin = [...shengmu, ...dunyunmu, ...fuyunmu, ...zhengtiren];
  const allHanzi = Object.values(hanziData).flat();

  useEffect(() => {
    // 检查是否是唐诗关卡（通过 URL 参数判断）
    const urlParams = new URLSearchParams(window.location.search);
    const isTangshiLevel = urlParams.get('tangshi') === 'true';

    let currentLevel: Level | null = null;

    if (isTangshiLevel) {
      // 直接生成唐诗关卡
      currentLevel = generateDynamicLevel('memory', levelId, 'tangshi');

      // 加载进度
      if (currentLevel) {
        const storageKey = 'tangshi_memory_progress';
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          const savedLevels = JSON.parse(savedData);
          const savedLevel = savedLevels.find((l: any) => l.id === levelId);
          if (savedLevel) {
            currentLevel.completed = savedLevel.completed;
            currentLevel.starsEarned = savedLevel.starsEarned;
            currentLevel.isUnlocked = savedLevel.isUnlocked;
          } else if (levelId === 1) {
            // 第一关默认解锁
            currentLevel.isUnlocked = true;
          }
        } else if (levelId === 1) {
          // 第一关默认解锁
          currentLevel.isUnlocked = true;
        }
      }
    } else {
      // 加载普通关卡
      const levels = getLevelsWithAutoGenerate('memory');
      currentLevel = levels.find((l) => l.id === levelId) || null;
    }

    if (currentLevel && currentLevel.isUnlocked) {
      setLevel(currentLevel);
      initializeGame(currentLevel);
    }
  }, [levelId]);

  const initializeGame = (currentLevel: Level) => {
    const pairCount = currentLevel.pairCount || 4;
    let dataSource: any[] = [];
    let contentSource = 'pinyin';

    // 根据内容源选择数据
    const cs = currentLevel.contentSource;
    if (cs?.includes('pinyin')) {
      if (cs === 'pinyin-initial') dataSource = shengmu;
      else if (cs === 'pinyin-final') dataSource = [...dunyunmu, ...fuyunmu];
      else if (cs === 'pinyin-whole') dataSource = zhengtiren;
      else dataSource = allPinyin;
    } else if (cs?.includes('thousand-character')) {
      const sections = currentLevel.sectionIds
        ? thousandCharSections.filter((s: any) => currentLevel.sectionIds!.includes(s.id))
        : [thousandCharSections[levelId % thousandCharSections.length]];

      dataSource = sections.flatMap((s: any) => s.characters.map((c: any) => c.char)).map((char: string) => ({
        letter: char,
        pinyin: char,
        emoji: '📜',
      }));
      contentSource = 'thousand-character';
    } else if (cs?.includes('sanzi-jing')) {
      const sections = currentLevel.sectionIds
        ? sanziJingSections.filter((s: any) => currentLevel.sectionIds!.includes(s.id))
        : [sanziJingSections[(levelId as number) % sanziJingSections.length]];

      dataSource = sections.flatMap(s => s.content.split('')).map(char => ({
        letter: char,
        pinyin: char,
        emoji: '📚',
      }));
      contentSource = 'sanzi-jing';
    } else if (cs?.includes('baijiaxing')) {
      const sections = currentLevel.sectionIds
        ? baijiaxingSections.filter((s: any) => currentLevel.sectionIds!.includes(s.id))
        : [baijiaxingSections[(levelId as number) % baijiaxingSections.length]];

      dataSource = sections.flatMap((s: any) => s.surnames).map((surname: any) => ({
        letter: surname.surname,
        pinyin: surname.pinyin,
        emoji: '👥',
      }));
      contentSource = 'baijiaxing';
    } else if (cs?.includes('tangshi')) {
      // 唐诗卡片
      const poems = getContentData('tangshi', currentLevel.sectionIds);
      dataSource = poems.slice(0, pairCount).map((poem: any) => ({
        letter: poem.title,
        pinyin: poem.pinyin.split('\n')[0], // 使用第一句拼音
        emoji: '🎭',
      }));
      contentSource = 'tangshi';
    } else if (cs?.includes('hanzi')) {
      if (cs === 'hanzi-level-1') dataSource = allHanzi.filter(h => h.level === 'basic');
      else if (cs === 'hanzi-level-2') dataSource = allHanzi.filter(h => h.level === 'intermediate');
      else if (cs === 'hanzi-level-3') dataSource = allHanzi.filter(h => h.level === 'advanced');
      else dataSource = allHanzi;
      contentSource = 'hanzi';
    } else {
      dataSource = allPinyin;
    }

    // 确保有足够的数据
    if (dataSource.length < pairCount) {
      dataSource = [...dataSource, ...allPinyin].slice(0, pairCount);
    }

    const shuffled = dataSource.sort(() => Math.random() - 0.5).slice(0, pairCount);

    const cardPairs: Card[] = shuffled.flatMap((p, index) => [
      {
        id: index * 2,
        pinyin: p.pinyin,
        letter: p.letter,
        emoji: p.emoji,
        isFlipped: false,
        isMatched: false,
        contentSource,
      },
      {
        id: index * 2 + 1,
        pinyin: p.pinyin,
        letter: p.letter,
        emoji: p.emoji,
        isFlipped: false,
        isMatched: false,
        contentSource,
      },
    ]);

    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameCompleted(false);
  };

  const playSound = (type: 'flip' | 'match' | 'wrong' | 'star') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'flip') {
      oscillator.frequency.value = 300;
      gainNode.gain.value = 0.2;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 100);
    } else if (type === 'match') {
      oscillator.frequency.value = 523.25;
      gainNode.gain.value = 0.3;
      oscillator.start();
      setTimeout(() => {
        oscillator.frequency.value = 659.25;
        setTimeout(() => {
          oscillator.frequency.value = 783.99;
          setTimeout(() => {
            oscillator.stop();
          }, 150);
        }, 150);
      }, 150);
    } else if (type === 'wrong') {
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.2;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 300);
    } else if (type === 'star') {
      oscillator.frequency.value = 440;
      gainNode.gain.value = 0.3;
      oscillator.start();
      setTimeout(() => {
        oscillator.frequency.value = 554.37;
        setTimeout(() => {
          oscillator.frequency.value = 659.25;
          setTimeout(() => {
            oscillator.stop();
          }, 150);
        }, 150);
      }, 150);
    }
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards[cardId].isMatched) return;

    playSound('flip');

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].pinyin === cards[secondId].pinyin) {
        // Match found
        setTimeout(() => {
          const matchedCards = updatedCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(matchedPairs + 1);
          playSound('match');

          if (matchedPairs + 1 === cards.length / 2) {
            setTimeout(() => completeGame(), 500);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = updatedCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
          playSound('wrong');
        }, 1000);
      }
    }
  };

  const getStarRating = () => {
    const targetMoves = [8, 12, 16, 22, 30];
    const maxMoves = targetMoves[Math.min(levelId - 1, 4)];

    if (moves <= maxMoves * 0.8) return level?.starReward || 3;
    if (moves <= maxMoves) return Math.max(1, (level?.starReward || 3) - 1);
    return 0;
  };

  const completeGame = () => {
    setGameCompleted(true);
    const starsEarned = getStarRating();

    if (starsEarned > 0) {
      // 检查是否是唐诗关卡
      if (level?.contentSource === 'tangshi') {
        // 保存唐诗关卡进度
        const storageKey = 'tangshi_memory_progress';
        const savedData = localStorage.getItem(storageKey);
        let savedLevels: any[] = [];

        if (savedData) {
          savedLevels = JSON.parse(savedData);
        }

        // 更新当前关卡
        const levelIndex = savedLevels.findIndex((l: any) => l.id === levelId);
        if (levelIndex !== -1) {
          savedLevels[levelIndex].completed = true;
          savedLevels[levelIndex].starsEarned = Math.max(savedLevels[levelIndex].starsEarned, starsEarned);
        }

        // 解锁下一关
        if (levelIndex < savedLevels.length - 1) {
          savedLevels[levelIndex + 1].isUnlocked = true;
        }

        localStorage.setItem(storageKey, JSON.stringify(savedLevels));
      } else {
        // 保存普通关卡进度
        updateLevelProgressWithAutoGenerate('memory', levelId, starsEarned);
      }
      playSound('star');
    }
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">关卡未解锁</h1>
          <Link
            href="/games/memory"
            className="inline-block px-6 py-3 rounded-full bg-purple-500 text-white font-semibold"
          >
            返回关卡选择
          </Link>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const starsEarned = getStarRating();
    const isPassed = starsEarned > 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
        <div className="container mx-auto max-w-2xl">
          <div
            className={`mt-8 rounded-3xl p-8 shadow-2xl text-center ${
              isPassed
                ? 'bg-gradient-to-br from-green-400 to-emerald-400'
                : 'bg-gradient-to-br from-red-400 to-pink-400'
            } text-white`}
          >
            <div className="text-8xl mb-4">{isPassed ? '🎉' : '😅'}</div>
            <h1 className="mb-4 text-4xl font-bold">
              {isPassed ? '恭喜过关！' : '再接再厉！'}
            </h1>

            <div className="mb-8 rounded-2xl bg-white/20 p-6 backdrop-blur-sm">
              <div className="text-6xl font-bold mb-2">{moves} 步</div>
              <p className="text-xl">使用了 {moves} 步找到所有配对</p>
            </div>

            {isPassed && (
              <div className="mb-8">
                <div className="text-7xl mb-2">
                  {'⭐'.repeat(starsEarned)}
                </div>
                <p className="text-2xl font-semibold">
                  获得 {starsEarned} 颗星星！
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Link
                href={`/games/memory/play?level=${levelId}&tangshi=${level.contentSource === 'tangshi' ? 'true' : 'false'}`}
                className="transform rounded-full bg-white px-12 py-4 text-2xl font-bold text-green-600 shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
              >
                再玩一次 🔄
              </Link>
              <Link
                href={
                  isPassed
                    ? `/games/memory/play?level=${levelId + 1}&tangshi=${level.contentSource === 'tangshi' ? 'true' : 'false'}`
                    : '/games/memory'
                }
                className="transform rounded-full border-4 border-white px-12 py-4 text-2xl font-bold text-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
              >
                {isPassed ? '下一关 →' : '返回关卡'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* 关卡信息 */}
        <div className="mb-4 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-400 p-4 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{level.name}</span>
            <span className="text-lg">
              找出 {cards.length / 2} 对卡片
            </span>
          </div>
        </div>

        {/* 游戏状态 */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="text-lg font-bold text-purple-600">
                  配对: {matchedPairs} / {cards.length / 2}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👣</span>
                <span className="text-lg font-bold text-purple-600">步数: {moves}</span>
              </div>
            </div>
            <Link
              href="/games/memory"
              className="rounded-full bg-purple-100 px-4 py-2 text-lg font-bold text-purple-600 hover:bg-purple-200 transition-colors"
            >
              返回
            </Link>
          </div>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="aspect-square cursor-pointer perspective-1000"
            >
              <div
                className={`relative h-full w-full transition-all duration-500 transform-style-3d ${
                  card.isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* 卡片背面 */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-400 shadow-lg transition-all ${
                    card.isFlipped ? 'opacity-0' : ''
                  } ${!card.isMatched ? 'hover:scale-105' : ''}`}
                >
                  <span className="text-5xl">❓</span>
                </div>

                {/* 卡片正面 */}
                <div
                  className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-white shadow-lg transition-all ${
                    !card.isFlipped ? 'opacity-0 rotate-y-180' : ''
                  } ${card.isMatched ? 'bg-green-100 ring-4 ring-green-400' : ''}`}
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-1">{card.emoji}</div>
                    <div className="text-xl font-bold text-purple-600">
                      {card.pinyin}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MemoryPlayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <MemoryPlayContent />
    </Suspense>
  );
}
