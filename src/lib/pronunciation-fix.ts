/**
 * 发音修正工具
 * 用于修正多音字和容易读错的汉字
 */

/**
 * 拼音到汉字的映射表
 * 使用汉字来朗读拼音的声音，确保 TTS 引擎正确识别为中文发音
 */
export const PINYIN_TO_HANZI_MAP: Record<string, string> = {
  // 单韵母 - 使用代表性汉字
  'a': '阿',    // ā
  'o': '喔',    // ō
  'e': '鹅',    // é
  'i': '衣',    // yī
  'u': '乌',    // wū
  'v': '迂',    // yū
  'ü': '迂',    // yū

  // 声母 - 使用对应音节的汉字
  'b': '玻',    // bō
  'p': '坡',    // pō
  'm': '摸',    // mō
  'f': '佛',    // fó
  'd': '得',    // dé
  't': '特',    // tè
  'n': '讷',    // nè
  'l': '勒',    // lè
  'g': '哥',    // gē
  'k': '科',    // kē
  'h': '喝',    // hē
  'j': '基',    // jī
  'q': '期',    // qī
  'x': '希',    // xī
  'zh': '知',   // zhī
  'ch': '吃',   // chī
  'sh': '诗',   // shī
  'r': '日',    // rì
  'z': '资',    // zī
  'c': '刺',    // cī
  's': '思',    // sī
  'y': '衣',    // yī
  'w': '乌',    // wū

  // 复韵母 - 使用代表性汉字
  'ai': '哀',   // āi
  'ei': '诶',   // ēi
  'ui': '威',   // wēi
  'ao': '奥',   // ào
  'ou': '欧',   // ōu
  'iu': '优',   // yōu
  'ie': '耶',   // yé
  'üe': '约',   // yuē
  'er': '儿',   // ér

  // 鼻韵母 - 使用代表性汉字
  'an': '安',   // ān
  'en': '恩',   // ēn
  'in': '音',   // yīn
  'un': '温',   // wēn
  'ün': '晕',   // yūn
  'ang': '昂',  // áng
  'eng': '亨',  // hēng
  'ing': '英',  // yīng
  'ong': '轰',  // hōng

  // 整体认读音节 - 使用代表性汉字
  'zhi': '知',  // zhī
  'chi': '吃',  // chī
  'shi': '诗',  // shī
  'ri': '日',   // rì
  'zi': '资',   // zī
  'ci': '刺',   // cī
  'si': '思',   // sī
  'yi': '衣',   // yī
  'wu': '乌',   // wū
  'yu': '迂',   // yū
  'yue': '约',  // yuē
  'yuan': '冤', // yuān
  'yin': '音',  // yīn
  'yun': '晕',  // yūn
  'ying': '英', // yīng

  // 常用音节 - 使用代表性汉字
  'ba': '八',   // bā
  'bo': '波',   // bō
  'bai': '白',  // bái
  'bei': '北',  // běi
  'bao': '包',  // bāo
  'ban': '班',  // bān
  'ben': '本',  // běn
  'bang': '帮', // bāng
  'beng': '崩', // bēng
  'biao': '标', // biāo
  'bian': '边', // biān
  'bing': '冰', // bīng

  'pa': '趴',   // pā
  'po': '坡',   // pō
  'pai': '拍',  // pāi
  'pei': '配',  // pèi
  'pao': '跑',  // pǎo
  'pan': '盘',  // pán
  'pen': '盆',  // pén
  'pang': '胖', // pàng
  'peng': '朋', // péng
  'piao': '飘', // piāo
  'pian': '偏', // piān
  'pin': '拼',  // pīn
  'ping': '平', // píng

  'ma': '妈',   // mā
  'mo': '摸',   // mō
  'mai': '买',  // mǎi
  'mei': '美',  // měi
  'mao': '猫',  // māo
  'man': '满',  // mǎn
  'men': '门',  // mén
  'mang': '忙', // máng
  'meng': '梦', // mèng
  'miao': '苗', // miáo
  'mian': '面', // miàn
  'min': '民',  // mín
  'ming': '明', // míng

  'fa': '发',   // fā
  'fo': '佛',   // fó
  'fei': '飞',  // fēi
  'fou': '否',  // fǒu
  'fan': '饭',  // fàn
  'fen': '分',  // fēn
  'fang': '方', // fāng
  'feng': '风', // fēng
  'fu': '福',   // fú

  'da': '大',   // dà
  'de': '得',   // dé
  'dai': '带',  // dài
  'dei': '得',  // děi
  'dao': '到',  // dào
  'dan': '单',  // dān
  'den': '扽',  // dèn
  'dang': '当', // dāng
  'deng': '等', // děng
  'diao': '掉', // diào
  'dian': '点', // diǎn
  'du': '都',   // dū
  'duo': '多',  // duō
  'dui': '对',  // duì
  'duan': '段', // duàn
  'dun': '顿',  // dùn
  'dong': '东', // dōng

  'ta': '他',   // tā
  'te': '特',   // tè
  'tai': '太',  // tài
  'tei': '忒',  // tuī
  'tao': '逃',  // táo
  'tan': '谈',  // tán
  'tang': '糖', // táng
  'teng': '疼', // téng
  'tiao': '跳', // tiào
  'tian': '天', // tiān
  'tu': '土',   // tǔ
  'tuo': '脱',  // tuō
  'tui': '退',  // tuì
  'tuan': '团', // tuán
  'tun': '吞',  // tūn
  'tong': '同', // tóng

  'na': '那',   // nà
  'ne': '呢',   // ne
  'nai': '耐',  // nài
  'nei': '内',  // nèi
  'nao': '脑',  // nǎo
  'nan': '难',  // nán
  'nen': '嫩',  // nèn
  'nang': '囊', // náng
  'neng': '能', // néng
  'niao': '鸟', // niǎo
  'nian': '年', // nián
  'nin': '您',  // nín
  'niang': '娘',// niáng
  'nu': '奴',   // nú
  'nuo': '挪',  // nuó
  'nuan': '暖', // nuǎn
  'nong': '农', // nóng

  'la': '拉',   // lā
  'le': '乐',   // lè
  'lai': '来',  // lái
  'lei': '雷',  // léi
  'lao': '老',  // lǎo
  'lan': '蓝',  // lán
  'len': '肋',  // lèi
  'lang': '狼', // láng
  'leng': '冷', // lěng
  'liao': '聊', // liáo
  'lian': '连', // lián
  'liang': '凉',// liáng
  'lu': '路',   // lù
  'luo': '罗',  // luó
  'luan': '乱', // luàn
  'lun': '论',  // lùn
  'long': '龙', // lóng

  'ga': '嘎',   // gā
  'ge': '哥',   // gē
  'gai': '改',  // gǎi
  'gei': '给',  // gěi
  'gao': '高',  // gāo
  'gan': '干',  // gān
  'gen': '跟',  // gēn
  'gang': '刚', // gāng
  'geng': '更', // gèng
  'gu': '古',   // gǔ
  'guo': '过',  // guò
  'gui': '鬼',  // guǐ
  'guan': '官', // guān
  'gun': '滚',  // gǔn
  'guang': '光',// guāng

  'ka': '卡',   // kǎ
  'ke': '可',   // kě
  'kai': '开',  // kāi
  'kei': '尅',  // kēi
  'kao': '考',  // kǎo
  'kan': '看',  // kàn
  'ken': '肯',  // kěn
  'kang': '康', // kāng
  'keng': '坑', // kēng
  'ku': '苦',   // kǔ
  'kuo': '阔',  // kuò
  'kui': '亏',  // kuī
  'kuan': '宽', // kuān
  'kun': '困',  // kùn
  'kuang': '狂',// kuáng

  'ha': '哈',   // hā
  'he': '喝',   // hē
  'hai': '海',  // hǎi
  'hei': '黑',  // hēi
  'hao': '好',  // hǎo
  'han': '汉',  // hàn
  'hen': '很',  // hěn
  'hang': '航', // háng
  'heng': '横', // héng
  'hu': '虎',   // hǔ
  'huo': '火',  // huǒ
  'hui': '回',  // huí
  'huan': '欢', // huān
  'hun': '婚',  // hūn
  'huang': '黄',// huáng

  'jia': '家',  // jiā
  'jiao': '交', // jiāo
  'jian': '间', // jiān
  'jiang': '江',// jiāng
  'ju': '句',   // jù
  'jue': '觉',  // jué
  'juan': '卷', // juǎn
  'jun': '军',  // jūn
  'jie': '接',  // jiē

  'qia': '恰',  // qià
  'qiao': '敲', // qiāo
  'qian': '千', // qiān
  'qiang': '强',// qiáng
  'qu': '去',   // qù
  'que': '缺',  // quē
  'quan': '全', // quán
  'qun': '群',  // qún
  'qie': '切',  // qiè

  'xia': '夏',  // xià
  'xiao': '小', // xiǎo
  'xian': '先', // xiān
  'xiang': '相',// xiāng
  'xu': '需',   // xū
  'xue': '学',  // xué
  'xuan': '选', // xuǎn
  'xun': '训',  // xùn
  'xie': '谢',  // xiè

  'zha': '扎',  // zhā
  'zhai': '宅', // zhái
  'zhao': '找', // zhǎo
  'zhan': '站', // zhàn
  'zhang': '长',// zhǎng
  'zhe': '这',  // zhè
  'zhei': '这', // zhèi
  'zhen': '真', // zhēn
  'zheng': '正',// zhèng
  'zhu': '主',  // zhǔ
  'zhuo': '桌', // zhuō
  'zhui': '追', // zhuī
  'zhuan': '转',// zhuǎn
  'zhun': '准', // zhǔn
  'zhuang': '庄',// zhuāng

  'cha': '查',  // chá
  'chai': '拆', // chāi
  'chao': '吵', // chǎo
  'chan': '产', // chǎn
  'chang': '长',// cháng
  'che': '车',  // chē
  'chen': '陈', // chén
  'cheng': '成',// chéng
  'chu': '出',  // chū
  'chuo': '戳', // chuō
  'chui': '吹', // chuī
  'chuan': '船',// chuán
  'chun': '春', // chūn
  'chuang': '床',// chuáng

  'sha': '沙',  // shā
  'shai': '晒', // shài
  'shao': '少', // shǎo
  'shan': '山', // shān
  'shang': '上',// shàng
  'she': '设',  // shè
  'shei': '谁', // shéi
  'shen': '身', // shēn
  'sheng': '生',// shēng
  'shu': '书',  // shū
  'shuo': '说', // shuō
  'shui': '水', // shuǐ
  'shuan': '栓',// shuān
  'shun': '顺', // shùn
  'shuang': '双',// shuāng

  're': '热',   // rè
  'ren': '人',  // rén
  'reng': '仍', // réng
  'ru': '入',   // rù
  'ruo': '若',  // ruò
  'rui': '锐',  // ruì
  'ruan': '软', // ruǎn
  'run': '润',  // rùn
  'rang': '让', // ràng

  'za': '杂',   // zá
  'zai': '在',  // zài
  'zao': '早',  // zǎo
  'zan': '赞',  // zàn
  'zang': '藏', // zàng
  'ze': '则',   // zé
  'zei': '贼',  // zéi
  'zen': '怎',  // zěn
  'zeng': '增', // zēng
  'zu': '组',   // zǔ
  'zuo': '作',  // zuò
  'zui': '最',  // zuì
  'zuan': '钻', // zuān
  'zun': '尊',  // zūn

  'ca': '擦',   // cā
  'cai': '菜',  // cài
  'cao': '草',  // cǎo
  'can': '参',  // cān
  'cang': '藏', // cáng
  'ce': '册',   // cè
  'cei': '嘬',  // cuō
  'cen': '参',  // cēn
  'ceng': '层', // céng
  'cu': '促',   // cù
  'cuo': '错',  // cuò
  'cui': '翠',  // cuì
  'cuan': '窜', // cuàn
  'cun': '存',  // cún

  'sa': '撒',   // sā
  'sai': '赛',  // sài
  'sao': '扫',  // sǎo
  'san': '三',  // sān
  'sang': '丧', // sàng
  'se': '色',   // sè
  'sei': '谁',  // shéi
  'sen': '森',  // sēn
  'seng': '僧', // sēng
  'su': '苏',   // sū
  'suo': '所',  // suǒ
  'sui': '随',  // suí
  'suan': '酸', // suān
  'sun': '孙',  // sūn

  // 特殊组合
  'ia': '呀',   // ya
  'iao': '腰',  // yāo
  'ian': '烟',  // yān
  'iang': '扬', // yáng
  'iong': '勇', // yǒng
  'ua': '娃',   // wá
  'uai': '歪',  // wāi
  'uan': '弯',  // wān
  'uang': '汪', // wāng
  'üan': '冤',  // yuān
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
    'b': '玻',    // bō
    'p': '坡',    // pō
    'm': '摸',    // mō
    'f': '佛',    // fó
    'd': '得',    // dé
    't': '特',    // tè
    'n': '讷',    // nè
    'l': '勒',    // lè
    'g': '哥',    // gē
    'k': '科',    // kē
    'h': '喝',    // hē
    'j': '基',    // jī
    'q': '期',    // qī
    'x': '希',    // xī
    'zh': '知',   // zhī
    'ch': '吃',   // chī
    'sh': '诗',   // shī
    'r': '日',    // rì
    'z': '资',    // zī
    'c': '刺',    // cī
    's': '思',    // sī
    'y': '衣',    // yī
    'w': '乌',    // wū
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

  // 7. 使用拼音到汉字的映射表，确保 TTS 正确识别为中文发音
  const hanzi = PINYIN_TO_HANZI_MAP[fixed];
  if (hanzi) {
    console.log(`拼音朗读: ${pinyin} -> ${fixed} -> ${hanzi}`);
    return hanzi;
  }

  // 8. 如果映射表中没有，返回修正后的拼音
  console.log(`拼音朗读: ${pinyin} -> ${fixed} (无汉字映射)`);
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
 * 整体认读音节直接朗读即可，但要确保使用汉字映射
 */
export function fixZhengtiRenyinForReading(pinyin: string): string {
  // 整体认读音节通常是完整的拼音，使用标准修正
  // 这样会转换为对应的汉字，确保发音准确
  return fixPinyinPronunciation(pinyin);
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
 * 检查拼音是否可以朗读（是否在汉字映射表中）
 */
export function isPinyinReadable(pinyin: string): boolean {
  if (!pinyin) return false;

  // 移除声调后的版本
  const withoutTones = removeTones(pinyin).toLowerCase();

  // 检查是否在汉字映射表中
  if (PINYIN_TO_HANZI_MAP[withoutTones]) {
    return true;
  }

  // 检查是否是有效的拼音字母组合
  const validPattern = /^[a-zü]+$/;
  if (!validPattern.test(withoutTones)) {
    return false;
  }

  return true;
}
