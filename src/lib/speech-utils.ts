/**
 * 语音合成工具
 * 提供更纯正、更清晰的中文语音朗读功能
 */

import { fixPinyinPronunciation } from './pronunciation-fix';

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
 * 获取最佳的中文语音（男主播播音口音）
 * 优先选择低沉、清晰、有磁性的男声
 */
function getBestChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();

  // 优先选择中文语音
  const chineseVoices = voices.filter(
    (voice) => voice.lang.startsWith('zh') || voice.lang.startsWith('cmn')
  );

  if (chineseVoices.length === 0) {
    return null;
  }

  // 优先选择中国大陆的语音
  const zhCNVoices = chineseVoices.filter((voice) => voice.lang === 'zh-CN');

  if (zhCNVoices.length > 0) {
    // 第一优先级：明确的男声
    const maleVoices = zhCNVoices.filter(isMaleVoice);
    if (maleVoices.length > 0) {
      console.log('选择男声:', maleVoices[0].name);
      return maleVoices[0];
    }

    // 第二优先级：非女声（中性或未知的）
    const nonFemaleVoices = zhCNVoices.filter(voice => !isFemaleVoice(voice));
    if (nonFemaleVoices.length > 0) {
      console.log('选择非女声:', nonFemaleVoices[0].name);
      return nonFemaleVoices[0];
    }

    // 第三优先级：返回第一个简体中文语音（即使可能是女声）
    console.log('选择第一个中文语音:', zhCNVoices[0].name);
    return zhCNVoices[0];
  }

  // 其次选择台湾的语音
  const zhTW = chineseVoices.find((voice) => voice.lang === 'zh-TW');
  if (zhTW) return zhTW;

  // 再次选择香港的语音
  const zhHK = chineseVoices.find((voice) => voice.lang === 'zh-HK');
  if (zhHK) return zhHK;

  // 最后返回第一个中文语音
  return chineseVoices[0];
}

/**
 * 朗读文本（男主播播音口音）
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

  // 设置语言（默认中文）
  utterance.lang = options.lang || 'zh-CN';

  // 设置语速（0.85-0.95，适中语速，男主播播音标准）
  utterance.rate = options.rate ?? 0.9;

  // 设置音调（0.9，低沉专业，男主播播音标准音调）
  utterance.pitch = options.pitch ?? 0.9;

  // 设置音量
  utterance.volume = options.volume ?? 1.0;

  // 选择最佳的中文语音（男主播风格）
  const voice = getBestChineseVoice();
  if (voice) {
    utterance.voice = voice;
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
 * 朗读拼音（男主播播音口音 - 清晰有力）
 * 自动修正发音问题
 */
export function speakPinyin(pinyin: string): void {
  // 修正拼音发音
  const fixedPinyin = fixPinyinPronunciation(pinyin);
  // 拼音朗读时语速稍快（0.95），使用男主播播音音调（0.9）
  speakText(fixedPinyin, { rate: 0.95, pitch: 0.9 });
}

/**
 * 朗读汉字（男主播播音口音 - 稳重清晰）
 */
export function speakHanzi(hanzi: string): void {
  // 汉字朗读时语速适中（0.9），使用男主播播音音调（0.9）
  speakText(hanzi, { rate: 0.9, pitch: 0.9 });
}

/**
 * 朗读诗词（男主播播音口音 - 韵律优美）
 */
export function speakPoem(text: string): void {
  // 诗词朗读时语速稍慢（0.85），更有韵律感，使用男主播播音音调（0.9）
  speakText(text, { rate: 0.85, pitch: 0.9 });
}

/**
 * 朗读鼓励语（男主播播音口音 - 温暖有力）
 */
export function speakEncouragement(text: string): void {
  // 鼓励语朗读时语速适中（0.9），使用男主播播音音调（0.9）
  speakText(text, { rate: 0.9, pitch: 0.9 });
}
