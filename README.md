# 🎓 儿童拼音及中华经典学习教育网站

一个专为儿童设计的互动学习平台，包含拼音字母学习、中华经典（千字文、三字经、唐诗三百首、百家姓）学习，以及多种趣味闯关游戏。

## ✨ 核心功能

- 📚 **拼音学习系统**：声母、韵母、整体认读音节，支持语音朗读
- 📖 **中华经典学习**：千字文、三字经、唐诗三百首、百家姓
- 🎮 **趣味闯关游戏**：三种游戏模式（发音测试、记忆翻牌、拼写挑战）
- ♾️ **无限关卡系统**：自动生成关卡，持续挑战
- 🗣️ **智能语音**：男主播播音口音，语速适合儿童
- 🌟 **洪恩识字法分级**：基础/中级/高级难度体系
- 📱 **响应式设计**：适配电脑、平板、手机

## 🚀 快速部署（推荐）

### 方案一：Vercel 部署（最简单）

#### 1. 准备工作
```bash
# 安装 Vercel CLI
pnpm add -g vercel

# 登录 Vercel
vercel login
```

#### 2. 部署项目
```bash
# 在项目根目录执行
vercel

# 按提示操作：
# - Set up and deploy? Yes
# - Which scope? 选择你的账户
# - Link to existing project? No
# - What's your project's name? 输入项目名称
# - In which directory? 留空（使用当前目录）
# - Want to override settings? No
```

#### 3. 生产环境部署
```bash
vercel --prod
```

**完成！** 你会获得一个永久可访问的 URL，例如：`https://your-project.vercel.app`

---

### 方案二：Netlify 部署

#### 1. 推送代码到 GitHub
```bash
# 初始化 git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 2. 在 Netlify 导入项目
1. 访问 [Netlify](https://app.netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub，授权后选择你的仓库
4. 配置构建设置：
   - **Build command**: `pnpm run build`
   - **Publish directory**: `.next`
5. 点击 "Deploy site"

---

### 方案三：自托管服务器

#### 1. 构建项目
```bash
pnpm run build
```

#### 2. 使用 PM2 启动服务
```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start npm --name "kids-learning" -- start

# 设置开机自启
pm2 startup
pm2 save
```

#### 3. 配置 Nginx（可选）
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📦 本地开发

### 环境要求
- Node.js 20+
- pnpm 9.0.0+

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm run dev
```

访问 http://localhost:5000

### 构建生产版本
```bash
pnpm run build
pnpm run start
```

## 🎮 游戏功能说明

### 1. 拼音学习
- 23个声母、24个韵母、16个整体认读音节
- 语音朗读、点击交互
- 支持洪恩识字法分级

### 2. 中华经典
- **千字文**：1000个汉字的启蒙经典
- **三字经**：中国传统启蒙教材
- **唐诗三百首**：精选300首经典唐诗
- **百家姓**：中华姓氏文化

### 3. 闯关游戏
- **发音测试**：听音辨字，训练听力
- **记忆翻牌**：配对游戏，增强记忆
- **拼写挑战**：汉字拼写，巩固学习

### 4. 无限关卡
- 初始50关，接近末尾自动生成新关卡
- 支持多类别混合生成
- 自动解锁机制

## 🔧 技术栈

- **框架**: Next.js 16 (App Router)
- **UI**: React 19 + shadcn/ui
- **样式**: Tailwind CSS 4
- **语言**: TypeScript 5
- **语音**: Web Speech API
- **存储**: localStorage

## 📁 项目结构

```
src/
├── app/                    # Next.js 页面
│   ├── games/             # 游戏模块
│   │   ├── quiz/          # 发音测试
│   │   ├── memory/        # 记忆翻牌
│   │   └── spelling/      # 拼写挑战
│   ├── learn/             # 学习模块
│   │   ├── pinyin/        # 拼音学习
│   │   ├── qianziwen/     # 千字文
│   │   ├── sanzijing/     # 三字经
│   │   ├── tangshi/       # 唐诗三百首
│   │   └── baijiaxing/    # 百家姓
│   └── page.tsx           # 首页
├── components/            # 组件
│   └── ui/                # shadcn/ui 组件
├── data/                  # 数据文件
│   ├── pinyin.ts          # 拼音数据
│   ├── qianziwen.ts       # 千字文数据
│   ├── sanzijing.ts       # 三字经数据
│   ├── tangshi.ts         # 唐诗数据
│   └── baijiaxing.ts      # 百家姓数据
└── lib/                   # 工具函数
    ├── speech-utils.ts    # 语音工具
    └── game-utils.ts      # 游戏工具
```

## 🎨 设计特色

- 🌈 **儿童友好界面**：色彩活泼可爱，操作简单直观
- 🗣️ **优质语音**：男主播播音口音，语速0.85-0.95适合儿童
- 📖 **白话翻译**：文言文附带翻译，便于理解
- 🏆 **成就系统**：解锁关卡、收集徽章
- 💾 **进度保存**：自动保存学习进度

## 🌐 环境变量

本项目无需配置环境变量，所有功能均使用浏览器本地能力。

## 📝 注意事项

1. **语音功能**：依赖浏览器 Web Speech API，不同浏览器支持度不同
   - Chrome: 完全支持
   - Safari: 部分支持
   - Firefox: 不支持

2. **进度存储**：使用 localStorage，清除浏览器数据会丢失进度

3. **无限关卡**：关卡在浏览器端自动生成，无需后端支持

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

如有问题或建议，欢迎反馈。
