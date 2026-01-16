# 发音修正指南

## 如何修复错误的读音

本网站使用浏览器自带的 Web Speech API 进行语音朗读。当遇到读音错误时，可以通过以下方式修正。

---

## 方式一：修改多音字映射表（推荐）

### 1. 找到发音修正文件

文件位置：`src/lib/pronunciation-fix.ts`

### 2. 添加或修改映射

在 `PRONUNCIATION_FIXES` 对象中添加修正规则：

```typescript
export const PRONUNCIATION_FIXES: Record<string, string> = {
  // 现有的修正规则...

  // 添加你的修正规则
  '还': 'hái',      // 将"还"读作"hái"
  '行': 'xíng',     // 将"行"读作"xíng"
  '长': 'cháng',    // 将"长"读作"cháng"
};
```

### 3. 示例

如果某个字总是读错，比如"好"应该读"hǎo"但读成了"hào"，添加：

```typescript
'好': 'hǎo',
```

---

## 方式二：修正拼音数据

如果拼音本身的发音错误，需要修改对应的数据文件。

### 拼音数据文件位置

- 声母：`src/data/pinyin-initials.ts`
- 韵母：`src/data/pinyin-finals.ts`
- 整体认读音节：`src/data/pinyin-whole.ts`

### 修改示例

打开 `src/data/pinyin-initials.ts`，找到错误的拼音并修改：

```typescript
// 修改前
{
  char: 'zh',
  pinyin: 'zhe',  // 错误的发音
  examples: ['zhōng', 'zhū', 'zhú']
}

// 修改后
{
  char: 'zh',
  pinyin: 'zhi',  // 正确的发音
  examples: ['zhōng', 'zhū', 'zhú']
}
```

---

## 方式三：修改声母、韵母、汉字数据

### 千字文、三字经、唐诗等数据

这些数据在各自的文件中，如果发现某个字的拼音错误，直接修改对应的拼音字段：

```typescript
// src/data/qianziwen.ts
{
  char: '天',
  pinyin: 'tian1',  // 修改前
  pinyin: 'tian',   // 修改后（使用数字或拼音都可以）
  translation: '天空'
}
```

### 分级汉字数据

文件位置：`src/data/graded-hanzi.ts`

```typescript
{
  char: '人',
  pinyin: 'ren2',
  translation: '人',
  level: 1,
  examples: ['人口', '人民', '人类']
}
```

---

## 方式四：调整语音参数

如果问题不是发音错误，而是语速或音调不合适，可以修改 `src/lib/speech-utils.ts`：

```typescript
// 朗读拼音 - 语速稍快
export function speakPinyin(pinyin: string): void {
  speakText(pinyin, {
    rate: 0.95,   // 调整语速（0.1-10）
    pitch: 0.9    // 调整音调（0-2）
  });
}

// 朗读汉字 - 语速适中
export function speakHanzi(hanzi: string): void {
  speakText(hanzi, {
    rate: 0.9,
    pitch: 0.9
  });
}

// 朗读诗词 - 语速稍慢，更有韵律
export function speakPoem(text: string): void {
  speakText(text, {
    rate: 0.85,
    pitch: 0.9
  });
}
```

---

## 常见问题

### Q: 为什么有些字浏览器读不出来？

A: 某些特殊的字或符号可能不在浏览器的语音库中。可以尝试：
1. 添加到 `PRONUNCIATION_FIXES` 映射表
2. 使用拼音替代
3. 更换浏览器（Chrome、Edge、Safari 的语音库不同）

### Q: 如何切换不同的语音？

A: 语音由浏览器自动选择最合适的中文语音。可以在 `src/lib/speech-utils.ts` 中修改选择逻辑：

```typescript
function getBestChineseVoice(): SpeechSynthesisVoice | null {
  // ... 现有代码 ...

  // 查看所有可用的语音
  console.log('可用语音:', voices.map(v => v.name));

  // 手动选择特定语音
  return voices.find(v => v.name.includes('Google 普通话'));
}
```

### Q: 声调符号影响发音吗？

A: 是的，带声调的拼音可能被浏览器读错。已经自动处理了声调移除功能。

---

## 测试发音

修改后，在浏览器中测试：

1. 打开网站
2. 进入对应的页面（拼音学习、汉字学习等）
3. 点击发音按钮
4. 检查发音是否正确

---

## 提交修改

修改完成后，推送到 GitHub 会自动触发部署：

```bash
git add .
git commit -m "修复某些字的发音错误"
git push
```

Vercel 和 Netlify 会自动重新部署，1-2 分钟后生效。
