/**
 * 语音合成工具
 * 提供更纯正、更清晰的中文语音朗读功能
 */

import {
  fixPinyinPronunciation,
  fixShengmuForReading,
  fixYunmuForReading,
  fixZhengtiRenyinForReading
} from './pronunciation-fix';

export interface SpeechOptions {
  rate?: number; // 语速：0.1-10，默认0.9（适中，男主播播音标准）
  pitch?: number; // 音调：0-2，默认0.9（低沉，男主播播音标准音调）
  volume?: number; // 音量：0-1，默认1.0（最大音量）
  lang?: string; // 语言，默认'zh-CN'
}

/**
 * 判断语音是否为男声
 * 基于常见的语音命名模式进行判断
 */
function isMaleVoice(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();

  // 明确的男声标识
  const malePatterns = [
    'kangkang',      // Microsoft Kangkang - 男声
    'yaya',          // Microsoft Yaya - 可能是男声（某些版本）
    'xiaoxiao',      // Microsoft Xiaoxiao - 可能是男声（某些版本）
    'male',          // 明确标识为男声
    'man',           // 男声
    'david',         // David - 男声（多语言）
    'daniel',        // Daniel - 男声（多语言）
    'james',         // James - 男声（多语言）
    'mark',          // Mark - 男声（多语言）
    'steve',         // Steve - 男声（多语言）
  ];

  // 检查是否包含男声标识
  if (malePatterns.some(pattern => name.includes(pattern))) {
    return true;
  }

  // Google 语音通常较中性或偏男声
  if (name.includes('google') && !name.includes('女')) {
    return true;
  }

  return false;
}

/**
 * 判断语音是否为女声
 * 基于常见的语音命名模式进行判断
 */
function isFemaleVoice(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name.toLowerCase();

  // 明确的女声标识
  const femalePatterns = [
    'huihui',        // Microsoft Huihui - 女声
    'xiaoxi',        // Microsoft Xiaoxi - 女声
    'lili',          // Lili - 女声
    'mei',           // Mei - 女声
    'tian',          // Tian - 女声
    'liaoxia',       // Liaoxia - 女声
    'yaoyao',        // Microsoft Yaoyao - 通常为女声
    'female',        // 明确标识为女声
    'woman',         // 女声
    'lily',          // Lily - 女声（多语言）
    'jenny',         // Jenny - 女声（多语言）
    'hannah',        // Hannah - 女声（多语言）
    'zira',          // Zira - 女声（多语言）
    'ting',          // Ting-Ting - 女声（macOS）
    'sin-ji',        // Sin-ji - 女声（macOS）
  ];

  return femalePatterns.some(pattern => name.includes(pattern));
}

/**
 * 检查语音是否为日语（严格过滤）
 */
function isJapaneseVoice(voice: SpeechSynthesisVoice): boolean {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();

  // 检查语言标识
  if (lang === 'ja' || lang === 'ja-jp' || lang.startsWith('jpn')) {
    console.log('过滤日语语音（语言标识）:', voice.name, voice.lang);
    return true;
  }

  // 检查语音名称中的日语标识
  const japanesePatterns = [
    'japanese',
    'japan',
    'kyoko',      // Kyoko - 日语语音
    'otoya',      // Otoya - 日语语音
    'ayumi',      // Ayumi - 日语语音
    'haruka',     // Haruka - 日语语音
  ];

  if (japanesePatterns.some(pattern => name.includes(pattern))) {
    console.log('过滤日语语音（名称）:', voice.name, voice.lang);
    return true;
  }

  return false;
}

/**
 * 获取最佳的中文语音（兜底方案 - 强制中文）
 * 严格过滤日语，确保100%使用中文语音
 */
function getBestChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();

  console.log('=== 可用语音列表 ===');
  voices.forEach(v => {
    console.log(`  ${v.name} - ${v.lang}`);
  });
  console.log('==================');

  // 严格过滤日语语音
  const safeVoices = voices.filter(voice => !isJapaneseVoice(voice));
  console.log('过滤后可用语音数量:', safeVoices.length);

  // 优先选择中文语音
  const chineseVoices = safeVoices.filter(
    (voice) => voice.lang.startsWith('zh') || voice.lang.startsWith('cmn')
  );

  if (chineseVoices.length === 0) {
    console.warn('警告：未找到中文语音！');
    return null;
  }

  console.log('找到中文语音数量:', chineseVoices.length);
  chineseVoices.forEach(v => {
    console.log(`  中文语音: ${v.name} - ${v.lang}`);
  });

  // 优先选择中国大陆的语音
  const zhCNVoices = chineseVoices.filter((voice) => voice.lang === 'zh-CN');

  if (zhCNVoices.length > 0) {
    console.log('zh-CN 语音数量:', zhCNVoices.length);

    // 第一优先级：明确的女声
    const femaleVoices = zhCNVoices.filter(isFemaleVoice);
    if (femaleVoices.length > 0) {
      console.log('✅ 选择女声:', femaleVoices[0].name);
      return femaleVoices[0];
    }

    // 第二优先级：返回第一个简体中文语音
    console.log('✅ 选择第一个中文语音:', zhCNVoices[0].name);
    return zhCNVoices[0];
  }

  // 其次选择台湾的语音
  const zhTW = chineseVoices.find((voice) => voice.lang === 'zh-TW');
  if (zhTW) {
    console.log('✅ 选择台湾语音:', zhTW.name);
    return zhTW;
  }

  // 再次选择香港的语音
  const zhHK = chineseVoices.find((voice) => voice.lang === 'zh-HK');
  if (zhHK) {
    console.log('✅ 选择香港语音:', zhHK.name);
    return zhHK;
  }

  // 最后返回第一个中文语音
  console.log('✅ 选择第一个中文语音（其他变体）:', chineseVoices[0].name);
  return chineseVoices[0];
}

/**
 * 朗读文本（女主播播音口音 - 兜底方案）
 * @param text 要朗读的文本
 * @param options 可选参数
 */
export function speakText(text: string, options: SpeechOptions = {}): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  // 停止当前正在朗读的内容
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // 强制设置语言为中文（兜底方案）
  utterance.lang = 'zh-CN';

  // 设置语速（0.85-0.95，适中语速，女主播播音标准）
  utterance.rate = options.rate ?? 0.9;

  // 设置音调（1.1，清亮温柔，女主播播音标准音调）
  utterance.pitch = options.pitch ?? 1.1;

  // 设置音量
  utterance.volume = options.volume ?? 1.0;

  // 选择最佳的中文语音（严格过滤日语）
  const voice = getBestChineseVoice();
  if (voice) {
    utterance.voice = voice;
    console.log('=== 朗读配置 ===');
    console.log('文本:', text);
    console.log('语音:', voice.name);
    console.log('语言:', voice.lang);
    console.log('语速:', utterance.rate);
    console.log('音调:', utterance.pitch);
    console.log('===============');
  } else {
    console.warn('警告：未找到中文语音，使用默认语音！这可能导致发音不正确。');
  }

  // 额外保护：强制确保语言为 zh-CN
  if (utterance.voice && !utterance.voice.lang.startsWith('zh')) {
    console.warn('警告：选中的语音不是中文！尝试重新选择...');
    const zhVoice = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('zh'));
    if (zhVoice) {
      utterance.voice = zhVoice;
      console.log('✅ 已重新选择中文语音:', zhVoice.name);
    }
  }

  // 开始朗读
  window.speechSynthesis.speak(utterance);
}

/**
 * 停止朗读
 */
export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();
}

/**
 * 初始化语音引擎（预加载语音列表）
 * 在页面加载时调用，确保语音列表已加载
 */
export function initSpeechEngine(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // 某些浏览器需要等待语音列表加载完成
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      // 语音列表已加载
    };
  }
}

/**
 * 朗读拼音（女主播播音口音 - 清亮温柔）
 * 使用对应的汉字来朗读拼音的声音，确保发音准确
 */
export function speakPinyin(pinyin: string): void {
  // 修正拼音发音，转换为对应汉字
  const fixedPinyin = fixPinyinPronunciation(pinyin);
  // 拼音朗读时语速适中（0.95），使用女主播播音音调（1.1）
  speakText(fixedPinyin, { rate: 0.95, pitch: 1.1 });
}

/**
 * 朗读声母（使用对应的完整音节 - 女主播播音口音）
 */
export function speakShengmu(shengmu: string): void {
  const fixed = fixShengmuForReading(shengmu);
  speakText(fixed, { rate: 0.95, pitch: 1.1 });
}

/**
 * 朗读韵母（使用零声母规则 - 女主播播音口音）
 */
export function speakYunmu(yunmu: string): void {
  const fixed = fixYunmuForReading(yunmu);
  speakText(fixed, { rate: 0.95, pitch: 1.1 });
}

/**
 * 朗读整体认读音节（女主播播音口音）
 */
export function speakZhengtiRenyin(pinyin: string): void {
  const fixed = fixZhengtiRenyinForReading(pinyin);
  speakText(fixed, { rate: 0.95, pitch: 1.1 });
}

/**
 * 朗读汉字（女主播播音口音 - 清亮温柔）
 */
export function speakHanzi(hanzi: string): void {
  // 汉字朗读时语速适中（0.9），使用女主播播音音调（1.1）
  speakText(hanzi, { rate: 0.9, pitch: 1.1 });
}

/**
 * 朗读诗词（女主播播音口音 - 韵律优美）
 */
export function speakPoem(text: string): void {
  // 诗词朗读时语速稍慢（0.85），更有韵律感，使用女主播播音音调（1.1）
  speakText(text, { rate: 0.85, pitch: 1.1 });
}

/**
 * 朗读鼓励语（女主播播音口音 - 温暖有力）
 */
export function speakEncouragement(text: string): void {
  // 鼓励语朗读时语速适中（0.9），使用女主播播音音调（1.1）
  speakText(text, { rate: 0.9, pitch: 1.1 });
}
