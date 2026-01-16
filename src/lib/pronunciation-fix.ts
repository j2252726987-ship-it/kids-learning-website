/**
 * 发音修正工具
 * 用于修正多音字和容易读错的汉字
 */

/**
 * 多音字修正映射表
 * 格式：{ "原字": "修正后的完整文本" }
 * 例如：{"还": "hái"} 会将 "还" 读作 "hái"
 */
export const PRONUNCIATION_FIXES: Record<string, string> = {
  // 常见多音字修正
  '还': 'hái',           // 还有、还是
  '行': 'xíng',          // 行走、可以
  '长': 'cháng',         // 长短
  '好': 'hǎo',           // 好的
  '了': 'le',            // 完成时态
  '着': 'zhe',           // 进行时态
  '得': 'de',            // 补语
  '地': 'de',            // 副词后缀
  '为': 'wéi',           // 为了
  '便': 'biàn',          // 方便

  // 拼音专用修正
  'a': 'a', 'o': 'o', 'e': 'e',
  'i': 'yi', 'u': 'wu', 'ü': 'yu',
  'ai': 'ai', 'ei': 'ei', 'ui': 'wei',
  'ao': 'ao', 'ou': 'ou', 'iu': 'you',
  'ie': 'ie', 'üe': 'yue', 'er': 'er',
  'an': 'an', 'en': 'en', 'in': 'yin',
  'un': 'wen', 'ün': 'yun',
  'ang': 'ang', 'eng': 'eng', 'ing': 'ying', 'ong': 'ong',

  // 特殊情况修正
  'ê': 'e',               // ê → e
  'zh': 'zhi',            // zh → zhi
  'ch': 'chi',            // ch → chi
  'sh': 'shi',            // sh → shi
};

/**
 * 修正文本中的多音字发音
 * @param text 原始文本
 * @returns 修正发音后的文本
 */
export function fixPronunciation(text: string): string {
  if (!text) return text;

  // 逐字检查并替换
  return text.split('').map(char => {
    return PRONUNCIATION_FIXES[char] || char;
  }).join('');
}

/**
 * 修正拼音朗读
 * 将拼音转换为更容易被浏览器正确朗读的格式
 * @param pinyin 原始拼音
 * @returns 修正后的拼音
 */
export function fixPinyinPronunciation(pinyin: string): string {
  if (!pinyin) return pinyin;

  // 移除声调符号（浏览器可能读不准带声调的拼音）
  let fixed = pinyin
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
    .replace(/1/g, '')
    .replace(/2/g, '')
    .replace(/3/g, '')
    .replace(/4/g, '');

  // 单字母拼音补音
  const singleLetterMap: Record<string, string> = {
    'a': 'a',
    'o': 'o',
    'e': 'e',
    'i': 'yi',
    'u': 'wu',
    'v': 'yu',
  };

  if (singleLetterMap[fixed]) {
    fixed = singleLetterMap[fixed];
  }

  // 复合韵母修正
  const yunmuMap: Record<string, string> = {
    'iu': 'you',
    'ui': 'wei',
    'un': 'wen',
    'ie': 'ie',
    'üe': 'yue',
  };

  for (const [key, value] of Object.entries(yunmuMap)) {
    if (fixed.endsWith(key)) {
      fixed = fixed.slice(0, -key.length) + value;
      break;
    }
  }

  return fixed;
}
