// 百家姓数据
// 经典姓氏文献，记录中华姓氏

export interface BaijiaxingSection {
  id: string;
  title: string;
  surnames: BaijiaxingSurname[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

export interface BaijiaxingSurname {
  surname: string;
  pinyin: string;
  level: 'basic' | 'intermediate' | 'advanced';
  notable: string[]; // 历史名人
  meaning: string;
}

// 百家姓完整数据（全文共60段，每段8个姓氏）
export const baijiaxingSections: BaijiaxingSection[] = [
  // 第一段：常见大姓
  {
    id: 'section-1',
    title: '赵钱孙李',
    difficulty: 'basic',
    surnames: [
      { surname: '赵', pinyin: 'zhào', level: 'basic', notable: ['赵匡胤', '赵云'], meaning: '战国时期赵国' },
      { surname: '钱', pinyin: 'qián', level: 'basic', notable: ['钱学森', '钱三强'], meaning: '钱币' },
      { surname: '孙', pinyin: 'sūn', level: 'basic', notable: ['孙武', '孙悟空'], meaning: '孙子' },
      { surname: '李', pinyin: 'lǐ', level: 'basic', notable: ['李白', '李世民'], meaning: '李树' },
      { surname: '周', pinyin: 'zhōu', level: 'basic', notable: ['周恩来', '周瑜'], meaning: '周朝' },
      { surname: '吴', pinyin: 'wú', level: 'basic', notable: ['吴承恩', '吴起'], meaning: '吴国' },
      { surname: '郑', pinyin: 'zhèng', level: 'basic', notable: ['郑和', '郑成功'], meaning: '郑国' },
      { surname: '王', pinyin: 'wáng', level: 'basic', notable: ['王维', '王安石'], meaning: '君王' },
    ]
  },
  // 第二段：常见姓氏
  {
    id: 'section-2',
    title: '冯陈褚卫',
    difficulty: 'basic',
    surnames: [
      { surname: '冯', pinyin: 'féng', level: 'basic', notable: ['冯梦龙'], meaning: '凭仗' },
      { surname: '陈', pinyin: 'chén', level: 'basic', notable: ['陈胜', '陈景润'], meaning: '陈国' },
      { surname: '褚', pinyin: 'chǔ', level: 'intermediate', notable: ['褚遂良'], meaning: '姓氏' },
      { surname: '卫', pinyin: 'wèi', level: 'basic', notable: ['卫青', '卫夫人'], meaning: '卫国' },
      { surname: '蒋', pinyin: 'jiǎng', level: 'basic', notable: ['蒋介石', '蒋干'], meaning: '地名' },
      { surname: '沈', pinyin: 'shěn', level: 'basic', notable: ['沈括', '沈万三'], meaning: '沈水' },
      { surname: '韩', pinyin: 'hán', level: 'basic', notable: ['韩愈', '韩非子'], meaning: '韩国' },
      { surname: '杨', pinyin: 'yáng', level: 'basic', notable: ['杨贵妃', '杨万里'], meaning: '杨树' },
    ]
  },
  // 第三段：常见姓氏
  {
    id: 'section-3',
    title: '朱秦尤许',
    difficulty: 'basic',
    surnames: [
      { surname: '朱', pinyin: 'zhū', level: 'basic', notable: ['朱元璋', '朱熹'], meaning: '朱红色' },
      { surname: '秦', pinyin: 'qín', level: 'basic', notable: ['秦始皇', '秦琼'], meaning: '秦朝' },
      { surname: '尤', pinyin: 'yóu', level: 'intermediate', notable: ['尤袤'], meaning: '姓氏' },
      { surname: '许', pinyin: 'xǔ', level: 'basic', notable: ['许广平', '许慎'], meaning: '许国' },
      { surname: '何', pinyin: 'hé', level: 'basic', notable: ['何晏'], meaning: '姓氏' },
      { surname: '吕', pinyin: 'lǚ', level: 'basic', notable: ['吕不韦', '吕洞宾'], meaning: '姓氏' },
      { surname: '施', pinyin: 'shī', level: 'basic', notable: ['施耐庵'], meaning: '施行' },
      { surname: '张', pinyin: 'zhāng', level: 'basic', notable: ['张飞', '张骞'], meaning: '张开' },
    ]
  },
  // 第四段：常见姓氏
  {
    id: 'section-4',
    title: '孔曹严华',
    difficulty: 'basic',
    surnames: [
      { surname: '孔', pinyin: 'kǒng', level: 'basic', notable: ['孔子', '孔明'], meaning: '孔洞' },
      { surname: '曹', pinyin: 'cáo', level: 'basic', notable: ['曹操', '曹雪芹'], meaning: '曹国' },
      { surname: '严', pinyin: 'yán', level: 'basic', notable: ['严嵩'], meaning: '严厉' },
      { surname: '华', pinyin: 'huà', level: 'basic', notable: ['华佗', '华罗庚'], meaning: '华丽' },
      { surname: '金', pinyin: 'jīn', level: 'basic', notable: ['金圣叹'], meaning: '金属' },
      { surname: '魏', pinyin: 'wèi', level: 'basic', notable: ['魏征', '魏伯阳'], meaning: '魏国' },
      { surname: '陶', pinyin: 'táo', level: 'basic', notable: ['陶渊明'], meaning: '陶器' },
      { surname: '姜', pinyin: 'jiāng', level: 'basic', notable: ['姜子牙'], meaning: '生姜' },
    ]
  },
  // 第五段：常见姓氏
  {
    id: 'section-5',
    title: '戚谢邹喻',
    difficulty: 'basic',
    surnames: [
      { surname: '戚', pinyin: 'qī', level: 'intermediate', notable: ['戚继光'], meaning: '兵器' },
      { surname: '谢', pinyin: 'xiè', level: 'basic', notable: ['谢安', '谢灵运'], meaning: '谢国' },
      { surname: '邹', pinyin: 'zōu', level: 'intermediate', notable: ['邹忌'], meaning: '邹国' },
      { surname: '喻', pinyin: 'yù', level: 'intermediate', notable: ['喻皓'], meaning: '比喻' },
      { surname: '柏', pinyin: 'bǎi', level: 'basic', notable: ['柏拉图'], meaning: '柏树' },
      { surname: '水', pinyin: 'shuǐ', level: 'basic', notable: ['水镜'], meaning: '水流' },
      { surname: '窦', pinyin: 'dòu', level: 'advanced', notable: ['窦武'], meaning: '孔洞' },
      { surname: '章', pinyin: 'zhāng', level: 'basic', notable: ['章太炎'], meaning: '文章' },
    ]
  },
  // 第六段：常见姓氏
  {
    id: 'section-6',
    title: '云苏潘葛',
    difficulty: 'basic',
    surnames: [
      { surname: '云', pinyin: 'yún', level: 'basic', notable: ['云长'], meaning: '云彩' },
      { surname: '苏', pinyin: 'sū', level: 'basic', notable: ['苏轼', '苏武'], meaning: '苏国' },
      { surname: '潘', pinyin: 'pān', level: 'basic', notable: ['潘安', '潘金莲'], meaning: '姓氏' },
      { surname: '葛', pinyin: 'gě', level: 'basic', notable: ['葛洪'], meaning: '藤葛' },
      { surname: '奚', pinyin: 'xī', level: 'intermediate', notable: ['奚仲'], meaning: '奴隶' },
      { surname: '范', pinyin: 'fàn', level: 'basic', notable: ['范仲淹', '范蠡'], meaning: '模范' },
      { surname: '彭', pinyin: 'péng', level: 'basic', notable: ['彭祖'], meaning: '彭国' },
      { surname: '郎', pinyin: 'láng', level: 'basic', notable: ['郎朗'], meaning: '男子' },
    ]
  },
  // 第七段：常见姓氏
  {
    id: 'section-7',
    title: '鲁韦昌马',
    difficulty: 'basic',
    surnames: [
      { surname: '鲁', pinyin: 'lǔ', level: 'basic', notable: ['鲁迅', '鲁班'], meaning: '鲁国' },
      { surname: '韦', pinyin: 'wéi', level: 'intermediate', notable: ['韦应物'], meaning: '皮革' },
      { surname: '昌', pinyin: 'chāng', level: 'basic', notable: ['昌意'], meaning: '昌盛' },
      { surname: '马', pinyin: 'mǎ', level: 'basic', notable: ['马援', '马致远'], meaning: '马匹' },
      { surname: '苗', pinyin: 'miáo', level: 'basic', notable: ['苗沛'], meaning: '禾苗' },
      { surname: '凤', pinyin: 'fèng', level: 'basic', notable: ['凤姐'], meaning: '凤凰' },
      { surname: '花', pinyin: 'huā', level: 'basic', notable: ['花木兰'], meaning: '花朵' },
      { surname: '方', pinyin: 'fāng', level: 'basic', notable: ['方腊'], meaning: '方形' },
    ]
  },
  // 第八段：常见姓氏
  {
    id: 'section-8',
    title: '俞任袁柳',
    difficulty: 'basic',
    surnames: [
      { surname: '俞', pinyin: 'yú', level: 'intermediate', notable: ['俞伯牙'], meaning: '应允' },
      { surname: '任', pinyin: 'rén', level: 'basic', notable: ['任正非'], meaning: '任命' },
      { surname: '袁', pinyin: 'yuán', level: 'basic', notable: ['袁世凯', '袁隆平'], meaning: '长袍' },
      { surname: '柳', pinyin: 'liǔ', level: 'basic', notable: ['柳宗元'], meaning: '柳树' },
      { surname: '酆', pinyin: 'fēng', level: 'advanced', notable: ['酆都'], meaning: '地名' },
      { surname: '鲍', pinyin: 'bào', level: 'intermediate', notable: ['鲍叔牙'], meaning: '鲍鱼' },
      { surname: '史', pinyin: 'shǐ', level: 'basic', notable: ['司马迁', '史可法'], meaning: '历史' },
      { surname: '唐', pinyin: 'táng', level: 'basic', notable: ['唐僧', '唐寅'], meaning: '唐朝' },
    ]
  },
  // 第九段：常见姓氏
  {
    id: 'section-9',
    title: '费廉岑薛',
    difficulty: 'intermediate',
    surnames: [
      { surname: '费', pinyin: 'fèi', level: 'basic', notable: ['费孝通'], meaning: '姓氏' },
      { surname: '廉', pinyin: 'lián', level: 'basic', notable: ['廉颇'], meaning: '廉洁' },
      { surname: '岑', pinyin: 'cén', level: 'advanced', notable: ['岑参'], meaning: '小山' },
      { surname: '薛', pinyin: 'xuē', level: 'basic', notable: ['薛仁贵'], meaning: '薛国' },
      { surname: '雷', pinyin: 'léi', level: 'basic', notable: ['雷锋'], meaning: '雷声' },
      { surname: '贺', pinyin: 'hè', level: 'basic', notable: ['贺龙'], meaning: '祝贺' },
      { surname: '倪', pinyin: 'ní', level: 'intermediate', notable: ['倪瓒'], meaning: '姓氏' },
      { surname: '汤', pinyin: 'tāng', level: 'basic', notable: ['汤显祖'], meaning: '汤水' },
    ]
  },
  // 第十段：常见姓氏
  {
    id: 'section-10',
    title: '滕殷罗毕',
    difficulty: 'intermediate',
    surnames: [
      { surname: '滕', pinyin: 'téng', level: 'intermediate', notable: ['滕王'], meaning: '滕国' },
      { surname: '殷', pinyin: 'yīn', level: 'intermediate', notable: ['殷商'], meaning: '殷商' },
      { surname: '罗', pinyin: 'luó', level: 'basic', notable: ['罗贯中', '罗大佑'], meaning: '罗网' },
      { surname: '毕', pinyin: 'bì', level: 'basic', notable: ['毕昇'], meaning: '完毕' },
      { surname: '郝', pinyin: 'hǎo', level: 'intermediate', notable: ['郝懿行'], meaning: '姓氏' },
      { surname: '邬', pinyin: 'wū', level: 'advanced', notable: ['邬思道'], meaning: '地名' },
      { surname: '安', pinyin: 'ān', level: 'basic', notable: ['安禄山'], meaning: '平安' },
      { surname: '常', pinyin: 'cháng', level: 'basic', notable: ['常遇春'], meaning: '经常' },
    ]
  },
  // 第十一段：常见姓氏
  {
    id: 'section-11',
    title: '乐于时傅',
    difficulty: 'intermediate',
    surnames: [
      { surname: '乐', pinyin: 'lè', level: 'basic', notable: ['乐毅'], meaning: '快乐' },
      { surname: '于', pinyin: 'yú', level: 'basic', notable: ['于谦'], meaning: '姓氏' },
      { surname: '时', pinyin: 'shí', level: 'basic', notable: ['时迁'], meaning: '时间' },
      { surname: '傅', pinyin: 'fù', level: 'intermediate', notable: ['傅说'], meaning: '师傅' },
      { surname: '皮', pinyin: 'pí', level: 'basic', notable: ['皮日休'], meaning: '皮毛' },
      { surname: '卞', pinyin: 'biàn', level: 'advanced', notable: ['卞玉京'], meaning: '急躁' },
      { surname: '齐', pinyin: 'qí', level: 'basic', notable: ['齐白石', '齐桓公'], meaning: '齐国' },
      { surname: '康', pinyin: 'kāng', level: 'basic', notable: ['康有为'], meaning: '健康' },
    ]
  },
  // 第十二段：常见姓氏
  {
    id: 'section-12',
    title: '伍余元卜',
    difficulty: 'intermediate',
    surnames: [
      { surname: '伍', pinyin: 'wǔ', level: 'basic', notable: ['伍子胥'], meaning: '五' },
      { surname: '余', pinyin: 'yú', level: 'basic', notable: ['余秋雨'], meaning: '剩余' },
      { surname: '元', pinyin: 'yuán', level: 'basic', notable: ['元稹'], meaning: '元始' },
      { surname: '卜', pinyin: 'bǔ', level: 'advanced', notable: ['卜商'], meaning: '占卜' },
      { surname: '顾', pinyin: 'gù', level: 'basic', notable: ['顾炎武', '顾恺之'], meaning: '回头看' },
      { surname: '孟', pinyin: 'mèng', level: 'basic', notable: ['孟子'], meaning: '孟母' },
      { surname: '平', pinyin: 'píng', level: 'basic', notable: ['平原君'], meaning: '平坦' },
      { surname: '黄', pinyin: 'huáng', level: 'basic', notable: ['黄庭坚', '黄帝'], meaning: '黄色' },
    ]
  },
  // 第十三段：常见姓氏
  {
    id: 'section-13',
    title: '和穆萧尹',
    difficulty: 'intermediate',
    surnames: [
      { surname: '和', pinyin: 'hé', level: 'basic', notable: ['和珅'], meaning: '和谐' },
      { surname: '穆', pinyin: 'mù', level: 'intermediate', notable: ['穆桂英'], meaning: '庄重' },
      { surname: '萧', pinyin: 'xiāo', level: 'basic', notable: ['萧何', '萧红'], meaning: '萧瑟' },
      { surname: '尹', pinyin: 'yǐn', level: 'intermediate', notable: ['尹吉甫'], meaning: '治理' },
      { surname: '姚', pinyin: 'yáo', level: 'basic', notable: ['姚明'], meaning: '姚国' },
      { surname: '邵', pinyin: 'shào', level: 'intermediate', notable: ['邵雍'], meaning: '邵国' },
      { surname: '湛', pinyin: 'zhàn', level: 'advanced', notable: ['湛若水'], meaning: '深沉' },
      { surname: '汪', pinyin: 'wāng', level: 'basic', notable: ['汪伦', '汪精卫'], meaning: '水深' },
    ]
  },
  // 第十四段：常见姓氏
  {
    id: 'section-14',
    title: '祁毛禹狄',
    difficulty: 'intermediate',
    surnames: [
      { surname: '祁', pinyin: 'qí', level: 'advanced', notable: ['祁奚'], meaning: '祁国' },
      { surname: '毛', pinyin: 'máo', level: 'basic', notable: ['毛泽东'], meaning: '毛皮' },
      { surname: '禹', pinyin: 'yǔ', level: 'basic', notable: ['大禹'], meaning: '夏禹' },
      { surname: '狄', pinyin: 'dí', level: 'advanced', notable: ['狄仁杰'], meaning: '北方部落' },
      { surname: '米', pinyin: 'mǐ', level: 'basic', notable: ['米芾'], meaning: '粮食' },
      { surname: '贝', pinyin: 'bèi', level: 'basic', notable: ['贝聿铭'], meaning: '贝壳' },
      { surname: '明', pinyin: 'míng', level: 'basic', notable: ['明太祖'], meaning: '明亮' },
      { surname: '臧', pinyin: 'zāng', level: 'advanced', notable: ['臧克家'], meaning: '姓氏' },
    ]
  },
  // 第十五段：常见姓氏
  {
    id: 'section-15',
    title: '计伏成戴',
    difficulty: 'intermediate',
    surnames: [
      { surname: '计', pinyin: 'jì', level: 'basic', notable: ['计然'], meaning: '计算' },
      { surname: '伏', pinyin: 'fú', level: 'intermediate', notable: ['伏羲'], meaning: '埋伏' },
      { surname: '成', pinyin: 'chéng', level: 'basic', notable: ['成吉思汗'], meaning: '成功' },
      { surname: '戴', pinyin: 'dài', level: 'basic', notable: ['戴高乐'], meaning: '佩戴' },
      { surname: '谈', pinyin: 'tán', level: 'basic', notable: ['谭嗣同'], meaning: '谈论' },
      { surname: '宋', pinyin: 'sòng', level: 'basic', notable: ['宋庆龄', '宋江'], meaning: '宋朝' },
      { surname: '茅', pinyin: 'máo', level: 'basic', notable: ['茅盾'], meaning: '茅屋' },
      { surname: '庞', pinyin: 'páng', level: 'intermediate', notable: ['庞统'], meaning: '广大' },
    ]
  },
  // 第十六段
  {
    id: 'section-16',
    title: '熊纪舒屈',
    difficulty: 'intermediate',
    surnames: [
      { surname: '熊', pinyin: 'xióng', level: 'basic', notable: ['熊十力'], meaning: '熊类' },
      { surname: '纪', pinyin: 'jì', level: 'basic', notable: ['纪晓岚'], meaning: '纪律' },
      { surname: '舒', pinyin: 'shū', level: 'intermediate', notable: ['舒庆春'], meaning: '舒适' },
      { surname: '屈', pinyin: 'qū', level: 'basic', notable: ['屈原'], meaning: '弯曲' },
      { surname: '项', pinyin: 'xiàng', level: 'basic', notable: ['项羽'], meaning: '项目' },
      { surname: '祝', pinyin: 'zhù', level: 'basic', notable: ['祝英台'], meaning: '祝愿' },
      { surname: '董', pinyin: 'dǒng', level: 'basic', notable: ['董存瑞'], meaning: '董事' },
      { surname: '梁', pinyin: 'liáng', level: 'basic', notable: ['梁启超'], meaning: '桥梁' },
    ]
  },
  // 第十七段
  {
    id: 'section-17',
    title: '杜阮蓝闵',
    difficulty: 'intermediate',
    surnames: [
      { surname: '杜', pinyin: 'dù', level: 'basic', notable: ['杜甫'], meaning: '杜绝' },
      { surname: '阮', pinyin: 'ruǎn', level: 'intermediate', notable: ['阮籍'], meaning: '姓氏' },
      { surname: '蓝', pinyin: 'lán', level: 'basic', notable: ['蓝玉'], meaning: '蓝色' },
      { surname: '闵', pinyin: 'mǐn', level: 'advanced', notable: ['闵损'], meaning: '姓氏' },
      { surname: '席', pinyin: 'xí', level: 'basic', notable: ['席慕容'], meaning: '席子' },
      { surname: '季', pinyin: 'jì', level: 'basic', notable: ['季布'], meaning: '季节' },
      { surname: '麻', pinyin: 'má', level: 'basic', notable: ['麻雀'], meaning: '芝麻' },
      { surname: '强', pinyin: 'qiáng', level: 'basic', notable: ['强人'], meaning: '强大' },
    ]
  },
  // 第十八段
  {
    id: 'section-18',
    title: '贾路娄危',
    difficulty: 'intermediate',
    surnames: [
      { surname: '贾', pinyin: 'jiǎ', level: 'basic', notable: ['贾谊'], meaning: '商人' },
      { surname: '路', pinyin: 'lù', level: 'basic', notable: ['路遥'], meaning: '道路' },
      { surname: '娄', pinyin: 'lóu', level: 'advanced', notable: ['娄师德'], meaning: '姓氏' },
      { surname: '危', pinyin: 'wēi', level: 'intermediate', notable: ['危素'], meaning: '危险' },
      { surname: '江', pinyin: 'jiāng', level: 'basic', notable: ['江泽民'], meaning: '江河' },
      { surname: '童', pinyin: 'tóng', level: 'basic', notable: ['童第周'], meaning: '儿童' },
      { surname: '颜', pinyin: 'yán', level: 'basic', notable: ['颜真卿'], meaning: '颜色' },
      { surname: '郭', pinyin: 'guō', level: 'basic', notable: ['郭沫若'], meaning: '外城' },
    ]
  },
  // 第十九段
  {
    id: 'section-19',
    title: '梅盛林刁',
    difficulty: 'intermediate',
    surnames: [
      { surname: '梅', pinyin: 'méi', level: 'basic', notable: ['梅兰芳'], meaning: '梅花' },
      { surname: '盛', pinyin: 'shèng', level: 'basic', notable: ['盛宣怀'], meaning: '兴盛' },
      { surname: '林', pinyin: 'lín', level: 'basic', notable: ['林则徐'], meaning: '树林' },
      { surname: '刁', pinyin: 'diāo', level: 'intermediate', notable: ['刁包'], meaning: '狡猾' },
      { surname: '钟', pinyin: 'zhōng', level: 'basic', notable: ['钟繇'], meaning: '钟表' },
      { surname: '徐', pinyin: 'xú', level: 'basic', notable: ['徐霞客'], meaning: '缓慢' },
      { surname: '邱', pinyin: 'qiū', level: 'basic', notable: ['邱吉尔'], meaning: '丘陵' },
      { surname: '骆', pinyin: 'luò', level: 'intermediate', notable: ['骆宾王'], meaning: '姓氏' },
    ]
  },
  // 第二十段
  {
    id: 'section-20',
    title: '高夏蔡田',
    difficulty: 'intermediate',
    surnames: [
      { surname: '高', pinyin: 'gāo', level: 'basic', notable: ['高适'], meaning: '高大' },
      { surname: '夏', pinyin: 'xià', level: 'basic', notable: ['夏衍'], meaning: '夏天' },
      { surname: '蔡', pinyin: 'cài', level: 'basic', notable: ['蔡锷'], meaning: '蔡国' },
      { surname: '田', pinyin: 'tián', level: 'basic', notable: ['田汉'], meaning: '田地' },
      { surname: '樊', pinyin: 'fán', level: 'intermediate', notable: ['樊崇'], meaning: '樊笼' },
      { surname: '胡', pinyin: 'hú', level: 'basic', notable: ['胡适'], meaning: '胡须' },
      { surname: '凌', pinyin: 'líng', level: 'basic', notable: ['凌濛初'], meaning: '升高' },
      { surname: '霍', pinyin: 'huò', level: 'basic', notable: ['霍去病'], meaning: '迅速' },
    ]
  },
  // 第二十一段
  {
    id: 'section-21',
    title: '虞万支柯',
    difficulty: 'intermediate',
    surnames: [
      { surname: '虞', pinyin: 'yú', level: 'intermediate', notable: ['虞世南'], meaning: '虞国' },
      { surname: '万', pinyin: 'wàn', level: 'basic', notable: ['万斯同'], meaning: '万' },
      { surname: '支', pinyin: 'zhī', level: 'intermediate', notable: ['支遁'], meaning: '分支' },
      { surname: '柯', pinyin: 'kē', level: 'intermediate', notable: ['柯岩'], meaning: '树枝' },
      { surname: '昝', pinyin: 'zǎn', level: 'advanced', notable: ['昝殷'], meaning: '姓氏' },
      { surname: '管', pinyin: 'guǎn', level: 'basic', notable: ['管仲'], meaning: '管理' },
      { surname: '卢', pinyin: 'lú', level: 'basic', notable: ['卢照邻'], meaning: '卢国' },
      { surname: '莫', pinyin: 'mò', level: 'basic', notable: ['莫言'], meaning: '没有' },
    ]
  },
  // 第二十二段
  {
    id: 'section-22',
    title: '经房裘缪',
    difficulty: 'intermediate',
    surnames: [
      { surname: '经', pinyin: 'jīng', level: 'basic', notable: ['经亨颐'], meaning: '经书' },
      { surname: '房', pinyin: 'fáng', level: 'basic', notable: ['房玄龄'], meaning: '房屋' },
      { surname: '裘', pinyin: 'qiú', level: 'intermediate', notable: ['裘得'], meaning: '皮衣' },
      { surname: '缪', pinyin: 'miào', level: 'advanced', notable: ['缪钺'], meaning: '姓氏' },
      { surname: '干', pinyin: 'gàn', level: 'basic', notable: ['干将'], meaning: '盾牌' },
      { surname: '解', pinyin: 'xiè', level: 'intermediate', notable: ['解缙'], meaning: '解开' },
      { surname: '应', pinyin: 'yīng', level: 'basic', notable: ['应劭'], meaning: '应该' },
      { surname: '宗', pinyin: 'zōng', level: 'basic', notable: ['宗泽'], meaning: '祖宗' },
    ]
  },
  // 第二十三段
  {
    id: 'section-23',
    title: '丁宣贲邓',
    difficulty: 'intermediate',
    surnames: [
      { surname: '丁', pinyin: 'dīng', level: 'basic', notable: ['丁玲'], meaning: '丁字' },
      { surname: '宣', pinyin: 'xuān', level: 'basic', notable: ['宣统'], meaning: '宣扬' },
      { surname: '贲', pinyin: 'bēn', level: 'advanced', notable: ['贲亨'], meaning: '姓氏' },
      { surname: '邓', pinyin: 'dèng', level: 'basic', notable: ['邓小平'], meaning: '邓国' },
      { surname: '郁', pinyin: 'yù', level: 'intermediate', notable: ['郁达夫'], meaning: '郁结' },
      { surname: '单', pinyin: 'shàn', level: 'advanced', notable: ['单雄信'], meaning: '姓氏' },
      { surname: '杭', pinyin: 'háng', level: 'basic', notable: ['杭世骏'], meaning: '杭州' },
      { surname: '洪', pinyin: 'hóng', level: 'basic', notable: ['洪秀全'], meaning: '洪水' },
    ]
  },
  // 第二十四段
  {
    id: 'section-24',
    title: '包诸左石',
    difficulty: 'intermediate',
    surnames: [
      { surname: '包', pinyin: 'bāo', level: 'basic', notable: ['包拯'], meaning: '包裹' },
      { surname: '诸', pinyin: 'zhū', level: 'intermediate', notable: ['诸葛亮'], meaning: '诸位' },
      { surname: '左', pinyin: 'zuǒ', level: 'basic', notable: ['左宗棠'], meaning: '左边' },
      { surname: '石', pinyin: 'shí', level: 'basic', notable: ['石达开'], meaning: '石头' },
      { surname: '崔', pinyin: 'cuī', level: 'basic', notable: ['崔颢'], meaning: '崔国' },
      { surname: '吉', pinyin: 'jí', level: 'basic', notable: ['吉鸿昌'], meaning: '吉祥' },
      { surname: '钮', pinyin: 'niǔ', level: 'advanced', notable: ['钮福保'], meaning: '姓氏' },
      { surname: '龚', pinyin: 'gōng', level: 'basic', notable: ['龚自珍'], meaning: '恭敬' },
    ]
  },
  // 第二十五段
  {
    id: 'section-25',
    title: '程嵇邢滑',
    difficulty: 'intermediate',
    surnames: [
      { surname: '程', pinyin: 'chéng', level: 'basic', notable: ['程颢'], meaning: '路程' },
      { surname: '嵇', pinyin: 'jī', level: 'advanced', notable: ['嵇康'], meaning: '姓氏' },
      { surname: '邢', pinyin: 'xíng', level: 'basic', notable: ['邢颙'], meaning: '邢国' },
      { surname: '滑', pinyin: 'huá', level: 'basic', notable: ['滑寿'], meaning: '滑溜' },
      { surname: '裴', pinyin: 'péi', level: 'intermediate', notable: ['裴矩'], meaning: '裴国' },
      { surname: '陆', pinyin: 'lù', level: 'basic', notable: ['陆游'], meaning: '陆地' },
      { surname: '荣', pinyin: 'róng', level: 'basic', notable: ['荣格'], meaning: '光荣' },
      { surname: '翁', pinyin: 'wēng', level: 'intermediate', notable: ['翁同龢'], meaning: '老翁' },
    ]
  },
  // 第二十六段
  {
    id: 'section-26',
    title: '荀羊於惠',
    difficulty: 'intermediate',
    surnames: [
      { surname: '荀', pinyin: 'xún', level: 'advanced', notable: ['荀子'], meaning: '姓氏' },
      { surname: '羊', pinyin: 'yáng', level: 'basic', notable: ['羊祜'], meaning: '羊' },
      { surname: '於', pinyin: 'yū', level: 'advanced', notable: ['於慎行'], meaning: '姓氏' },
      { surname: '惠', pinyin: 'huì', level: 'basic', notable: ['惠施'], meaning: '恩惠' },
      { surname: '甄', pinyin: 'zhēn', level: 'intermediate', notable: ['甄士隐'], meaning: '甄别' },
      { surname: '曲', pinyin: 'qū', level: 'basic', notable: ['曲波'], meaning: '弯曲' },
      { surname: '家', pinyin: 'jiā', level: 'basic', notable: ['家铉翁'], meaning: '家庭' },
      { surname: '封', pinyin: 'fēng', level: 'basic', notable: ['封德彝'], meaning: '封印' },
    ]
  },
  // 第二十七段
  {
    id: 'section-27',
    title: '芮羿储靳',
    difficulty: 'intermediate',
    surnames: [
      { surname: '芮', pinyin: 'ruì', level: 'advanced', notable: ['芮挺章'], meaning: '姓氏' },
      { surname: '羿', pinyin: 'yì', level: 'advanced', notable: ['后羿'], meaning: '姓氏' },
      { surname: '储', pinyin: 'chǔ', level: 'advanced', notable: ['储光羲'], meaning: '储备' },
      { surname: '靳', pinyin: 'jìn', level: 'advanced', notable: ['靳辅'], meaning: '姓氏' },
      { surname: '汲', pinyin: 'jí', level: 'advanced', notable: ['汲黯'], meaning: '汲水' },
      { surname: '邴', pinyin: 'bǐng', level: 'advanced', notable: ['邴原'], meaning: '姓氏' },
      { surname: '糜', pinyin: 'mí', level: 'advanced', notable: ['糜竺'], meaning: '姓氏' },
      { surname: '松', pinyin: 'sōng', level: 'basic', notable: ['松赞干布'], meaning: '松树' },
    ]
  },
  // 第二十八段
  {
    id: 'section-28',
    title: '井段富巫',
    difficulty: 'intermediate',
    surnames: [
      { surname: '井', pinyin: 'jǐng', level: 'basic', notable: ['井勿幕'], meaning: '水井' },
      { surname: '段', pinyin: 'duàn', level: 'basic', notable: ['段玉裁'], meaning: '段落' },
      { surname: '富', pinyin: 'fù', level: 'basic', notable: ['富弼'], meaning: '富有' },
      { surname: '巫', pinyin: 'wū', level: 'advanced', notable: ['巫峡'], meaning: '巫师' },
      { surname: '乌', pinyin: 'wū', level: 'basic', notable: ['乌兰夫'], meaning: '乌鸦' },
      { surname: '焦', pinyin: 'jiāo', level: 'basic', notable: ['焦裕禄'], meaning: '烧焦' },
      { surname: '巴', pinyin: 'bā', level: 'basic', notable: ['巴金'], meaning: '巴望' },
      { surname: '弓', pinyin: 'gōng', level: 'basic', notable: ['弓玄龄'], meaning: '弓箭' },
    ]
  },
  // 第二十九段
  {
    id: 'section-29',
    title: '牧隗山谷',
    difficulty: 'intermediate',
    surnames: [
      { surname: '牧', pinyin: 'mù', level: 'intermediate', notable: ['牧犊'], meaning: '放牧' },
      { surname: '隗', pinyin: 'kuí', level: 'advanced', notable: ['隗嚣'], meaning: '姓氏' },
      { surname: '山', pinyin: 'shān', level: 'basic', notable: ['山涛'], meaning: '山' },
      { surname: '谷', pinyin: 'gǔ', level: 'basic', notable: ['谷建芬'], meaning: '山谷' },
      { surname: '车', pinyin: 'chē', level: 'basic', notable: ['车万育'], meaning: '车辆' },
      { surname: '侯', pinyin: 'hóu', level: 'basic', notable: ['侯宝林'], meaning: '王侯' },
      { surname: '宓', pinyin: 'mì', level: 'advanced', notable: ['宓子贱'], meaning: '姓氏' },
      { surname: '蓬', pinyin: 'péng', level: 'intermediate', notable: ['蓬蒿'], meaning: '蓬草' },
    ]
  },
  // 第三十段
  {
    id: 'section-30',
    title: '全郗班仰',
    difficulty: 'intermediate',
    surnames: [
      { surname: '全', pinyin: 'quán', level: 'basic', notable: ['全祖望'], meaning: '全部' },
      { surname: '郗', pinyin: 'xī', level: 'advanced', notable: ['郗超'], meaning: '姓氏' },
      { surname: '班', pinyin: 'bān', level: 'basic', notable: ['班固'], meaning: '班级' },
      { surname: '仰', pinyin: 'yǎng', level: 'basic', notable: ['仰天长啸'], meaning: '仰望' },
      { surname: '秋', pinyin: 'qiū', level: 'basic', notable: ['秋瑾'], meaning: '秋天' },
      { surname: '仲', pinyin: 'zhòng', level: 'basic', notable: ['仲永'], meaning: '排行' },
      { surname: '伊', pinyin: 'yī', level: 'basic', notable: ['伊尹'], meaning: '姓氏' },
      { surname: '宫', pinyin: 'gōng', level: 'basic', notable: ['宫崎骏'], meaning: '宫殿' },
    ]
  },
  // 第三十一段
  {
    id: 'section-31',
    title: '宁仇栾暴',
    difficulty: 'intermediate',
    surnames: [
      { surname: '宁', pinyin: 'níng', level: 'basic', notable: ['宁泽涛'], meaning: '安宁' },
      { surname: '仇', pinyin: 'qiú', level: 'advanced', notable: ['仇英'], meaning: '仇敌' },
      { surname: '栾', pinyin: 'luán', level: 'advanced', notable: ['栾布'], meaning: '姓氏' },
      { surname: '暴', pinyin: 'bào', level: 'basic', notable: ['暴胜之'], meaning: '暴烈' },
      { surname: '甘', pinyin: 'gān', level: 'basic', notable: ['甘罗'], meaning: '甘甜' },
      { surname: '钭', pinyin: 'tǒu', level: 'advanced', notable: ['钭滔'], meaning: '姓氏' },
      { surname: '厉', pinyin: 'lì', level: 'basic', notable: ['厉鹗'], meaning: '严厉' },
      { surname: '戎', pinyin: 'róng', level: 'intermediate', notable: ['戎昱'], meaning: '军旅' },
    ]
  },
  // 第三十二段
  {
    id: 'section-32',
    title: '祖武符刘',
    difficulty: 'intermediate',
    surnames: [
      { surname: '祖', pinyin: 'zǔ', level: 'basic', notable: ['祖冲之'], meaning: '祖先' },
      { surname: '武', pinyin: 'wǔ', level: 'basic', notable: ['武则天'], meaning: '武力' },
      { surname: '符', pinyin: 'fú', level: 'intermediate', notable: ['符坚'], meaning: '符节' },
      { surname: '刘', pinyin: 'liú', level: 'basic', notable: ['刘邦', '刘备'], meaning: '刘国' },
      { surname: '景', pinyin: 'jǐng', level: 'basic', notable: ['景泰蓝'], meaning: '景色' },
      { surname: '詹', pinyin: 'zhān', level: 'basic', notable: ['詹天佑'], meaning: '姓氏' },
      { surname: '束', pinyin: 'shù', level: 'advanced', notable: ['束皙'], meaning: '束缚' },
      { surname: '龙', pinyin: 'lóng', level: 'basic', notable: ['龙应台'], meaning: '龙' },
    ]
  },
  // 第三十三段
  {
    id: 'section-33',
    title: '叶幸司韶',
    difficulty: 'intermediate',
    surnames: [
      { surname: '叶', pinyin: 'yè', level: 'basic', notable: ['叶挺'], meaning: '叶子' },
      { surname: '幸', pinyin: 'xìng', level: 'basic', notable: ['幸鸿铭'], meaning: '幸运' },
      { surname: '司', pinyin: 'sī', level: 'basic', notable: ['司马迁'], meaning: '司' },
      { surname: '韶', pinyin: 'sháo', level: 'advanced', notable: ['韶山'], meaning: '美好' },
      { surname: '郜', pinyin: 'gào', level: 'advanced', notable: ['郗郜'], meaning: '郜国' },
      { surname: '黎', pinyin: 'lí', level: 'basic', notable: ['黎元洪'], meaning: '黎明' },
      { surname: '蓟', pinyin: 'jì', level: 'advanced', notable: ['蓟门'], meaning: '蓟国' },
      { surname: '薄', pinyin: 'bó', level: 'basic', notable: ['薄一波'], meaning: '薄弱' },
    ]
  },
  // 第三十四段
  {
    id: 'section-34',
    title: '印宿白怀',
    difficulty: 'intermediate',
    surnames: [
      { surname: '印', pinyin: 'yìn', level: 'intermediate', notable: ['印光'], meaning: '印章' },
      { surname: '宿', pinyin: 'sù', level: 'advanced', notable: ['宿白'], meaning: '住宿' },
      { surname: '白', pinyin: 'bái', level: 'basic', notable: ['白居易'], meaning: '白色' },
      { surname: '怀', pinyin: 'huái', level: 'basic', notable: ['怀素'], meaning: '怀念' },
      { surname: '蒲', pinyin: 'pú', level: 'intermediate', notable: ['蒲松龄'], meaning: '蒲草' },
      { surname: '台', pinyin: 'tái', level: 'basic', notable: ['台静农'], meaning: '台' },
      { surname: '从', pinyin: 'cóng', level: 'basic', notable: ['从维熙'], meaning: '跟随' },
      { surname: '鄂', pinyin: 'è', level: 'basic', notable: ['鄂尔泰'], meaning: '湖北' },
    ]
  },
  // 第三十五段
  {
    id: 'section-35',
    title: '索咸籍赖',
    difficulty: 'intermediate',
    surnames: [
      { surname: '索', pinyin: 'suǒ', level: 'intermediate', notable: ['索额图'], meaning: '索取' },
      { surname: '咸', pinyin: 'xián', level: 'basic', notable: ['咸丰'], meaning: '咸味' },
      { surname: '籍', pinyin: 'jí', level: 'advanced', notable: ['籍贯'], meaning: '籍贯' },
      { surname: '赖', pinyin: 'lài', level: 'basic', notable: ['赖宁'], meaning: '依赖' },
      { surname: '卓', pinyin: 'zhuó', level: 'intermediate', notable: ['卓文君'], meaning: '卓越' },
      { surname: '蔺', pinyin: 'lìn', level: 'advanced', notable: ['蔺相如'], meaning: '姓氏' },
      { surname: '屠', pinyin: 'tú', level: 'basic', notable: ['屠呦呦'], meaning: '屠宰' },
      { surname: '蒙', pinyin: 'méng', level: 'basic', notable: ['蒙恬'], meaning: '蒙蔽' },
    ]
  },
  // 第三十六段
  {
    id: 'section-36',
    title: '池乔阴鬱',
    difficulty: 'intermediate',
    surnames: [
      { surname: '池', pinyin: 'chí', level: 'basic', notable: ['池莉'], meaning: '水池' },
      { surname: '乔', pinyin: 'qiáo', level: 'basic', notable: ['乔布斯'], meaning: '乔木' },
      { surname: '阴', pinyin: 'yīn', level: 'basic', notable: ['阴丽华'], meaning: '阴凉' },
      { surname: '鬱', pinyin: 'yù', level: 'advanced', notable: ['鬱文'], meaning: '茂盛' },
      { surname: '胥', pinyin: 'xū', level: 'advanced', notable: ['胥童'], meaning: '胥吏' },
      { surname: '能', pinyin: 'nài', level: 'advanced', notable: ['能仁'], meaning: '姓氏' },
      { surname: '苍', pinyin: 'cāng', level: 'basic', notable: ['苍天'], meaning: '苍茫' },
      { surname: '双', pinyin: 'shuāng', level: 'basic', notable: ['双喜'], meaning: '双' },
    ]
  },
  // 第三十七段
  {
    id: 'section-37',
    title: '闻莘党翟',
    difficulty: 'intermediate',
    surnames: [
      { surname: '闻', pinyin: 'wén', level: 'basic', notable: ['闻一多'], meaning: '听见' },
      { surname: '莘', pinyin: 'shēn', level: 'advanced', notable: ['莘庄'], meaning: '姓氏' },
      { surname: '党', pinyin: 'dǎng', level: 'basic', notable: ['党怀英'], meaning: '党派' },
      { surname: '翟', pinyin: 'zhái', level: 'advanced', notable: ['翟让'], meaning: '姓氏' },
      { surname: '谭', pinyin: 'tán', level: 'basic', notable: ['谭嗣同'], meaning: '谈论' },
      { surname: '贡', pinyin: 'gòng', level: 'basic', notable: ['贡禹'], meaning: '贡献' },
      { surname: '劳', pinyin: 'láo', level: 'basic', notable: ['劳苦功高'], meaning: '劳动' },
      { surname: '逄', pinyin: 'páng', level: 'advanced', notable: ['逄蒙'], meaning: '姓氏' },
    ]
  },
  // 第三十八段
  {
    id: 'section-38',
    title: '姬申扶堵',
    difficulty: 'intermediate',
    surnames: [
      { surname: '姬', pinyin: 'jī', level: 'advanced', notable: ['姬发'], meaning: '姓氏' },
      { surname: '申', pinyin: 'shēn', level: 'basic', notable: ['申时行'], meaning: '申国' },
      { surname: '扶', pinyin: 'fú', level: 'basic', notable: ['扶苏'], meaning: '扶助' },
      { surname: '堵', pinyin: 'dǔ', level: 'advanced', notable: ['堵简'], meaning: '堵塞' },
      { surname: '冉', pinyin: 'rǎn', level: 'advanced', notable: ['冉有'], meaning: '姓氏' },
      { surname: '宰', pinyin: 'zǎi', level: 'intermediate', notable: ['宰予'], meaning: '宰相' },
      { surname: '郦', pinyin: 'lì', level: 'advanced', notable: ['郦食其'], meaning: '姓氏' },
      { surname: '庸', pinyin: 'yōng', level: 'basic', notable: ['庸'], meaning: '平庸' },
    ]
  },
  // 第三十九段
  {
    id: 'section-39',
    title: '却璩桑桂',
    difficulty: 'intermediate',
    surnames: [
      { surname: '却', pinyin: 'què', level: 'intermediate', notable: ['却才'], meaning: '推却' },
      { surname: '璩', pinyin: 'qú', level: 'advanced', notable: ['璩显秀'], meaning: '姓氏' },
      { surname: '桑', pinyin: 'sāng', level: 'basic', notable: ['桑弘羊'], meaning: '桑树' },
      { surname: '桂', pinyin: 'guì', level: 'basic', notable: ['桂冠'], meaning: '桂花' },
      { surname: '濮', pinyin: 'pú', level: 'advanced', notable: ['濮存昕'], meaning: '姓氏' },
      { surname: '牛', pinyin: 'niú', level: 'basic', notable: ['牛顿'], meaning: '牛' },
      { surname: '寿', pinyin: 'shòu', level: 'basic', notable: ['寿镜吾'], meaning: '长寿' },
      { surname: '通', pinyin: 'tōng', level: 'basic', notable: ['通天'], meaning: '通' },
    ]
  },
  // 第四十段
  {
    id: 'section-40',
    title: '边扈燕冀',
    difficulty: 'intermediate',
    surnames: [
      { surname: '边', pinyin: 'biān', level: 'basic', notable: ['边贡'], meaning: '边缘' },
      { surname: '扈', pinyin: 'hù', level: 'advanced', notable: ['扈三娘'], meaning: '姓氏' },
      { surname: '燕', pinyin: 'yān', level: 'basic', notable: ['燕青'], meaning: '燕国' },
      { surname: '冀', pinyin: 'jì', level: 'basic', notable: ['冀朝鼎'], meaning: '河北' },
      { surname: '郏', pinyin: 'jiá', level: 'advanced', notable: ['郏县'], meaning: '郏地' },
      { surname: '浦', pinyin: 'pǔ', level: 'intermediate', notable: ['浦江'], meaning: '水滨' },
      { surname: '尚', pinyin: 'shàng', level: 'basic', notable: ['尚可喜'], meaning: '崇尚' },
      { surname: '农', pinyin: 'nóng', level: 'basic', notable: ['农劲荪'], meaning: '农民' },
    ]
  },
  // 第四十一段
  {
    id: 'section-41',
    title: '温别庄晏',
    difficulty: 'intermediate',
    surnames: [
      { surname: '温', pinyin: 'wēn', level: 'basic', notable: ['温庭筠'], meaning: '温暖' },
      { surname: '别', pinyin: 'bié', level: 'basic', notable: ['别林斯基'], meaning: '分别' },
      { surname: '庄', pinyin: 'zhuāng', level: 'basic', notable: ['庄子'], meaning: '村庄' },
      { surname: '晏', pinyin: 'yàn', level: 'intermediate', notable: ['晏殊'], meaning: '安宁' },
      { surname: '柴', pinyin: 'chái', level: 'basic', notable: ['柴荣'], meaning: '柴火' },
      { surname: '瞿', pinyin: 'qú', level: 'advanced', notable: ['瞿秋白'], meaning: '姓氏' },
      { surname: '阎', pinyin: 'yán', level: 'basic', notable: ['阎锡山'], meaning: '里巷' },
      { surname: '充', pinyin: 'chōng', level: 'basic', notable: ['充气'], meaning: '充' },
    ]
  },
  // 第四十二段
  {
    id: 'section-42',
    title: '慕连茹习',
    difficulty: 'intermediate',
    surnames: [
      { surname: '慕', pinyin: 'mù', level: 'intermediate', notable: ['慕天颜'], meaning: '仰慕' },
      { surname: '连', pinyin: 'lián', level: 'basic', notable: ['连战'], meaning: '连接' },
      { surname: '茹', pinyin: 'rú', level: 'advanced', notable: ['茹志鹃'], meaning: '茹' },
      { surname: '习', pinyin: 'xí', level: 'basic', notable: ['习仲勋'], meaning: '学习' },
      { surname: '宦', pinyin: 'huàn', level: 'advanced', notable: ['宦官'], meaning: '官' },
      { surname: '艾', pinyin: 'ài', level: 'basic', notable: ['艾青'], meaning: '艾草' },
      { surname: '鱼', pinyin: 'yú', level: 'basic', notable: ['鱼玄机'], meaning: '鱼' },
      { surname: '容', pinyin: 'róng', level: 'basic', notable: ['容国团'], meaning: '容貌' },
    ]
  },
  // 第四十三段
  {
    id: 'section-43',
    title: '向古易慎',
    difficulty: 'intermediate',
    surnames: [
      { surname: '向', pinyin: 'xiàng', level: 'basic', notable: ['向警予'], meaning: '方向' },
      { surname: '古', pinyin: 'gǔ', level: 'basic', notable: ['古龙'], meaning: '古代' },
      { surname: '易', pinyin: 'yì', level: 'basic', notable: ['易中天'], meaning: '容易' },
      { surname: '慎', pinyin: 'shèn', level: 'basic', notable: ['慎行'], meaning: '谨慎' },
      { surname: '戈', pinyin: 'gē', level: 'intermediate', notable: ['戈尔'], meaning: '戈矛' },
      { surname: '廖', pinyin: 'liào', level: 'basic', notable: ['廖承志'], meaning: '姓氏' },
      { surname: '庾', pinyin: 'yǔ', level: 'advanced', notable: ['庾信'], meaning: '姓氏' },
      { surname: '终', pinyin: 'zhōng', level: 'basic', notable: ['终军'], meaning: '终' },
    ]
  },
  // 第四十四段
  {
    id: 'section-44',
    title: '暨居衡步',
    difficulty: 'intermediate',
    surnames: [
      { surname: '暨', pinyin: 'jì', level: 'advanced', notable: ['暨艳'], meaning: '姓氏' },
      { surname: '居', pinyin: 'jū', level: 'basic', notable: ['居里夫人'], meaning: '居住' },
      { surname: '衡', pinyin: 'héng', level: 'basic', notable: ['衡山路'], meaning: '平衡' },
      { surname: '步', pinyin: 'bù', level: 'basic', notable: ['步子'], meaning: '步' },
      { surname: '都', pinyin: 'dū', level: 'basic', notable: ['都德'], meaning: '都' },
      { surname: '耿', pinyin: 'gěng', level: 'basic', notable: ['耿爽'], meaning: '耿直' },
      { surname: '满', pinyin: 'mǎn', level: 'basic', notable: ['满族'], meaning: '满' },
      { surname: '弘', pinyin: 'hóng', level: 'intermediate', notable: ['弘历'], meaning: '弘' },
    ]
  },
  // 第四十五段
  {
    id: 'section-45',
    title: '匡国文寇',
    difficulty: 'intermediate',
    surnames: [
      { surname: '匡', pinyin: 'kuāng', level: 'intermediate', notable: ['匡衡'], meaning: '匡扶' },
      { surname: '国', pinyin: 'guó', level: 'basic', notable: ['国母'], meaning: '国家' },
      { surname: '文', pinyin: 'wén', level: 'basic', notable: ['文天祥'], meaning: '文' },
      { surname: '寇', pinyin: 'kòu', level: 'intermediate', notable: ['寇准'], meaning: '寇' },
      { surname: '广', pinyin: 'guǎng', level: 'basic', notable: ['广东'], meaning: '广' },
      { surname: '禄', pinyin: 'lù', level: 'basic', notable: ['禄存'], meaning: '福禄' },
      { surname: '阙', pinyin: 'quē', level: 'advanced', notable: ['阙泽'], meaning: '阙' },
      { surname: '东', pinyin: 'dōng', level: 'basic', notable: ['东方朔'], meaning: '东' },
    ]
  },
  // 第四十六段
  {
    id: 'section-46',
    title: '欧殳沃利',
    difficulty: 'intermediate',
    surnames: [
      { surname: '欧', pinyin: 'ōu', level: 'basic', notable: ['欧阳修'], meaning: '姓氏' },
      { surname: '殳', pinyin: 'shū', level: 'advanced', notable: ['殳仙'], meaning: '兵器' },
      { surname: '沃', pinyin: 'wò', level: 'intermediate', notable: ['沃田'], meaning: '沃野' },
      { surname: '利', pinyin: 'lì', level: 'basic', notable: ['利比亚'], meaning: '利益' },
      { surname: '蔚', pinyin: 'yù', level: 'advanced', notable: ['蔚然'], meaning: '茂盛' },
      { surname: '越', pinyin: 'yuè', level: 'basic', notable: ['越王勾践'], meaning: '越' },
      { surname: '夔', pinyin: 'kuí', level: 'advanced', notable: ['夔龙'], meaning: '姓氏' },
      { surname: '隆', pinyin: 'lóng', level: 'basic', notable: ['隆美尔'], meaning: '兴隆' },
    ]
  },
  // 第四十七段
  {
    id: 'section-47',
    title: '师巩厍聂',
    difficulty: 'intermediate',
    surnames: [
      { surname: '师', pinyin: 'shī', level: 'basic', notable: ['师旷'], meaning: '老师' },
      { surname: '巩', pinyin: 'gǒng', level: 'intermediate', notable: ['巩俐'], meaning: '巩固' },
      { surname: '厍', pinyin: 'shè', level: 'advanced', notable: ['厍狄'], meaning: '姓氏' },
      { surname: '聂', pinyin: 'niè', level: 'basic', notable: ['聂荣臻'], meaning: '姓氏' },
      { surname: '晁', pinyin: 'cháo', level: 'advanced', notable: ['晁补之'], meaning: '姓氏' },
      { surname: '勾', pinyin: 'gōu', level: 'basic', notable: ['勾践'], meaning: '勾' },
      { surname: '敖', pinyin: 'áo', level: 'advanced', notable: ['敖陶孙'], meaning: '姓氏' },
      { surname: '融', pinyin: 'róng', level: 'basic', notable: ['融'], meaning: '融合' },
    ]
  },
  // 第四十八段
  {
    id: 'section-48',
    title: '冷訾辛阚',
    difficulty: 'intermediate',
    surnames: [
      { surname: '冷', pinyin: 'lěng', level: 'basic', notable: ['冷谦'], meaning: '冷' },
      { surname: '訾', pinyin: 'zī', level: 'advanced', notable: ['訾聿'], meaning: '姓氏' },
      { surname: '辛', pinyin: 'xīn', level: 'basic', notable: ['辛弃疾'], meaning: '辛辣' },
      { surname: '阚', pinyin: 'kàn', level: 'advanced', notable: ['阚骃'], meaning: '姓氏' },
      { surname: '那', pinyin: 'nā', level: 'intermediate', notable: ['那拉氏'], meaning: '姓氏' },
      { surname: '简', pinyin: 'jiǎn', level: 'basic', notable: ['简雍'], meaning: '简单' },
      { surname: '饶', pinyin: 'ráo', level: 'basic', notable: ['饶宗颐'], meaning: '富饶' },
      { surname: '空', pinyin: 'kōng', level: 'basic', notable: ['空间'], meaning: '空' },
    ]
  },
  // 第四十九段
  {
    id: 'section-49',
    title: '曾毋沙乜',
    difficulty: 'intermediate',
    surnames: [
      { surname: '曾', pinyin: 'zēng', level: 'basic', notable: ['曾国藩'], meaning: '曾' },
      { surname: '毋', pinyin: 'wú', level: 'advanced', notable: ['毋忘'], meaning: '不要' },
      { surname: '沙', pinyin: 'shā', level: 'basic', notable: ['沙飞'], meaning: '沙' },
      { surname: '乜', pinyin: 'miē', level: 'advanced', notable: ['乜姓'], meaning: '姓氏' },
      { surname: '养', pinyin: 'yǎng', level: 'basic', notable: ['养由基'], meaning: '养' },
      { surname: '鞠', pinyin: 'jū', level: 'advanced', notable: ['鞠躬尽瘁'], meaning: '姓氏' },
      { surname: '须', pinyin: 'xū', level: 'basic', notable: ['须知'], meaning: '必须' },
      { surname: '丰', pinyin: 'fēng', level: 'basic', notable: ['丰子恺'], meaning: '丰富' },
    ]
  },
  // 第五十段
  {
    id: 'section-50',
    title: '巢关蒯相',
    difficulty: 'intermediate',
    surnames: [
      { surname: '巢', pinyin: 'cháo', level: 'advanced', notable: ['巢父'], meaning: '巢穴' },
      { surname: '关', pinyin: 'guān', level: 'basic', notable: ['关羽'], meaning: '关口' },
      { surname: '蒯', pinyin: 'kuǎi', level: 'advanced', notable: ['蒯祥'], meaning: '姓氏' },
      { surname: '相', pinyin: 'xiàng', level: 'basic', notable: ['相如'], meaning: '相' },
      { surname: '查', pinyin: 'zhā', level: 'intermediate', notable: ['查良镛'], meaning: '姓氏' },
      { surname: '后', pinyin: 'hòu', level: 'basic', notable: ['后稷'], meaning: '后面' },
      { surname: '荆', pinyin: 'jīng', level: 'basic', notable: ['荆轲'], meaning: '荆' },
      { surname: '红', pinyin: 'hóng', level: 'basic', notable: ['红娘'], meaning: '红色' },
    ]
  },
  // 第五十一段
  {
    id: 'section-51',
    title: '游竺权逯',
    difficulty: 'intermediate',
    surnames: [
      { surname: '游', pinyin: 'yóu', level: 'basic', notable: ['游国恩'], meaning: '旅游' },
      { surname: '竺', pinyin: 'zhú', level: 'advanced', notable: ['竺可桢'], meaning: '姓氏' },
      { surname: '权', pinyin: 'quán', level: 'basic', notable: ['权倾天下'], meaning: '权力' },
      { surname: '逯', pinyin: 'lù', level: 'advanced', notable: ['逯钦舜'], meaning: '姓氏' },
      { surname: '盖', pinyin: 'gě', level: 'advanced', notable: ['盖勋'], meaning: '姓氏' },
      { surname: '益', pinyin: 'yì', level: 'basic', notable: ['益阳'], meaning: '益处' },
      { surname: '桓', pinyin: 'huán', level: 'basic', notable: ['桓伊'], meaning: '桓' },
      { surname: '公', pinyin: 'gōng', level: 'basic', notable: ['公爵'], meaning: '公' },
    ]
  },
  // 第五十二段：复姓开始
  {
    id: 'section-52',
    title: '万俟司马',
    difficulty: 'advanced',
    surnames: [
      { surname: '万俟', pinyin: 'mò qí', level: 'advanced', notable: ['万俟卨'], meaning: '复姓' },
      { surname: '司马', pinyin: 'sī mǎ', level: 'advanced', notable: ['司马迁', '司马懿'], meaning: '复姓' },
      { surname: '上官', pinyin: 'shàng guān', level: 'advanced', notable: ['上官婉儿'], meaning: '复姓' },
      { surname: '欧阳', pinyin: 'ōu yáng', level: 'advanced', notable: ['欧阳修', '欧阳询'], meaning: '复姓' },
      { surname: '夏侯', pinyin: 'xià hóu', level: 'advanced', notable: ['夏侯渊'], meaning: '复姓' },
      { surname: '诸葛', pinyin: 'zhū gě', level: 'advanced', notable: ['诸葛亮', '诸葛瑾'], meaning: '复姓' },
      { surname: '闻人', pinyin: 'wén rén', level: 'advanced', notable: ['闻人宏'], meaning: '复姓' },
      { surname: '东方', pinyin: 'dōng fāng', level: 'advanced', notable: ['东方朔'], meaning: '复姓' },
    ]
  },
  // 第五十三段
  {
    id: 'section-53',
    title: '赫连皇甫',
    difficulty: 'advanced',
    surnames: [
      { surname: '赫连', pinyin: 'hè lián', level: 'advanced', notable: ['赫连勃勃'], meaning: '复姓' },
      { surname: '皇甫', pinyin: 'huáng fǔ', level: 'advanced', notable: ['皇甫谧'], meaning: '复姓' },
      { surname: '尉迟', pinyin: 'wèi chí', level: 'advanced', notable: ['尉迟恭'], meaning: '复姓' },
      { surname: '公羊', pinyin: 'gōng yáng', level: 'advanced', notable: ['公羊高'], meaning: '复姓' },
      { surname: '澹台', pinyin: 'tán tái', level: 'advanced', notable: ['澹台灭明'], meaning: '复姓' },
      { surname: '公冶', pinyin: 'gōng yě', level: 'advanced', notable: ['公冶长'], meaning: '复姓' },
      { surname: '宗政', pinyin: 'zōng zhèng', level: 'advanced', notable: ['宗政珍'], meaning: '复姓' },
      { surname: '濮阳', pinyin: 'pú yáng', level: 'advanced', notable: ['濮阳兴'], meaning: '复姓' },
    ]
  },
  // 第五十四段
  {
    id: 'section-54',
    title: '淳于太叔',
    difficulty: 'advanced',
    surnames: [
      { surname: '淳于', pinyin: 'chún yú', level: 'advanced', notable: ['淳于意'], meaning: '复姓' },
      { surname: '单于', pinyin: 'chán yú', level: 'advanced', notable: ['单于'], meaning: '复姓' },
      { surname: '太叔', pinyin: 'tài shū', level: 'advanced', notable: ['太叔子'], meaning: '复姓' },
      { surname: '申屠', pinyin: 'shēn tú', level: 'advanced', notable: ['申屠嘉'], meaning: '复姓' },
      { surname: '公孙', pinyin: 'gōng sūn', level: 'advanced', notable: ['公孙龙', '公孙胜'], meaning: '复姓' },
      { surname: '仲孙', pinyin: 'zhòng sūn', level: 'advanced', notable: ['仲孙'], meaning: '复姓' },
      { surname: '轩辕', pinyin: 'xuān yuán', level: 'advanced', notable: ['轩辕黄帝'], meaning: '复姓' },
      { surname: '令狐', pinyin: 'líng hú', level: 'advanced', notable: ['令狐冲'], meaning: '复姓' },
    ]
  },
  // 第五十五段
  {
    id: 'section-55',
    title: '钟离慕容',
    difficulty: 'advanced',
    surnames: [
      { surname: '钟离', pinyin: 'zhōng lí', level: 'advanced', notable: ['钟离昧'], meaning: '复姓' },
      { surname: '宇文', pinyin: 'yǔ wén', level: 'advanced', notable: ['宇文泰'], meaning: '复姓' },
      { surname: '长孙', pinyin: 'zhǎng sūn', level: 'advanced', notable: ['长孙无忌'], meaning: '复姓' },
      { surname: '慕容', pinyin: 'mù róng', level: 'advanced', notable: ['慕容恪'], meaning: '复姓' },
      { surname: '鲜于', pinyin: 'xiān yú', level: 'advanced', notable: ['鲜于辅'], meaning: '复姓' },
      { surname: '闾丘', pinyin: 'lǘ qiū', level: 'advanced', notable: ['闾丘'], meaning: '复姓' },
      { surname: '司徒', pinyin: 'sī tú', level: 'advanced', notable: ['司徒美堂'], meaning: '复姓' },
      { surname: '司空', pinyin: 'sī kōng', level: 'advanced', notable: ['司空曙'], meaning: '复姓' },
    ]
  },
  // 第五十六段
  {
    id: 'section-56',
    title: '亓官司寇',
    difficulty: 'advanced',
    surnames: [
      { surname: '亓官', pinyin: 'qí guān', level: 'advanced', notable: ['亓官'], meaning: '复姓' },
      { surname: '司寇', pinyin: 'sī kòu', level: 'advanced', notable: ['司寇惠子'], meaning: '复姓' },
      { surname: '仉督', pinyin: 'zhǎng dū', level: 'advanced', notable: ['仉督'], meaning: '复姓' },
      { surname: '子车', pinyin: 'zǐ jū', level: 'advanced', notable: ['子车氏'], meaning: '复姓' },
      { surname: '颛孙', pinyin: 'zhuān sūn', level: 'advanced', notable: ['颛孙师'], meaning: '复姓' },
      { surname: '端木', pinyin: 'duān mù', level: 'advanced', notable: ['端木赐'], meaning: '复姓' },
      { surname: '巫马', pinyin: 'wū mǎ', level: 'advanced', notable: ['巫马施'], meaning: '复姓' },
      { surname: '公西', pinyin: 'gōng xī', level: 'advanced', notable: ['公西赤'], meaning: '复姓' },
    ]
  },
  // 第五十七段
  {
    id: 'section-57',
    title: '漆雕乐正',
    difficulty: 'advanced',
    surnames: [
      { surname: '漆雕', pinyin: 'qī diāo', level: 'advanced', notable: ['漆雕徒父'], meaning: '复姓' },
      { surname: '乐正', pinyin: 'yuè zhèng', level: 'advanced', notable: ['乐正克'], meaning: '复姓' },
      { surname: '壤驷', pinyin: 'rǎng sì', level: 'advanced', notable: ['壤驷赤'], meaning: '复姓' },
      { surname: '公良', pinyin: 'gōng liáng', level: 'advanced', notable: ['公良孺'], meaning: '复姓' },
      { surname: '拓跋', pinyin: 'tuò bá', level: 'advanced', notable: ['拓跋珪'], meaning: '复姓' },
      { surname: '夹谷', pinyin: 'jiá gǔ', level: 'advanced', notable: ['夹谷山'], meaning: '复姓' },
      { surname: '宰父', pinyin: 'zǎi fù', level: 'advanced', notable: ['宰父黑'], meaning: '复姓' },
      { surname: '谷梁', pinyin: 'gǔ liáng', level: 'advanced', notable: ['谷梁赤'], meaning: '复姓' },
    ]
  },
  // 第五十八段
  {
    id: 'section-58',
    title: '晋楚阎法',
    difficulty: 'advanced',
    surnames: [
      { surname: '晋', pinyin: 'jìn', level: 'basic', notable: ['晋文公'], meaning: '晋国' },
      { surname: '楚', pinyin: 'chǔ', level: 'basic', notable: ['楚庄王'], meaning: '楚国' },
      { surname: '阎', pinyin: 'yán', level: 'basic', notable: ['阎立本'], meaning: '里巷' },
      { surname: '法', pinyin: 'fǎ', level: 'basic', notable: ['法家'], meaning: '法律' },
      { surname: '汝', pinyin: 'rǔ', level: 'basic', notable: ['汝南'], meaning: '汝河' },
      { surname: '鄢', pinyin: 'yān', level: 'advanced', notable: ['鄢陵'], meaning: '鄢国' },
      { surname: '涂', pinyin: 'tú', level: 'basic', notable: ['涂涂'], meaning: '涂' },
      { surname: '钦', pinyin: 'qīn', level: 'basic', notable: ['钦差'], meaning: '钦' },
    ]
  },
  // 第五十九段
  {
    id: 'section-59',
    title: '段干百里',
    difficulty: 'advanced',
    surnames: [
      { surname: '段干', pinyin: 'duàn gàn', level: 'advanced', notable: ['段干木'], meaning: '复姓' },
      { surname: '百里', pinyin: 'bǎi lǐ', level: 'advanced', notable: ['百里奚'], meaning: '复姓' },
      { surname: '东郭', pinyin: 'dōng guō', level: 'advanced', notable: ['东郭先生'], meaning: '复姓' },
      { surname: '南门', pinyin: 'nán mén', level: 'advanced', notable: ['南门'], meaning: '复姓' },
      { surname: '呼延', pinyin: 'hū yán', level: 'advanced', notable: ['呼延赞'], meaning: '复姓' },
      { surname: '归海', pinyin: 'guī hǎi', level: 'advanced', notable: ['归海'], meaning: '复姓' },
      { surname: '羊舌', pinyin: 'yáng shé', level: 'advanced', notable: ['羊舌赤'], meaning: '复姓' },
      { surname: '微生', pinyin: 'wēi shēng', level: 'advanced', notable: ['微生高'], meaning: '复姓' },
    ]
  },
  // 第六十段
  {
    id: 'section-60',
    title: '岳帅终第五',
    difficulty: 'advanced',
    surnames: [
      { surname: '岳', pinyin: 'yuè', level: 'basic', notable: ['岳飞'], meaning: '山岳' },
      { surname: '帅', pinyin: 'shuài', level: 'basic', notable: ['帅天保'], meaning: '统帅' },
      { surname: '缑', pinyin: 'gōu', level: 'advanced', notable: ['缑山'], meaning: '姓氏' },
      { surname: '亢', pinyin: 'kàng', level: 'advanced', notable: ['亢龙'], meaning: '姓氏' },
      { surname: '况', pinyin: 'kuàng', level: 'intermediate', notable: ['况钟'], meaning: '情况' },
      { surname: '后', pinyin: 'hòu', level: 'basic', notable: ['后有琴'], meaning: '姓氏' },
      { surname: '有', pinyin: 'yǒu', level: 'basic', notable: ['有若'], meaning: '姓氏' },
      { surname: '琴', pinyin: 'qín', level: 'basic', notable: ['琴师'], meaning: '琴' },
    ]
  },
  // 第六十一段
  {
    id: 'section-61',
    title: '梁丘左丘',
    difficulty: 'advanced',
    surnames: [
      { surname: '梁丘', pinyin: 'liáng qiū', level: 'advanced', notable: ['梁丘据'], meaning: '复姓' },
      { surname: '左丘', pinyin: 'zuǒ qiū', level: 'advanced', notable: ['左丘明'], meaning: '复姓' },
      { surname: '东门', pinyin: 'dōng mén', level: 'advanced', notable: ['东门襄仲'], meaning: '复姓' },
      { surname: '西门', pinyin: 'xī mén', level: 'advanced', notable: ['西门豹'], meaning: '复姓' },
      { surname: '商', pinyin: 'shāng', level: 'basic', notable: ['商鞅'], meaning: '商朝' },
      { surname: '牟', pinyin: 'móu', level: 'intermediate', notable: ['牟宗三'], meaning: '姓氏' },
      { surname: '佘', pinyin: 'shé', level: 'intermediate', notable: ['佘赛花'], meaning: '姓氏' },
      { surname: '佴', pinyin: 'nài', level: 'advanced', notable: ['佴'], meaning: '姓氏' },
    ]
  },
  // 第六十二段
  {
    id: 'section-62',
    title: '伯赏南宫',
    difficulty: 'advanced',
    surnames: [
      { surname: '伯', pinyin: 'bó', level: 'basic', notable: ['伯牙'], meaning: '伯爵' },
      { surname: '赏', pinyin: 'shǎng', level: 'intermediate', notable: ['赏'], meaning: '奖赏' },
      { surname: '南宫', pinyin: 'nán gōng', level: 'advanced', notable: ['南宫适'], meaning: '复姓' },
      { surname: '墨', pinyin: 'mò', level: 'basic', notable: ['墨子'], meaning: '墨' },
      { surname: '哈', pinyin: 'hǎ', level: 'basic', notable: ['哈达'], meaning: '哈' },
      { surname: '谯', pinyin: 'qiáo', level: 'advanced', notable: ['谯周'], meaning: '姓氏' },
      { surname: '笪', pinyin: 'dá', level: 'advanced', notable: ['笪深'], meaning: '姓氏' },
      { surname: '年', pinyin: 'nián', level: 'basic', notable: ['年羹尧'], meaning: '年' },
    ]
  },
  // 第六十三段
  {
    id: 'section-63',
    title: '爱阳佟第五',
    difficulty: 'advanced',
    surnames: [
      { surname: '爱', pinyin: 'ài', level: 'basic', notable: ['爱国'], meaning: '爱' },
      { surname: '阳', pinyin: 'yáng', level: 'basic', notable: ['阳朔'], meaning: '阳' },
      { surname: '佟', pinyin: 'tóng', level: 'intermediate', notable: ['佟大为'], meaning: '姓氏' },
      { surname: '第五', pinyin: 'dì wǔ', level: 'advanced', notable: ['第五伦'], meaning: '复姓' },
      { surname: '言', pinyin: 'yán', level: 'basic', notable: ['言菊朋'], meaning: '言' },
      { surname: '福', pinyin: 'fú', level: 'basic', notable: ['福临'], meaning: '福' },
      { surname: '百家', pinyin: 'bǎi jiā', level: 'basic', notable: ['百家'], meaning: '百家' },
      { surname: '姓', pinyin: 'xìng', level: 'basic', notable: ['姓'], meaning: '姓' },
    ]
  },
];

export function getAllBaijiaxingSurnames() {
  return baijiaxingSections.flatMap(section => section.surnames);
}
