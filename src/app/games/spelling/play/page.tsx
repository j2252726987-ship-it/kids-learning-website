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

interface Question {
  character: string;
  emoji: string;
  correctPinyin: string;
  shengmuOptions: string[];
  yunmuOptions: string[];
  contentSource?: string;
}

function SpellingPlayContent() {
  const searchParams = useSearchParams();
  const levelId = parseInt(searchParams.get('level') || '1');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedShengmu, setSelectedShengmu] = useState<string>('');
  const [selectedYunmu, setSelectedYunmu] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
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
      currentLevel = generateDynamicLevel('spelling', levelId, 'tangshi');

      // 加载进度
      if (currentLevel) {
        const storageKey = 'tangshi_spelling_progress';
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
      const levels = getLevelsWithAutoGenerate('spelling');
      currentLevel = levels.find((l) => l.id === levelId) || null;
    }

    if (currentLevel && currentLevel.isUnlocked) {
      setLevel(currentLevel);
      generateQuestions(currentLevel);
    }
  }, [levelId]);

  const generateQuestions = (currentLevel: Level) => {
    const questionCount = currentLevel.questionCount || 5;
    const contentSource = currentLevel.contentSource;
    let selectedQuestions: Question[] = [];

    if (contentSource?.includes('pinyin')) {
      // 拼音拼写
      let dataSource: any[] = [];
      if (contentSource === 'pinyin-initial') dataSource = shengmu;
      else if (contentSource === 'pinyin-final') dataSource = [...dunyunmu, ...fuyunmu];
      else if (contentSource === 'pinyin-whole') dataSource = zhengtiren;
      else dataSource = allPinyin;

      const shuffled = [...dataSource].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, questionCount).map((p) => {
        const correctPinyin = p.pinyin;

        let currentShengmu = p.letter;
        let currentYunmu = correctPinyin.substring(1);

        if (p.letter.length > 1) {
          currentShengmu = p.letter;
          currentYunmu = correctPinyin.substring(p.letter.length);
        } else {
          const allYunmuList = [...dunyunmu, ...fuyunmu];
          const foundYunmu = allYunmuList.find((y) => correctPinyin.startsWith(y.pinyin));
          if (foundYunmu) {
            currentShengmu = '';
            currentYunmu = foundYunmu.letter;
          }
        }

        const allYunmuList = [...dunyunmu, ...fuyunmu];

        const otherShengmu = currentShengmu
          ? shengmu
              .filter((s) => s.letter !== currentShengmu)
              .map((s) => s.letter)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
          : [];

        const otherYunmu = currentYunmu
          ? allYunmuList
              .filter((y) => y.letter !== currentYunmu)
              .map((y) => y.letter)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
          : [];

        const shengmuOptions = currentShengmu ? [currentShengmu, ...otherShengmu].sort(() => Math.random() - 0.5) : [];
        const yunmuOptions = currentYunmu ? [currentYunmu, ...otherYunmu].sort(() => Math.random() - 0.5) : [];

        return {
          character: p.examples[0],
          emoji: p.emoji,
          correctPinyin,
          shengmuOptions,
          yunmuOptions,
          contentSource: 'pinyin',
        };
      });
    } else if (contentSource?.includes('thousand-character') || contentSource?.includes('sanzi-jing') || contentSource?.includes('hanzi')) {
      // 汉字和百家姓拼写
      let hanziList: typeof allHanzi = [];

      if (contentSource === 'thousand-character' && currentLevel.sectionIds) {
        const sections = thousandCharSections.filter((s: any) =>
          currentLevel.sectionIds?.includes(s.id)
        );
        const chars = sections.flatMap((s: any) => s.characters.map((c: any) => c.char));
        hanziList = chars.map((char: string, idx: number) => {
          const section = sections.find((s: any) => s.characters.map((c: any) => c.char).includes(char))!;
          const charIdx = section.characters.map((c: any) => c.char).indexOf(char);
          const pinyin = section.pinyin.split(' ')[charIdx] || char;
          return {
            character: char,
            pinyin,
            emoji: '📜',
            level: 'basic' as const,
            words: [],
            category: '',
            strokes: 0,
          };
        });
      } else if (contentSource === 'sanzi-jing' && currentLevel.sectionIds) {
        const sections = sanziJingSections.filter((s: any) =>
          currentLevel.sectionIds?.includes(s.id)
        );
        const chars = sections.flatMap(s => s.content.split(''));
        hanziList = chars.map((char) => ({
          character: char,
          pinyin: char,
          emoji: '📚',
          level: 'basic' as const,
          words: [],
          category: '',
          strokes: 0,
        }));
      } else if (contentSource === 'baijiaxing' && currentLevel.sectionIds) {
        // 百家姓拼写
        const sections = baijiaxingSections.filter((s: any) =>
          currentLevel.sectionIds?.includes(s.id)
        );
        const surnames = sections.flatMap((s: any) => s.surnames);
        hanziList = surnames.map((surname: any) => ({
          character: surname.surname,
          pinyin: surname.pinyin,
          emoji: '👥',
          level: 'basic' as const,
          words: [],
          category: '',
          strokes: 0,
        }));
      } else if (contentSource === 'tangshi') {
        // 唐诗拼写：从唐诗中提取汉字
        const poems = getContentData('tangshi', currentLevel.sectionIds);
        const allChars = poems.flatMap((poem: any) =>
          poem.content.replace(/[，\n、。？！]/g, '').split('')
        );
        hanziList = allChars.slice(0, questionCount * 2).map((char: string) => ({
          character: char,
          pinyin: char, // 拼音暂时用字符本身，实际需要从唐诗数据的pinyin字段解析
          emoji: '🎭',
          level: 'basic' as const,
          words: [],
          category: '',
          strokes: 0,
        }));
      } else if (contentSource?.includes('hanzi')) {
        if (contentSource === 'hanzi-level-1') hanziList = allHanzi.filter(h => h.level === 'basic');
        else if (contentSource === 'hanzi-level-2') hanziList = allHanzi.filter(h => h.level === 'intermediate');
        else if (contentSource === 'hanzi-level-3') hanziList = allHanzi.filter(h => h.level === 'advanced');
        else hanziList = allHanzi;
      }

      const shuffled = [...hanziList].sort(() => Math.random() - 0.5).slice(0, questionCount);
      selectedQuestions = shuffled.map((h) => {
        const correctPinyin = h.pinyin;

        const otherChars = allHanzi
          .filter((x) => x.character !== h.character)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [h.character, ...otherChars.map(x => x.character)].sort(() => Math.random() - 0.5);

        return {
          character: h.character,
          emoji: h.emoji,
          correctPinyin,
          shengmu: [],
          yunmu: [],
          shengmuOptions: [],
          yunmuOptions: [],
          contentSource: 'hanzi',
        };
      });
    }

    // Fallback to pinyin if not enough questions
    if (selectedQuestions.length < questionCount) {
      const needed = questionCount - selectedQuestions.length;
      const fallback = [...allPinyin].sort(() => Math.random() - 0.5).slice(0, needed).map((p) => ({
        character: p.examples[0],
        emoji: p.emoji,
        correctPinyin: p.pinyin,
        shengmuOptions: [p.letter],
        yunmuOptions: [],
        contentSource: 'pinyin',
      }));
      selectedQuestions = [...selectedQuestions, ...fallback];
    }

    setQuestions(selectedQuestions);
  };

  const handleSubmit = () => {
    if (!selectedShengmu && !selectedYunmu) return;

    const currentQuestion = questions[currentIndex];
    const constructedPinyin = (selectedShengmu || '') + (selectedYunmu || '');
    const isCorrect = constructedPinyin === currentQuestion.correctPinyin;

    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedShengmu('');
        setSelectedYunmu('');
        setIsAnswered(false);
      } else {
        endGame();
      }
    }, 2000);
  };

  const playSound = (type: 'correct' | 'wrong' | 'star') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
      oscillator.frequency.value = 523.25;
      gainNode.gain.value = 0.3;
      oscillator.start();
      setTimeout(() => {
        oscillator.frequency.value = 659.25;
        setTimeout(() => {
          oscillator.stop();
        }, 150);
      }, 150);
    } else if (type === 'wrong') {
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.2;
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 300);
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

  const endGame = () => {
    setShowResult(true);

    if (level && score >= (level.targetScore || 0)) {
      // 检查是否是唐诗关卡
      if (level.contentSource === 'tangshi') {
        // 保存唐诗关卡进度
        const storageKey = 'tangshi_spelling_progress';
        const savedData = localStorage.getItem(storageKey);
        let savedLevels: any[] = [];

        if (savedData) {
          savedLevels = JSON.parse(savedData);
        }

        // 更新当前关卡
        const levelIndex = savedLevels.findIndex((l: any) => l.id === levelId);
        if (levelIndex !== -1) {
          savedLevels[levelIndex].completed = true;
          savedLevels[levelIndex].starsEarned = Math.max(savedLevels[levelIndex].starsEarned, level.starReward);
        }

        // 解锁下一关
        if (levelIndex < savedLevels.length - 1) {
          savedLevels[levelIndex + 1].isUnlocked = true;
        }

        localStorage.setItem(storageKey, JSON.stringify(savedLevels));
      } else {
        // 保存普通关卡进度
        updateLevelProgressWithAutoGenerate('spelling', levelId, level.starReward);
      }
      playSound('star');
    } else {
      playSound('wrong');
    }
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">关卡未解锁</h1>
          <Link
            href="/games/spelling"
            className="inline-block px-6 py-3 rounded-full bg-blue-500 text-white font-semibold"
          >
            返回关卡选择
          </Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    const isPassed = score >= (level.targetScore || 0);
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
              <div className="text-6xl font-bold mb-2">
                {score} / {questions.length}
              </div>
              <p className="text-xl">需要答对 {level.targetScore} 题</p>
            </div>

            {isPassed && (
              <div className="mb-8">
                <div className="text-7xl mb-2">
                  {'⭐'.repeat(level.starReward)}
                </div>
                <p className="text-2xl font-semibold">
                  获得 {level.starReward} 颗星星！
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Link
                href={`/games/spelling/play?level=${levelId}&tangshi=${level.contentSource === 'tangshi' ? 'true' : 'false'}`}
                className="transform rounded-full bg-white px-12 py-4 text-2xl font-bold text-green-600 shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
              >
                再玩一次 🔄
              </Link>
              <Link
                href={
                  isPassed
                    ? `/games/spelling/play?level=${levelId + 1}&tangshi=${level.contentSource === 'tangshi' ? 'true' : 'false'}`
                    : '/games/spelling'
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

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* 关卡信息 */}
        <div className="mb-4 rounded-2xl bg-gradient-to-r from-blue-400 to-cyan-400 p-4 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{level.name}</span>
            <span className="text-lg">
              需要答对 {level.targetScore} / {questions.length} 题
            </span>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-6 rounded-full bg-white p-2 shadow-md">
          <div className="flex items-center justify-between mb-2 px-4">
            <span className="font-bold text-blue-600">
              题目 {currentIndex + 1} / {questions.length}
            </span>
            <span className="font-bold text-blue-600">得分: {score}</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-blue-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 汉字卡片 */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-400 p-8 shadow-2xl text-center text-white">
          <div className="text-8xl mb-4">{currentQuestion.emoji}</div>
          <div className="text-6xl font-bold">{currentQuestion.character}</div>
        </div>

        {/* 拼音选择 */}
        <div className="space-y-6">
          {/* 声母选择 */}
          {currentQuestion.shengmuOptions.length > 0 && (
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-center text-2xl font-bold text-blue-600">
                选择声母
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {currentQuestion.shengmuOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => !isAnswered && setSelectedShengmu(option)}
                    disabled={isAnswered}
                    className={`rounded-2xl p-4 text-2xl font-bold shadow-md transition-all hover:scale-105 ${
                      selectedShengmu === option
                        ? 'bg-blue-500 text-white ring-4 ring-blue-300'
                        : 'bg-white text-gray-800 hover:bg-blue-50'
                    } ${isAnswered ? 'opacity-50' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 韵母选择 */}
          {currentQuestion.yunmuOptions.length > 0 && (
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-center text-2xl font-bold text-cyan-600">
                选择韵母
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {currentQuestion.yunmuOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => !isAnswered && setSelectedYunmu(option)}
                    disabled={isAnswered}
                    className={`rounded-2xl p-4 text-2xl font-bold shadow-md transition-all hover:scale-105 ${
                      selectedYunmu === option
                        ? 'bg-cyan-500 text-white ring-4 ring-cyan-300'
                        : 'bg-white text-gray-800 hover:bg-cyan-50'
                    } ${isAnswered ? 'opacity-50' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 确认按钮 */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={
              isAnswered ||
              (!selectedShengmu && !selectedYunmu)
            }
            className={`w-full transform rounded-full py-4 text-2xl font-bold shadow-xl transition-all hover:scale-105 ${
              isAnswered ||
              (!selectedShengmu && !selectedYunmu)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-2xl'
            }`}
          >
            确认答案 ✓
          </button>
        </div>

        {/* 结果提示 */}
        {isAnswered && (
          <div
            className={`mt-6 rounded-2xl p-4 text-center text-xl font-bold ${
              (selectedShengmu || '') + (selectedYunmu || '') === currentQuestion.correctPinyin
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {(selectedShengmu || '') + (selectedYunmu || '') === currentQuestion.correctPinyin ? (
              <span>🎉 太棒了，答对了！</span>
            ) : (
              <span>😅 答错了，正确答案是 {currentQuestion.correctPinyin}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SpellingPlayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <SpellingPlayContent />
    </Suspense>
  );
}
