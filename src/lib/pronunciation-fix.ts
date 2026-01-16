/**
 * 发音修正工具
 * 用于修正多音字和容易读错的汉字
 */

/**
 * 完整的拼音修正映射表
 * 将可能读错的拼音映射到正确的朗读格式
 */
export const PINYIN_PRONUNCIATION_MAP: Record<string, string> = {
  // 单韵母
  'a': 'a', 'o': 'o', 'e': 'e',
  'i': 'yi', 'u': 'wu', 'ü': 'yu',

  // 复韵母
  'ai': 'ai', 'ei': 'ei', 'ui': 'wei',
  'ao': 'ao', 'ou': 'ou', 'iu': 'you',
  'ie': 'ie', 'üe': 'yue', 'er': 'er',

  // 鼻韵母
  'an': 'an', 'en': 'en', 'in': 'yin',
  'un': 'wen', 'ün': 'yun',
  'ang': 'ang', 'eng': 'eng', 'ing': 'ying', 'ong': 'ong',

  // 特殊组合
  'ia': 'ya', 'iao': 'yao', 'ian': 'yan', 'iang': 'yang',
  'ua': 'wa', 'uo': 'wo', 'uai': 'wai', 'uan': 'wan', 'uang': 'wang',
  'üan': 'yuan',
};

/**
 * 移除拼音中的声调符号
 */
export function removeTones(pinyin: string): string {
  if (!pinyin) return pinyin;

  return pinyin
    .replace(/ā/g, 'a')
    .replace(/á/g, 'a')
    .replace(/ǎ/g, 'a')
    .replace(/à/g, 'a')
    .replace(/ē/g, 'e')
    .replace(/é/g, 'e')
    .replace(/ě/g, 'e')
    .replace(/è/g, 'e')
    .replace(/ī/g, 'i')
    .replace(/í/g, 'i')
    .replace(/ǐ/g, 'i')
    .replace(/ì/g, 'i')
    .replace(/ō/g, 'o')
    .replace(/ó/g, 'o')
    .replace(/ǒ/g, 'o')
    .replace(/ò/g, 'o')
    .replace(/ū/g, 'u')
    .replace(/ú/g, 'u')
    .replace(/ǔ/g, 'u')
    .replace(/ù/g, 'u')
    .replace(/ǖ/g, 'v')
    .replace(/ǘ/g, 'v')
    .replace(/ǚ/g, 'v')
    .replace(/ǜ/g, 'v')
    .replace(/ü/g, 'yu')
    .replace(/[1-4]/g, ''); // 移除数字声调
}

/**
 * 修正单字母拼音
 */
export function fixSingleLetterPinyin(pinyin: string): string {
  const singleLetterMap: Record<string, string> = {
    'a': 'a',
    'o': 'o',
    'e': 'e',
    'i': 'yi',
    'u': 'wu',
    'v': 'yu',
    'ü': 'yu',
  };

  if (singleLetterMap[pinyin]) {
    return singleLetterMap[pinyin];
  }

  return pinyin;
}

/**
 * 修正复合韵母
 */
export function fixCompoundYunmu(pinyin: string): string {
  // 复合韵母修正表
  const yunmuFixes: Record<string, string> = {
    'ui': 'wei',
    'iu': 'you',
    'un': 'wen',
    'ün': 'yun',
  };

  for (const [key, value] of Object.entries(yunmuFixes)) {
    if (pinyin.endsWith(key)) {
      return pinyin.slice(0, -key.length) + value;
    }
  }

  return pinyin;
}

/**
 * 修正以 y/w 开头的组合
 */
export function fixYWCombinations(pinyin: string): string {
  // 以 y 开头的组合
  const yCombinations: Record<string, string> = {
    'ia': 'ya',
    'ie': 'ye',
    'iao': 'yao',
    'iou': 'you',
    'ian': 'yan',
    'in': 'yin',
    'iang': 'yang',
    'ing': 'ying',
    'iong': 'yong',
  };

  for (const [key, value] of Object.entries(yCombinations)) {
    if (pinyin.startsWith(key)) {
      return value;
    }
  }

  // 以 w 开头的组合
  const wCombinations: Record<string, string> = {
    'ua': 'wa',
    'uo': 'wo',
    'uai': 'wai',
    'uei': 'wei',
    'uan': 'wan',
    'uen': 'wen',
    'uang': 'wang',
    'ong': 'weng', // 特殊处理
  };

  for (const [key, value] of Object.entries(wCombinations)) {
    if (pinyin.startsWith(key)) {
      return value;
    }
  }

  return pinyin;
}

/**
 * 修正 ü 的组合
 */
export function fixUCombinations(pinyin: string): string {
  const uCombinations: Record<string, string> = {
    'ü': 'yu',
    'üe': 'yue',
    'üan': 'yuan',
    'ün': 'yun',
  };

  for (const [key, value] of Object.entries(uCombinations)) {
    if (pinyin.includes(key)) {
      pinyin = pinyin.replace(key, value);
    }
  }

  return pinyin;
}

/**
 * 完整的拼音修正流程
 */
export function fixPinyinPronunciation(pinyin: string): string {
  if (!pinyin) return pinyin;

  // 1. 移除声调符号
  let fixed = removeTones(pinyin);

  // 2. 转换为小写
  fixed = fixed.toLowerCase();

  // 3. 修正 ü 相关组合
  fixed = fixUCombinations(fixed);

  // 4. 修正 y/w 组合
  fixed = fixYWCombinations(fixed);

  // 5. 修正复合韵母
  fixed = fixCompoundYunmu(fixed);

  // 6. 修正单字母拼音
  fixed = fixSingleLetterPinyin(fixed);

  // 7. 查表修正（兜底）
  if (PINYIN_PRONUNCIATION_MAP[fixed]) {
    fixed = PINYIN_PRONUNCIATION_MAP[fixed];
  }

  return fixed;
}

/**
 * 修正汉字发音（用于多音字）
 */
export const PRONUNCIATION_FIXES: Record<string, string> = {
  // 常见多音字修正
  '还': 'hai',           // 还有、还是
  '行': 'xing',          // 行走、可以
  '长': 'chang',         // 长短
  '好': 'hao',           // 好的
  '了': 'le',            // 完成时态
  '着': 'zhe',           // 进行时态
  '得': 'de',            // 补语
  '地': 'de',            // 副词后缀
  '为': 'wei',           // 为了
  '便': 'bian',          // 方便
};

/**
 * 修正文本中的多音字发音
 */
export function fixPronunciation(text: string): string {
  if (!text) return text;

  return text.split('').map(char => {
    return PRONUNCIATION_FIXES[char] || char;
  }).join('');
}

/**
 * 检查拼音是否可能无法朗读
 */
export function isPinyinReadable(pinyin: string): boolean {
  if (!pinyin) return false;

  // 移除声调后的版本
  const withoutTones = removeTones(pinyin).toLowerCase();

  // 检查是否在修正表中
  if (PINYIN_PRONUNCIATION_MAP[withoutTones]) {
    return true;
  }

  // 检查是否是有效的拼音字母组合
  const validPattern = /^[a-zü]+$/;
  if (!validPattern.test(withoutTones)) {
    return false;
  }

  return true;
}
