'use client';

import { LevelSelector } from '@/components/level-selector';

export default function SpellingLevelSelectorPage() {
  return (
    <LevelSelector
      gameType="spelling"
      gameTitle="拼音拼写挑战"
      gameColor="bg-gradient-to-r from-blue-500 to-cyan-500"
    />
  );
}
