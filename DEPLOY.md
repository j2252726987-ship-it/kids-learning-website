# 🚀 快速部署指南

## 最快部署方式（推荐新手）

### 方案一：一键部署到 Vercel（5分钟完成）

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 儿童拼音及中华经典学习教育网站"
   git branch -M main
   ```
   
2. **在 GitHub 创建新仓库**
   - 访问 https://github.com/new
   - 创建空仓库（不要初始化 README）
   - 复制仓库地址

3. **推送代码**
   ```bash
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

4. **在 Vercel 导入**
   - 访问 https://vercel.com/new
   - 点击 "Import Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

   ✅ **完成！** 几秒钟后你会获得永久访问链接

---

### 方案二：使用 Vercel CLI（需要配置）

1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **本地测试**
   ```bash
   pnpm run dev
   ```
   访问 http://localhost:5000 确认功能正常

3. **登录 Vercel**
   ```bash
   pnpm add -g vercel
   vercel login
   ```

4. **部署预览版本**
   ```bash
   vercel
   ```

5. **部署生产版本**
   ```bash
   vercel --prod
   ```

---

### 方案三：部署到 Netlify

1. **推送到 GitHub**（同方案一）

2. **在 Netlify 导入**
   - 访问 https://app.netlify.com/start
   - 点击 "Import from GitHub"
   - 选择你的仓库
   - 配置如下：
     - **Build command**: `pnpm run build`
     - **Publish directory**: `.next`
   - 点击 "Deploy site"

---

## 部署后检查清单

部署完成后，请确认以下功能：

- [ ] 网站可以正常访问
- [ ] 拼音学习页面语音可以播放
- [ ] 游戏功能正常运行
- [ ] 关卡进度可以保存
- [ ] 移动端显示正常

## 常见问题

### Q: 部署后语音功能不工作？
A: Web Speech API 在某些服务器上可能有限制，确保使用 HTTPS 访问。

### Q: 游戏进度丢失？
A: 进度存储在用户浏览器的 localStorage 中，清除浏览器数据会丢失进度。

### Q: 如何自定义域名？
**Vercel**:
- 进入项目设置 → Domains
- 添加自定义域名

**Netlify**:
- 进入 Site settings → Domain management
- 添加自定义域名

### Q: 部署失败怎么办？
1. 检查 `package.json` 中的依赖是否完整
2. 确保使用 pnpm 作为包管理器
3. 查看部署日志中的错误信息

## 更新部署

修改代码后，只需推送代码即可自动触发重新部署：

```bash
git add .
git commit -m "更新描述"
git push
```

Vercel 和 Netlify 都会自动检测到更新并重新部署。

## 推荐部署平台对比

| 平台 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Vercel** | 最简单，Next.js 官方支持 | 免费额度有限制 | ⭐⭐⭐⭐⭐ |
| **Netlify** | 功能丰富，免费额度大 | 配置稍复杂 | ⭐⭐⭐⭐ |
| **自托管** | 完全控制 | 需要维护服务器 | ⭐⭐⭐ |

**结论：新手推荐 Vercel，进阶推荐 Netlify，专业推荐自托管**

---

## 需要帮助？

如果部署过程中遇到问题：
1. 检查部署日志
2. 查看 [Vercel 文档](https://vercel.com/docs)
3. 查看 [Netlify 文档](https://docs.netlify.com)

祝部署顺利！🎉
