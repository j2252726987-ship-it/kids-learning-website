#!/bin/bash

# 儿童拼音及中华经典学习教育网站 - 快速部署脚本

echo "🎓 儿童拼音及中华经典学习教育网站 - 部署助手"
echo "=================================================="
echo ""

# 检查 git 是否初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: 儿童拼音及中华经典学习教育网站"
    git branch -M main
    echo "✅ Git 仓库初始化完成"
else
    echo "✅ Git 仓库已存在"
fi

echo ""
echo "📝 请选择部署方式："
echo "1) Vercel（推荐，最简单）"
echo "2) Netlify（功能丰富）"
echo "3) 查看部署指南"
echo ""

read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 准备部署到 Vercel..."
        echo ""
        echo "步骤："
        echo "1. 在 GitHub 创建新仓库：https://github.com/new"
        echo "2. 推送代码："
        echo "   git remote add origin https://github.com/你的用户名/你的仓库名.git"
        echo "   git push -u origin main"
        echo "3. 在 Vercel 导入：https://vercel.com/new"
        echo ""
        echo "详细说明请查看 DEPLOY.md 文件"
        ;;
    2)
        echo ""
        echo "🚀 准备部署到 Netlify..."
        echo ""
        echo "步骤："
        echo "1. 在 GitHub 创建新仓库：https://github.com/new"
        echo "2. 推送代码："
        echo "   git remote add origin https://github.com/你的用户名/你的仓库名.git"
        echo "   git push -u origin main"
        echo "3. 在 Netlify 导入：https://app.netlify.com/start"
        echo ""
        echo "详细说明请查看 DEPLOY.md 文件"
        ;;
    3)
        echo ""
        echo "📖 打开部署指南..."
        if command -v code &> /dev/null; then
            code DEPLOY.md
        else
            cat DEPLOY.md
        fi
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "✅ 部署准备完成！"
echo "如有问题，请查看 README.md 和 DEPLOY.md 文件"
