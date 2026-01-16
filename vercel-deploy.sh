#!/bin/bash
cd /workspace/projects

# 尝试使用非交互式方式部署
export VERCEL_TOKEN=""
export VERCEL_PROJECT_ID=""

# 设置非交互模式
export CI=1
export VERCEL_ORGANIZATION_ID=""
export VERCEL_PROJECT_ID=""

# 尝试部署
vercel --yes --token="$VERCEL_TOKEN" --prod
