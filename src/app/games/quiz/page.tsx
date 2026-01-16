'use client';

import { LevelSelector } from '@/components/level-selector';

export default function QuizLevelSelectorPage() {
  return (
    <LevelSelector
      gameType="quiz"
      gameTitle="拼音发音测试"
      gameColor="bg-gradient-to-r from-pink-500 to-red-500"
    />
  );
}
