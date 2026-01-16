'use client';

import Link from 'next/link';

export default function TangshiGamesPage() {
  const gameModes = [
    {
      title: '发音测试',
      description: '根据诗词内容，选择正确的答案，锻炼听力与理解能力',
      icon: '🎤',
      color: 'from-blue-400 to-blue-600',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700',
      link: '/games/quiz/tangshi'
    },
    {
      title: '记忆翻牌',
      description: '找出配对的诗词卡片，锻炼记忆力和观察力',
      icon: '🎴',
      color: 'from-purple-400 to-purple-600',
      hoverColor: 'hover:from-purple-500 hover:to-purple-700',
      link: '/games/memory/tangshi'
    },
    {
      title: '拼写挑战',
      description: '根据诗词内容，选择正确的拼音，测试汉字认知能力',
      icon: '✍️',
      color: 'from-green-400 to-green-600',
      hoverColor: 'hover:from-green-500 hover:to-green-700',
      link: '/games/spelling/tangshi'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <header className="bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 py-8 text-center shadow-lg relative">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          🎭 唐诗闯关游戏 🎭
        </h1>
        <p className="mt-2 text-lg text-white/90">选择游戏模式，开始挑战吧！</p>

        <Link
          href="/tang-poetry"
          className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/30 transition-all"
        >
          ← 返回
        </Link>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameModes.map((mode, index) => (
              <Link
                key={index}
                href={mode.link}
                className="group"
              >
                <div className={`bg-gradient-to-br ${mode.color} ${mode.hoverColor} rounded-3xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full`}>
                  <div className="text-center">
                    <div className="text-7xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {mode.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {mode.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 text-white font-semibold text-sm">
                      <span>点击开始</span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">📖</span>
              游戏说明
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎤</span>
                <div>
                  <h3 className="font-bold text-lg">发音测试</h3>
                  <p className="text-gray-600">听诗答题，锻炼听力理解。系统会朗读诗词内容，你需要在多个选项中选出正确答案。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎴</span>
                <div>
                  <h3 className="font-bold text-lg">记忆翻牌</h3>
                  <p className="text-gray-600">翻开卡片，寻找配对。每张卡片上有诗词内容或标题，找出所有配对即可过关。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✍️</span>
                <div>
                  <h3 className="font-bold text-lg">拼写挑战</h3>
                  <p className="text-gray-600">根据诗词内容，选择正确的拼音。测试你对诗词汉字的认知和拼音掌握程度。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl border-2 border-red-200">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-bold text-lg text-red-800">小贴士</h3>
                  <p className="text-red-700">
                    游戏关卡会自动生成，难度随关卡数逐渐提升。每完成一关都会获得星星奖励，可以挑战更高的难度！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
