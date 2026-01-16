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
  pinyin: string;
  letter: string;
  emoji: string;
  options: string[];
  correctAnswer: string;
  contentSource?: string; // 内容来源标识
}

function QuizPlayContent() {
  const searchParams = useSearchParams();
  const levelId = parseInt(searchParams.get('level') || '1');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
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
      currentLevel = generateDynamicLevel('quiz', levelId, 'tangshi');

      // 加载进度
      if (currentLevel) {
        const storageKey = 'tangshi_quiz_progress';
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
      const levels = getLevelsWithAutoGenerate('quiz');
      currentLevel = levels.find((l) => l.id === levelId) || null;
    }

    if (currentLevel && currentLevel.isUnlocked) {
      setLevel(currentLevel);
      generateQuestions(currentLevel);
    }
  }, [levelId]);

  const generateQuestions = (currentLevel: Level) => {
    const questionCount = currentLevel.questionCount || 5;
    let generatedQuestions: Question[] = [];

    // 根据内容源生成不同类型的题目
    const contentSource = currentLevel.contentSource;

    if (contentSource?.includes('pinyin')) {
      // 拼音类题目
      let dataSource: any[] = [];
      if (contentSource === 'pinyin-initial') dataSource = shengmu;
      else if (contentSource === 'pinyin-final') dataSource = [...dunyunmu, ...fuyunmu];
      else if (contentSource === 'pinyin-whole') dataSource = zhengtiren;
      else dataSource = allPinyin;

      const shuffled = [...dataSource].sort(() => Math.random() - 0.5);
      generatedQuestions = shuffled.slice(0, questionCount).map((p) => {
        const correctAnswer = p.examples[0];
        const otherOptions = allPinyin
          .filter((x) => x.letter !== p.letter)
          .map((x) => x.examples[0])
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [correctAnswer, ...otherOptions].sort(() => Math.random() - 0.5);

        return {
          pinyin: p.pinyin,
          letter: p.letter,
          emoji: p.emoji,
          options,
          correctAnswer,
          contentSource: 'pinyin',
        };
      });
    } else if (contentSource?.includes('character') || contentSource?.includes('hanzi')) {
      // 汉字类题目（千字文、三字经、分级汉字）
      if (contentSource === 'thousand-character' && currentLevel.sectionIds) {
        // 千字文题目
        const sections = thousandCharSections.filter((s: any) =>
          currentLevel.sectionIds?.includes(s.id)
        );
        const allChars = sections.flatMap((s: any) => s.characters.split(''));

        generatedQuestions = allChars
          .sort(() => Math.random() - 0.5)
          .slice(0, questionCount)
          .map((char: string) => {
            const section = sections.find((s: any) => s.characters.map((c: any) => c.char).includes(char))!;
            const charIndex = section.characters.map((c: any) => c.char).indexOf(char);
            const pinyin = section.pinyin.split(' ')[charIndex] || char;

            // 生成干扰项（来自其他段落）
            const otherChars = allChars
              .filter((c: string) => c !== char)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);

            const options = [char, ...otherChars].sort(() => Math.random() - 0.5);

            return {
              pinyin,
              letter: char,
              emoji: '📜',
              options,
              correctAnswer: char,
              contentSource: 'thousand-character',
            };
          });
      } else if (contentSource === 'sanzi-jing' && currentLevel.sectionIds) {
        // 三字经题目
        const sections = sanziJingSections.filter((s: any) =>
          currentLevel.sectionIds?.includes(s.id)
        );
        const allChars = sections.flatMap((s: any) => s.content.split(''));

        generatedQuestions = allChars
          .sort(() => Math.random() - 0.5)
          .slice(0, questionCount)
          .map((char: string) => {
            const section = sections.find((s: any) => s.content.includes(char))!;

            const options = [char, ...allChars
              .filter(c => c !== char)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)].sort(() => Math.random() - 0.5);

            return {
              pinyin: char,
              letter: char,
              emoji: '📚',
              options,
              correctAnswer: char,
              contentSource: 'sanzi-jing',
            };
          });
      } else if (contentSource === 'baijiaxing' && currentLevel.sectionIds) {
        // 百家姓题目
        const sections = baijiaxingSections.filter((s: any) =>
          currentLevel.sectionIds?.includes(s.id)
        );
        const allSurnames = sections.flatMap((s: any) => s.surnames);

        generatedQuestions = allSurnames
          .sort(() => Math.random() - 0.5)
          .slice(0, questionCount)
          .map((surname: any) => {
            // 生成干扰项（来自其他段落）
            const otherSurnames = allSurnames
              .filter((s: any) => s.surname !== surname.surname)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);

            const options = [surname.surname, ...otherSurnames.map((s: any) => s.surname)].sort(() => Math.random() - 0.5);

            return {
              pinyin: surname.pinyin,
              letter: surname.surname,
              emoji: '👥',
              options,
              correctAnswer: surname.surname,
              contentSource: 'baijiaxing',
            };
          });
      } else {
        // 分级汉字题目
        let hanziList: typeof allHanzi = [];
        if (contentSource === 'hanzi-level-1') {
          hanziList = allHanzi.filter(h => h.level === 'basic');
        } else if (contentSource === 'hanzi-level-2') {
          hanziList = allHanzi.filter(h => h.level === 'intermediate');
        } else if (contentSource === 'hanzi-level-3') {
          hanziList = allHanzi.filter(h => h.level === 'advanced');
        } else {
          hanziList = allHanzi;
        }

        generatedQuestions = hanziList
          .sort(() => Math.random() - 0.5)
          .slice(0, questionCount)
          .map((h) => {
            const correctAnswer = h.character;
            const otherOptions = allHanzi
              .filter((x) => x.character !== h.character)
              .map((x) => x.character)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);

            const options = [correctAnswer, ...otherOptions].sort(() => Math.random() - 0.5);

            return {
              pinyin: h.pinyin,
              letter: h.character,
              emoji: h.emoji,
              options,
              correctAnswer,
              contentSource: 'hanzi',
            };
          });
    }
    } else if (contentSource === 'tangshi') {
        // 唐诗题目
        const dataSource = getContentData(contentSource, currentLevel.sectionIds);
        const shuffled = [...dataSource].sort(() => Math.random() - 0.5);
        generatedQuestions = shuffled.slice(0, questionCount).map((poem: any) => {
          // 从诗的内容中提取一句作为问题
          const lines = poem.content.split('\n').filter((line: string) => line.trim());
          const questionLine = lines[Math.floor(Math.random() * lines.length)];

          // 正确答案：诗的标题
          const correctAnswer = poem.title;

          // 生成干扰项：其他诗的标题
          const otherTitles = tangPoetryCollection
            .filter((p: any) => p.title !== poem.title)
            .map((p: any) => p.title)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

          const options = [correctAnswer, ...otherTitles].sort(() => Math.random() - 0.5);

          return {
            pinyin: poem.pinyin,
            letter: questionLine, // 使用诗句作为显示内容
            emoji: '🎭',
            options,
            correctAnswer,
            contentSource: 'tangshi',
            poemTitle: poem.title, // 额外信息
            poemAuthor: poem.author, // 额外信息
          };
        });
      }

    // 如果没有生成到足够的题目，使用拼音作为备选
    if (generatedQuestions.length < questionCount) {
      const shuffled = [...allPinyin].sort(() => Math.random() - 0.5);
      const needed = questionCount - generatedQuestions.length;
      const fallbackQuestions = shuffled.slice(0, needed).map((p) => {
        const correctAnswer = p.examples[0];
        const otherOptions = allPinyin
          .filter((x) => x.letter !== p.letter)
          .map((x) => x.examples[0])
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const options = [correctAnswer, ...otherOptions].sort(() => Math.random() - 0.5);

        return {
          pinyin: p.pinyin,
          letter: p.letter,
          emoji: p.emoji,
          options,
          correctAnswer,
          contentSource: 'pinyin',
        };
      });
      generatedQuestions = [...generatedQuestions, ...fallbackQuestions];
    }

    setQuestions(generatedQuestions);
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        endGame();
      }
    }, 1500);
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
        const storageKey = 'tangshi_quiz_progress';
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
        updateLevelProgressWithAutoGenerate('quiz', levelId, level.starReward);
      }
      playSound('star');
    } else {
      playSound('wrong');
    }
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">关卡未解锁</h1>
          <Link
            href="/games/quiz"
            className="inline-block px-6 py-3 rounded-full bg-pink-500 text-white font-semibold"
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
                href={`/games/quiz/play?level=${levelId}&tangshi=${level.contentSource === 'tangshi' ? 'true' : 'false'}`}
                className="transform rounded-full bg-white px-12 py-4 text-2xl font-bold text-green-600 shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
              >
                再玩一次 🔄
              </Link>
              <Link
                href={
                  isPassed
                    ? `/games/quiz/play?level=${levelId + 1}&tangshi=${level.contentSource === 'tangshi' ? 'true' : 'false'}`
                    : '/games/quiz'
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* 关卡信息 */}
        <div className="mb-4 rounded-2xl bg-gradient-to-r from-pink-400 to-red-400 p-4 shadow-lg text-white">
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
            <span className="font-bold text-pink-600">
              题目 {currentIndex + 1} / {questions.length}
            </span>
            <span className="font-bold text-pink-600">得分: {score}</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-pink-200">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 问题卡片 */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-pink-400 to-red-400 p-8 shadow-2xl text-center text-white">
          <div className="text-8xl mb-4">{currentQuestion.emoji}</div>
          <div className="mb-2 text-6xl font-bold">{currentQuestion.pinyin}</div>
          <div className="text-xl text-white/90">{currentQuestion.letter}</div>
        </div>

        {/* 选项 */}
        <div className="grid gap-4">
          {currentQuestion.options.map((option, index) => {
            let buttonClass =
              'transform rounded-2xl border-4 border-white p-6 text-center text-2xl font-bold shadow-lg transition-all hover:scale-105 hover:shadow-xl';

            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) {
                buttonClass += ' bg-green-500 text-white border-green-600';
              } else if (option === selectedAnswer) {
                buttonClass += ' bg-red-500 text-white border-red-600';
              } else {
                buttonClass += ' opacity-50 bg-gray-100 text-gray-600';
              }
            } else {
              buttonClass += ' bg-white text-gray-800 hover:bg-pink-50';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={buttonClass}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* 结果提示 */}
        {isAnswered && (
          <div
            className={`mt-6 rounded-2xl p-4 text-center text-xl font-bold ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <span>🎉 太棒了，答对了！</span>
            ) : (
              <span>😅 答错了，再接再厉！</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuizPlayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <QuizPlayContent />
    </Suspense>
  );
}
