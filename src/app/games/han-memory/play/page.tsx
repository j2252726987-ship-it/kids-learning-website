'use client';

import { useState, useEffect, Suspense } from 'react';
import { hanziData } from '@/lib/pinyin-data';
import { getLevels, updateLevelProgress, Level } from '@/lib/level-system';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Card {
  id: number;
  character: string;
  pinyin: string;
  emoji: string;
  words: string[];
  isFlipped: boolean;
  isMatched: boolean;
}

function HanziMemoryPlayContent() {
  const searchParams = useSearchParams();
  const levelId = parseInt(searchParams.get('level') || '1');

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [level, setLevel] = useState<Level | null>(null);

  // 获取所有汉字
  const allCharacters = Object.values(hanziData).flat();

  useEffect(() => {
    const levels = getLevels('han-memory');
    const currentLevel = levels.find((l) => l.id === levelId);
    if (currentLevel && currentLevel.isUnlocked) {
      setLevel(currentLevel);
      initializeGame(currentLevel);
    }
  }, [levelId]);

  const initializeGame = (currentLevel: Level) => {
    let pairCount = 4;
    if (levelId === 2) pairCount = 6;
    if (levelId >= 3) pairCount = 8;
    if (levelId >= 4) pairCount = 10;
    if (levelId >= 5) pairCount = 12;

    // 根据难度筛选汉字
    let availableCharacters = allCharacters;
    if (levelId <= 2) {
      availableCharacters = allCharacters.filter(c => c.level === 'basic');
    } else if (levelId <= 4) {
      availableCharacters = allCharacters.filter(c => c.level === 'basic' || c.level === 'intermediate');
    }

    // 随机选择要使用的汉字
    const shuffled = [...availableCharacters].sort(() => Math.random() - 0.5).slice(0, pairCount);

    const cardPairs: Card[] = shuffled.flatMap((h, index) => [
      {
        id: index * 2,
        character: h.character,
        pinyin: h.pinyin,
        emoji: h.emoji,
        words: h.words,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: index * 2 + 1,
        character: h.character,
        pinyin: h.pinyin,
        emoji: h.emoji,
        words: h.words,
        isFlipped: false,
        isMatched: false,
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

      if (cards[firstId].character === cards[secondId].character) {
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
      updateLevelProgress('han-memory', levelId, starsEarned);
      playSound('star');
    }
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">关卡未解锁</h1>
          <Link
            href="/games/han-memory"
            className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            返回关卡选择
          </Link>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const starsEarned = getStarRating();
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-orange-600 mb-4">太棒了！</h1>
          <p className="text-xl text-gray-700 mb-6">你完成了第 {levelId} 关</p>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`text-5xl ${
                  star <= starsEarned ? 'text-yellow-500' : 'text-gray-300'
                } transition-all transform ${
                  star <= starsEarned ? 'scale-110' : ''
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className="text-lg text-gray-600 mb-8">
            用时 {moves} 步
          </div>

          <div className="space-y-4">
            <button
              onClick={() => initializeGame(level)}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              再玩一次
            </button>
            <Link
              href="/games/han-memory"
              className="block w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
            >
              返回关卡选择
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* 顶部标题 */}
      <header className="bg-gradient-to-r from-yellow-500 to-orange-500 py-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          📚 汉字记忆翻牌 - 第 {levelId} 关
        </h1>
        <div className="mt-2 flex justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="text-lg font-semibold">{matchedPairs} / {cards.length / 2} 组</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">👆</span>
            <span className="text-lg font-semibold">{moves} 步</span>
          </div>
        </div>
        <Link
          href="/games/han-memory"
          className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white hover:bg-white/30 transition-all"
        >
          ← 返回
        </Link>
      </header>

      {/* 游戏区域 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-w-4xl mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || flippedCards.length >= 2}
              className={`
                aspect-square rounded-2xl shadow-lg transform transition-all duration-300
                ${card.isFlipped || card.isMatched
                  ? 'bg-white'
                  : 'bg-gradient-to-br from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500'
                }
                ${card.isMatched ? 'opacity-50 scale-95' : 'hover:scale-105'}
                ${flippedCards.length < 2 && !card.isMatched ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="h-full flex flex-col items-center justify-center p-2">
                  <span className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1">
                    {card.character}
                  </span>
                  <span className="text-sm text-gray-600 mb-1">{card.pinyin}</span>
                  <span className="text-2xl">{card.emoji}</span>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <span className="text-4xl text-white">❓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* 游戏提示 */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-white rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-gray-700">
              💡 点击卡片翻开相同的汉字进行配对！
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function HanziMemoryPlayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-6xl animate-bounce">📚</div>
      </div>
    }>
      <HanziMemoryPlayContent />
    </Suspense>
  );
}
