'use client';

import { LevelSelector } from '@/components/level-selector';

export default function MemoryLevelSelectorPage() {
  return (
    <LevelSelector
      gameType="memory"
      gameTitle="拼音记忆翻牌"
      gameColor="bg-gradient-to-r from-purple-500 to-indigo-500"
    />
  );
}
