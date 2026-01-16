'use client';

import { LevelSelector } from '@/components/level-selector';

export default function HanziMemoryLevelSelectorPage() {
  return (
    <LevelSelector
      gameType="han-memory"
      gameTitle="汉字记忆翻牌"
      gameColor="bg-gradient-to-r from-yellow-500 to-orange-500"
    />
  );
}
