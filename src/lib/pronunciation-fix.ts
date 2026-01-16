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
 * 修正单字母拼音（用于韵母和整体认读音节）
 */
export function fixSingleLetterPinyin(pinyin: string): string {
  const singleLetterMap: Record<string, string> = {
    'a': 'a',      // 单韵母
    'o': 'o',      // 单韵母
    'e': 'e',      // 单韵母
    'i': 'yi',     // 单韵母 i → yi
    'u': 'wu',     // 单韵母 u → wu
    'v': 'yu',     // 单韵母 ü → yu
    'ü': 'yu',     // 单韵母 ü → yu
  };

  if (singleLetterMap[pinyin]) {
    return singleLetterMap[pinyin];
  }

  return pinyin;
}

/**
 * 修正单字母声母的发音
 * 添加一个完整音节让浏览器能够正确朗读
 */
export function fixShengmuPronunciation(shengmu: string): string {
  const shengmuMap: Record<string, string> = {
    'b': 'bo',    // 玻
    'p': 'po',    // 坡
    'm': 'mo',    // 摸
    'f': 'fo',    // 佛
    'd': 'de',    // 得
    't': 'te',    // 特
    'n': 'ne',    // 讷
    'l': 'le',    // 勒
    'g': 'ge',    // 哥
    'k': 'ke',    // 科
    'h': 'he',    // 喝
    'j': 'ji',    // 基
    'q': 'qi',    // 期
    'x': 'xi',    // 希
    'zh': 'zhi',  // 知
    'ch': 'chi',  // 吃
    'sh': 'shi',  // 诗
    'r': 'ri',    // 日
    'z': 'zi',    // 资
    'c': 'ci',    // 刺
    's': 'si',    // 思
    'y': 'yi',    // 衣
    'w': 'wu',    // 乌
  };

  return shengmuMap[shengmu] || shengmu;
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
    // 注意：ong 不转换，它本身就是完整韵母
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
 * 完整的拼音修正流程（用于修正可能读错的拼音）
 */
export function fixPinyinPronunciation(pinyin: string): string {
  if (!pinyin) return pinyin;

  // 1. 移除声调符号
  let fixed = removeTones(pinyin);

  // 2. 转换为小写
  fixed = fixed.toLowerCase();

  // 3. 修正 ü 相关组合
  fixed = fixUCombinations(fixed);

  // 4. 修正 y/w 组合（只对以这些字母开头的拼音生效）
  fixed = fixYWCombinations(fixed);

  // 5. 修正复合韵母（只在特定情况下生效）
  fixed = fixCompoundYunmu(fixed);

  // 6. 修正单字母拼音（单韵母）
  fixed = fixSingleLetterPinyin(fixed);

  // 7. 查表修正（兜底）
  if (PINYIN_PRONUNCIATION_MAP[fixed]) {
    fixed = PINYIN_PRONCIATION_MAP[fixed];
  }

  return fixed;
}

/**
 * 修正声母发音（专用于声母朗读）
 * 检查是否是声母单字母，如果是则使用对应的完整音节
 */
export function fixShengmuForReading(shengmu: string): string {
  // 常见声母列表
  const shengmus = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h',
                    'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'];

  // 如果是单字母声母，使用对应的完整音节
  if (shengmus.includes(shengmu)) {
    return fixShengmuPronunciation(shengmu);
  }

  // 如果是其他形式的拼音，使用标准修正
  return fixPinyinPronunciation(shengmu);
}

/**
 * 修正韵母发音（专用于韵母朗读）
 * 韵母本身就是完整的拼音，只需零声母规则修正
 */
export function fixYunmuForReading(yunmu: string): string {
  // 韵母直接使用标准修正（会处理零声母规则）
  return fixPinyinPronunciation(yunmu);
}

/**
 * 修正整体认读音节发音
 * 整体认读音节直接朗读即可
 */
export function fixZhengtiRenyinForReading(pinyin: string): string {
  // 整体认读音节通常是完整的拼音，直接朗读
  // 但可能需要移除声调
  return removeTones(pinyin);
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
