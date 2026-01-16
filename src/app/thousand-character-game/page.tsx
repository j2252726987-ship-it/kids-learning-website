'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { thousandCharSections, ThousandCharSection, ThousandCharCharacter } from '@/lib/thousand-character-data';

// 游戏类型
type GameType = 'match' | 'listen' | 'fill-blank';

// 关卡数据结构
interface Level {
  id: number;
  title: string;
  sectionId: string;
  gameType: GameType;
  unlocked: boolean;
  stars: number;
}

export default function ThousandCharGamePage() {
  const [currentView, setCurrentView] = useState<'menu' | 'level-select' | 'playing' | 'result'>('menu');
  const [selectedGameType, setSelectedGameType] = useState<GameType>('match');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [gameScore, setGameScore] = useState(0);
  const [stars, setStars] = useState(0);

  // 初始化关卡数据
  useEffect(() => {
    initializeLevels();
  }, []);

  const initializeLevels = () => {
    const savedProgress = localStorage.getItem('thousandCharGameProgress');
    if (savedProgress) {
      setLevels(JSON.parse(savedProgress));
    } else {
      // 创建5个关卡
      const initialLevels: Level[] = [
        { id: 1, title: '第一关：天地宇宙', sectionId: 'section-1', gameType: 'match', unlocked: true, stars: 0 },
        { id: 2, title: '第二关：寒来暑往', sectionId: 'section-2', gameType: 'listen', unlocked: false, stars: 0 },
        { id: 3, title: '第三关：云腾致雨', sectionId: 'section-3', gameType: 'fill-blank', unlocked: false, stars: 0 },
        { id: 4, title: '第四关：剑号巨阙', sectionId: 'section-4', gameType: 'match', unlocked: false, stars: 0 },
        { id: 5, title: '第五关：海咸河淡', sectionId: 'section-5', gameType: 'listen', unlocked: false, stars: 0 },
      ];
      setLevels(initialLevels);
      localStorage.setItem('thousandCharGameProgress', JSON.stringify(initialLevels));
    }
  };

  const saveProgress = (updatedLevels: Level[]) => {
    localStorage.setItem('thousandCharGameProgress', JSON.stringify(updatedLevels));
    setLevels(updatedLevels);
  };

  const unlockNextLevel = (currentLevelId: number) => {
    const updatedLevels = levels.map(level => {
      if (level.id === currentLevelId + 1) {
        return { ...level, unlocked: true };
      }
      return level;
    });
    saveProgress(updatedLevels);
  };

  const updateLevelStars = (levelId: number, starCount: number) => {
    const updatedLevels = levels.map(level => {
      if (level.id === levelId) {
        return { ...level, stars: Math.max(level.stars, starCount) };
      }
      return level;
    });
    saveProgress(updatedLevels);
  };

  // 游戏配置
  const gameTypes = [
    { id: 'match', title: '汉字连线', icon: '🔗', description: '将汉字与拼音配对' },
    { id: 'listen', title: '读音选择', icon: '👂', description: '听读音选汉字' },
    { id: 'fill-blank', title: '填空挑战', icon: '✍️', description: '补全千字文句子' },
  ] as const;

  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100">
        <header className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 py-8 text-center shadow-lg relative">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            🎮 千字文闯关游戏 🎮
          </h1>
          <p className="mt-2 text-lg text-white/90">快乐学习,轻松闯关</p>

          <Link
            href="/thousand-character"
            className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
          >
            ← 返回
          </Link>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">选择游戏模式</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gameTypes.map((game) => (
                <button
                  key={game.id}
                  onClick={() => {
                    setSelectedGameType(game.id as GameType);
                    setCurrentView('level-select');
                  }}
                  className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all hover:shadow-2xl group"
                >
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{game.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.title}</h3>
                  <p className="text-gray-600">{game.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'level-select') {
    const gameConfig = gameTypes.find(g => g.id === selectedGameType)!;
    const availableLevels = levels.filter(l => l.gameType === selectedGameType);

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100">
        <header className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 py-8 text-center shadow-lg relative">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {gameConfig.icon} {gameConfig.title}
          </h1>
          <p className="mt-2 text-lg text-white/90">{gameConfig.description}</p>

          <button
            onClick={() => setCurrentView('menu')}
            className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
          >
            ← 返回
          </button>
        </header>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">选择关卡</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => {
                  if (level.unlocked) {
                    setSelectedLevel(level);
                    setCurrentView('playing');
                    setGameScore(0);
                    setStars(0);
                  }
                }}
                disabled={!level.unlocked}
                className={`bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all ${
                  !level.unlocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">
                    {level.unlocked ? '🎯' : '🔒'}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{level.title}</h3>
                  <div className="flex justify-center gap-2 mb-2">
                    {[1, 2, 3].map((star) => (
                      <span
                        key={star}
                        className={`text-3xl ${
                          star <= level.stars ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  {!level.unlocked && (
                    <p className="text-sm text-gray-500 mt-2">完成上一关解锁</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'playing' && selectedLevel) {
    const section = thousandCharSections.find(s => s.id === selectedLevel.sectionId)!;

    return (
      <Game
        level={selectedLevel}
        section={section}
        gameType={selectedGameType}
        onComplete={(score, earnedStars) => {
          setGameScore(score);
          setStars(earnedStars);
          updateLevelStars(selectedLevel.id, earnedStars);
          unlockNextLevel(selectedLevel.id);
          setCurrentView('result');
        }}
        onExit={() => setCurrentView('level-select')}
      />
    );
  }

  if (currentView === 'result' && selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-4 text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">闯关成功！</h1>
          <p className="text-2xl text-gray-600 mb-6">{selectedLevel.title}</p>

          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`text-6xl transform hover:scale-125 transition-transform ${
                  star <= stars ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className="text-3xl font-bold text-pink-500 mb-8">
            得分: {gameScore}分
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => setCurrentView('level-select')}
              className="px-8 py-4 bg-gradient-to-r from-pink-400 to-yellow-400 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              选择关卡
            </button>
            <button
              onClick={() => {
                setGameScore(0);
                setStars(0);
                setCurrentView('playing');
              }}
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              再玩一次
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// 游戏组件
function Game({
  level,
  section,
  gameType,
  onComplete,
  onExit
}: {
  level: Level;
  section: ThousandCharSection;
  gameType: GameType;
  onComplete: (score: number, stars: number) => void;
  onExit: () => void;
}) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    if (gameType === 'match') {
      // 汉字连线游戏
      const matchQuestions = section.characters.slice(0, 6).map(char => ({
        type: 'match',
        character: char,
        options: generateMatchOptions(char, section.characters)
      }));
      setQuestions(matchQuestions);
    } else if (gameType === 'listen') {
      // 读音选择游戏
      const listenQuestions = section.characters.slice(0, 6).map(char => ({
        type: 'listen',
        character: char,
        options: generateListenOptions(char, section.characters)
      }));
      setQuestions(listenQuestions);
    } else if (gameType === 'fill-blank') {
      // 填空挑战游戏
      const fillBlankQuestions = generateFillBlankQuestions(section);
      setQuestions(fillBlankQuestions);
    }
  };

  const generateMatchOptions = (target: ThousandCharCharacter, allChars: ThousandCharCharacter[]) => {
    const wrongOptions = allChars
      .filter(c => c.char !== target.char)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...wrongOptions, target].sort(() => Math.random() - 0.5);
  };

  const generateListenOptions = (target: ThousandCharCharacter, allChars: ThousandCharCharacter[]) => {
    const wrongOptions = allChars
      .filter(c => c.char !== target.char)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...wrongOptions, target].sort(() => Math.random() - 0.5);
  };

  const generateFillBlankQuestions = (section: ThousandCharSection) => {
    const sentences = section.content.split('。').filter(s => s.length > 0);
    return sentences.slice(0, 4).map(sentence => {
      const chars = sentence.replace(/[，。]/g, '').split('');
      const blankIndex = Math.floor(Math.random() * chars.length);
      const targetChar = chars[blankIndex];
      const options = [
        targetChar,
        ...chars.filter((_: string, i: number) => i !== blankIndex).slice(0, 3)
      ].sort(() => Math.random() - 0.5);

      return {
        type: 'fill-blank',
        sentence: sentence,
        blankIndex,
        targetChar,
        options
      };
    });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      utterance.pitch = 1.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (selectedOption: any) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setShowFeedback(true);

    let correct = false;
    if (gameType === 'match') {
      correct = selectedOption.char === questions[currentQuestion].character.char;
    } else if (gameType === 'listen') {
      correct = selectedOption.char === questions[currentQuestion].character.char;
    } else if (gameType === 'fill-blank') {
      correct = selectedOption === questions[currentQuestion].targetChar;
    }

    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // 停止之前的朗读
        const utterance = new SpeechSynthesisUtterance('太棒了！');
        utterance.lang = 'zh-CN';
        utterance.rate = 1.0; // 正常语速
        utterance.pitch = 1.05; // 稍高音调，更活泼
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // 停止之前的朗读
        const utterance = new SpeechSynthesisUtterance('继续努力！');
        utterance.lang = 'zh-CN';
        utterance.rate = 1.0; // 正常语速
        utterance.pitch = 1.0; // 正常音调
        window.speechSynthesis.speak(utterance);
      }
    }

    setTimeout(() => {
      setShowFeedback(false);
      setIsAnswered(false);
      setIsCorrect(false);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        // 游戏结束，计算星级
        const percentage = (correctAnswers / questions.length) * 100;
        let stars = 0;
        if (percentage >= 90) stars = 3;
        else if (percentage >= 70) stars = 2;
        else if (percentage >= 50) stars = 1;

        onComplete(score, stars);
      }
    }, 1500);
  };

  if (!questions[currentQuestion]) return null;

  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-green-100">
      <header className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 py-6 text-center shadow-lg">
        <div className="flex items-center justify-between px-4">
          <button
            onClick={onExit}
            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
          >
            ← 退出
          </button>
          <div className="text-white">
            <span className="font-bold">第 {level.id} 关</span>
            <span className="mx-3">|</span>
            <span>{currentQuestion + 1}/{questions.length}</span>
            <span className="mx-3">|</span>
            <span className="font-bold">{score}分</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 游戏内容 */}
          {gameType === 'match' && (
            <MatchGame question={q} isAnswered={isAnswered} showFeedback={showFeedback} isCorrect={isCorrect} onAnswer={handleAnswer} />
          )}
          {gameType === 'listen' && (
            <ListenGame question={q} isAnswered={isAnswered} showFeedback={showFeedback} isCorrect={isCorrect} onAnswer={handleAnswer} speakText={speakText} />
          )}
          {gameType === 'fill-blank' && (
            <FillBlankGame question={q} isAnswered={isAnswered} showFeedback={showFeedback} isCorrect={isCorrect} onAnswer={handleAnswer} />
          )}
        </div>
      </div>
    </div>
  );
}

// 汉字连线游戏
function MatchGame({ question, isAnswered, showFeedback, isCorrect, onAnswer }: any) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        选择正确的拼音
      </h2>

      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-br from-pink-100 to-yellow-100 rounded-3xl p-12 border-4 border-pink-300">
          <div className="text-8xl font-bold text-gray-800">{question.character.char}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option: any, index: number) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={isAnswered}
            className={`p-6 rounded-2xl text-2xl font-bold transition-all ${
              isAnswered
                ? showFeedback && option.char === question.character.char
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-200 text-gray-500'
                : 'bg-gradient-to-br from-blue-400 to-purple-400 text-white hover:scale-105 hover:shadow-lg'
            }`}
          >
            {option.pinyin}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="text-center mt-6">
          <div className={`text-4xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? '✅ 太棒了！' : '❌ 再想想！'}
          </div>
          {!isCorrect && (
            <div className="mt-4 text-2xl text-gray-600">
              正确答案: {question.character.pinyin}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 读音选择游戏
function ListenGame({ question, isAnswered, showFeedback, isCorrect, onAnswer, speakText }: any) {
  useEffect(() => {
    setTimeout(() => {
      speakText(question.character.pinyin);
    }, 500);
  }, [question]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        听读音，选汉字
      </h2>

      <div className="text-center mb-8">
        <button
          onClick={() => speakText(question.character.pinyin)}
          className="inline-flex items-center gap-3 px-8 py-6 bg-gradient-to-r from-pink-400 to-yellow-400 text-white rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
        >
          <span className="text-5xl">🔊</span>
          再听一遍
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option: any, index: number) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={isAnswered}
            className={`p-8 rounded-2xl text-center transition-all ${
              isAnswered
                ? showFeedback && option.char === question.character.char
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-200 text-gray-500'
                : 'bg-gradient-to-br from-blue-400 to-purple-400 text-white hover:scale-105 hover:shadow-lg'
            }`}
          >
            <div className="text-7xl font-bold mb-2">{option.char}</div>
            <div className="text-xl">{option.pinyin}</div>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="text-center mt-6">
          <div className={`text-4xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? '✅ 太棒了！' : '❌ 再想想！'}
          </div>
          {!isCorrect && (
            <div className="mt-4 text-2xl text-gray-600">
              正确答案: {question.character.char} ({question.character.pinyin})
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 填空挑战游戏
function FillBlankGame({ question, isAnswered, showFeedback, isCorrect, onAnswer }: any) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        补全句子
      </h2>

      <div className="text-center mb-8">
        <div className="bg-gradient-to-br from-pink-100 to-yellow-100 rounded-3xl p-8 border-4 border-pink-300">
          <div className="text-4xl font-bold text-gray-800 leading-relaxed">
            {question.sentence.split('').map((char: string, index: number) => (
              <span key={index} className={index === question.blankIndex ? 'inline-block min-w-[1.5em] border-b-4 border-pink-400 text-pink-500' : ''}>
                {index === question.blankIndex ? '?' : char}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={isAnswered}
            className={`p-6 rounded-2xl text-5xl font-bold transition-all ${
              isAnswered
                ? showFeedback && option === question.targetChar
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-200 text-gray-500'
                : 'bg-gradient-to-br from-blue-400 to-purple-400 text-white hover:scale-105 hover:shadow-lg'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="text-center mt-6">
          <div className={`text-4xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? '✅ 太棒了！' : '❌ 再想想！'}
          </div>
          {!isCorrect && (
            <div className="mt-4 text-2xl text-gray-600">
              正确答案: {question.targetChar}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
